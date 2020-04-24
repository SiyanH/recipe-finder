const userDao = require("../daos/users.dao.server");
const recipeDao = require("../daos/recipes.dao.server");

module.exports = (app) => {
  //create recipe for session, this is not from the api
  app.post("/api/recipes", async (req, res) => {
    const profile = req.session["profile"];
    const newRecipe = await recipeDao.createRecipe(req.body);
    userDao
      .addCreatedRecipeToUser(newRecipe, profile._id)
      .then((updatedUser) => res.send(updatedUser));
  });

  //add recipe from api
  app.post("/api/users/edamamrecipes", (req, res) => {
    //variable for recipe
    console.log(JSON.stringify(req.body));
    const profile = req.session["profile"];
    const { url } = req.body;
    console.log({ url });
    const userId = profile._id;
    userDao.addEdamamRecipeToUser(url, userId).then((updatedUser) => {
      res.send(updatedUser);
    });
  });

  app.post("/api/recipes", (req, res) => {
    recipeDao
      .createRecipe(req.body)
      .then((actualRecipe) => res.send(actualRecipe));
  });

  app.put("/api/recipes/:rid", (req, res) => {
    recipeDao
      .updateRecipe(req.params.rid, req.body)
      .then((status) => res.send(status));
  });

  app.get("/api/recipes/:rid", (req, res) =>
    recipeDao
      .findRecipeById(req.params.rid)
      .then((recipes) => res.send(recipes))
  );

  app.delete("/api/recipes/:rid", (req, res) => {
    recipeDao.deleteRecipe(req.params.rid).then((status) => res.send(status));
  });
};
