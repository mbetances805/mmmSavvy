const Sequelize = require('sequelize')
const db = require('../db')

const Restaurant = db.define('resturant', {
  name: {
    type: Sequelize.STRING,
    allowNUll: false
  },
  rating: {
    type: Sequelize.DECIMAL(2, 1)
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telephone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: '../../public/images/store.png'
  },
  website: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.yelp.com'
  }
})

module.exports = Restaurant
