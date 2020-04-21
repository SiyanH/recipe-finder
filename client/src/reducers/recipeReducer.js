import {FIND_RECIPES, FIND_RECIPE, RESET_RECIPES} from "../actions/recipeActions";

const initialState = {
    recipes: [],
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
                currentRecipeInfo: state.recipes[action.index]
            };
        case RESET_RECIPES:
            return initialState;
        default:
            return state;
    }
};

export default recipeReducer;
