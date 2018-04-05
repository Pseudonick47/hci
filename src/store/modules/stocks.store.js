import * as _ from 'lodash';
import Vue from 'vue';

const state = {
  sources: {},
};

const getters = {
  source: (state) => (id) => state.sources[id],
  hasSource: (state) => (id) => _.has(state.sources, id),
  openData: (state) => (id) => {
    const points = { name: 'Open', data: {} };
    _.forOwn(state.sources[id].data, (value, key) => {
      points.data[key] = value['1. open'];
    });
    return [points];
  },
};

const mutations = {
  addSource(state, payload) {
    const newSource = { data: {} };
    Vue.set(state.sources, `${payload.entity}-${payload.interval}`, newSource);
  },
  updateSource(state, payload) {
    state.sources[payload.id].data = payload.data;
  }
};

export {
  state,
  getters,
  mutations
};
