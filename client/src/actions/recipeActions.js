export const FIND_RECIPES = "FIND_RECIPES";
export const FIND_RECIPE = "FIND_RECIPE";
export const RESET_RECIPES = "RESET_RECIPES";

export const findRecipes = (recipes) => ({
    type: FIND_RECIPES,
    recipes: recipes
});

export const findRecipe = (index) => ({
    type: FIND_RECIPE,
    index: index
});

export const resetRecipes = () => ({
    type: RESET_RECIPES
});
