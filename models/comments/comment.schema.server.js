const mongoose = require('mongoose')
const commentSchema = mongoose.Schema({
                                          text: String,
                                          postedAt: Date,
                                          user: {
                                              type: mongoose.Schema.Types.ObjectId,
                                              ref: 'UserModel'
                                          },
                                      }, {collection: 'comments'})

module.exports = commentSchema
