import React, { Component } from 'react'
import { connect } from 'react-redux'
const yelp = require('yelp-fusion')
import { clientId, clientSecret } from '../../yelpApi'

// export const term = 'test'

export class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      term: '',
      location: 'new york'
    }
    this.handleChange = this.handleChange.bind(this)
    this.yelpQuery = this.yelpQuery.bind(this)
  }

  handleChange(event){
    this.setState({term: event.target.value})
  }

 yelpQuery({term, location}) {
   yelp.accessToken(clientId, clientSecret).then(response => {
     const client = yelp.client(response.jsonBody.access_token)

     client.search(searchRequest).then(response => {
       const firstResult = response.jsonBody.businesses[2]
       const prettyJson = JSON.stringify(firstResult, null, 4)
       console.log(prettyJson)
     })
   }).catch(err => {
     console.log(err)
   })
 }


  render() {
    console.log(this.state)
    const { term } = this.state
     return (
       <form onSubmit={event => this.yelpQuery({term, location}, event)}>
        <input
          type="text"
          value={this.state.term}
          id="searchBar"
          onChange={this.handleChange}
          placeholder="Search by cuisine..." />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Search</button>
          </span>
       </form>
     )
   }
}

const mapState = null

const mapDispatch = null

export default connect(mapState, mapDispatch)(SearchBar)
