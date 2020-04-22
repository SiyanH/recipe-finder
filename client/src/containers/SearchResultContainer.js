import React, { Component } from "react";
import { connect } from "react-redux";
import RecipeComponent from "../components/RecipeComponent";
import RecipeListComponent from "../components/RecipeListComponent";
import { findRecipe, findRecipes } from "../actions/recipeActions";
import recipeService from "../services/recipeService";

class SearchResultContainer extends Component {
  state = {
    recipes: [],
    pageNum: 1,
    from: 0,
    to: 9,
  };

  //TODO: Fix redundant fetch when clicking a recipe
  componentDidMount() {
    this.findRecipes();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.pageNum !== this.state.pageNum) {
      this.setState((state) => ({
        from: (state.pageNum - 1) * 10,
        to: state.pageNum * 10,
      }));
    }
    if (
      prevProps.index !== this.props.index &&
      this.props.index !== undefined
    ) {
      this.props.findRecipe(this.props.index);
    }
    if (
      prevProps.query !== this.props.query &&
      this.props.query !== undefined
    ) {
      this.findRecipes();
    }
  }

  findRecipes = () => {
    this.props
      .findRecipes(this.props.query, this.state.from, this.state.to)
      .then(() => {
        this.setState({ recipes: this.props.recipes });
        if (this.props.index !== undefined) {
          this.props.findRecipe(this.props.index);
        }
      });
  };

  render() {
    return (
      <div className="row">
        <div className="col-lg-3">
          <RecipeListComponent
            query={this.props.query}
            index={this.props.index}
            recipes={this.state.recipes}
            from={this.state.from}
            to={this.state.to}
          />
        </div>
        <div className="col-lg-9">
          {this.props.recipe !== undefined && (
            <RecipeComponent recipe={this.props.recipe} />
          )}
        </div>
      </div>
    );
  }
}

const stateToPropertyMapper = (state) => {
  return {
    recipes: state.recipes,
    recipe: state.currentRecipeInfo.recipe,
  };
};

const dispatchToPropertyMapper = (dispatch) => {
  return {
    findRecipe: (index) => dispatch(findRecipe(index)),
    findRecipes: (query, from, to) =>
      recipeService
        .findRecipes(query, from, to)
        .then((recipes) => dispatch(findRecipes(recipes))),
  };
};

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(SearchResultContainer);
