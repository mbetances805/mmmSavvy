import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postReview, createReview, fetchSingleMeal } from '../store'
import history from '../history'
import { withRouter } from 'react-router'

export class WriteReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      stars: 0,
      message: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event) => {
    this.props.review[event.target.name] = event.target.value
    this.props.newReview(this.props.review)
  }

  // const handleRedirect = (review, evt) => {
  //   const { productId } = this.props
  //   if (!this.props.review.comment || !this.props.review.rating){
  //     evt.preventDefault()
  //     alert('Please populate all fields.')
  //   } else {
  //     this.props.handleSubmit(review, evt)
  //     history.push(`/restaurants/${restaurantId}/meals/${id}`)
  //
  //   }
  // }

    render() {
      console.log('this is WriteReview', this.props)
      const { title, stars, message } = this.state
      return (
        <div>
          <h5>Write Your Review</h5>
          <form id="new-message-form">
            <label htmlFor='title'>Title</label>
              <input
                value={title}
                type="text"
                name="title"
                on
                />
            <label htmlFor='stars'>Stars</label>
              <input
                value={stars}
                type="number" step='.1'
                name="stars"
              />
            <label htmlFor='message'>Message</label>
              <textarea
                cols='50'
                rows='5'
                value={message}
                type="text"
                name="message"
              />
          </form>
          <hr />
        </div>
      )
    }
  }
  const mapState = ({review}) => ({review})

  const mapDispatch = function (dispatch) {
    return {
      getProduct (id) {
        dispatch(fetchSingleMeal(id))
      },
      handleSubmit (review, evt) {
        evt.preventDefault()
        dispatch(postReview(review))
        dispatch(createReview({}))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(WriteReview))
