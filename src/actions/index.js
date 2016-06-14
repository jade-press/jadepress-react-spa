import fetch from 'isomorphic-fetch'
import { host } from '../lib/tools'

/*
  @param prop, 'posts' or 'cats'
  @param status, boolean 
*/

export function setStatus(prop, status) {
  return {
    type: 'SET_ONLOAD_' + prop.toUpperCase()
    ,status: status
  }
}

export function setItems(prop, items) {
  return {
    type: 'SET_' + prop.toUpperCase()
    ,items: items
  }
}

function normalize(json) {
  if(json.errorMsg || json.errs) {
    json.err = json.errorMsg || json.errs.join(';')
  }
  return json
}

function fill(items) {
  var item = items[0]
  if(!item) return items
  var id = item.id + ''
  var r = Math.floor(Math.random() * 8 + 6)
  var res = []
  for(var i = 0;i < r;i ++) {
    var it = Object.assign({}, item, {
      _id: id + i
    })
    res.push(it)
  }
  return res
}

export function fetchItems(dispatch, prop, body, path) {

  if(prop === 'posts') {
    dispatch({
      type: 'SET_QUERY'
      ,query: body
      ,path: path
    })
    dispatch({
      type: 'SET_SINGLE'
      ,single: !!(body._id || body.slug || body.id)
    })
  }

  dispatch(setStatus(prop, true))

  return fetch(host + '/public-' + prop, {
    method: 'POST'
    ,headers: {
      'Accept': 'application/json'
      ,'Content-Type': 'application/json'
    }
    ,body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(json => {

    dispatch(setStatus(prop, false))
    var res = normalize(json)
    if(res.err) return console.log(res.err)
    var items = res.result
    if(prop === 'posts') {
      dispatch({
        type: 'SET_TOTAL'
        ,total: res.total
      })
    }

    dispatch(setItems(prop, items))

    if(res.title) {
      dispatch({
        type: 'SET_TITLE'
        ,title: 'category ' + res.title
      })
    }

  })
  .catch(e => {
    dispatch(setStatus(prop, false))
    console.log(e.stack || e)
  })

}

