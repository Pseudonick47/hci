import Vue from 'vue';
import Vuex from 'vuex';

import { auth, charts, settings, data } from './modules';

Vue.use(Vuex);

const storeData = {
  modules: {
    auth,
    charts,
    settings,
    data,
  },
};

export default new Vuex.Store(storeData);
