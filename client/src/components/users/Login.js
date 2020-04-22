import React from "react";
import { login } from "../../services/userService";

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
      console.log({ user });
      this.props.history.push("./profile");
    } catch (e) {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <p>{JSON.stringify(this.state)}</p>
        {this.state.error && <p>You're password and username doesn't match</p>}
        <input
          value={this.state.user.username}
          onChange={(e) => {
            const user = this.state.user;
            user.username = e.target.value;
            this.setState({ user });
          }}
          className={"form-control"}
          placeholder="username"
        />
        <input
          value={this.state.user.password}
          onChange={(e) => {
            const user = this.state.user;
            user.password = e.target.value;
            this.setState({ user });
          }}
          className={"form-control"}
          type={"password"}
          placeholder="password"
        />

        <button
          onClick={() => this.handlelogin(this.state.user)}
          className={"btn btn-primary btn-block"}
        >
          Login
        </button>
      </div>
    );
  }
}
