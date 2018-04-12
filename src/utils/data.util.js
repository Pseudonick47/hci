/**
 * Helper functions used for data acquisition and manipulation.
 *
 * @author Aleksandar Varga (aleksandar.varga@uns.ac.rs)
 */

import * as _ from 'lodash';

import {
  API_KEY,
  ID_FROM_FUNCTION,
  REQUIRED_PARAMS,
  PROPERTY_FROM_FUNCTION,
  FUNCTIONS,
  MAP_PROPERTIES
} from 'Constants/data.constants.js';


export default {

  /**
   * Formats URL based on parameters and inserts API key.
   *
   * @param {Object} parameters Parameters used for data acquisition.
   * @return {string}           Request URL.
   */
  formatUrl(parameters) {
    let query = '';
    _.forOwn(parameters, (value, key) => {
      query += `&${key}=${value}`;
    });
    return `https://www.alphavantage.co/query?apikey=${API_KEY}${query}`;
  },

  /**
   * Checks if all required parameters for data acquisition are present.
   *
   * @param {Object} request  API request used for data acquisition.
   * @return {bool}           True if parameters are valid, false otherwise.
   */
  validateRequest(request) {
    // function is mandatory for all params
    if (!_.has(request, 'function')) {
      return false;
    }

    let valid = true;
    // check if all required params in respect to function are present
    _.forEach(REQUIRED_PARAMS[request.function], (param) => {
      if (!_.has(request, param)) {
        valid = false;
        // exit loop
        return false;
      }
    });

    return valid;
  },

  /**
   * Generates source ID.
   *
   * ID is generated using parameters that are unique for function that is being
   * used.
   *
   * @param {Object} params Parameters used for data acquisition.
   * @return {string}       Generated ID.
   */
  computeSourceId(params) {
    let id = '';

    // grab what parameters to use for ID generation
    _.forEach(ID_FROM_FUNCTION[params.function], (param) => {
      id += `${params[param].toLowerCase()}-`;
    });

    return id.slice(0, -1);
  },

  /**
   * Remaps properties acquired from Aplha Vantage API to properties that we
   * use.
   *
   * Properties are remaped in respect to function used.
   *
   * @param {Object} params Parameters used for data acquisition.
   * @param {Object} data   Data acquired.
   * @return {Object}       Remaped data;
   */
  mapProperties(params, data) {
    const processed = {};

    // currency exchange function doesn't return a collection
    if (params.function === FUNCTIONS.CURRENCY_EXCHANGE_RATE) {
      _.forOwn(MAP_PROPERTIES[params.function], (value, key) => {
        processed[key] = data[value];
      });
    } else {
      // data is a collection of objects

      // remap props for every record (i.e. date)
      _.forOwn(data, (value, key) => {
        const el = {};
        _.forOwn(MAP_PROPERTIES[params.function], (el_value, el_key) => {
          let prop = el_value;

          // crypto has a parameterized response
          if (prop.indexOf('*') > -1) {
            // grab user defined currency from settings store
            prop = prop.replace('*', params.market);
          }

          el[el_key] = value[prop];
        });

        processed[key] = el;
      });
    }

    return processed;
  },

  /**
   * Extracts only useful data from Alpha Vantage response.
   *
   * Strips meta data object and remaps properties.
   *
   * @param {Object} params   Parameters used for data acquisition.
   * @param {Object} response Alpha Vantage API response.
   * @return {Object}         Extracted data;
   */
  extractData(params, response) {
    // extract only useful data
    let data = response.data[PROPERTY_FROM_FUNCTION[params.function]];

    // remap props
    data = this.mapProperties(params, data);
    return data;
  },

  /**
   * Reduces every object from a collection to a single property of interest.
   *
   * @param {Object} collection Collection of objects.
   * @param {string} prop       Property of interest.
   * @return {Object}           Collection of extracted properties.
   */
  extractProperty(collection, prop) {
    const p = _.toLower(prop);
    const data = {};
    _.forOwn(collection, (value, key) => {
      data[key] = value[p];
    });
    return data;
  },

};
