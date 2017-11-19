import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import review from './review'
import restaurant from './restaurant'
import recommendations from './recommendations'
import meals from './meals'

const reducer = combineReducers({user, review, restaurant, recommendations, meals})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './review'
export * from './restaurant'
export * from './recommendations'
export * from './meals'
