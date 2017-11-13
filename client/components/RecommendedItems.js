import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchRecommendations} from '../store'
import {get, getRecommendedItems} from '../../server/db/pearsonCorrelation'
import {Link} from 'react-router-dom'

class RecommendedItems extends Component {
  componentDidMount(){
    this.props.getRecommendations()
    get
  }

  render(){
    const {recommendations} = this.props
    console.log(recommendations)
    return (
      <div>
        <h4>Your Meal Recommendations</h4>
        {
          recommendations.map(recommendation => {
            return (
              <span key={recommendation.id}>
                <span><strong>{recommendation.meal.name}</strong></span><br />
                <span>{recommendation.recommendationScore}</span><br />
                <img src={recommendation.meal.image} width="250" height="300" />
              </span>
            )
          })
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    recommendations: state.recommendations.allRecommendations,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getRecommendations(){
      dispatch(fetchRecommendations())
    }
  }
}

export default connect(mapState, mapDispatch)(RecommendedItems)