import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "../components/Home"
import Register from "../components/users/Register"
import Login from "../components/users/Login"
import Profile from "../components/users/Profile"



class LandingPageContainer extends Component {
    render() {
        return (
            //<Provider store={store}>
                <Router>

                    <Route
                        path="/"
                        exact={true}
                        component={Home}
                    />
                    <Route
                        path="/register"
                        exact={true}
                        component={Register}
                    />
                    <Route
                    path="/profile"
                    exact={true}
                    component={Profile}
                    />
                    <Route
                    path="/login"
                    exact={true}
                    component={Login}
                    />
                </Router>
            //</Provider>
        );
    }
}

export default LandingPageContainer;
