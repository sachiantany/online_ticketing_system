import React, {Component} from 'react';
import '../components/MyAccount.css';
import Navbar from "../components/Navbar";
import "../components/MyAccount.css";
import {connect} from "react-redux";
import axios from 'axios';
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Demo from "../pages/demo";

class MyAccount extends Component{

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email:'',
            cardNo: '',
            expDate: '',
            CCV:'',
            amount:''
        };

    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    /*componentDidMount() {
        axios.get('http://localhost:5000/api/payment/users')
            .then(res => {
                console.log(res);
                this.setState({name: res.data.name,
                                    email:res.data.email})
            });
    }*/



    onChange = e => {

        this.setState({[e.target.name]: e.target.value});

    };



    onSubmit (){

        //e.preventDefault();
        //const {name, cardNo, expDate, CCV, amount} = this.state;
        const newPayment = {
            name: this.state.name,
            email: this.state.email,
            cardNo: parseInt(this.state.cardNo),
            expDate: this.state.expDate.concat("-31"),
            CCV: parseInt(this.state.CCV),
            amount:parseFloat(this.state.amount)
        };

        if(newPayment.name === undefined || newPayment.email === undefined || newPayment.cardNo === NaN || newPayment.expDate === "-31" || newPayment.CCV === NaN || newPayment.amount === NaN){
            Swal.fire(
                'Error',
                'Fields Cannot be Null!',
                'error')
        }
        console.log(newPayment);

        axios.post('http://localhost:5000/api/payment/insert', newPayment)

            .then(res => {

                    console.log(res.status);
                    if(res.status === 200){
                        console.log("Success!");
                        Swal.fire(
                            'Payment Added Successfully!'
                        )

                    }

                    //this.props.register(newPayment);
                }

            ).catch((reason) => {
                    console.log(reason);
        });


    };


    render()
    {
        const {user} = this.props.auth;
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
                        <label htmlFor="FirstName">Name : </label>
                        <strong className="fetched_name">{user ? `${user.name}` : ''}</strong>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email : </label>
                        <strong className="fetched_email">{user ? `${user.email}` : ''}</strong>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Registered Date : </label>
                        <strong className="fetched_register_date">{user ? `${user.register_date.toString().substr(0,10)}` : ''}</strong>
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

                                    <div className="md-form mb-5">
                                        <label htmlFor="email">Email</label>
                                        <input type="text"
                                               className="form-control"
                                               name='email'
                                               id='email'
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
                                    <button type="reset" className="btn btn-dark" >Reset</button>
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
