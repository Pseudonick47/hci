/**
 * Data source manipulation and request orchestration.
 *
 * @author Aleksandar Varga (aleksandar.varga@uns.ac.rs)
 */

import * as _ from 'lodash';
import store from 'Store';

import { INTERVAL_FROM_FUNCTION, FUNCTIONS } from 'Constants/data.constants';

import DataUtil from 'Util/data.util';
import { queue } from 'Util/queue.util';


export default {
  /**
   * Initializes data sources from local storage.
   *
   * @return {void}
   */
  populateDataStore() {
    store.commit('loadData');
  },
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

  requestExchangeRate() {
    const request = {
      function: FUNCTIONS.CURRENCY_EXCHANGE_RATE,
      from_currency: 'USD',
      to_currency: store.getters.currencyValue,
    };

    queue.enqueue({
      action: 'updateExchangeRate',
      payload: { request },
    });

    window.setInterval(() => {
      request.to_currency = store.getters.currencyValue;

      queue.enqueue({
        action: 'updateExchangeRate',
        payload: { request }
      });
    }, INTERVAL_FROM_FUNCTION[request.function]);
  },

  /**
   * Registers new data sources and starts a request loop associated with each
   * source if it doesn't already exist in the store and registers source
   * observer.
   *
   * @param {Object} requests API requests used for data acquisition.
   * @return {void}
   */
  startMonitoring(requests) {
    _.each(requests, (request) => {
      if (!DataUtil.validateRequest(request)) {
        return;
      }

      const id = DataUtil.computeSourceId(request);

      if (!store.getters.hasSource(id)) {
        // create new source and start its request loop

        store.commit('createSource', {
          id,
          function: request.function,
          symbol: request.symbol,
        });

        // initial request
        queue.enqueue({
          action: 'updateSourceData',
          payload: { id, request }
        });

        const interval = window.setInterval(() => {
          queue.enqueue({
            action: 'updateSourceData',
            payload: { id, request }
          });
        }, INTERVAL_FROM_FUNCTION[request.function]);

        // associate this request loop with the source
        store.commit('setIntervalId', { id, interval });
      }

      store.commit('addObserver', { id });
    });
  },

  /**
   * Unregisters source observer.
   *
   * @param {Object} params Parameters used for data acquisition.
   * @return {void}
   */
  stopMonitoring(params) {
    const id = DataUtil.computeId(params);
    store.commit('removeObserver', { id });
  }
};
