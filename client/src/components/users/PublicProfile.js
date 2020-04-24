import React, {Component} from "react";
import {findUserByUsername} from "../../services/userService";
import {findUserCreatedRecipes} from "../../services/recipeService";
import CreatedRecipeList from "./CreatedRecipeList";

export default class PublicProfile extends Component {
    state = {
        user: {},
        recipes: []
    };

    componentDidMount() {
        findUserByUsername(this.props.username)
            .then(user => {
                this.setState({user: user});
                return findUserCreatedRecipes(user._id);
            })
            .then(recipes => this.setState({recipes: recipes}));
    }

    render() {
        return (
            <div className="jumbotron vh-100">
                {
                    this.state.user.first &&
                    <h1 className="display-4">{this.state.user.first} {this.state.user.last}</h1>
                }
                {
                    !this.state.user.first && !this.state.user.last &&
                    <h1 className="display-4">Invalid User</h1>
                }
                <p className="lead">{this.state.user.role}</p>
                <hr className="my-4"/>
                <p className="lead">Recipes</p>
                {
                    this.state.recipes.length > 0 &&
                    <CreatedRecipeList recipes={this.state.recipes}/>
                }
                {
                    this.state.recipes.length === 0 &&
                    <p>This user currently does not have recipes...</p>
                }
            </div>)
    };
}
