import React from 'react'
import * as tools from './common/constants'
import { renderToString } from 'react-dom/server'
import { bindActionCreators } from 'redux'
import { match, RouterContext } from 'react-router'
import * as actions from './actions'

let mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

function getRenderProps({ routes, location }) {

  return new Promise((resolve, reject) => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if(error) reject(error)
      else resolve({ redirectLocation, renderProps })
    })
  })

}

export default async function (glob, ctx) {

  tools.init(glob)
  const { Provider } = require('react-redux')
  const { routes, store } = require('./routes')

  let { renderProps } = await getRenderProps({ routes, location: ctx.originalUrl })
  // console.log(renderProps, store.getState())
  // let { dispatch } = store
  // let acts = mapDispatchToProps(dispatch)
  // let fetchs = renderProps.components.map(c => c?c.WrappedComponent.fetchData:false)

  // for(let i = 0, len = fetchs.length;i < len;i ++) {
  //   let fetch = fetchs[i]
  //   if(fetch) await fetch({...renderProps, ...acts})
  // }

  return (
    {
      status: 200,
      html: renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )
    }
  )

}