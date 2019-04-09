import React from 'react';
import { Router, withRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { hot } from 'react-hot-loader';
import Layout from '@site/layout/AppLayout';

const history = createBrowserHistory();

// @ts-ignore
const HotLayout = hot(module)(withRouter(Layout));

export default () => {
  return (
    <Router history={history}>
      <Switch>
        <HotLayout />
      </Switch>
    </Router>
  );
}
