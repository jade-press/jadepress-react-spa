import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Post from './containers/Post'
import Cat from './containers/Cat'
import Search from './containers/Search'

export default (
  <Route path="/" component={App}>
  	<IndexRoute component={App} />
  	<Route path="/cat" component={App}>
    	<Route path="/cat/:catSlug" component={Cat} />
    </Route>
    <Route path="/:catSlug" component={App}>
    	<Route path="/:catSlug/:postSlug" component={Post} />
    </Route>
    <Route path="/s?title=:title" component={Search} />
  </Route>
)