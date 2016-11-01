
import React, { Component } from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Index from '../index.js';

render((
  <Router history={browserHistory}>
    <Route path="/" component={Index} />
  </Router>
), document.getElementById('root'));
