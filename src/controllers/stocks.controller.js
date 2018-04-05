import store from 'Store';
import StocksApiService from 'Api/stocks.service.js';
import { ACTIONS } from 'Constants/stocks.constants.js';


export default {
  extractData(parameters, response) {
    return response.data[ACTIONS[parameters.apiFunction]];
  },

  monitorStocks(parameters = {}, interval = 6000) {
    if (!store.getters.hasSource(`${parameters.symbol}-${interval}`)) {
      store.commit('addSource', { entity: parameters.symbol, interval });

      setInterval(() => {
        StocksApiService.fetchStockData(parameters).then((response) => {
          const data = this.extractData(parameters, response);
          store.commit('updateSource', { id: `${parameters.symbol}-${interval}`, data });
        });
      }, interval);
    }
  },
};
