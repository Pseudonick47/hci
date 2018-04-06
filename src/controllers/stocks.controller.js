import store from 'Store';

export default {
  monitorStocks(parameters = {}, interval = 60000) {
    const id = `${parameters.symbol}-${interval}`;

    if (!store.getters.hasSource(id)) {
      store.commit('addSource', { entity: parameters.symbol, interval });

      store.dispatch('fetchSource', { api: parameters, interval });
      const intervalId = window.setInterval(() => {
        store.dispatch('fetchSource', { api: parameters, interval });
      }, interval);

      store.commit('setIntervalId', { id, intervalId });
    }

    store.commit('addObserver', id);
  },

  stopMonitoring(symbol, interval = 60000) {
    const id = `${symbol}-${interval}`;
    store.commit('removeObserver', id);
  }
};
