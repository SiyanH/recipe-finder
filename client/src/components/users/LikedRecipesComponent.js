import React, { Component } from "react";
import { connect } from "react-redux";
import { profile } from "../../services/userService";
import { findProfile } from "../../actions/userActions";

// TODO: Add styles
class LikedRecipesComponent extends Component {
  render() {
    return (
      <div className="container-fluid">
        {this.props.recipes !== undefined && (
          <ul>
            {this.props.recipes.map((recipe) => (
              <li key={recipe}>
                <br />
                <a href={recipe}>{recipe}</a>
              </li>
            ))}
          </ul>
        )}
        {this.props.recipes === undefined && (
          <h2>403 - Forbidden (Please login)</h2>
        )}
      </div>
    );
  }
}

const stateToPropertyMapper = (state) => {
  return {
    recipes: state.user.profile.recipesFromApi,
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
)(LikedRecipesComponent);
