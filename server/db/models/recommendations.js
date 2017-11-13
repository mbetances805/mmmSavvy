const Sequelize = require('sequelize')
const db = require('../db')

const Recommendation = db.define('recommendation', {
  recommendationScore: {
    type: Sequelize.DECIMAL(2, 1)
  }
})

module.exports = Recommendation
