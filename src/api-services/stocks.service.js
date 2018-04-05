import Axios from 'axios';
import * as _ from 'lodash';
import { PARAMETER_KEYS } from 'Constants/stocks.constants';

const API_KEY = 'P7S43A98HP26MCVF';

export default {
    formatUrl(parameters = {}) {
        let query = '';
        _.forOwn(parameters, (value, key) => {
            if (value && PARAMETER_KEYS[key]) {
                query += `&${PARAMETER_KEYS[key]}=${value}`;
            }
        });
        return `https://www.alphavantage.co/query?apikey=${API_KEY}${query}`;
    },

    fetchStockData(parameters) {
        return Axios.get(this.formatUrl(parameters));
    },
};
