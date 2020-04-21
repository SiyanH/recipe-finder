const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
                                       username: String,
                                       password: String,
                                       first: String,
                                       last: String,
                                       role: {
                                           type: String,
                                           enum: ['READER', 'ADMIN', 'Publisher']
                                       },
                                       recipes: [{
                                           type: mongoose.Schema.Types.ObjectId,
                                           ref: 'RecipeModel'
                                       }],
                                       portfolios: [{
                                           type: mongoose.Schema.Types.ObjectId,
                                           ref: 'portfolioModel'
                                       }],
                                       subscribers: [{
                                           type: mongoose.Schema.Types.ObjectId,
                                           ref: 'UserModel'
                                       }],
                                       subscribedUser: [{
                                           type: mongoose.Schema.Types.ObjectId,
                                           ref: 'UserModel'
                                       }],
                                       likedRecipe: [{
                                           type: mongoose.Schema.Types.ObjectId,
                                           ref: 'RecipeModel'
                                       }]
                                   }, {collection: 'users'})

module.exports = userSchema
