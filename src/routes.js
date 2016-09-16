import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import App from './containers/App'
import Home from './containers/Home'
import Post from './containers/Post'
import Cat from './containers/Cat'
import Search from './containers/Search'
import { publicRoute } from './common/constants'
const { cat, post, home } = publicRoute

export default (
  <Router history={browserHistory}>
    <Route path={home} component={App}>
      <IndexRoute component={Home} />
      <Route path="s" component={Search} />
      <Route path={cat} component={Cat} />
      <Route path={post} component={Post} />
    </Route>
  </Router>
)