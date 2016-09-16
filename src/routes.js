import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import App from './containers/App'
import Home from './containers/Home'
import Post from './containers/Post'
import Cat from './containers/Cat'
import Search from './containers/Search'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/s" component={Search} />
      <Route path="/cat/:catSlug" component={Cat} />
      <Route path="/:catSlug/:postSlug" component={Post} />
    </Route>
  </Router>
)