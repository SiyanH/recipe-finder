import React from "react";
import "./RecipeComponent.css";
import {addRecipeToUser} from "../services/userService";

//TODO: Add more recipe details
class RecipeComponent extends React.Component {
    state = {
        isAdded: false,
    };

    addRecipe = (recipe) => {
        addRecipeToUser(recipe)
            .then(() => this.setState({isAdded: true}))
            .catch(() => alert("Please login to add recipes"));
    };

    render() {
        return (
            <div className="card">
                <h5 className="card-header">{this.props.recipe.label}</h5>
                <div className="card-body">
                    <img
                        className="float-md-left d-none d-md-block"
                        id="recipe-img"
                        alt={this.props.recipe.label}
                        src={this.props.recipe.image}
                    />
                    <img
                        className="float-md-left d-md-none mx-auto d-block"
                        id="recipe-img"
                        alt={this.props.recipe.label}
                        src={this.props.recipe.image}
                    />
                    <h5 className="card-title">Ingredients</h5>
                    <ul>
                        {this.props.recipe.ingredientLines.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <div className="app-clear-left">
                        <h5 className="card-title">Instructions</h5>
                        <p>
                            See full recipe on{" "}
                            <a href={this.props.recipe.url} target="_blank"
                               rel="noopener noreferrer">
                                {this.props.recipe.source}
                            </a>
                        </p>
                    </div>
                    <button
                        key={this.props.recipe.url}
                        onClick={() => this.addRecipe(this.props.recipe)}
                        className={`btn btn-primary btn-block ${this.state.isAdded ? 'disabled'
                                                                                   : ''}`}>
                        {this.state.isAdded ? "Recipe Added" : "Add to my account"}
                    </button>
                </div>
            </div>
        );
    }
}

export default RecipeComponent;
