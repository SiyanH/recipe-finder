import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './RecipeListComponent.css';

class RecipeListComponent extends Component {
    state = {
        currentRecipe: Number(this.props.index) % 10
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.index !== this.props.index) {
            this.setState({currentRecipe: Number(this.props.index) % 10})
        }
    }

    setRecipe = (index) => {
        this.setState({currentRecipe: index})
    };

    render() {
        return (
            <div className="list-group app-recipe-list">
                {
                    this.props.recipes
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
