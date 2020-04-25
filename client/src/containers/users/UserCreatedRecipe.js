import React from "react";
import {createRecipe} from "../../services/userService";
import {findUserCreatedRecipes} from "../../services/recipeService";
import {connect} from "react-redux";
import CreatedRecipeList from "../../components/users/CreatedRecipeList";

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
                <h1 className='display-6 app-header-font'>Create your own recipe!</h1>
                <input
                    value={this.state.recipe.label}
                    onChange={e => this.setRecipeLabel(e.target.value)}
                    className="form-control app-margin-block"
                    placeholder="Name your recipe"
                />
                <input
                    value={this.state.recipe.userProvidedIngredients}
                    onChange={e => this.setIngredients(e.target.value)}
                    className="form-control app-margin-block"
                    placeholder="Ingredients"
                />
                <input
                    value={this.state.recipe.userProvidedInstructions}
                    onChange={e => this.setInstructions(e.target.value)}
                    className="form-control app-margin-block"
                    placeholder="Instructions"
                />
                <button
                    onClick={this.handleCreateRecipe}
                    className="btn btn-primary btn-block app-margin-block app-primary-button"
                >
                    Create Recipe!
                </button>

                <button
                    onClick={() => this.props.history.push("./")}
                    className="btn btn-primary btn-block app-margin-block app-primary-button"
                >
                    Home
                </button>
                <br/>
                <CreatedRecipeList
                    userId={this.props.userId}
                    recipes={this.state.recipes}/>
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
