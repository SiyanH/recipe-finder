import React from "react";
import { profile } from "../services/userService";
import { logout } from "../services/userService";

export default class Home extends React.Component {
  state = {
    profile: {
      username: "",
      password: "",
      first: "",
      last: "",
      email: "",
      roles: [],
    },
  };
  componentDidMount() {
    profile().then((res) =>
      this.setState({
        profile: res.data,
      })
    );
  }
  render() {
    return (
      <div className="container mt-4">
        {/*<h1>Home</h1>*/}
        {/*<br />*/}
        {/*<a href="/">Home</a>*/}
        {!this.state.profile.username && <a href="/register">Register</a>}

        {/*<a href="/profile">Profile</a>*/}
        {/*<br />*/}
        {this.state.profile.username && (
          <a href="/logout" onClick={logout}>
            Logout
          </a>
        )}
        <br />
        {!this.state.profile.username && <a href="/login">Login</a>}
      </div>
    );
  }
}
