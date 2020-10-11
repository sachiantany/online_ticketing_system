import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from "./components/AppNavbar";
import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from "./actions/authActions";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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

                <>
                    <Router>
                        <AppNavbar/>
                        <Navbar />

                        <Switch>


                            <Route path='/' exact component={Myaccount} />

                            <Route path='/my_journey' component={Myjourney} />

                            <Route path='/payment_history' component={Paymenthistory} />

                        </Switch>

                    </Router>

                </>
            </Provider>


        );
    }
}

export default App;