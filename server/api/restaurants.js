const router = require('express').Router()
const {Restaurant} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Restaurant.findAll()
    .then(restaurants => res.json(restaurants))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Restaurant.findOne({
    where: {
      id: req.params.id
    },
    include: [{all: true}]
  })
    .then(restaurant => res.json(restaurant))
    .catch(next)
})
