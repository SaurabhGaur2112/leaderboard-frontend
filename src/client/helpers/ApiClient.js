/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-return-assign */
import axios from 'axios';
import _ from 'lodash';

const methods = ['get', 'post', 'put', 'patch', 'delete'];

const formatUrl = (path) => {
  if (path[0] === 'h') return path;

  const adjustedPath = path[0] !== '/' ? `/${path}` : path;

  return adjustedPath;
};

const sanitiseQueryParams = (obj) => {
  let query = _.omitBy(obj, value => (_.isArray(value) && _.isEmpty(value)));

  query = _.mapValues(query, value => (_.isArray(value) ? _.join(value, ',') : value));
  query = _.omitBy(query, _.isNil);
  return query;
};

export default class ApiClient {
  constructor() {
    methods.forEach(method => this[method] = (path, { params, data, formData, contentType = 'application/json' } = {}) => (
      axios({
        method: _.toUpper(method),
        baseURL: process.env.API_URL,
        url: formatUrl(path),
        ...(_.isNil(params) ? {} : { params: sanitiseQueryParams(params) }),
        ...(_.isNil(data) ? {} : { data: JSON.stringify(data) }),
        ...(_.isNil(formData) ? {} : { data: formData }),
        headers: {
          'Content-type': contentType,
        },
      })
        .then(response => response)
        .catch((error) => { throw error; })
    ));
  }
}
