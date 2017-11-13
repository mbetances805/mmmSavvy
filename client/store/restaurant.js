import axios from 'axios'

// ACTION TYPES
const CREATE_RESTAURANT = 'CREATE_RESTAURANT'
const GET_RESTAURANT = 'GET_RESTAURANT'
const DELETE_RESTAURANT = 'DELETE_RESTAURANT'
const GET_ALL_RESTAURANTS = 'GET_ALL_RESTAURANTS'

// ACTION CREATORS
export const createRestaurant = restaurant => ({type: CREATE_RESTAURANT, restaurant})
export const getRestaurant = restaurant => ({type: GET_RESTAURANT, restaurant})
export const deleteRestaurant = restaurant => ({type: DELETE_RESTAURANT, restaurant})
export const getAllRestaurants = restaurants => ({type: GET_ALL_RESTAURANTS, restaurants})

// THUNK CREATORS
export const fetchRestaurants = () =>
  dispatch =>
    axios.get('/api/restaurants')
      .then(res =>
        dispatch(getAllRestaurants(res.data)))
      .catch(err => console.log(err))

export const fetchSingleRestaurant = (id) =>
  dispatch =>
    axios.get(`/api/restaurants/${id}`)
      .then(res =>
        dispatch(getRestaurant(res.data)))
      .catch(err => console.log(err))

export function postRestaurant (restaurant) {
  return function thunk (dispatch) {
    return axios.post(`/api/restaurant/`, restaurant)
      .then(res => {
        dispatch(getRestaurant(res.data));
      }
    )
    .catch(err => console.error('Issue posting restaurant', err))
  }
}

export function removeRestaurant (restaurant) {
  return function thunk (dispatch) {
    return axios.delete(`/api/restaurant/${restaurant.productId}/`, restaurant)
      .then(res => dispatch(deleteRestaurant(res.data)))
      .catch(err => console.error('Issue removing restaurant', err))
  }
}

// REDUCER
export default function reducer(state = {selectedRestaurant: {}, allRestaurants: []}, action){
  switch (action.type) {
    case CREATE_RESTAURANT:
      return action.restaurant
    case DELETE_RESTAURANT:
      return action.restaurant
    case GET_ALL_RESTAURANTS:
      return Object.assign({}, state, {allRestaurants: action.restaurants})
    case GET_RESTAURANT:
      return Object.assign({}, state, {selectedRestaurant: action.restaurant})
    default:
      return state
  }
}
