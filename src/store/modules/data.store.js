/**
 * Store for data source objects.
 *
 * @author Aleksandar Varga (aleksandar.varga@uns.ac.rs)
 */

import * as _ from 'lodash';
import Vue from 'vue';

import DataApiService from 'Api/data.service';
import DataUtil from 'Util/data.util';
import GeneralUtil from 'Util/general.util';

const state = {
  sources: {},
};

const getters = {
  /**
   * Check if store contains data source with a given id.
   *
   * @param {Object} state Store state.
   * @param {string} id    Source ID.
   * @return {bool}       True if source exists, false otherwise.
   */
  hasSource: (state) => (id) => _.has(state.sources, id),

  /**
   * Extracts data points of interest.
   *
   * @param {Object} state  Store state.
   * @param {string} id     Source id.
   * @param {Array}  params Array of parameters of interest.
   * @return {Array}       Array of extracted points grouped by parameter.
   */
  points: (state) => (id, params) => {
    const data = [];
    _.forEach(params, (param) => {
      data.push({
        name: _.capitalize(param),
        data: DataUtil.extractProperty(state.sources[id].data, param)
      });
    });
    return data;
  },
};

const mutations = {
  /**
   * Creates new data source with a given ID.
   *
   * @param {Object} state   Store state.
   * @param {Object} payload Object with parameters.
   * @return {void}
   */
  createSource(state, payload) {
    const newSource = { data: {}, observers: 0 };
    Vue.set(state.sources, payload.id, newSource);
  },

  /**
   * Updates data source with new data.
   *
   * @param {Object} state   Store state.
   * @param {Object} payload Object with parameters.
   * @return {void}
   */
  updateSource(state, payload) {
    if (state.sources[payload.id]) {
      state.sources[payload.id].data = payload.data;
    }
  },

  /**
   * Adds data source observer.
   *
   * @param {Object} state   Store state.
   * @param {Object} payload Object with parameters.
   * @return {void}
   */
  addObserver(state, payload) {
    state.sources[payload.id].observers++;
  },

  /**
   * Removes data source observer.
   *
   * Data source that doesn't have any active observer is removed from the store
   * and its request loop is stopped.
   *
   * @param {Object} state   Store state.
   * @param {Object} payload Object with parameters.
   * @return {void}
   */
  removeObserver(state, payload) {
    state.sources[payload.id].observers--;
    if (state.sources[payload.id].observers === 0) {
      window.clearInterval(state.sources[payload.id].intervalId);
      Reflect.deleteProperty(state.sources, payload.id);
    }
  },

  /**
   * Associates request loop with data source.
   *
   * @param {Object} state   Store state.
   * @param {Object} payload Object with parameters.
   * @return {void}
   */
  setIntervalId(state, payload) {
    state.sources[payload.id].intervalId = payload.intervalId;
  }
};

const actions = {
  /**
   * Requests new data from Alpha Vantage API and stores it with associated
   * source.
   *
   * @param {Object} param0  Store context object.
   * @param {Object} payload Object with parameters.
   * @return {void}
   */
  refreshSourceData({ commit }, payload) {
    DataApiService.fetchData(payload.params).then((response) => {
      commit('updateSource', {
        id: payload.id,
        data: DataUtil.extractData(payload.params, response),
      });
    });
  }
};


export {
  state,
  getters,
  mutations,
  actions
};
