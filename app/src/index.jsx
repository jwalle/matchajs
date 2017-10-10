import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from './components/App.jsx';

import NotFoundPage from './components/NotFoundPage.jsx';
import ContentPage from './components/ContentPage.jsx';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute path="/" component={ContentPage} />

      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
), document.getElementById('root'));