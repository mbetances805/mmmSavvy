import axios from 'axios'

// ACTION TYPES
const CREATE_RECOMMENDATION = 'CREATE_RECOMMENDATION'
const GET_RECOMMENDATION = 'GET_RECOMMENDATION'
const GET_ALL_RECOMMENDATIONS = 'GET_ALL_RECOMMENDATIONS'

// ACTION CREATORS
export const createRecommendation = recommendation => ({type: CREATE_RECOMMENDATION, recommendation})
export const getRecommendation = recommendation => ({type: GET_RECOMMENDATION, recommendation})
export const getAllRecommendations = recommendations => ({type: GET_ALL_RECOMMENDATIONS, recommendations})

// THUNK CREATORS
export const fetchRecommendations = () =>
  dispatch =>
    axios.get('/api/recommendations')
      .then(res =>
        dispatch(getAllRecommendations(res.data)))
      .catch(err => console.log(err))

export const fetchSingleRecommendation = (id) =>
  dispatch =>
    axios.get(`/api/recommendations/${id}`)
      .then(res =>
        dispatch(getRecommendation(res.data)))
      .catch(err => console.log(err))

export function postRecommendation(recommendation) {
  return function thunk (dispatch) {
    return axios.post(`/api/recommendation/`, recommendation)
      .then(res => {
        dispatch(getRecommendation(res.data));
      }
    )
    .catch(err => console.error('Issue posting recommendation', err))
  }
}

// REDUCER
export default function reducer(state = {selectedRecommendation: {}, allRecommendations: []}, action){
  switch (action.type) {
    case CREATE_RECOMMENDATION:
      return action.recommendation
    case GET_ALL_RECOMMENDATIONS:
      return Object.assign({}, state, {allRecommendations: action.recommendations})
    case GET_RECOMMENDATION:
      return Object.assign({}, state, {selectedRecommendation: action.recommendation})
    default:
      return state
  }
}
