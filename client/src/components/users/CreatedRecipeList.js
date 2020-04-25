import React, {Component} from "react";
import {deleteRecipe} from "../../services/recipeService";

class CreatedRecipeList extends Component {
    state = {
        recipes: this.props.recipes
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.recipes.length !== this.props.recipes.length) {
            this.setState({
                              recipes: this.props.recipes
                          });
        }
    }

    delete = (recipeId) => {
        deleteRecipe(recipeId)
            .then(() => this.setState(state => ({
                      recipes: state.recipes.filter(recipe => recipe._id !== recipeId)
                  }))
            );
    };

    render() {
        return (
            <div className="card-columns">
                {
                    this.state.recipes.map(
                        (recipe, index) =>
                            <div key={index} className="card bg-light mb-3">
                                <div
                                    className="card-header">{recipe.label}</div>
                                <div className="card-body">
                                    <h5 className="card-title">Ingredients</h5>
                                    <p>{recipe.userProvidedIngredients}</p>
                                    <h5 className="card-title">Instructions</h5>
                                    <p>{recipe.userProvidedInstructions}</p>
                                    {
                                        this.props.userId &&
                                        <button className="btn btn-sm app-primary-button"
                                                onClick={() => this.delete(recipe._id)}>Delete
                                        </button>
                                    }
                                </div>
                            </div>)
                }
            </div>)
    }
}

export default CreatedRecipeList;
