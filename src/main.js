import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueChartkick from 'vue-chartkick';
import Chart from 'chart.js';

import StorageController from 'Controllers/storage.controller';
import DataController from 'Controllers/data.controller';

Vue.config.productionTip = false;

Vue.use(VueChartkick, { adapter: Chart });
Vue.use(Vuetify);
Vue.prototype.router = router;

StorageController.initStore();
StorageController.keepLocalStorageSynced();
DataController.populateDataStore();
DataController.startRequestLoop();
DataController.requestExchangeRate();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
