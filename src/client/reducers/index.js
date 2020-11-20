// vendor modules
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// dashboard modules
import {
  leaderCreateReducers,
} from '../modules/dashboard/DashboardReducers';

export default combineReducers({
  routing: routerReducer,
  leaderCreate: leaderCreateReducers,
});
