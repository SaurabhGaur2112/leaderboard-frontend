// vendor modules
import React from 'react';
import { render } from 'react-dom';
import { AppContainer as HotReloadContainer } from 'react-hot-loader';
// react modules
import Dashboard from './modules/dashboard/Dashboard';
// css modules
import './assets/scss/main.scss';

const rootElement = document.getElementById('app');

render((
  <HotReloadContainer>
    <Dashboard />
  </HotReloadContainer>
), rootElement);
