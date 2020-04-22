const mongoose = require('mongoose')
const recipeSchema = require('./recipes.schema.server')
const recipeModel = mongoose.model(
    'RecipeModel',
    recipeSchema
)
module.exports = recipeModel