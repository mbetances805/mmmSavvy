const Sequelize = require('sequelize')
const db = require('../db')

const Meal = db.define('meal', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  menuStatus: {
    type: Sequelize.ENUM('Active', 'Inactive'),
    defaultValue: 'Active'
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: '../../public/images/Webalys-Kameleon.pics-Food-Dome.ico'
  }
})

module.exports = Meal
