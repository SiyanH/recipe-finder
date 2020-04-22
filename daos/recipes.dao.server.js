const recipeModel = require('../models/recipe/recipe.model.server')

const createRecipe = (recipe) => {
    return recipeModel.create(recipe)
}

const findRecipeById = (rid) => {
    return recipeModel.findOne({_id: rid})
}

const updateRecipe = (rid, newRecipe) => {
    return recipeModel.update({_id: rid}, newRecipe)
}

const deleteRecipe = (rid) =>
    recipeModel.deleteOne({_id: rid})

module.exports = {
    createRecipe,
    findRecipeById,
    updateRecipe,
    deleteRecipe
}

