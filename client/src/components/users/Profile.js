import React from "react";
import { profile } from "../../services/userService";
import { findProfile } from "../../actions/userActions";
import { connect } from "react-redux";
import "../../common/style.css";

class Profile extends React.Component {
  componentDidMount() {
    this.props.findProfile().then();
  }

  render() {
    return (
      <div className="container mt-4 mb-4">
        {this.props.profile.username && this.props.profile.role === "ADMIN" && (
          <h1 className="jumbotron">Admin Profile</h1>
        )}
        {this.props.profile.username && this.props.profile.role === "USER" && (
          <h1 className="jumbotron">User Profile</h1>
        )}
        {this.props.profile.username && (
          <p>
            User: {this.props.profile.first} , {this.props.profile.last}
          </p>
        )}
        {this.props.profile.username && (
          <p>Username: {this.props.profile.username}</p>
        )}
        {this.props.profile.username && (
          <button
            onClick={() => this.props.history.push("./update-profile")}
            className="btn btn-primary btn-block app-margin-block app-primary-button col-5"
          >
            Update Profile Information
          </button>
        )}
        <button
          onClick={() => this.props.history.push("./user-list")}
          className="btn btn-primary btn-block app-margin-block app-primary-button col-5"
        >
          User List
        </button>
        {this.props.profile.username && (
          <button
            onClick={() => this.props.history.push("./liked-recipes")}
            className="btn btn-primary btn-block app-margin-block app-primary-button col-5"
          >
            View Liked Recipes
          </button>
        )}
        {this.props.profile.username && (
          <button
            onClick={() => this.props.history.push("./create-recipe")}
            className="btn btn-primary btn-block app-margin-block app-primary-button col-5"
          >
            Create Your Own Recipe!
          </button>
        )}
        <button
          onClick={() => this.props.history.push("./")}
          className="btn btn-primary btn-block app-margin-block app-primary-button col-5"
        >
          Home
        </button>
        {this.props.profile.username && (
          <div>
            <p className="jumbotron"> Cooks I Follow! </p>
            <ul className="list-group">
              {this.props.profile.subscribedUsers.map((subscribedUser) => (
                <li className="list-group-item">{subscribedUser}</li>
              ))}
            </ul>
            <p className="jumbotron"> Cooks That Follow Me! </p>
            <ul className="list-group">
              {this.props.profile.followers.map((follower) => (
                <li className="list-group-item">{follower}</li>
              ))}
            </ul>
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
