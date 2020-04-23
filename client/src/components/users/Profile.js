import React from "react";
import { profile, updateSubscribers } from "../../services/userService";

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
        <button
          onClick={() => this.props.history.push("./view-all-users")}
          className={"btn btn-primary btn-block"}
        >
          View All Users
        </button>
        <button
          onClick={() => this.props.history.push("./delete-user")}
          className={"btn btn-primary btn-block"}
        >
          Delete User
        </button>
        <button
          onClick={() => this.props.history.push("./subscribe-to-others")}
          className={"btn btn-primary btn-block"}
        >
          Subscribe to Other Users
        </button>
        <button
          onClick={() => this.props.history.push("./")}
          className={"btn btn-primary btn-block"}
        >
          Home
        </button>
        <p>{this.state.profile.subscribeToOthers}</p>
        <p>{this.state.profile.subscriptionsFromOthers}</p>
      </div>
    );
  }
}
