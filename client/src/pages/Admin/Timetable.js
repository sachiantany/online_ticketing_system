import React, {Component} from 'react';
import axios from "axios";
import {SERVER_PATH} from "../../constants/constant";
import Swal from "sweetalert2";
import {Container,Row , Col, Table, Card, CardTitle, Button, CardText, DropdownItem, DropdownMenu, UncontrolledDropdown, DropdownToggle} from "reactstrap";
import dateFormat from "dateformat";

class Timetable extends Component {
    constructor(props) {
        super(props);

        this.passengerCount = this.passengerCount.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.getData = this.getData.bind(this);
        this.changeValueLocation = this.changeValueLocation.bind(this);

        this.state = {
            busRoutes : [],
            trips:[],
            BRName: '',
            BRId: '',
            dropDownValue: 'Select action',
            dropDownLocation: "No Location",
            interval: null,
            time: '10:00',
            location: []
        };
    }

    componentDidMount() {
        //this.interval = setInterval(this.getData, 5000);
        this.getData();
    }

    componentWillUnmount() {
        //clearInterval(this.interval);
    }

    getData(){
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

        axios.get(SERVER_PATH + '/api/location/')
            .then(response => {
                this.setState({
                    location :response.data,
                    loading :false
                });
                console.log(this.state.busRoutes);
            })
            .catch(error => {
                console.log(error);
            });
    }

    passengerCount(route){

        let count=0;
        let TripArray = this.state.trips;


        for (let i=0;i< TripArray.length;i++){

            if(TripArray[i].route_id === route && dateFormat(TripArray[i].travelStartTime, "dddd") === this.state.dropDownValue){
                count++;
            }

        }

        return count;
    }

    changeValue(e) {
        this.setState({dropDownValue: e.currentTarget.textContent});
        let id = e.currentTarget.getAttribute("id");
        console.log(id);
    }

    changeValueLocation(e) {
        this.setState({dropDownLocation: e.currentTarget.textContent});
        let id = e.currentTarget.getAttribute("id");
        console.log("location :" +id);
    }

    onChange = time => this.setState({ time })

    render() {

        return (
            <div className="w-auto">
                <br/>
                <div className='text-center'>
                    <h2>View Information for Plan Timetable</h2>
                </div>
                <br/>
                <hr/>
                <div className='container-sm border-primary pt-6'>
                    <Row>
                        <Col sm="5">
                            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                <CardTitle></CardTitle>
                                <CardText>Filter Passengers by Each Day</CardText>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                       Select Day
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem key="1" id="Monday" onClick={this.changeValue}>Monday</DropdownItem>
                                        <DropdownItem key="2" id="Tuesday" onClick={this.changeValue}>Tuesday</DropdownItem>
                                        <DropdownItem key="3" id="Wednesday" onClick={this.changeValue}>Wednesday</DropdownItem>
                                        <DropdownItem key="4" id="Thursday" onClick={this.changeValue}>Thursday</DropdownItem>
                                        <DropdownItem key="5" id="Friday" onClick={this.changeValue}>Friday</DropdownItem>
                                        <DropdownItem key="6" id="Saturday" onClick={this.changeValue}>Saturday</DropdownItem>
                                        <DropdownItem key="7" id="Sunday" onClick={this.changeValue}>Sunday</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Card>
                        </Col>
                        <Col sm="5">
                            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                <CardTitle></CardTitle>
                                <CardText>Filter Passengers by Location</CardText>

                                <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                       Select Location
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.state.location.map((lo, i) =>(
                                        <DropdownItem key={i} id={lo.name} onClick={this.changeValueLocation}>{lo.name}</DropdownItem>
                                        ) )}
                                    </DropdownMenu>
                                </UncontrolledDropdown>


                            </Card>
                        </Col>

                    </Row>
                </div>
                <br/>



                <Container>
                    <Table striped>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Route Name</th>
                            <th>Route Number</th>
                            <th>Passengers</th>
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
                    </Table>
                </Container>

            </div>
        );
    }
}


export default Timetable;