import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './RecipeListComponent.css';

//TODO: Add pagination (10 recipes per page)
//TODO: Highlight selected recipe
class RecipeListComponent extends Component {
    state = {
        currentRecipe: Number(this.props.index)
    };

    setRecipe = (index) => {
        this.setState({currentRecipe: index})
    };

    render() {
        return (
            <div className="list-group app-recipe-list">
                {
                    this.props.recipes.slice(this.props.from, this.props.to)
                        .map((recipeInfo, index) =>
                                 <Link key={index}
                                       to={`/recipes/${this.props.query}/${this.props.from
                                                                           + index}`}
                                       className={`list-group-item list-group-item-action
                                       ${index === this.state.currentRecipe ? "active" : ""}`}
                                       onClick={() => this.setRecipe(index)}>
                                     {recipeInfo.recipe.label}</Link>)
                }
            </div>
        )
    }
}

export default RecipeListComponent;
