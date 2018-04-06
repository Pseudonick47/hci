import store from 'Store';
import { queue } from 'Util/queue.util';


export default {
  startRequestListener() {
    setInterval(() => {
      if (!queue.isEmpty()) {
        const payload = queue.dequeue();
        store.dispatch(payload.action, payload.params);
      }
    }, 1000);
  },

  monitorStocks(parameters = {}, interval = 60000) {
    const id = `${parameters.symbol}-${interval}`;

    if (!store.getters.hasSource(id)) {
      store.commit('addSource', { entity: parameters.symbol, interval });

      queue.enqueue({
        action: 'fetchSource',
        params: { api: parameters, interval }
      });

      const intervalId = window.setInterval(() => {
        queue.enqueue({
          action: 'fetchSource',
          params: { api: parameters, interval }
        });
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
