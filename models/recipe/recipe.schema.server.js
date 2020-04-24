const mongoose = require('mongoose');
const arrayUniquePlugin = require('mongoose-unique-array');

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
                                             ref: 'CommentModel',
                                             unique: true
                                         }],
                                         likes: [{
                                             type: mongoose.Schema.Types.ObjectId,
                                             ref: 'UserModel',
                                             unique: true
                                         }]
                                     }, {collection: 'recipes'});

recipeSchema.plugin(arrayUniquePlugin);

module.exports = recipeSchema;
