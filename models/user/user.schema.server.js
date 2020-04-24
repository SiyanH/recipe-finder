const mongoose = require("mongoose");
const arrayUniquePlugin = require('mongoose-unique-array');

const userSchema = mongoose.Schema(
    {
        username: {type: String, unique: true},
        password: String,
        first: String,
        last: String,
        useremail: String,
        recipes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RecipeModel"
            },
        ],
        recipesFromApi: [{
            type: String,
            unique: true
        }],
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
        },
        subscribedUsers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
            unique: true
        }],
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
            unique: true
        }]
    }, {collection: "users"}
);

userSchema.plugin(arrayUniquePlugin);

module.exports = userSchema;
