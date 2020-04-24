import React from "react";
import {createRecipe} from "../../services/userService";
import {findUserCreatedRecipes} from "../../services/recipeService";
import {connect} from "react-redux";

class UserCreatedRecipe extends React.Component {
    state = {
        recipes: [],
        recipe: {
            label: "",
            userProvidedIngredients: "",
            userProvidedInstructions: ""
        }
    };

    componentDidMount() {
       this.findRecipes();
    }

    findRecipes = () => {
        findUserCreatedRecipes(this.props.userId)
            .then(recipes => this.setState({
                                               recipes: recipes
                                           }));
    };

    handleCreateRecipe = () =>
        createRecipe(this.state.recipe)
            .then(() => this.findRecipes());

    setRecipeLabel = (label) => {
        this.setState(state =>
                          ({
                              recipe: {
                                  ...state.recipe,
                                  label: label
                              }
                          }));
    };

    setIngredients = (ingredients) => {
        this.setState(state =>
                          ({
                              recipe: {
                                  ...state.recipe,
                                  userProvidedIngredients: ingredients
                              }
                          }));
    };

    setInstructions = (instructions) => {
        this.setState(state =>
                          ({
                              recipe: {
                                  ...state.recipe,
                                  userProvidedInstructions: instructions
                              }
                          }));
    };

    render() {
        return (
            <div className="container">
                <h1>Create your own recipe!</h1>
                <input
                    value={this.state.recipe.label}
                    onChange={e => this.setRecipeLabel(e.target.value)}
                    className={"form-control"}
                    placeholder="Name your recipe"
                />
                <input
                    value={this.state.recipe.userProvidedIngredients}
                    onChange={e => this.setIngredients(e.target.value)}
                    className={"form-control"}
                    placeholder="Ingredients"
                />
                <input
                    value={this.state.recipe.userProvidedInstructions}
                    onChange={e => this.setInstructions(e.target.value)}
                    className={"form-control"}
                    placeholder="Instructions"
                />
                <button
                    onClick={this.handleCreateRecipe}
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
                <br/>
                <div className="card-columns">
                    {
                        this.state.recipes.map(
                            recipe =>
                                <div key={recipe._id} className="card bg-light mb-3">
                                    <div className="card-header">{recipe.label}{recipe._id}</div>
                                    <div className="card-body">
                                        <h5 className="card-title">Ingredients</h5>
                                        <p>{recipe.userProvidedIngredients}</p>
                                        <h5 className="card-title">Instructions</h5>
                                        <p>{recipe.userProvidedInstructions}</p>
                                    </div>
                                </div>)
                    }
                </div>
            </div>
        );
    }
}

const stateToPropertyMapper = (state) => {
    return {
        userId: state.user.profile._id,
    };
};

export default connect(stateToPropertyMapper)(UserCreatedRecipe);
