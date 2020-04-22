import {
    FIND_RECIPES,
    FIND_RECIPE,
    RESET_RECIPES,
    FIND_RECIPE_LIST
} from "../actions/recipeActions";

const initialState = {
    recipes: [],
    recipeList: [],
    currentRecipeInfo: {}
};

const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_RECIPES:
            return {
                ...state,
                recipes: action.recipes
            };
        case FIND_RECIPE:
            return {
                ...state,
                currentRecipeInfo: state.recipeList[action.index]
            };
        case FIND_RECIPE_LIST:
            return {
                ...state,
                recipeList: state.recipes.slice(action.from, action.to)
            };
        case RESET_RECIPES:
            return initialState;
        default:
            return state;
    }
};

export default recipeReducer;
