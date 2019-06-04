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

const DynamicFormFields = Loadable({
  loader: () => import('@site/pages/DynamicFormFields'),
  loading: LoadingComponent,
});

const TableExt = Loadable({
  loader: () => import('@site/pages/TableExt'),
  loading: LoadingComponent,
})

function RoutesConf() {
  return (
    <Switch>
      <Route exact path="/FormExt" component={FormExt} />
      <Route exact path="/TestA" component={TestA} />
      <Route exact path="/DynamicFormFields" component={DynamicFormFields} />
      <Route exact path="/TableExt" component={TableExt} />
    </Switch>
  );
}

export default RoutesConf;
