import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import React from 'react';

// components
import App from './Components/App';

// redux
import store from './redux';

import './styles/index.scss';

const app = (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} />
      <Route component={App} />
    </Switch>
  </BrowserRouter>
);

render(
  <Provider store={store}>{app}</Provider>,
  document.getElementById('app')
);
