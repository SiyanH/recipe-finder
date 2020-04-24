const mongoose = require('mongoose');
const arrayUniquePlugin = require('mongoose-unique-array');

const portfolioSchema = mongoose.Schema({
                                            name: String,
                                            tags: [String],
                                            categories: [String],
                                            description: String,
                                            createdAt: Date,
                                            modifiedAt: Date,
                                            recipes: [{
                                                type: mongoose.Schema.Types.ObjectId,
                                                ref: 'RecipeModel',
                                                unique: true
                                            }],
                                            publisher: {
                                                type: mongoose.Schema.Types.ObjectId,
                                                ref: 'RecipeModel'
                                            },
                                        }, {collection: 'portfolios'});

portfolioSchema.plugin(arrayUniquePlugin);

module.exports = portfolioSchema;
