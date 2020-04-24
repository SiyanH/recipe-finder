const mongoose = require("mongoose");

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
            type: String
        }],
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
        },
        subscribedUsers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel"
        }],
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel"
        }]
    }, {collection: "users"}
);

module.exports = userSchema;
