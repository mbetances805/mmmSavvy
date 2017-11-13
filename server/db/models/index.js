const User = require('./user')
const Restaurant = require('./restaurant')
const Meal = require('./meal')
const Review = require('./review')
const Recommendation = require('./recommendations')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Meal.belongsTo(Restaurant)
Restaurant.hasMany(Meal)
User.hasMany(Review)
Review.belongsTo(User)
Review.belongsTo(Meal)
Meal.hasMany(Review)
Recommendation.belongsTo(User)
User.hasMany(Recommendation)
Recommendation.belongsTo(Meal)
Meal.hasMany(Recommendation)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Restaurant,
  Meal,
  Review,
  Recommendation
}
