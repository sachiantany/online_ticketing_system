import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from "./components/AppNavbar";
import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from "./actions/authActions";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Home from "./pages/Home";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Myaccount from "./pages/MyAccount";
import Myjourney from "./pages/Myjourney";
import Paymenthistory from "./pages/Paymenthistory";



class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>

                    <Router>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/admin" component={AdminDashboard}/>
                        </Switch>
                    </Router>



                <div className="App">

                    <AppNavbar/>

                    <div className="container">

                        <Router>

                            <Switch>
                                <Route path='/my_profile' exact component={Myaccount} />
                                <Route path='/my_profile/my_journey' component={Myjourney} />
                                <Route path='/my_profile/payment_history' component={Paymenthistory} />

                            </Switch>

                        </Router>

                    </div>



                </div>

            </Provider>
        );
    }
}

export default App;