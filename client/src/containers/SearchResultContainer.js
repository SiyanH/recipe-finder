import React, {Component} from 'react';
import {connect} from "react-redux";
import RecipeComponent from "../components/RecipeComponent";
import RecipeListComponent from "../components/RecipeListComponent";
import {findRecipe, findRecipeList, findRecipes} from "../actions/recipeActions";
import recipeService from "../services/recipeService";
import PaginationComponent from "../components/PaginationComponent";

class SearchResultContainer extends Component {
    constructor(props) {
        super(props);
        let pageInfo = this.getPageInfo(Number(this.props.index));
        this.state = {
            pageNum: pageInfo[0],
            from: pageInfo[1],
            to: pageInfo[2]
        };
    }

    componentDidMount() {
        this.findRecipes();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.pageNum !== this.state.pageNum) {
            this.props.history.push(`${(this.state.pageNum - 1) * 10}`);
        }
        if (prevProps.index !== this.props.index && this.props.index !== undefined) {
            if (Number(this.props.index) % 10 !== 0) {
                this.props.findRecipe(Number(this.props.index) % 10);
            } else {
                this.props.findRecipeList(this.state.from, this.state.to);
                this.props.findRecipe(this.state.from % 10);
            }
        }
        if (prevProps.query !== this.props.query && this.props.query !== undefined) {
            this.findRecipes();
        }
    }

    findRecipes = () => {
        this.props.findRecipes(this.props.query)
            .then(() => {
                if (this.props.index !== undefined) {
                    this.props.findRecipeList(this.state.from, this.state.to);
                    if (this.props.index < this.props.recipes.length) {
                        this.props.findRecipe(Number(this.props.index % 10));
                    }
                }
            })
    };

    setPageNum = (newPageNum) => {
        if (newPageNum > 0) {
            this.setState(
                {
                    pageNum: newPageNum,
                    from: (newPageNum - 1) * 10,
                    to: newPageNum * 10
                });
        }
    };

    getPageInfo = (recipeIndex) => {
        let page = Math.trunc(recipeIndex / 10) + 1;
        let from = (page - 1) * 10;
        let to = page * 10;
        return [page, from, to];
    };

    render() {
        if (Number(this.props.index) < this.props.recipes.length) {
            return (
                <div className="row">
                    <div className="col-lg-3">
                        {
                            this.props.recipes.length > 0 &&
                            <RecipeListComponent query={this.props.query}
                                                 index={this.props.index}
                                                 recipes={this.props.recipeList}
                                                 pageNum={this.state.pageNum}
                                                 from={this.state.from}
                                                 to={this.state.to}
                                                 setPageNum={this.setPageNum}/>
                        }
                        <PaginationComponent currentPage={this.state.pageNum}
                                             setPageNum={this.setPageNum}
                                             maxPage={Math.ceil(
                                                 this.props.recipes.length / 10)}/>
                    </div>
                    <div className="col-lg-9">
                        {
                            this.props.recipe !== undefined &&
                            <RecipeComponent recipe={this.props.recipe}/>
                        }
                    </div>
                </div>
            )
        }
        if (this.props.recipes.length === 0) {
            return (<div className="text-center">Something amazing is on the way...</div>)
        }
        return (<div className="text-center">Oops...Nothing found :(</div>)
    }
}

const stateToPropertyMapper = (state) => {
    return {
        recipes: state.recipe.recipes,
        recipe: state.recipe.currentRecipeInfo.recipe,
        recipeList: state.recipe.recipeList
    }
};

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findRecipe: index => dispatch(findRecipe(index)),
        findRecipes: (query) =>
            recipeService.findRecipes(query)
                .then(recipes => dispatch(findRecipes(recipes))),
        findRecipeList: (from, to) => dispatch(findRecipeList(from, to))
    }
};

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(SearchResultContainer);
