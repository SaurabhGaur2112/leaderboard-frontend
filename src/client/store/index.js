// redux modules
import { createStore } from 'redux';
// redux modules
import rootReducer from '../reducers';
import middleware from './middleware';

const appStore = createStore(rootReducer, middleware);

window.appStore = appStore;

export default appStore;
