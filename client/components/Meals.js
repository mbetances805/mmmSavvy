import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleRestaurant} from '../store'
import {Link} from 'react-router-dom'

class Meals extends Component {
  componentDidMount(){
    const {id} = this.props.match.params
    this.props.getRestaurant(id)
  }

  render(){
    const {restaurant} = this.props
    return (
      <div>
        <h3>{restaurant.name}</h3>
        <h4>Menu Items</h4>
      {
        restaurant.meals && restaurant.meals.map(meal => {
          return (
            <div key={meal.id}><Link to={`/restaurants/${restaurant.id}/meals/${meal.id}`}>{meal.name}</Link> <br />
            <img src={meal.image} width="250"/>
            </div>
          )
        })
      }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    restaurant: state.restaurant.selectedRestaurant
  }
}

const mapDispatch = (dispatch) => {
  return {
    getRestaurant(id){
      dispatch(fetchSingleRestaurant(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Meals)
