import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const composedCreateStore = compose(
  applyMiddleware(thunk),
  // 只支持 chrome 插件的方式，不引入其它代码
  // window.devToolsExtension && window.devToolsExtension()
)(createStore)

export default function configureStore(preloadedState = {}) {

  const store = composedCreateStore(
    reducers
    ,preloadedState
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}