import React, {Component} from 'react';
import axios from "axios";
import {SERVER_PATH} from "../../constants/constant";
import Swal from "sweetalert2";
import {Container, Table, Button} from "reactstrap";
import dateFormat from 'dateformat';
import {Card, CardBody, CardHeader, Col, Row} from "shards-react";
import PageTitle from "../../components/AdminPageHeader";

class Passengers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users:[]
        };
    }

    componentDidMount() {

        axios.get(SERVER_PATH + '/api/users/')
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
                        <PageTitle sm="4" title="Passengers" subtitle="All Registered Passengers" className="text-sm-left" />
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
                                            <th>Passenger Name</th>
                                            <th>Passenger Id</th>
                                            <th>Passenger Email</th>
                                            <th>Registered Date</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.users.map((br, i) =>(

                                            <tr key={i}>
                                                <th scope="row">{i+1}</th>
                                                <td>{br.name}</td>
                                                <td>{br._id}</td>
                                                <td>{br.email}</td>
                                                <td>{dateFormat(br.register_date, "mmmm dS, yyyy")}</td>
                                                <td><Button className='btn-primary'>View</Button></td>
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

// dateFormat(br.register_date, "mmmm dS, yyyy")
export default Passengers;
