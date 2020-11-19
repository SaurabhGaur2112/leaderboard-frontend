// vendor modules
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

const RootContainer = ({ store, history, routes }) => (
  <Provider store={store}>
    <HashRouter history={history}>
      {routes}
    </HashRouter>
  </Provider>
);

RootContainer.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object,
  routes: PropTypes.object,
};

export default RootContainer;
