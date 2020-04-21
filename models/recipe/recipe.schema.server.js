const mongoose = require('mongoose')
const recipeSchema = mongoose.Schema({
                                         label: String,
                                         image: String,
                                         source: String,
                                         url: String,
                                         ingredientLines: [String],
                                         createdAt: Date,
                                         modifiedAt: Date,
                                         comments: [{
                                             type: mongoose.Schema.Types.ObjectId,
                                             ref: 'CommentModel'
                                         }],
                                         likes: [{
                                             type: mongoose.Schema.Types.ObjectId,
                                             ref: 'UserModel'
                                         }]
                                     }, {collection: 'recipes'})

module.exports = recipeSchema
