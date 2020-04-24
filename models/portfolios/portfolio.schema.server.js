const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
                                            name: String,
                                            tags: [String],
                                            categories: [String],
                                            description: String,
                                            createdAt: Date,
                                            modifiedAt: Date,
                                            recipes: [{
                                                type: mongoose.Schema.Types.ObjectId,
                                                ref: 'RecipeModel'
                                            }],
                                            publisher: {
                                                type: mongoose.Schema.Types.ObjectId,
                                                ref: 'RecipeModel'
                                            },
                                        }, {collection: 'portfolios'});

module.exports = portfolioSchema;
