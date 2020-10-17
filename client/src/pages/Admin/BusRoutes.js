import React, {Component} from 'react';
import axios from "axios";
import {SERVER_PATH} from "../../constants/constant";
import { Table, Button, Form, FormGroup, Label, Input, FormText, Container, ButtonToggle } from 'reactstrap';
import Swal from "sweetalert2";
import {Card, CardBody, CardHeader, Col, Row} from "shards-react";
import PageTitle from "../../components/AdminPageHeader";

class BusRoutes extends Component {
    constructor(props) {
        super(props);

        this.onChangeBRName = this.onChangeBRName.bind(this);
        this.onChangeBRId = this.onChangeBRId.bind(this);
        this.passengerCount = this.passengerCount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            busRoutes : [],
            trips:[],
            BRName: '',
            BRId: ''
        };
    }

    componentDidMount() {

        this.getData();

        axios.get(SERVER_PATH + '/api/trip/')
            .then(response => {
                this.setState({
                    trips :response.data,
                    loading :false
                });
                console.log(this.state.trips);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(SERVER_PATH + '/api/busRoute/')
            .then(response => {
                this.setState({
                    busRoutes :response.data,
                    loading :false
                });
                console.log(this.state.busRoutes);
            })
            .catch(error => {
                console.log(error);
            });


    }

    passengerCount(route){
        console.log("count :" +route);

        let count=0;
        let TripArray = this.state.trips;

        // console.log(TripArray[2].route_id);

        for (let i=0;i< TripArray.length;i++){
            let tripRoutes = this.state.trips.route_id;
            if(TripArray[i].route_id === route){
                count++;
            }
        }

        return count;
    }

    onChangeBRName(e) {
        this.setState({
            BRName: e.target.value
        });
    }

    onChangeBRId(e) {
        this.setState({
            BRId: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

            const busRoute = {
                BRName: this.state.BRName,
                BRId: this.state.BRId,
            };

            console.log(busRoute);

            axios.post(SERVER_PATH + '/api/busRoute/insert', busRoute)
                .then(res => {
                        console.log(res.data);

                        this.getData();

                        this.setState({
                            BRName: "",
                            BRId: ""
                        });

                        this.confirmAlart();
                    }
                );


    }

    getData = () => {
        axios.get(SERVER_PATH + "/api/busRoute/")
            .then(response => {
                this.setState({
                    busRoutes: response.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    };

    confirmAlart() {
        Swal.fire(
            'Good job!',
            'Route has created!',
            'success'
        )
    }

    fieldmissAlart() {
        Swal.fire({
            icon: 'question',
            title: 'Oppss! something missing',
            text: 'Please select a category from the list'
        })
    }

    render() {
        return (
            <div className="container">
                <Container fluid className="main-content-container px-4">
                    <Row noGutters className="page-header py-4">
                        <PageTitle sm="4" title="Add Bus Routes" subtitle="Manage All bus routes" className="text-sm-left" />
                    </Row>

                    <Container>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Route Name</Label>
                                <Input type="text" name="email" required id="name" placeholder="Enter Route Name"
                                       value={this.state.BRName}
                                       onChange={this.onChangeBRName}
                                />
                            </FormGroup>
                            <FormText color="muted">
                                Ex: Galle - Colombo
                            </FormText>
                            <br/>
                            <FormGroup>
                                <Label for="examplePassword">Route Id</Label>
                                <Input type="text" name="rid" required id="Rid" placeholder="Enter Route Id"
                                       value={this.state.BRId}
                                       onChange={this.onChangeBRId}
                                />
                            </FormGroup>
                            <FormText color="muted">
                                Ex: 270
                            </FormText>
                            <br/>
                            <Input type="submit" value="Save Route" className="btn btn-primary"/>
                        </Form>

                    </Container>

                    <br/>
                    <Container>
                        <Row>
                            <Col>
                                <Card small className="mb-4">
                                    <CardHeader className="border-bottom">
                                        <h6 className="m-0">Active Users</h6>
                                    </CardHeader>
                                    <CardBody className="p-0 pb-3">
                                        <table className="table mb-0">
                                            <thead className="bg-light">
                                            <tr>
                                                <th scope="col" className="border-0">
                                                    #
                                                </th>
                                                <th scope="col" className="border-0">
                                                    Route Name
                                                </th>
                                                <th scope="col" className="border-0">
                                                    Route Number
                                                </th>
                                                <th scope="col" className="border-0">
                                                    Passengers
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.busRoutes.map((br, i) =>(

                                                <tr key={i}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{br.name}</td>
                                                    <td>{br.route_id}</td>
                                                    <td>{this.passengerCount(br.route_id)}</td>
                                                </tr>
                                            ) )}

                                            </tbody>
                                        </table>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    </Container>

                </Container>
            </div>

        );
    }
}

export default BusRoutes;