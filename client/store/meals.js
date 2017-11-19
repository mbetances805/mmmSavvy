import axios from 'axios'

// ACTION TYPES
const CREATE_MEAL = 'CREATE_MEAL'
const GET_MEAL = 'GET_MEAL'
const GET_ALL_MEALS = 'GET_ALL_MEALS'

// ACTION CREATORS
export const createMeal = meal => ({type: CREATE_MEAL, meal})
export const getMeal = meal => ({type: GET_MEAL, meal})
export const getAllMeals = meals => ({type: GET_ALL_MEALS, meals})

// THUNK CREATORS
export const fetchMeals = () =>
  dispatch =>
    axios.get('/api/meals')
      .then(res =>
        dispatch(getAllMeals(res.data)))
      .catch(err => console.log(err))

export const fetchSingleMeal = (id) =>
  dispatch =>
    axios.get(`/api/meals/${id}`)
      .then(res =>
        dispatch(getMeal(res.data)))
      .catch(err => console.log(err))

export function postMeal(meal) {
  return function thunk (dispatch) {
    return axios.post(`/api/meal/`, meal)
      .then(res => {
        dispatch(getMeal(res.data));
      }
    )
    .catch(err => console.error('Issue posting meal', err))
  }
}

// REDUCER
export default function reducer(state = {selectedMeal: {}, allMeals: []}, action){
  switch (action.type) {
    case CREATE_MEAL:
      return action.meal
    case GET_ALL_MEALS:
      return Object.assign({}, state, {allMeals: action.meals})
    case GET_MEAL:
      return Object.assign({}, state, {selectedMeal: action.meal})
    default:
      return state
  }
}
