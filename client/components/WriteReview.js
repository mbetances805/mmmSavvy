import React from 'react'
import { connect } from 'react-redux'
import { postReview, createReview, fetchSingleMeal } from '../store'
import history from '../history'

const WriteReview = (props) => {
  // const handleChange = (event) => {
  //   this.props.review[event.target.name] = event.target.value
  //   this.props.newReview(this.props.review)
  // }
  //
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
  console.log(props)
    return (
      <div>
        <h4>Write Your Review</h4>
        <form onSubmit={evt => this.handleRedirect(review, evt)}>
          <label htmlFor='title'>Title</label>
            <input
              value={review.title}
              type="text"
              name="title"
              onChange={this.handleChange}
              />
          <label htmlFor='stars'>Stars</label>
            <input
              value={review.stars}
              type="number" step='.1'
              name="stars"
              onChange={this.handleChange}
            />
          <label htmlFor='message'>Message</label>
            <textarea
              cols='50'
              rows='5'
              value={review.message}
              type="text"
              name="message"
              onChange={this.handleChange}
            />

          {
            this.state.submitVisible ?
            <button type="submit">
                Submit
              </button> :
              <button type="submit" disabled>
                  Submit
                </button>
          }
        </form>
        <hr />
      </div>
    )

}
const mapState = null

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

export default connect(mapState, mapDispatch)(WriteReview)
