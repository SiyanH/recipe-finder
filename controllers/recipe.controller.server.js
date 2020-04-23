const recipeDao = require('../daos/recipes.dao.server')

module.exports = (app) => {
    app.post('/api/recipes', (req, res) => {
        recipeDao.createRecipe(req.body)
            .then(actualRecipe => res.send(actualRecipe))
    })

    app.put('/api/recipes/:rid', (req, res) => {
        recipeDao.updateRecipe(req.params.rid, req.body)
            .then(status => res.send(status))
    })

    app.get('/api/recipes/:rid', (req, res) =>
        recipeDao.findRecipeById(req.params.rid)
            .then(recipes => res.send(recipes)))

    app.delete('/api/recipes/:rid', (req, res) => {
        recipeDao.deleteRecipe(req.params.rid)
            .then(status => res.send(status))
    })
}
