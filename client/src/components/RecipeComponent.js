import React from "react";
import "./RecipeComponent.css";
import { addrecipetouser } from "../services/userService";

//TODO: Add more recipe details
class RecipeComponent extends React.Component {
  state = {
    isAdded: false,
  };

  handleaddrecipe = (recipe) =>
    addrecipetouser(recipe).then(() => this.setState({ isAdded: true }));

  // componentDidMount() {
  //   this.setState({ isAdded: false });
  // }
  //
  // componentWillUnmount() {
  //   this.setState({ isAdded: false });
  // }

  render() {
    const recipe = this.props.recipe;
    const { isAdded } = this.state;
    return (
      <div className="card">
        <h5 className="card-header">{recipe.label}</h5>
        {/*<p>{JSON.stringify(recipe)}</p>*/}
        <div className="card-body">
          <img
            className="float-md-left d-none d-md-block"
            id="recipe-img"
            alt={recipe.label}
            src={recipe.image}
          />
          <img
            className="float-md-left d-md-none mx-auto d-block"
            id="recipe-img"
            alt={recipe.label}
            src={recipe.image}
          />
          <h5 className="card-title">Ingredients</h5>
          <ul>
            {recipe.ingredientLines.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <div className="app-clear-left">
            <h5 className="card-title">Instructions</h5>
            <p>
              See full recipe on{" "}
              <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                {recipe.source}
              </a>
            </p>
          </div>
          <button
            key={recipe.url}
            onClick={() => this.handleaddrecipe(recipe)}
            className={"btn btn-primary btn-block"}
            // disabled={this.state.isAdded}
          >
            {isAdded ? "Recipe Added" : "Add to my account"}
          </button>
        </div>
      </div>
    );
  }
}

export default RecipeComponent;
