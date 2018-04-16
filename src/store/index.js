import Vue from 'vue';
import Vuex from 'vuex';

import { workspaces, settings, data } from './modules';

Vue.use(Vuex);

const storeData = {
  modules: {
    workspaces,
    settings,
    data,
  },
};

export default new Vuex.Store(storeData);
