import React, {Component} from 'react';
import AppNavbar from "../components/AppNavbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import BusFair from "../components/BusFair";
import AdminDashboard from "./Admin/AdminDashboard";

class Home extends Component {
    render() {
        return (
            <div className="App">
                <AppNavbar />

                <Router>
                    <Switch>
                        <Route exact path="/" component={BusFair}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Home;