import _ from 'lodash';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApiClient from '../helpers/ApiClient';

const clientInstance = new ApiClient();

const clientMiddleware = (client) => (
  ({ dispatch, getState }) => (
    (next) => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, onRequest, onSuccess, onFailure, ...rest } = action;

      if (!promise) return next(action);

      const [REQUEST, SUCCESS, FAILURE] = types;

      next({ ...rest, type: REQUEST });

      if (onRequest && _.isFunction(onRequest)) {
        const data = { ...rest };

        onRequest(dispatch, data);
      }

      const actionPromise = promise(client);

      actionPromise.then(
        (result) => {
          const data = { ...rest, payload: _.get(result, 'data') || _.get(result, 'results'), meta: _.get(result, 'meta'), type: SUCCESS };

          if (onSuccess && _.isFunction(onSuccess)) {
            onSuccess(dispatch, data);
          }

          next(data);
        },
      ).catch((error) => {
        const data = { ...rest, payload: error, type: FAILURE };

        if (onFailure && _.isFunction(onFailure)) {
          onFailure(dispatch, data);
        }

        next({ ...rest, payload: error, type: FAILURE });
      });

      return actionPromise;
    }
  )
);

const composeEnhancers = composeWithDevTools({});

export default composeEnhancers(applyMiddleware(thunkMiddleware, clientMiddleware(clientInstance)));
