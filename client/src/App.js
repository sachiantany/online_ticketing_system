import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from "./components/AppNavbar";

// import store from './store';
import {loadUser} from "./actions/authActions";

class App extends Component {
    // componentDidMount() {
    //     store.dispatch(loadUser());
    // }

    render() {
        return (
            <div>
                <AppNavbar/>
            </div>
        );
    }
}

export default App;