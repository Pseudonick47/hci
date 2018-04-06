// import * as _ from 'lodash';

import store from 'Store';

export default {
  initStore() {
    store.commit('setTabs', {
      tabId: JSON.parse(localStorage.getItem('tabId')),
      tabs: JSON.parse(localStorage.getItem('tabs'))
    });
    store.commit('setSettings', JSON.parse(localStorage.getItem('settings')));
  },

  keepLocalStorageSynced() {
    setInterval(() => {
      console.log('store => localstorage');
      store.commit('updateLayoutStorage');
      store.commit('updateSettingsStorage');
    }, 10000);
  }
};
