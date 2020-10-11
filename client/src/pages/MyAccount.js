import React from 'react';
import '../components/MyAccount.css';


function MyAccount() {

    return (

        <div className='container'>

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
            <form className="add_cash_form_new">
                <div className="modal" id="modalLoginForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                     aria-hidden="true" >
                    <div className="modal-dialog" role="document"  >
                        <div className="modal-content ">
                            <div className="modal-header text-center">
                                <h4 className="modal-title w-100 font-weight-bold">Add Cash</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body mx-3">
                                <div className="md-form mb-5">
                                    <label htmlFor="cardName">Name on the Card</label>
                                    <input type="text" className="form-control" id="cardName"
                                           placeholder="Name"/>
                                </div>

                                <div className="md-form mb-4">
                                    <label htmlFor="cardNumber">Card Number</label>
                                    <input type="number" className="form-control" id="cardNumber"
                                           placeholder="Card Number"/>
                                </div>

                                <div className="md-form mb-4">
                                    <label htmlFor="expiry">Expiration Date</label>
                                    <input type="Month" className="form-control" id="expiry"/>
                                </div>

                                <div className="md-form mb-4">
                                    <label htmlFor="CCV">CCV</label>
                                    <input type="text" className="form-control" id="ccv"/>
                                </div>

                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button type="button" className="btn btn-dark">Add Cash</button>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>

    );

}



export default MyAccount;