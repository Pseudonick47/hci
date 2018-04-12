import Vue from 'vue';
import Vuex from 'vuex';

import { auth, workspaces, settings, data } from './modules';

Vue.use(Vuex);

const storeData = {
  modules: {
    auth,
    workspaces,
    settings,
    data,
  },
};

export default new Vuex.Store(storeData);
