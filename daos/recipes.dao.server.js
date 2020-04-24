const recipeModel = require('../models/recipe/recipe.model.server');
const userModel = require('../models/user/user.model.server');

const createRecipe = (recipe) => {
    return recipeModel.create(recipe)
};

const findRecipeById = (rid) => {
    return recipeModel.findOne({_id: rid})
};

const findAllRecipes = () => {
    return recipeModel.find();
};

const findUserCreatedRecipes = (uid) => {
    return userModel.findOne({_id: uid}).populate('recipes')
        .then(user => user.recipes);
};

const updateRecipe = (rid, newRecipe) => {
    return recipeModel.update({_id: rid}, newRecipe)
};

const deleteRecipe = (rid) =>
    recipeModel.deleteOne({_id: rid})

module.exports = {
    createRecipe,
    findRecipeById,
    findAllRecipes,
    findUserCreatedRecipes,
    updateRecipe,
    deleteRecipe
};
