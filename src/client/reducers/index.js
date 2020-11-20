// vendor modules
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// dashboard modules
import {
  leaderListReducers,
  leaderCreateReducers,
} from '../modules/dashboard/DashboardReducers';

export default combineReducers({
  routing: routerReducer,
  leaderList: leaderListReducers,
  leaderCreate: leaderCreateReducers,
});
