const userDao = require("../daos/users.dao.server");
const recipeDao = require("../daos/recipes.dao.server");

module.exports = (app) => {
  //create recipe
  app.post("/api/recipes", async (req, res) => {
    const profile = req.session["profile"];
    const newRecipe = await recipeDao.createRecipe(req.body);
    userDao
      .addCreatedRecipeToUser(newRecipe, profile._id)
      .then((updatedUser) => res.send(updatedUser));
  });
};
