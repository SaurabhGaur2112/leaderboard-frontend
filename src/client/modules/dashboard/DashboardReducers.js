import actions from '../../constants/actions';

const initialState = {
  isLoading: false,
  data: [],
  error: null,
};

export function leaderCreateReducers(state = initialState, action) {
  switch (action.type) {
  case actions.CREATE_LEADER: {
    return {
      ...state,
      data: [],
      isLoading: true,
    };
  }
  case actions.CREATE_LEADER_SUCCESS: {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };
  }
  default:
    return state;
  }
}
