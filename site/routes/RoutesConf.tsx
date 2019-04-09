// 路由配置组件化

import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route } from 'react-router-dom';

function LoadingComponent() {
  return null;
}

const FormExt = Loadable({
  loader: () => import('@site/pages/FormExt'),
  loading: LoadingComponent,
});

const TestA = Loadable({
  loader: () => import('@site/pages/TestA'),
  loading: LoadingComponent,
});

function RoutesConf() {
  return (
    <Switch>
      <Route exact path="/FormExt" component={FormExt} />
      <Route exact path="/TestA" component={TestA} />
    </Switch>
  );
}

export default RoutesConf;
