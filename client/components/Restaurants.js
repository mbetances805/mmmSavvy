import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchRestaurants} from '../store'
import {Link} from 'react-router-dom'

class Restaurants extends Component {
  componentDidMount(){
    this.props.getRestaurant()
  }

  render(){
    const {restaurants} = this.props
    return (
      <div>
        <h4><Link to="/recommendations">View Recommended Meals</Link></h4>
        <span>List of Visited Restaurants</span> <br />
        {
          restaurants.map(element => {
            return (
              <div key={element.id}><Link to={`/restaurants/${element.id}`}>{element.name}</Link></div>
            )
          })
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    restaurants: state.restaurant.allRestaurants
  }
}

const mapDispatch = (dispatch) => {
  return {
    getRestaurant(){
      dispatch(fetchRestaurants())
    }
  }
}

export default connect(mapState, mapDispatch)(Restaurants)
