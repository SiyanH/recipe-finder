const recipeModel = require("../models/recipes.model.server");
//Add recipe to users
//Querying recipe find, findall
//Update

//Create
const createRecipe = (recipe) => {
  return recipeModel.create(recipe);
};

//Find Recipe by Id
const findRecipeById = (recipeId) => {
  return recipeModel.findOne({
    _id: recipeId,
  });
};

//Find all recipes for the entire database (what is created by the user
const findAllRecipes = () => {
  return recipeModel.find();
};

module.exports = {
  createRecipe,
  findRecipeById,
  findAllRecipes,
};
