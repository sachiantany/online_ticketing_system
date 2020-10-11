import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Jumbotron from "reactstrap/es/Jumbotron";
import Container from "reactstrap/es/Container";
import {SERVER_PATH} from "../constants/constant";
import axios from "axios";
import Card from "reactstrap/es/Card";
import CardHeader from "reactstrap/es/CardHeader";
import CardBody from "reactstrap/es/CardBody";
import Form from "reactstrap/es/Form";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Button from "reactstrap/es/Button";
import Input from "reactstrap/es/Input";
import Swal from "sweetalert2";


class  BusFair extends Component {

    state = {
        busRoutes: [],
        selectedRoute: "",
        locations: [],
        startLocation: "",
        endLocation:"",
        isStartTrip :0,
        username:"",
        action:"Start Trip",
        endTripUser:[]
    };

    componentDidMount() {

        fetch(SERVER_PATH + '/api/busRoute/')
            .then((response) => {
                return response.json();
            })
            .then(data => {
                let routesFromApi = data.map(busRoute => {
                    return {value: busRoute.route_id, display: busRoute.name}
                });
                this.setState({
                    busRoutes: [{value: '0', display: '--Select your route--'}].concat(routesFromApi)
                });
                console.log(this.state.busRoutes);
            }).catch(error => {
            console.log(error);
        });
    }

    loadLocations(routeId){

        console.log('route ID   ' + routeId);

        fetch(SERVER_PATH + '/api/location/')
            .then((response) => {
                return response.json();
            })
            .then(data => {
                let locationFromApi = data.map(location => {
                    return {value: location.distance, display: location.name,route_id: location.route_id}
                });

                let filteredLocation = locationFromApi.filter((list) => list.route_id === routeId)

                this.setState({
                    locations: [{value: '0', display: '--Select Location--', distance: 0}].concat(filteredLocation)
                });
                console.log('location ' + this.state.locations);
            }).catch(error => {
            console.log(error);
        });
    }

    actionStatus(userName){
        axios.get(SERVER_PATH + '/api/trip/status/'+userName)
            .then(response => {
                this.setState({isStartTrip :response.data}, () => {
                    console.log(this.state.isStartTrip)

                    if(this.state.isStartTrip === 0){
                        this.setState({action:  "Start Trip"},() =>{
                            console.log(this.state.action);
                        });
                    }else{
                        this.setState({action:  "End Trip"}, () => {
                            console.log(this.state.action);
                        });
                    }
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    changeRoute(e){
        //this.setState({selectedRoute: e.target.value})
        this.setState({selectedRoute:  e.target.value}, () => {
            console.log(this.state.selectedRoute);
            this.loadLocations(this.state.selectedRoute)
        });
    }

    changeLocation(e){
        if(this.state.isStartTrip === 0){
            this.setState({
                startLocation: e.target.value
            })
        }else{
            this.setState({
                endLocation: e.target.value
            })
        }
    }

    changeUserName(e){
        this.setState({username:  e.target.value}, () => {
            console.log(this.state.username);
            this.actionStatus(this.state.username);
            console.log(this.state.isStartTrip)
        });
    }

    confirmStartAlert() {
        Swal.fire(
            'Trip Started!',
            'Trip Started Successfully',
            'success'
        )
    }

    handleClick(){
        if(this.state.isStartTrip === 0){
            console.log('start trip')
            const trip = {
                username: this.state.username,
                route_id:this.state.selectedRoute,
                startLocation: this.state.startLocation,
                endLocation:0,
                fair:0,
                distance:0
            }
            axios.post(SERVER_PATH + '/api/trip/insert', trip)
                .then(res => {
                        console.log(res.data);
                        this.setState({username: ""});
                        this.confirmStartAlert();
                    }
                );
        }else{
            console.log('end trip');
            axios.get(SERVER_PATH + '/api/trip/'+this.state.username)
                .then(response => {
                    this.setState({endTripUser:response.data}, ()=>{
                        console.log(this.state.endTripUser);
                        const data = this.state.endTripUser[0];
                        let distance = this.state.endLocation - data.startLocation;
                        let fair = distance * 100;

                        console.log('start '+ data.startLocation);
                        console.log('end '+ this.state.endLocation);
                        console.log(fair);

                        const trip = {
                            username: data.username,
                            route_id:data.route_id,
                            startLocation: data.startLocation,
                            endLocation:this.state.endLocation,
                            fair:fair,
                            distance:distance
                        }

                        axios.post(SERVER_PATH + "/api/trip/endTrip/" + this.state.username , trip)
                            .then(res =>{
                                console.log(res.data);
                                this.setState({username: ""});
                                this.confirmStartAlert();
                            })
                            .catch(error => {
                                console.log(error.response)
                            });;

                    })
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }



    render() {
        return (
            <Container>
                <Jumbotron>
                        <h1>Welcome To e-trans</h1>
                        <p>
                            Make sure to place your barcode or enter your ID when you enter and exits.
                            Happy Journey..!
                        </p>
                </Jumbotron>


                    <Card>
                        <CardHeader className="bg-secondary text-white">Routes and Location</CardHeader>
                        <CardBody className="bg-light">
                            <div className="row mb-5">
                                <div className="col-md-4">
                                    <Label className="text-left mr-3">Bus Route</Label>
                                    <select value={this.state.selectedRoute} onChange={event => this.changeRoute(event)}>
                                        {this.state.busRoutes.map((team) => <option key={team.value} value={team.value}>{team.display}</option>)}
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <Label className="text-left mr-3">Start Location</Label>
                                    <select value={this.state.startLocation}
                                            onChange={(e) => this.setState({startLocation: e.target.value})}>
                                        {this.state.locations.map((team) => <option key={team.value} value={team.value}>{team.display}</option>)}
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <Label className="text-left mr-3">End Location</Label>
                                    <select value={this.state.endLocation}
                                            onChange={(e) => this.setState({endLocation: e.target.value})}>
                                        {this.state.locations.map((team) => <option key={team.value} value={team.value}>{team.display}</option>)}
                                    </select>
                                </div>
                            </div>
                        </CardBody>
                    </Card>


                <div className="row mt-5">
                    <div className="col-md-3">
                        <Label>
                            User ID
                        </Label>
                    </div>
                    <div className="col-md-6">
                        <Input type="text" placeholder="User ID" value={this.state.username} onChange={event => this.changeUserName(event)}/>
                    </div>
                    <div className="col-md-3">
                        <Button className="btn-success" variant="primary" type="submit" onClick={() => this.handleClick()}>
                            {this.state.action}
                        </Button>
                    </div>
                </div>

            </Container>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(BusFair);