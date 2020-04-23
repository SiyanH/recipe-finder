import React from "react";
import { logout, profile, updateSubscribers } from "../../services/userService";
import { findProfile } from "../../actions/userActions";
import { connect } from "react-redux";
import "../../common/style.css";

class Profile extends React.Component {
  componentDidMount() {
    this.props.findProfile().then();
  }

  render() {
    return (
      <div>
        {this.props.profile.username && this.props.profile.role === "ADMIN" && (
          <h1 class="jumbotron">Admin Profile</h1>
        )}
        {this.props.profile.username && this.props.profile.role === "USER" && (
          <h1 class="jumbotron">User Profile</h1>
        )}

        {this.props.profile.username && (
          <p>
            User: {this.props.profile.first} , {this.props.profile.last}
          </p>
        )}

        {this.props.profile.username && (
          <p>Username: {this.props.profile.username}</p>
        )}

        <button
          onClick={() => this.props.history.push("./update-profile")}
          className="btn app-primary-button app-margin-block col-5"
        >
          Update Profile Information
        </button>

        {this.props.profile.role === "ADMIN" && (
          <button
            onClick={() => this.props.history.push("./manage-users")}
            className="btn app-primary-button app-margin-block col-5"
          >
            Manage Users
          </button>
        )}

        {this.props.profile.role === "ADMIN" && (
          <button
            onClick={() => this.props.history.push("./delete-user")}
            className="btn app-primary-button app-margin-block col-5"
          >
            Delete User
          </button>
        )}

        <button
          onClick={() => this.props.history.push("./subscribe-to-others")}
          className="btn app-primary-button app-margin-block col-5"
        >
          Subscribe to Other Users
        </button>

        <button
          onClick={() => this.props.history.push("./liked-recipes")}
          className="btn app-primary-button app-margin-block col-5"
        >
          View Liked Recipes
        </button>
        <button
          onClick={() => this.props.history.push("./")}
          className="btn app-primary-button app-margin-block col-5"
        >
          Home
        </button>

        {this.props.profile.username && (
          <div>
            <p className="jumbotron"> Cooks I Follow! </p>
            <p>{this.props.profile.subscribeToOthers}</p>
            <p className="jumbotron"> Cooks That Follow Me! </p>
            <p>{this.props.profile.subscriptionsFromOthers}</p>
          </div>
        )}
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

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(Profile);
