import React, {Component} from 'react';
import {Button, Container} from "reactstrap";
import {Card, CardBody, CardHeader, Col, Row} from "shards-react";
import PageTitle from "../../components/AdminPageHeader";
import dateFormat from "dateformat";
import axios from "axios";
import {SERVER_PATH} from "../../constants/constant";

class AllBuses extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users:[]
        };
    }

    componentDidMount() {

        axios.get(SERVER_PATH + '/api/trip/')
            .then(response => {
                this.setState({
                    users :response.data,
                    loading :false
                });
                console.log(this.state.users);
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {
        return (
            <div className="container">

                <Container fluid className="main-content-container px-4">
                    <Row noGutters className="page-header py-4">
                        <PageTitle sm="4" title="Trips" subtitle="All Trips of Passenger" className="text-sm-left" />
                    </Row>
                    <hr/>
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
                                            <th>#</th>
                                            <th>Trip Date</th>
                                            <th>Route Id</th>
                                            <th>Start Location</th>
                                            <th>End Location</th>
                                            <th>Fair</th>
                                            <th>Distance</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.users.map((br, i) =>(

                                            <tr key={i}>
                                                <th scope="row">{i+1}</th>
                                                <td>{dateFormat(br.travelStartTime, "mmmm dS, yyyy")}</td>
                                                <td>{br.route_id}</td>
                                                <td>{br.startLocation}</td>
                                                <td>{br.endLocation}</td>
                                                <td>{br.fair}</td>
                                                <td>{br.distance+'Km'}</td>
                                            </tr>
                                        ) )}

                                        </tbody>
                                    </table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>


            </div>
        );
    }
}

export default AllBuses;