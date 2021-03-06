import React from "react";
import { updateProfile } from "../../services/userService";
import "../../common/style.css";

export default class UpdateProfile extends React.Component {
  state = {
    username: "",
    password: "",
    first: "",
    last: "",
    role: "",
  };
  //if username is already taken you have to get something else ***
  handleupdate = (user) =>
    updateProfile(user).then((newUser) => this.props.history.push("./profile"));

  onRadioChange = (e) => {
    this.setState({
      role: e.target.value,
    });
  };

  render() {
    return (
      <div className="container mt-4 mb-4">
        <h1 className="display-6 app-header-font">Update Profile</h1>
        {/*<p>{JSON.stringify(this.state)}</p>*/}
        {/*<p>{this.state.last}</p>*/}
        <input
          value={this.state.username}
          onChange={(e) =>
            this.setState({
              username: e.target.value,
            })
          }
          className="form-control app-margin-block col-5"
          placeholder="username"
        />
        <input
          value={this.state.password}
          onChange={(e) =>
            this.setState({
              password: e.target.value,
            })
          }
          className="form-control app-margin-block col-5"
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
          className="form-control app-margin-block col-5"
          placeholder="first name"
        />
        <input
          value={this.state.last}
          onChange={(e) =>
            this.setState({
              last: e.target.value,
            })
          }
          className="form-control app-margin-block col-5"
          placeholder="last name"
        />

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
          onClick={() => this.handleupdate(this.state)}
          className="btn btn-block app-margin-block app-primary-button col-5"
        >
          Update Profile Information
        </button>
        <button
          onClick={() => this.props.history.push("./")}
          className="btn btn-block app-margin-block app-primary-button col-5"
        >
          Home
        </button>
      </div>
    );
  }
}
