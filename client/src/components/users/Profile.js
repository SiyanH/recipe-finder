import React from "react";
import { profile, updateSubscribers } from "../../services/userService";
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
        <h1>Profile</h1>
        <p>
          User: {this.props.profile.first} , {this.props.profile.last}
        </p>
        <p>Username: {this.props.profile.username}</p>
        {/*<p>{JSON.stringify(this.props.profile)}</p>*/}
        <button
          onClick={() => this.props.history.push("./update-profile")}
          className="btn app-primary-button app-margin-block col-5"
        >
          Update Profile Information
        </button>
        <button
          onClick={() => this.props.history.push("./manage-users")}
          className="btn app-primary-button app-margin-block col-5"
        >
          Manage Users
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
        <p>{this.props.profile.subscribeToOthers}</p>
        <p>{this.props.profile.subscriptionsFromOthers}</p>
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
