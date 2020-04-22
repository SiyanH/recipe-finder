const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    first: String,
    last: String,
    recipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RecipeModel",
      },
    ],
    recipesFromApi: [String],
  },
  { collection: "users" }
);

module.exports = userSchema;
