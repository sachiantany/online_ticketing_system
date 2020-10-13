import React from 'react';

import './App.css';

import Navbar from './components/Navbar';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Myjourney from './pages/Myjourney';

import Paymenthistory from './pages/Paymenthistory';

import Myaccount from './pages/MyAccount';




function MyProfile() {

    return (

        <>

            <Router>

                <Navbar />

                <Switch>


                    <Route path='/my_profile' exact component={Myaccount} />

                    <Route path='/my_profile/my_journey' component={Myjourney} />

                    <Route path='/my_profile/payment_history' component={Paymenthistory} />

                </Switch>

            </Router>

        </>

    );

}



export default MyProfile;