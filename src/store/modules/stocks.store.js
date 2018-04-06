import * as _ from 'lodash';
import Vue from 'vue';

import StocksApiService from 'Api/stocks.service.js';
import { ACTIONS } from 'Constants/stocks.constants.js';

const helpers = {
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

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};

const state = {
  sources: {},
};

const getters = {
  source: (state) => (id) => state.sources[id],

  hasSource: (state) => (id) => _.has(state.sources, id),

  points: (state) => (id, params) => {
    const data = [];
    _.forEach(params, (param) => {
      data.push({
        name: helpers.capitalize(param),
        data: helpers.extractProperty(state.sources[id].data, param)
      });
    });
    return data;
  },
};

const mutations = {
  addSource(state, payload) {
    const newSource = { data: {}, observers: 0 };
    Vue.set(state.sources, `${payload.entity}-${payload.interval}`, newSource);
  },

  updateSource(state, payload) {
    state.sources[payload.id].data = payload.data;
  },

  addObserver(state, id) {
    state.sources[id].observers++;
  },

  removeObserver(state, id) {
    state.sources[id].observers--;
    if (state.sources[id].observers === 0) {
      window.clearInterval(state.sources[id].intervalId);
      Reflect.deleteProperty(state.sources, id);
    }
  },

  setIntervalId(state, payload) {
    state.sources[payload.id].intervalId = payload.intervalId;
  }
};

const actions = {
  fetchSource({ commit }, params) {
    StocksApiService.fetchStockData(params.api).then((response) => {
      let data = helpers.extractData(params.api, response);
      data = helpers.stripOrdinal(data);
      commit('updateSource', { id: `${params.api.symbol}-${params.interval}`, data });
    });
  }
};


export {
  state,
  getters,
  mutations,
  actions
};
