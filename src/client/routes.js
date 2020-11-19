// vendor modules
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  Home,
  Dashboard,
} from './modules';

const getRoutes = () => (
  <Switch>
    <Home>
      <Route
        exact
        path="/"
        render={() => (<Redirect to="/dashboard" />)}
      />
      <Route exact path="/dashboard" component={Dashboard} />
    </Home>
  </Switch>
);

export default getRoutes;
