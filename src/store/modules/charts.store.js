import * as _ from 'lodash';
import Vue from 'vue';

const state = {
  // tabs: { id: { componentId: 0, layout: [{chartData, chartType, x, y , w, h, i }], name, }, id: .... }
  tabs: { '0': { componentId: 0, name: 'Tab 0', layout: [] } },
  tabId: 0,
};

const getters = {
  layout: (state) => (tabId) => {
    return state.tabs[tabId].layout;
  },
  allIdsOnLayout: (state) => (id) => _.map(state.tabs[id].layout, 'id'),
  dataById: (state) => (tabId, id) => {
    return _.find(state.tabs[tabId], { id });
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
    Vue.set(state, 'tabs', _.isEmpty(data.tabs) ? state.tabs : data.tabs);
  },
  removeComponent(state, data) {
    const index = _.findIndex(state.tabs[data.tabId].layout, { i: data.id });
    if (index < 0) {
      return;
    }
    state.tabs[data.tabId].layout.splice(index, 1);
  },
  addComponent(state, tabId) {
    const tab = state.tabs[tabId];

    tab.componentId++;
    tab.layout.push({ x: 0, y: 0, w: 2, h: 2, i: String(tab.componentId), chartData: [], chartType: 'line' });
  },
  addTab(state) {
    state.tabId++;
    const newTab = { componentId: 0, layout: [], name: `Tab ${state.tabId}` };
    Vue.set(state.tabs, `${state.tabId}`, newTab);
  },
};

export {
  state,
  getters,
  mutations,
};
