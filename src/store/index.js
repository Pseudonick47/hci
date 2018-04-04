import Vue from 'vue';
import Vuex from 'vuex';

import { auth, charts } from './modules';

Vue.use(Vuex);

const storeData = {
  modules: {
    auth,
    charts
  },
};

export default new Vuex.Store(storeData);
