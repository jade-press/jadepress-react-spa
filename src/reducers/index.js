
import { pageSize, maxLink } from '../lib/tools'

const rootReducer = (state = {
  page: 1
  ,pageSize: 20
  ,total: 0
  ,maxLink: 5
  ,title: ''
  ,posts: []
  ,cats: []
  ,onloadCats: false
  ,onloadPosts: false
  ,query: {}
  ,querys: {}
  ,isSinglePost: false
}, action) => {

  switch (action.type) {
    case 'SET_POSTS':
      return Object.assign({}, state, {
        posts: action.items
      })
    case 'SET_CATS':
      return Object.assign({}, state, {
        cats: action.items
      })
    case 'SET_ONLOAD_POSTS':
      return Object.assign({}, state, {
        onloadPosts: action.status
      })
    case 'SET_ONLOAD_CATS':
      return Object.assign({}, state, {
        onloadCats: action.status
      })
    case 'SET_PAGE':
      return Object.assign({}, state, {
        page: action.page
      })
    case 'SET_TOTAL':
      return Object.assign({}, state, {
        page: action.total
      })
    case 'SET_TITLE':
      return Object.assign({}, state, {
        title: action.title
      })
    case 'SET_QUERY':
      return Object.assign({}, state, {
        query: action.query
        ,querys: Object.assign({}, state.querys, {
          [action.path]: action.query
        })
      })
    case 'SET_SINGLE':
      return Object.assign({}, state, {
        isSinglePost: action.single
      })
    default:
      return state
  }
}

export default rootReducer
