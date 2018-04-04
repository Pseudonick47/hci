import Vue from 'vue';
import Vuex from 'vuex';

import { auth, charts, settings } from './modules';

Vue.use(Vuex);

const storeData = {
  modules: {
    auth,
    charts,
    settings
  },
};

export default new Vuex.Store(storeData);
