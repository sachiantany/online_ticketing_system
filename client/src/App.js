import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from "./actions/authActions";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Home from "./pages/Home";

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


            </Provider>
        );
    }
}

export default App;