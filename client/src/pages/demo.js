import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";


class demo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            payments : [],
            user : this.props.auth
        };
    }

    /*componentDidMount() {
        console.log(this.props.auth.user.email);
        axios.get('http://localhost:5000/api/payment/email/'+ this.props.auth.user.email)
            .then(res => {
                console.log(res);
                this.setState({payments:res.data})
        });
    }*/

    componentDidMount() {
        console.log(this.props.auth.user.email);
        axios.get('http://localhost:5000/api/trip/'+ this.props.auth.user.email)
            .then(res => {
                console.log(res);
                this.setState({payments:res.data})
            });
    }

    render() {

        return (
            <div>
                <table className="table table-bordered table-dark">
                    <thead>
                    <tr>
                        <th scope="col">Route ID</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">Start Location</th>
                        <th scope="col">End Location</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.state.payments.map(payment => <ul>{payment.route_id}</ul>)}</td>
                        <td>{this.state.payments.map(payment => <ul>{payment.startTime}</ul>)}</td>
                        <td>{this.state.payments.map(payment => <ul>{payment.startLocation}</ul>)}</td>
                        <td>{this.state.payments.map(payment => <ul>{payment.endLocation}</ul>)}</td>
                    </tr>

                    </tbody>
                </table>
            </div>

        );
    }

}

const mapStateToProps = state => ({

    auth: state.auth

});

export default connect(mapStateToProps, null)(demo);