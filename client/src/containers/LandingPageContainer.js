import React, { Component } from "react";
import recipeReducer from "../reducers/recipeReducer";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import RecipeFinderComponent from "../components/RecipeFinderComponent";
import Register from "../components/users/Register";
import Login from "../components/users/Login";
import Profile from "../components/users/Profile";
import UpdateProfile from "../components/users/UpdateProfile";
import PrivacyPolicy from "../components/PrivacyPolicy";
import UserListComponent from "../components/users/UserListComponent";
import LikedRecipesComponent from "../components/users/LikedRecipesComponent";
import UserCreatedRecipe from "./users/UserCreatedRecipe";
import userReducer from "../reducers/userReducer";
import PublicProfile from "../components/users/PublicProfile";

const reducer = combineReducers({ user: userReducer, recipe: recipeReducer });
const store = createStore(reducer);

class LandingPageContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <NavbarComponent />
          <Switch>
            <Redirect exact from="/recipes/:query" to="/recipes/:query/0" />
            <Route
              path={["/", "/recipes/:query/:index"]}
              exact={true}
              render={(props) => (
                <RecipeFinderComponent
                  history={props.history}
                  query={props.match.params.query}
                  index={props.match.params.index}
                />
              )}
            />
          </Switch>

          <Route
            path="/privacy-policy"
            exact={true}
            component={PrivacyPolicy}
          />

          {/*<Route path="/register" exact={true} component={Register} />*/}
          {/*<Route path="/profile" exact={true} component={Profile} />*/}
          {/*<Route*/}
          {/*path="/subscriptions"*/}
          {/*exact={true}*/}
          {/*component={SubscriptionInformation}*/}
          {/*/>*/}

          <Route path="/register" exact={true} component={Register} />
          <Route path="/profile" exact={true} component={Profile} />

          <Route path="/login" exact={true} component={Login} />
          <Route
            path="/update-profile"
            exact={true}
            component={UpdateProfile}
          />
          <Route path="/user-list" exact={true} component={UserListComponent} />

          <Route
            path="/liked-recipes"
            exact={true}
            component={LikedRecipesComponent}
          />
          <Route
            path="/create-recipe"
            exact={true}
            component={UserCreatedRecipe}
          />
          <Route
            path="/profile/:username"
            exact={true}
            render={(props) => (
              <PublicProfile username={props.match.params.username} />
            )}
          />
        </Router>
      </Provider>
    );
  }
}

export default LandingPageContainer;
