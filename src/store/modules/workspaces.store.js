import * as _ from 'lodash';
import Vue from 'vue';
import DataController from 'Controllers/data.controller';

const state = {
  tabs: { '0': { componentId: 0, name: 'New Tab', layout: [] } },
  tabId: 0
};

const getters = {
  layout: (state) => (tabId) => {
    return state.tabs[tabId].layout;
  },

  tabs: (state) => state.tabs,
  tab: (state) => (id) => state.tabs[id]
};

const mutations = {
  updateLayoutStorage(state) {
    localStorage.setItem('tabId', JSON.stringify(state.tabId));
    localStorage.setItem('tabs', JSON.stringify(state.tabs));
  },

  setTabs(state, data) {
    state.tabId = data.tabId || 0;

    _.forEach(data.tabs, (tab) => {
      _.forEach(tab.layout, (component) => {
        DataController.startMonitoring(component.requests);
      });
    });

    Vue.set(state, 'tabs', _.isEmpty(data.tabs) ? state.tabs : data.tabs);
  },

  removeComponent(state, data) {
    const index = _.findIndex(state.tabs[data.tabId].layout, { i: data.id });
    if (index < 0) {
      return;
    }
    state.tabs[data.tabId].layout.splice(index, 1);
  },

  addComponent(state, payload) {
    const { tabId, requests, view } = payload;

    const tab = state.tabs[tabId];

    tab.componentId++;

    tab.layout.push({
      x: 0,
      y: 0,
      w: 40,
      h: 30,
      i: String(tab.componentId),
      requests,
      view,
    });
  },
  addTab(state) {
    state.tabId++;
    const newTab = { componentId: 0, layout: [], name: 'New Tab' };
    Vue.set(state.tabs, `${state.tabId}`, newTab);
  },

  removeTab(state, tabId) {
    Vue.delete(state.tabs, tabId);
  },

  renameTab(state, data) {
    const tab = state.tabs[data.tabId];
    tab.name = data.name;
  }
};

export {
  state,
  getters,
  mutations,
};
