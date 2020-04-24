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
            {this.props.profile.username && this.props.profile.role === "ADMIN"
            && (
            <div className="card">
                <div className="card-header">
                    <h1 className="display-5 text-center app-header-font">
                        Chef {this.props.profile.first} {this.props.profile.last}'s
                         Profile
                    </h1>
                    <h6 className="card-subtitle mb-2 app-text-font text-muted">
                        Username: {this.props.profile.username} </h6>
                    <h6 className="card-subtitle mb-2 app-text-font text-muted">
                        Role: Administrator</h6>
                </div>
            </div>
            )}

            {this.props.profile.username && this.props.profile.role === "USER"
            && (
                <div className="card">
                    <div className="card-header">
                        <h1 className="display-5 text-center app-header-font">
                            Chef {this.props.profile.first} {this.props.profile.last}'s
                            Profile
                        </h1>
                        <h6 className="card-subtitle mb-2 app-text-font text-muted">
                            Username: {this.props.profile.username} </h6>
                        <h6 className="card-subtitle mb-2 app-text-font text-muted">
                            Role: User</h6>
                    </div>
                </div>
            )}

        {/* PROFILE BUTTONS*/}
            {this.props.profile.username && (
              <button
                onClick={() => this.props.history.push("./update-profile")}
                className="btn btn-primary btn-block app-margin-block
                app-primary-button"
              >
                Update Profile Information
              </button>
            )}

            <button
              onClick={() => this.props.history.push("./user-list")}
              className="btn btn-primary btn-block app-margin-block
              app-primary-button"
            >
              User List
            </button>

            {this.props.profile.username && (
              <button
                onClick={() => this.props.history.push("./liked-recipes")}
                className="btn btn-primary btn-block app-margin-block
                app-primary-button"
              >
                View Liked Recipes
              </button>
            )}

            {this.props.profile.username && (
              <button
                onClick={() => this.props.history.push("./create-recipe")}
                className="btn btn-primary btn-block app-margin-block
                app-primary-button"
              >
                Create Your Own Recipe!
              </button>
            )}

            <button
              onClick={() => this.props.history.push("./")}
              className="btn btn-primary btn-block app-margin-block
              app-primary-button"
            >
              Home
            </button>

            {this.props.profile.username && (

              <div>
                <p className="jumbotron jumbtron-fluid"> Chefs Who Follow Me! </p>
                <p className="jumbotron"> Chefs That Follow Me! </p>

                <ul className="list-group">
                  {this.props.profile.followers.map((follower) => (
                    <li className="list-group-item">{follower}</li>
                  ))}
                </ul>{" "}
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
