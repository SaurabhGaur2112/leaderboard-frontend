// vendor modules
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  Dashboard,
} from './modules';

const getRoutes = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => (<Redirect to="/dashboard" />)}
    />
    <Route exact path="/dashboard" component={Dashboard} />
  </Switch>
);

export default getRoutes;
