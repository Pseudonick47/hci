/**
 * Data acquisition from Alpha Vantage API.
 *
 * @author Aleksandar Varga (aleksandar.varga@uns.ac.rs)
 */

import Axios from 'axios';
import DataUtil from 'Util/data.util';


export default {
  /**
   * Requests data from Alpha Vantage API.
   *
   * @param {Object} parameters Parameters for data acquisition;
   * @return {Object}           Alpha Vantage API response.
   */
  fetchData(parameters) {
    return Axios.get(DataUtil.formatUrl(parameters));
  }
};
