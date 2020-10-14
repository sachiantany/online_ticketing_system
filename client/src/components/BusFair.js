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
        endTripUser:[],
        tripSum: 0,
        paymentSum :[],
        isGuest :0
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

    tripSum(userName){
        axios.get(SERVER_PATH + '/api/trip/tripSum/'+userName)
            .then(response => {

                let trip_sum = {
                        _id:'',
                        total:0
                }

                trip_sum = response.data;
                console.log(trip_sum)

                this.setState({tripSum :trip_sum[0].total}, () => {
                    console.log(this.state.tripSum)
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    depositSum(userName){
        axios.get(SERVER_PATH + '/api/trip/paymentSum/'+userName)
            .then(response => {

                let payment_sum = {
                    _id:'',
                    total:0
                }

                payment_sum = response.data;
                console.log(payment_sum)

                this.setState({tripSum :payment_sum[0].total}, () => {
                    console.log(this.state.tripSum)
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    isGuestValidate(userName){
        axios.get(SERVER_PATH + '/api/trip/isGuest/'+userName)
            .then(response => {
                this.setState({isGuest :response.data}, () => {
                    console.log('Guest Status : '+this.state.isGuest)
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

            this.tripSum(this.state.username);
            console.log('This is trip sum '+ this.state.tripSum)

            this.depositSum(this.state.username);
            console.log('This is trip sum '+ this.state.tripSum)

            this.isGuestValidate(this.state.username);
            console.log('Guest Status : '+this.state.isGuest)
        });
    }

    confirmStartAlert() {
        Swal.fire(
            'Trip Started!',
            'Trip Started Successfully',
            'success'
        )
    }

    confirmEndAlert() {
        Swal.fire(
            'Trip Ended!',
            'Thanking You to Travel with us ',
            'success'
        )
    }

    confirmGuest(){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Travel As Guest!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Thank You!',
                    'Trip Started.',
                    'success'
                )
            }
        })
    }

    handleClick(){
        if(this.state.isStartTrip === 0){

            if(this.state.isGuest === 0){
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Travel As Guest!'
                }).then((result) => {
                    if (result.isConfirmed) {

                        console.log('start trip');
                        const trip = {
                            username: this.state.username,
                            route_id:this.state.selectedRoute,
                            startLocation: this.state.startLocation,
                            endLocation:0,
                            fair:0,
                            distance:0,
                            isGuest : this.state.isGuest
                        }
                        axios.post(SERVER_PATH + '/api/trip/insert', trip)
                            .then(res => {
                                    console.log(res.data);
                                    this.setState({username: ""});
                                    this.confirmStartAlert();
                                }
                            );

                        Swal.fire(
                            'Thank You!',
                            'Trip Started.',
                            'success'
                        )
                    }
                })
            }else{
                console.log('start trip')
                const trip = {
                    username: this.state.username,
                    route_id:this.state.selectedRoute,
                    startLocation: this.state.startLocation,
                    endLocation:0,
                    fair:0,
                    distance:0,
                    isGuest : this.state.isGuest
                }
                axios.post(SERVER_PATH + '/api/trip/insert', trip)
                    .then(res => {
                            console.log(res.data);
                            this.setState({username: ""});
                            this.confirmStartAlert();
                        }
                    );
            }
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

                        if(this.state.isGuest === 0){
                            axios.post(SERVER_PATH + "/api/trip/endTrip/" + this.state.username , trip)
                                .then(res =>{
                                    console.log(res.data);
                                    this.setState({username: ""});
                                        Swal.fire({
                                            title: 'Your Trip has ended Please pay your fair '+trip.fair,
                                            showClass: {
                                                popup: 'animate__animated animate__fadeInDown'
                                            },
                                            hideClass: {
                                                popup: 'animate__animated animate__fadeOutUp'
                                            }
                                        })
                                })
                                .catch(error => {
                                    console.log(error.response)
                                });;

                        }else{
                            let availableBalance = this.state.paymentSum - this.state.tripSum;
                            console.log('payment sum : '+this.state.paymentSum +'-'+ 'trip sum : '+ this.state.tripSum + ' = ' + availableBalance);

                            if(availableBalance > trip.fair){
                                axios.post(SERVER_PATH + "/api/trip/endTrip/" + this.state.username , trip)
                                    .then(res =>{
                                        console.log(res.data);
                                        this.setState({username: ""});
                                        this.confirmEndAlert();
                                    })
                                    .catch(error => {
                                        console.log(error.response)
                                    });;
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Insufficient Balance...',
                                    text: 'Please Recharge Your Account and try again !',
                                    footer: '<a href>Why do I have this issue?</a>'
                                })
                            }

                        }

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