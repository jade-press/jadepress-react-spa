import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const composedCreateStore = compose(
  applyMiddleware(thunk)
)(createStore)

export default function configureStore(preloadedState) {

  const store = composedCreateStore(
    preloadedState
    ? combineReducers(reducers, preloadedState)
    : reducers
  )

  return store
}