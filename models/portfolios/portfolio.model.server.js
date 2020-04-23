const mongoose = require('mongoose')
const portfolioSchema = require('./portfolio.schema.server')
const portfolioModel = mongoose.model(
    'PortfolioModel',
    portfolioSchema
)
module.exports = portfolioSchema
