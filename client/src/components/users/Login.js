import React from "react";
import { login } from "../../services/userService";
import "../../common/style.css";

export default class Login extends React.Component {
  state = {
    user: {
      username: "",
      password: "",
    },
    error: false,
  };

  //if username is already taken you have to get something else ***
  handlelogin = async (user) => {
    try {
      this.setState({ error: false });
      await login(user);
      this.props.history.push("./profile");
    } catch (e) {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div>
        {/*<p>{JSON.stringify(this.state)}</p>*/}
        <div className="container mt-4 mb-4">
          <h1 className="display-6 app-header-font">Login</h1>
          {this.state.error && <p>Your password and username doesn't match</p>}
          <input
            value={this.state.user.username}
            onChange={(e) => {
              const user = this.state.user;
              user.username = e.target.value;
              this.setState({ user });
            }}
            className="form-control app-margin-block col-5"
            placeholder="username"
          />
          <input
            value={this.state.user.password}
            onChange={(e) => {
              const user = this.state.user;
              user.password = e.target.value;
              this.setState({ user });
            }}
            className="form-control app-margin-block col-5"
            type="password"
            placeholder="password"
          />

          <button
            onClick={() => this.handlelogin(this.state.user)}
            className="btn btn-block app-margin-block app-primary-button col-5"
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}
