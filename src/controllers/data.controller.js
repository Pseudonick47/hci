/**
 * Data source manipulation and request orchestration.
 *
 * @author Aleksandar Varga (aleksandar.varga@uns.ac.rs)
 */

import store from 'Store';
import { queue } from 'Util/queue.util';
import DataUtil from 'Util/data.util';
import { INTERVAL_FROM_FUNCTION } from 'Constants/data.constants';


export default {
  /**
   * Starts a loop that periodically looks for new requests and dispatches an
   * action to fulfil the request.
   *
   * @return {void}
   */
  startRequestLoop() {
    setInterval(() => {
      if (!queue.isEmpty()) {
        const task = queue.dequeue();
        store.dispatch(task.action, task.payload);
      }
    }, 1000);
  },

  /**
   * Registers new data source and starts a request loop associated with the
   * source if it doesn't already exist in the store and registers source
   * observer.
   *
   * @param {Object} params Parameters used for data acquisition.
   * @return {void}
   */
  monitorSource(params) {
    if (!DataUtil.validateParams(params)) {
      return;
    }

    const id = DataUtil.computeId(params);

    if (!store.getters.hasSource(id)) {
      // create new source and start its request loop

      store.commit('createSource', { id });

      // initial request
      queue.enqueue({
        action: 'refreshSourceData',
        payload: { id, params }
      });

      const intervalId = window.setInterval(() => {
        queue.enqueue({
          action: 'refreshSourceData',
          payload: { id, params }
        });
      }, INTERVAL_FROM_FUNCTION[params.function]);

      // associate this request loop with the source
      store.commit('setIntervalId', { id, intervalId });
    }

    store.commit('addObserver', { id });
  },

  /**
   * Unregisters source observer.
   *
   * @param {Object} params Parameters used for data acquisition.
   * @return {void}
   */
  stopSourceMonitoring(params) {
    const id = DataUtil.computeId(params);
    store.commit('removeObserver', { id });
  }
};
