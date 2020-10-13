import React, {Component} from 'react';
import AdminNavbar from "../../components/AdminNavbar";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Timetable from './Timetable';
import BusRoute from './BusRoutes';
import AllBuses from './AllBuses';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class AdminDashboard extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };


    render() {
        const { isAuthenticated, user} = this.props.auth;

        return (

            <div>
                {
                    isAuthenticated ?

                        <Router>
                            <AdminNavbar/>

                            <Switch>
                                <Route exact path="/timetable" component={Timetable}/>
                                <Route exact path="/routes" component={BusRoute}/>
                                <Route exact path="/buses" component={AllBuses}/>
                            </Switch>

                        </Router>
                        :
                        <div>
                            <Redirect to="/"/>
                        </div>
                }
            </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AdminDashboard);