import actions from '../../constants/actions';
import apiEndPoints from '../../helpers/apiEndPoints';

export const createLeader = dataValue => ({
  types: [actions.CREATE_LEADER, actions.CREATE_LEADER_SUCCESS, actions.CREATE_LEADER_FAILURE],
  promise: client => client.post(apiEndPoints.leader.createLeader(), { formData: dataValue, contentType: 'application/pdf' }),
});
