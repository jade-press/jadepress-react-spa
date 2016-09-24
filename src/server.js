import React from 'react'
import * as tools from './common/constants'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

export default function (glob, ctx) {

  tools.init(glob)
  const createStore = require('./store/configureStore')
  const { Provider } = require('react-redux')

  const routes = require('./routes').default
  const store = createStore()

  return new Promise((resolve, reject) => {

    match({ routes, location: ctx.originalUrl }, (error, redirectLocation, renderProps) => {
      if (error) {
        reject({
          error
        })
      } else if (redirectLocation) {
        resolve({
          status: 302,
          redirecct: redirectLocation.pathname + redirectLocation.search
        })
      } else if (renderProps) {
        resolve(
          {
            status: 200,
            html: renderToString(
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            )
          }
        )
      } else {
        resolve({
          status: 404
        })
      }
    })

  })

}
