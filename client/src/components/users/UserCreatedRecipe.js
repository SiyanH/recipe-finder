import React from "react";
import { createRecipe } from "../../services/userService";
import "../../common/style.css";

export default class UserCreatedRecipe extends React.Component {
  state = {
    label: "",
    userProvidedIngredients: "",
    userProvidedInstructions: "",
  };
  //if username is already taken you have to get something else ***
  handleCreateRecipe = (recipe) =>
    createRecipe(recipe).then((newRecipe) =>
      this.props.history.push("./profile")
    );

  render() {
    return (
      <div>
        <h1>Create your own recipe!</h1>
        <input
          value={this.state.label}
          onChange={(e) =>
            this.setState({
              label: e.target.value,
            })
          }
          className={"form-control"}
          placeholder="Name your recipe"
        />
        <input
          value={this.state.userProvidedIngredients}
          onChange={(e) =>
            this.setState({
              userProvidedIngredients: e.target.value,
            })
          }
          className={"form-control"}
          placeholder="Ingredients"
        />
        <input
          value={this.state.userProvidedInstructions}
          onChange={(e) =>
            this.setState({
              userProvidedInstructions: e.target.value,
            })
          }
          className={"form-control"}
          placeholder="Instructions"
        />
        <button
          onClick={() => this.handleCreateRecipe(this.state)}
          className={"btn btn-primary btn-block"}
        >
          Create Recipe!
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
