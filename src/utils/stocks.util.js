import * as _ from 'lodash';
import { ACTIONS } from 'Constants/stocks.constants.js';

export default {
  extractData(parameters, response) {
    return response.data[ACTIONS[parameters.apiFunction]];
  },

  extractProperty(collection, prop) {
    const data = {};
    _.forOwn(collection, (value, key) => {
      data[key] = value[prop];
    });
    return data;
  },

  stripOrdinal(data) {
    const processed = {};

    _.forOwn(data, (value, key) => {
      processed[key] = {
        open: value['1. open'],
        high: value['2. high'],
        low: value['3. low'],
        close: value['4. close'],
        volume: value['5. volume']
      };
    });

    return processed;
  },
};
