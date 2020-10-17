import React, {Component} from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../../components/AdminPageHeader";
import Chart from "react-google-charts";
import SmallStats from "../../components/SmallStats";
import '../../App.css';
import axios from "axios";
import {SERVER_PATH} from "../../constants/constant";
import dateFormat from "dateformat";

class Home extends Component {
constructor(props) {
    super(props);

    this.state = {
        busRoute: [],
        DataArray:['test 1','test 2'],
        chartData:{
            route:[],
            fare:[]
        },
        smallStats: [
            {
                label: "Routes",
                value: "2,390",
                percentage: "4.7%",
                increase: true,
                chartLabels: [null, null, null, null, null, null, null],
                attrs: { md: "6", sm: "6" },
                datasets: [
                    {
                        label: "Today",
                        fill: "start",
                        borderWidth: 1.5,
                        backgroundColor: "rgba(0, 184, 216, 0.1)",
                        borderColor: "rgb(0, 184, 216)",
                        data: [1, 2, 1, 3, 5, 4, 7]
                    }
                ]
            },
            {
                label: "Buses",
                value: "182",
                percentage: "12.4",
                increase: true,
                chartLabels: [null, null, null, null, null, null, null],
                attrs: { md: "6", sm: "6" },
                datasets: [
                    {
                        label: "Today",
                        fill: "start",
                        borderWidth: 1.5,
                        backgroundColor: "rgba(23,198,113,0.1)",
                        borderColor: "rgb(23,198,113)",
                        data: [1, 2, 3, 3, 3, 4, 4]
                    }
                ]
            },
            {
                label: "Passengers",
                value: "8,147",
                percentage: "3.8%",
                increase: false,
                decrease: true,
                chartLabels: [null, null, null, null, null, null, null],
                attrs: { md: "4", sm: "6" },
                datasets: [
                    {
                        label: "Today",
                        fill: "start",
                        borderWidth: 1.5,
                        backgroundColor: "rgba(255,180,0,0.1)",
                        borderColor: "rgb(255,180,0)",
                        data: [2, 3, 3, 3, 4, 3, 3]
                    }
                ]
            },
            {
                label: "Trips",
                value: "17,281",
                percentage: "6.4%",
                increase: false,
                decrease: true,
                chartLabels: [null, null, null, null, null, null, null],
                attrs: { md: "4", sm: "6" },
                datasets: [
                    {
                        label: "Today",
                        fill: "start",
                        borderWidth: 1.5,
                        backgroundColor: "rgb(0,123,255,0.1)",
                        borderColor: "rgb(0,123,255)",
                        data: [3, 2, 3, 2, 4, 5, 4]
                    }
                ]
            }
        ]
    };

    this.getData = this.getData.bind(this);
}

    componentDidMount() {
        this.getData();
    }

    getData(){
        axios.get(SERVER_PATH + '/api/busRoute/')
            .then(response => {
                this.setState({
                    busRoute :response.data,
                    loading :false
                });
                console.log("R ids"+this.state.busRoute);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(SERVER_PATH + '/api/trip/')
            .then(response => {

                let count = 0;
                let routeArray = this.state.busRoute;
                let routeData = {
                        route_id:[],
                        fare:[]
                    };


                // routeData.fare.push([1,3,5,2]);

                for (let i=0;i< routeArray.length;i++) {
                    routeData.route_id.push(routeArray[i].route_id);
                    routeData.fare.push(0);
                    console.log("fisrt route:"+routeData.route_id[i]);
                    console.log("first fare:"+routeData.fare[i]);
                }

                let tripData = response.data;
                for (let j=0;j < tripData.length;j++){
                    for (let i=0;i< routeData.route_id.length;i++) {

                        if(routeData.route_id[i] === tripData[j].route_id){
                            count = routeData.fare[i];
                            let sum = 0;
                            let TripFare = tripData[j].fair;

                            sum = count + TripFare;
                            routeData.fare[i] = sum;
                        }
                    }

                }

                //count = routeData.fare[i];
                console.log("route id:"+routeData.route_id);
                console.log("fare:"+routeData.fare);

                this.setState({
                    chartData: routeData
                });

                /*data={
                    [
                        ['Route', 'Total Fair'],
                        ['2014', 1000],
                        ['2015', 1170],
                        ['2016', 660],
                        ['2017', 1030]
                    ]
              }*/
                this.setState({
                    DataArray:[this.chartData.route,this.chartData.fare]
                })


                this.setState({
                    trips :response.data,
                    loading :false
                });
                console.log(this.state.trips);
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


    render() {


        return (
            <div className="container-admin">
                <Container >

                    <Row noGutters className="page-header py-4">
                        <PageTitle title="Blog Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
                    </Row>

                    {/* Small Stats Blocks */}
                    <Row className='col-lg mb-4'>
                        {this.state.smallStats.map((stats, idx) => (
                            <Col xs="6" sm="3" key={idx}>
                                <SmallStats
                                    id={`small-stats-${idx}`}
                                    variation="1"
                                    chartData={stats.datasets}
                                    chartLabels={stats.chartLabels}
                                    label={stats.label}
                                    value={stats.value}
                                    percentage={stats.percentage}
                                    increase={stats.increase}
                                    decrease={stats.decrease}
                                />
                            </Col>
                        ))}
                    </Row>

                    <Row>
                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Route', 'Total Fair'],
                                ['2014', 1000],
                                ['2015', 1170],
                                ['2016', 660],
                                ['2017', 1030]
                            ]}
                            options={{
                                // Material design options
                                chart: {
                                    title: 'Company Performance',
                                    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                                },
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '2' }}
                        />
                    </Row>


                </Container>

            </div>
        );
    }
}

export default Home;