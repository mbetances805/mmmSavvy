const router = require('express').Router()
const {Recommendation, Review} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Recommendation.findAll({
    include: [{all: true}]
  })
    .then(restaurants => res.json(restaurants))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Recommendation.findOne({
    where: {
      id: req.params.id
    },
    include: [{all: true}]
  })
    .then(restaurant => res.json(restaurant))
    .catch(next)
})

router.get('/', (req, res, next) => {
  Review.findAll({
    include: [{all: true}]
  })
    .then(restaurants => res.json(restaurants))
    .catch(next)
})
