import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";


class paymentHistoryScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            payments : [],
            user : this.props.auth
        };
    }

    componentDidMount() {
        console.log(this.props.auth.user.email);
        axios.get('http://localhost:5000/api/payment/email/'+ this.props.auth.user.email)
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
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.state.payments.map(payment => <ul>{payment.name}</ul>)}</td>
                        <td>{this.state.payments.map(payment => <ul>{payment.email}</ul>)}</td>
                        <td>{this.state.payments.map(payment => <ul>{payment.amount}</ul>)}</td>
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

export default connect(mapStateToProps, null)(paymentHistoryScreen);