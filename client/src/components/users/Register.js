import React from "react";
import { register } from "../../services/userService";
import "../../common/style.css";

export default class Register extends React.Component {
  state = {
    username: "",
    password: "",
    first: "",
    last: "",
    role: "",
  };
  //if username is already taken you have to get something else ***
  handleregister = (user) =>
    register(user)
      .then((newUser) => {
        console.log(newUser);
        this.props.history.push("./profile");
      })
      .catch((err) => {
        console.log("Register:error");
      });

  onRadioChange = (e) => {
    this.setState({
      role: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <input
          value={this.state.username}
          onChange={(e) =>
            this.setState({
              username: e.target.value,
            })
          }
          className={"form-control"}
          placeholder="username"
        />
        <input
          value={this.state.password}
          onChange={(e) =>
            this.setState({
              password: e.target.value,
            })
          }
          className={"form-control"}
          type={"password"}
          placeholder="password"
        />
        <input
          value={this.state.first}
          onChange={(e) =>
            this.setState({
              first: e.target.value,
            })
          }
          className={"form-control"}
          placeholder="first name"
        />
        <input
          value={this.state.last}
          onChange={(e) =>
            this.setState({
              last: e.target.value,
            })
          }
          className={"form-control"}
          placeholder="last name"
        />
        {/*<input*/}
        {/*value={this.state.role}*/}
        {/*onChange={(e) =>*/}
        {/*this.setState({*/}
        {/*role: e.target.value,*/}
        {/*})*/}
        {/*}*/}
        {/*className={"form-control"}*/}
        {/*placeholder="last name"*/}
        {/*/>*/}

        <input
          type="radio"
          name="role"
          value="USER"
          onChange={this.onRadioChange}
        />
        <span>USER</span>
        <input
          type="radio"
          name="role"
          value="ADMIN"
          onChange={this.onRadioChange}
        />
        <span>ADMIN</span>
        <button
          onClick={() => this.handleregister(this.state)}
          className={"btn btn-primary btn-block"}
        >
          Register
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
