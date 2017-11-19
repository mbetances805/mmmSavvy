const router = require('express').Router()
const {Meal, Review} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Meal.findAll()
    .then(restaurants => res.json(restaurants))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Meal.findOne({
    where: {
      id: req.params.id
    },
    include: [{all: true}]
  })
    .then(restaurant => res.json(restaurant))
    .catch(next)
})

router.post('/:id', (req, res, next) => {
  Review.create(req.body, {returning: true})
    .then(review => res.json(review))
    .catch(next)
})
