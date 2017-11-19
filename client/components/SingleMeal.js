import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSingleMeal } from '../store'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
// import { WriteReview } from './WriteReview'

class SingleMeal extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getMeal(id)
  }

  render() {
    const { meal, review } = this.props
    const { selectedMeal } = meal
    selectedMeal.resturant && console.log(selectedMeal)
    return (
      <div>
        <h5>{selectedMeal.name}</h5>
        <h6>{selectedMeal.description}</h6>
        {
          selectedMeal.resturant &&
          <h6><Link to={`/restaurants/${selectedMeal.resturant.id}`}>
            {selectedMeal.resturant.name}</Link></h6>
        }
        <img src={selectedMeal.image} width='200' />
        {
          selectedMeal.reviews && selectedMeal.reviews.map(review => {
            return (<div key={review.id}><span>{review.comment}</span>
            <span>{review.rating}</span></div>)
          })
        }
        {/*}<WriteReview />*/}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    meal: state.meals,
    review: state.review
  }
}

const mapDispatch = (dispatch) => {
  return {
    getMeal(id){
      dispatch(fetchSingleMeal(id))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleMeal))
