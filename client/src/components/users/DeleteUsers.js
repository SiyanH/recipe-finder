import React from "react";
import { deleteUser } from "../../services/userService";

// COMPONENT NOT IN USE
export default class SubscribeToOthers extends React.Component {
  state = {
    deleteUserName: "",
  };
  //if username is already taken you have to get something else ***
  handleDeleteUser = (user) =>
    deleteUser(user).then((user) => this.props.history.push("./profile"));

  render() {
    return (
      <div>
        <h1>Type in UserName To Delete</h1>
        <p>{JSON.stringify(this.state)}</p>
        <input
          value={this.state.deleteUserName}
          onChange={(e) =>
            this.setState({
              deleteUserName: e.target.value,
            })
          }
          className={"form-control"}
          placeholder="username"
        />

        <button
          onClick={() => this.handleDeleteUser(this.state.deleteUserName)}
          className={"btn btn-primary btn-block"}
        >
          Confirm Delete
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
