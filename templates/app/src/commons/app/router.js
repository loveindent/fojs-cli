import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { App } from './App'
import { Home, NotFound } from './views'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)
