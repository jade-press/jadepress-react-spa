
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
        res.status(500).send(error.message)
        reject(error)
      } else if (redirectLocation) {
        resolve({
          status: 302,
          redirecct: redirectLocation.pathname + redirectLocation.search
        })
      } else if (renderProps) {
        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.
        res.status(200).send(renderToString(<RouterContext {...renderProps} />))

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
