import actions from '../../constants/actions';
import apiEndPoints from '../../helpers/apiEndPoints';

export const getLeaders = id => ({
  types: [actions.GET_LEADERS, actions.GET_LEADERS_SUCCESS, actions.GET_LEADERS_FAILURE],
  promise: client => client.get(apiEndPoints.leader.getLeaders(id)),
});

export const createLeader = (id, dataValue) => ({
  types: [actions.CREATE_LEADER, actions.CREATE_LEADER_SUCCESS, actions.CREATE_LEADER_FAILURE],
  promise: client => client.post(apiEndPoints.leader.createLeader(), { formData: dataValue, contentType: 'application/pdf' }),
  onSuccess: (dispatch) => {
    dispatch(getLeaders(id));
  },
});
