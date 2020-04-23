const mongoose = require('mongoose')
const recipeSchema = mongoose.Schema({
                                       label: String,
                                       image: String,
                                       source: String,
                                       url: String,
                                       ingredientLines: [String],
                                       createdAt: Date,
                                       modifiedAt: Date
                                   }, {collection: 'recipes'})

module.exports = recipeSchema