import React from "react";
import { profile, updateSubscribers } from "../../services/userService";
import RecipeFinderComponent from "../../containers/LandingPageContainer";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

export default class Profile extends React.Component {
  state = {
    profile: {
      username: "",
      password: "",
      first: "",
      last: "",
      email: "",
      roles: [],
      profileInput: "",
    },
  };

  componentDidMount() {
    profile().then((res) =>
      this.setState({
        profile: res.data,
      })
    );
  }
  handleSubscribers = (user) =>
    updateSubscribers(user).then(console.log({ user }));

  render() {
    const urlTest = "hello there";
    return (
      <div>
        <h1>Profile</h1>
        console.log({urlTest});
        <p>{this.state.profile.first}</p>
        <p>{this.state.profile.last}</p>
        <p>{JSON.stringify(this.state.profile)}</p>
        <button
          onClick={() => this.props.history.push("./update-profile")}
          className={"btn btn-primary btn-block"}
        >
          Update Profile Information
        </button>
        <input
          value={this.state.profile.profileUrl}
          onChange={(e) =>
            this.setState({
              profileUrl: e.target.value,
            })
          }
          className={"form-control"}
          placeholder="url"
        />
        <button
          onClick={() => this.handleSubscribers(this.state.profile)}
          className={"btn btn-primary btn-block"}
        >
          Subscribe
        </button>
        <button
          onClick={() => this.props.history.push("./")}
          className={"btn btn-primary btn-block"}
        >
          Home
        </button>
      </div>
    );
  }
}
