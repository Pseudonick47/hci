import * as _ from 'lodash';
import Vue from 'vue';

import StocksApiService from 'Api/stocks.service';
import StocksUtil from 'Util/stocks.util';
import GeneralUtil from 'Util/general.util';

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
        name: GeneralUtil.capitalize(param),
        data: StocksUtil.extractProperty(state.sources[id].data, param)
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
    if (state.sources[payload.id]) {
      state.sources[payload.id].data = payload.data;
    }
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
      let data = StocksUtil.extractData(params.api, response);
      data = StocksUtil.stripOrdinal(data);
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
