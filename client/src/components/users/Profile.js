import React from "react";
import { profile, updateSubscribers } from "../../services/userService";
import "../../common/style.css";

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
    return (
      <div>
        <h1>Profile</h1>
        <p>User FirstName: {this.state.profile.first}</p>
        <p>User LastName{this.state.profile.last}</p>
        {/*<p>{JSON.stringify(this.state.profile)}</p>*/}

        <button
          onClick={() => this.props.history.push("./update-profile")}
          className="btn app-primary-button app-margin-block col-5"
        >
          Update Profile Information
        </button>
        <button
          onClick={() => this.props.history.push("./view-all-users")}
          className="btn app-primary-button app-margin-block col-5"
        >
          View All Users
        </button>
        <button
          onClick={() => this.props.history.push("./delete-user")}
          className="btn app-primary-button app-margin-block col-5"
        >
          Delete User
        </button>
        <button
          onClick={() => this.props.history.push("./subscribe-to-others")}
          className="btn app-primary-button app-margin-block col-5"
        >
          Subscribe to Other Users
        </button>
        <button
          onClick={() => this.props.history.push("./")}
          className="btn app-primary-button app-margin-block col-5"
        >
          Home
        </button>
        <h5>Cooks I follow!</h5>
        <p>{this.state.profile.subscribeToOthers}</p>
        <h5>Cooks that follow me!</h5>
        <p>{this.state.profile.subscriptionsFromOthers}</p>
      </div>
    );
  }
}
