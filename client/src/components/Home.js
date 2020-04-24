import React from "react";
import { profile } from "../services/userService";
import { logout } from "../services/userService";
import { Link } from "react-router-dom";
import { findProfile } from "../actions/userActions";
import { connect } from "react-redux";

class Home extends React.Component {
  state = {
    profile: {
      username: "",
      password: "",
      first: "",
      last: "",
      email: "",
      role: "",
    },
  };

  componentDidMount() {
    if (!this.props.profile.username) {
      this.props.findProfile().then((res) =>
        this.setState({
          profile: res.data,
        })
      );
    }
  }

  render() {
    return (
      <div className="container mt-4">
        {/*<h1>Home</h1>*/}
        {/*<br />*/}
        {/*<a href="/">Home</a>*/}
        {!this.props.profile.username && <Link to="/register">Register</Link>}

        {/*<a href="/profile">Profile</a>*/}
        {/*<br />*/}
        {this.props.profile.username && (
          <a href="/" onClick={logout}>
            Logout
          </a>
        )}
        <br />
        {!this.props.profile.username && <Link to="/login">Login</Link>}
      </div>
    );
  }
}

const stateToPropertyMapper = (state) => {
  return {
    profile: state.user.profile,
  };
};

const dispatchToPropertyMapper = (dispatch) => {
  return {
    findProfile: () =>
      profile().then((profile) => dispatch(findProfile(profile.data))),
  };
};

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(Home);
