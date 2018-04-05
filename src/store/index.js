import Vue from 'vue';
import Vuex from 'vuex';

import { auth, charts, settings, stocks } from './modules';

Vue.use(Vuex);

const storeData = {
  modules: {
    auth,
    charts,
    settings,
    stocks,
  },
};

export default new Vuex.Store(storeData);
