import React, {Component} from 'react';
import '../components/MyAccount.css';
import MyProfile from "../MyProfileAPI";
import Navbar from "../components/Navbar";
import "../components/MyAccount.css";
import {connect} from "react-redux";
import axios from 'axios';
import {register} from "../actions/authActions";
import {clearErrors} from "../actions/errorActions";



class MyAccount extends Component{

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            cardNo: '',
            expDate: '',
            CCV:'',
            amount:''
        };
    }



    onChange = e => {

        this.setState({[e.target.name]: e.target.value});

    };



    onSubmit (){

        //e.preventDefault();
        //const {name, cardNo, expDate, CCV, amount} = this.state;
        const newPayment = {
            name: this.state.name,
            cardNo: parseInt(this.state.cardNo),
            expDate: this.state.expDate.concat("-31"),
            CCV: parseInt(this.state.CCV),
            amount:parseFloat(this.state.amount)
        };

        console.log(newPayment);

        axios.post('http://localhost:5000/api/payment/insert', newPayment)

            .then(res => {

                    console.log(res.status);


                    //this.props.register(newPayment);
                }

            ).catch((reason) => {
                console.log(reason);
        });

    };
    render()
    {
        return (
            <div className='container'>
                <Navbar/>
                <div className="topic_and_button">
                    <h2>My Account</h2>
                    <a id="btn_click" type="button" className="btn btn-dark btn-add-cash" data-toggle="modal"
                       data-target="#modalLoginForm">Add Cash</a>
                </div>

                <form className="add_cash_form">
                    <div className="form-group">
                        <label htmlFor="FirstName">First Name</label>
                        <input type="text" className="form-control" id="firstName"/>
                    </div>
                    <div className="LastName">
                        <label htmlFor="cardNumber">Last Name</label>
                        <input type="text" className="form-control" id="lastName"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="NIC">NIC</label>
                        <input type="text" className="form-control" id="nic"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Contact">Contact Number</label>
                        <input type="number" className="form-control" id="contact"/>
                    </div>

                </form>
                <form className="add_cash_form_new" onSubmit={this.onSubmit}>
                    <div className="modal" id="modalLoginForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                         aria-hidden="true" >
                        <div className="modal-dialog" role="document"  >
                            <div className="modal-content ">
                                <div className="modal-header text-center">
                                    <h4 className="modal-title w-100 font-weight-bold">Add Cash</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div className="modal-body mx-3">
                                    <div className="md-form mb-5">
                                        <label htmlFor="cardName">Name on the Card</label>
                                        <input type="text"
                                               className="form-control"
                                               name='name'
                                               id='name'
                                               onChange={this.onChange}/>
                                    </div>

                                    <div className="md-form mb-4">
                                        <label htmlFor="cardNumber">Card Number</label>
                                        <input type="number"
                                               className="form-control"
                                               id="cardNo"
                                               name='cardNo'
                                               onChange={this.onChange}
                                               placeholder="Card Number"/>
                                    </div>

                                    <div className="md-form mb-4">
                                        <label htmlFor="expiry">Expiration Date</label>
                                        <input type="Month"
                                               className="form-control"
                                               id="expDate"
                                               name='expDate'
                                               onChange={this.onChange}/>
                                    </div>

                                    <div className="md-form mb-4">
                                        <label htmlFor="CCV">CCV</label>
                                        <input type="text"
                                               className="form-control"
                                               id="CCV"
                                               name='CCV'
                                               onChange={this.onChange}/>
                                    </div>

                                    <div className="md-form mb-4">
                                        <label htmlFor="amount">Amount</label>
                                        <input type="text"
                                               className="form-control"
                                               id="amount"
                                               name='amount'
                                               onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="modal-footer d-flex justify-content-center">
                                    <button type="button" className="btn btn-dark" onClick={() => this.onSubmit()}>Add Cash</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>

        );

    }

}

const mapStateToProps = state => ({

    auth: state.auth

});



export default connect(mapStateToProps, null)(MyAccount);
