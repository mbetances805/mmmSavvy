'use strict'
const yelp = require('yelp-fusion')
const clientId = 'QQoXOiPcBttoe2c5PAWr1Q'
const clientSecret = 'LyQds1NC7bqeUhZxX38DMx08afE6PZ7hj4wJlrdFMrVW1yf9YurKyYNl13TcZRgl'

const searchRequest = {
  term: 'restaurant',
  location: 'new york, ny',
  limit: 10
}

yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token)

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0]
    const prettyJson = JSON.stringify(firstResult, null, 4)
    console.log(prettyJson)
  })
}).catch(err => {
  console.log(err)
})
