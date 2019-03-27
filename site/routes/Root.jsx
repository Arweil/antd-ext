import React, { Component } from 'react';
import { Router, withRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { hot } from 'react-hot-loader';
import Layout from '@site/layout/AppLayout';

const history = createBrowserHistory();

const HotLayout = hot(module)(withRouter(Layout));

export default class Root extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <HotLayout />
        </Switch>
      </Router>
    );
  }
}
