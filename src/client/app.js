// vendor modules
import React from 'react';
import { render } from 'react-dom';
import { AppContainer as HotReloadContainer } from 'react-hot-loader';
// helper modules
import { history } from './helpers/history';
// react modules
import RootContainer from './rootContainer';
// redux modules
import appStore from './store';
// utility modules
import getRoutes from './routes';
// css modules
import './assets/scss/main.scss';

const rootElement = document.getElementById('app');
const routes = getRoutes(appStore);

render((
  <HotReloadContainer>
    <RootContainer
      store={appStore}
      history={history}
      routes={routes}
    />
  </HotReloadContainer>
), rootElement);
