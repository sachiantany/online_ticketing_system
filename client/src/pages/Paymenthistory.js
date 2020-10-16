
import React, {Component} from 'react';
import Navbar from "../components/Navbar";
import '../components/MyAccount.css';
import axios from "axios";
import {SERVER_PATH} from "../constants/constant";
import PropTypes from "prop-types";
import PaymentHistoryScreen from "./paymentHistoryScreen"



class PaymentHistory extends Component{

    render() {
        return (
            <div className='container'>
                <Navbar/>

                <div className="topic_and_button">
                    <h2>Payment History</h2>
                </div>

                <PaymentHistoryScreen/>


            </div>

        );

    }


}



export default PaymentHistory;