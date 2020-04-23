const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        username: String,
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
        recipesFromApi: [String],
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
    },

    {collection: "users"}
);

module.exports = userSchema;
