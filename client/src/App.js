import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from "./components/AppNavbar";
import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from "./actions/authActions";
import BusFair from "./components/BusFair";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Test from "./components/Test";

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <AppNavbar/>
                    <div className="container">
                        <Router>
                            <Switch>
                                <Route path="/" component={BusFair}/>
                            </Switch>
                        </Router>
                    </div>

                </div>
            </Provider>
        );
    }
}

export default App;