const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  comment: Sequelize.TEXT,
  rating: {
    type: Sequelize.DECIMAL(2, 1),
    allowNull: false
  }
})

module.exports = Review
