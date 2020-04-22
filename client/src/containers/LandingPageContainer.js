import React, {Component} from 'react';
import recipeReducer from "../reducers/recipeReducer";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import RecipeFinderComponent from "../components/RecipeFinderComponent";
import Home from "../components/Home"
import Register from "../components/users/Register"
import Login from "../components/users/Login"
import Profile from "../components/users/Profile"
import UpdateProfile from "../components/users/UpdateProfile";

const store = createStore(recipeReducer);

class LandingPageContainer extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Redirect exact from='/recipes/:query' to='/recipes/:query/0'/>
                        <Route
                            path={["/", "/recipes/:query/:index"]}
                            exact={true}
                            render={props =>
                                <RecipeFinderComponent history={props.history}
                                                       query={props.match.params.query}
                                                       index={props.match.params.index}/>
                            }/>
                    </Switch>

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
                    <Route
                        path="/update-profile"
                        exact={true}
                        component={UpdateProfile}
                    />
                </Router>
            </Provider>
        );
    }
}

export default LandingPageContainer;