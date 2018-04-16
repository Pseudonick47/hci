<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" max-width="650">
      <v-card>
        <v-card-title class="headline">What should we present to you?</v-card-title>
        <v-tabs
          dark
          v-model="tabs"
          fixed-tabs
          centered
          show-arrows
          tab-slider="cyan"
        >
          <v-tab href="#tabs-stocks" class="primary--text">Stocks</v-tab>
          <v-tab href="#tabs-digital-currencies" class="primary--text">Digital Currencies</v-tab>
          <v-tab href="#tabs-currency-exchange-rate" class="primary--text">Exchange rate</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabs" class="elevation-1">

          <v-tab-item
            key="tab-stocks"
            id="tabs-stocks"
          >
            <v-container mt-4 mb-2 py-1>
              <v-layout row>
                <v-select
                  :items="stocks.companies"
                  v-model="stocks.selectedCompanies"
                  label="Companies that you are interested in"
                  item-text="name"
                  item-value="symbol"
                  return-object
                  autocomplete
                  required
                  multiple
                  clearable
                  :rules="companyRules"
                  @change="stocks.firstInput = false,stocks.addDisabled = false"
                  @update:error="(err) => err ? stocks.addDisabled = err : null"
                ></v-select>
              </v-layout>
              <v-layout row>
                <v-select
                  :items="stocks.frequencies"
                  v-model="stocks.selectedFrequency"
                  label="How often would you like us to update stock values?"
                ></v-select>
              </v-layout>
              <v-layout row>
                <v-select
                  :items="stocks.views"
                  v-model="stocks.selectedView"
                  item-text="name"
                  item-value="view"
                  label="How would you like to see them?"
                  return-object
                ></v-select>
              </v-layout>

              <v-layout row>
                <v-expansion-panel
                  class="elevation-0 pa-0"
                  expand
                  popup
                  @click.native.prevent.stop
                >
                  <v-expansion-panel-content
                    :value="stocks.pointsExpanded"
                    class="pa-0"
                    hide-actions
                    @click.native.prevent.stop
                  >
                    <div
                      class="pa-0"
                      slot="header"
                      @click.native.prevent.stop
                    >
                      <v-radio-group
                        v-model="stocks.values"
                        label="What would you like to see?"
                        row
                        class="px-3"
                        @change="expandStockPoints"
                        @click.native.prevent.stop
                      >
                        <v-radio label="Values" value="values" ></v-radio>
                        <v-radio label="Volume" value="volume"></v-radio>
                      </v-radio-group>
                    </div>
                    <v-container fluid py-0 my-0>
                      <v-layout row wrap px-3>
                        <v-flex
                          v-for="(point, i) in stocks.points"
                          :key="i"
                          xs6 sm3
                        >
                          <v-checkbox
                            v-model="stocks.selectedPoints[point]"
                            :label="point"
                          ></v-checkbox>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-layout>

              <v-layout row mt-3 justify-space-between>
                <v-flex xs5 sm4 md3 lg3 xl3>
                  <v-btn
                    :block="true"
                    @click="close"
                  >CANCEL</v-btn>
                </v-flex>
                <v-flex xs5 sm4 md3 lg3 xl3>
                  <v-btn
                    :block="true"
                    :disabled="stocks.addDisabled"
                    @click="addStocks"
                  >ADD</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>


          <v-tab-item
            key="tab-digital-currencies"
            id="tabs-digital-currencies"
          >
            <v-container mt-4 mb-2 py-1>
              <v-layout row>
                <v-select
                  :items="crypto.currencies"
                  v-model="crypto.selectedCurrencies"
                  label="Digital currencies that you are interested in"
                  item-text="name"
                  item-value="symbol"
                  return-object
                  autocomplete
                  required
                  multiple
                  clearable
                  :rules="cryptoRules"
                  @change="crypto.firstInput = false,crypto.addDisabled = false"
                  @update:error="(err) => err ? crypto.addDisabled = err : null"
                ></v-select>
              </v-layout>
              <v-layout row>
                <v-select
                  :items="crypto.frequencies"
                  v-model="crypto.selectedFrequency"
                  label="How often would you like us to update values?"
                  @input="replaceCryptoPoints"
                ></v-select>
              </v-layout>
              <v-layout row>
                <v-select
                  :items="crypto.views"
                  v-model="crypto.selectedView"
                  item-text="name"
                  item-value="view"
                  label="How would you like to see values?"
                  return-object
                ></v-select>
              </v-layout>

              <v-layout row>
                <v-expansion-panel
                  class="elevation-0 pa-0"
                  expand
                  popup
                  @click.native.prevent.stop
                >
                  <v-expansion-panel-content
                    :value="crypto.pointsExpanded"
                    class="pa-0"
                    hide-actions
                    @click.native.prevent.stop
                  >
                    <div
                      slot="header"
                      class="pa-0"
                      @click.native.prevent.stop
                    >
                      <v-radio-group
                        v-model="crypto.values"
                        label="What would you like to see?"
                        row
                        class="px-3"
                        @change="expandCryptoPoints"
                        @click.native.prevent.stop
                      >
                        <v-radio label="Values" value="values" ></v-radio>
                        <v-radio label="Volume" value="volume"></v-radio>
                        <v-radio label="Market Cap" value="market_cap"></v-radio>
                      </v-radio-group>
                    </div>
                    <v-container fluid py-0 my-0>
                      <v-layout row wrap px-3>
                        <v-flex
                          v-for="(point, i) in crypto.points"
                          :key="i"
                          xs6 sm3
                        >
                          <v-checkbox
                            v-model="crypto.selectedPoints[point]"
                            :label="point"
                          ></v-checkbox>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-layout>

              <v-layout row mt-3 justify-space-between>
                <v-flex xs5 sm4 md3 lg3 xl3>
                  <v-btn
                    :block="true"
                    @click="close"
                  >CANCEL</v-btn>
                </v-flex>
                <v-flex xs5 sm4 md3 lg3 xl3>
                  <v-btn
                    :block="true"
                    :disabled="crypto.addDisabled"
                    @click="addCrypto"
                  >ADD</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>


          <v-tab-item
            key="tab-currency-exchange-rate"
            id="tabs-currency-exchange-rate"
          >
            <v-container mt-4 mb-2 py-1>
              <v-layout row>
                <v-select
                  :items="exchange.currencies"
                  v-model="exchange.from_currency"
                  label="From currency"
                  item-text="name"
                  item-value="symbol"
                  return-object
                  autocomplete
                  required
                  clearable
                  @change="exchange.fromFirstInput = false, exchange.addDisabled = false"
                  @update:error="(err) => err ? exchange.addDisabled = err : null"
                ></v-select>
              </v-layout>
              <v-layout row>
                <v-select
                  :items="exchange.currencies"
                  v-model="exchange.to_currency"
                  label="To currency"
                  item-text="name"
                  item-value="symbol"
                  return-object
                  autocomplete
                  required
                  clearable
                  @change="exchange.toFirstInput = false, exchange.addDisabled = false"
                  @update:error="(err) => err ? exchange.addDisabled = err : null"
                ></v-select>
              </v-layout>
              <v-layout row mt-3 justify-space-between>
                <v-flex xs5 sm4 md3 lg3 xl3>
                  <v-btn
                    :block="true"
                    @click="close"
                  >CANCEL</v-btn>
                </v-flex>
                <v-flex xs5 sm4 md3 lg3 xl3>
                  <v-btn
                    :block="true"
                    :disabled="exchange.addDisabled"
                    @click="addExchange"
                  >ADD</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>


        </v-tabs-items>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import * as _ from 'lodash';

import {
  COMPANIES,
  DIGITAL_CURRENCIES,
  PHYSICAL_CURRENCIES,
  FUNCTIONS,
  DATA_VIEWS,
  UPDATE_FREQUENCIES,
  FREQUENCY_TO_STOCK_FUNCTION,
  FREQUENCY_TO_DC_FUNCTION
} from 'Constants/data.constants';


const POINTS = ['Open', 'Close', 'High', 'Low'].sort();


export default {
  name: 'data-source-dialog',
  props: {
    model: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      tabs: null,
      show: false,
      stocks: {
        companies: COMPANIES,
        selectedCompanies: [],
        firstInput: true,
        values: 'values',
        points: POINTS,
        selectedPoints: _.fromPairs(_.map(POINTS, (e) => [e, true])),
        pointsExpanded: true,
        addDisabled: true,
        frequencies: [
          UPDATE_FREQUENCIES.REALTIME,
          UPDATE_FREQUENCIES.DAILY,
          UPDATE_FREQUENCIES.WEEKLY,
          UPDATE_FREQUENCIES.MONTHLY
        ],
        selectedFrequency: UPDATE_FREQUENCIES.DAILY,
        views: DATA_VIEWS,
        selectedView: DATA_VIEWS[0],
      },
      crypto: {
        currencies: DIGITAL_CURRENCIES,
        selectedCurrencies: [],
        firstInput: true,
        addDisabled: true,
        values: 'values',
        points: POINTS,
        selectedPoints: _.fromPairs(_.map(POINTS, (e) => [e, true])),
        pointsExpanded: true,
        frequencies: [
          UPDATE_FREQUENCIES.REALTIME,
          UPDATE_FREQUENCIES.DAILY,
          UPDATE_FREQUENCIES.WEEKLY,
          UPDATE_FREQUENCIES.MONTHLY
        ],
        selectedFrequency: UPDATE_FREQUENCIES.DAILY,
        views: DATA_VIEWS,
        selectedView: DATA_VIEWS[0],
      },
      exchange: {
        currencies: _.concat(DIGITAL_CURRENCIES, PHYSICAL_CURRENCIES),
        from_currency: null,
        to_currency: null,
        fromFirstInput: true,
        toFirstInput: true,
        addDisabled: true,
      },
    };
  },
  watch: {
    model(val) {
      this.show = val;
    },
    show(val) {
      if (!val) {
        this.close();
      }
    },
  },
  methods: {
    restoreDefaults() {
      this.stocks = {
        companies: COMPANIES,
        selectedCompanies: [],
        firstInput: true,
        values: 'values',
        points: POINTS,
        selectedPoints: _.fromPairs(_.map(POINTS, (e) => [e, true])),
        pointsExpanded: true,
        addDisabled: true,
        frequencies: [
          UPDATE_FREQUENCIES.REALTIME,
          UPDATE_FREQUENCIES.DAILY,
          UPDATE_FREQUENCIES.WEEKLY,
          UPDATE_FREQUENCIES.MONTHLY
        ],
        selectedFrequency: UPDATE_FREQUENCIES.DAILY,
        views: DATA_VIEWS,
        selectedView: DATA_VIEWS[0],
      };

      this.crypto = {
        currencies: DIGITAL_CURRENCIES,
        selectedCurrencies: [],
        firstInput: true,
        addDisabled: true,
        values: 'values',
        points: POINTS,
        selectedPoints: _.fromPairs(_.map(POINTS, (e) => [e, true])),
        pointsExpanded: true,
        frequencies: [
          UPDATE_FREQUENCIES.REALTIME,
          UPDATE_FREQUENCIES.DAILY,
          UPDATE_FREQUENCIES.WEEKLY,
          UPDATE_FREQUENCIES.MONTHLY
        ],
        selectedFrequency: UPDATE_FREQUENCIES.DAILY,
        views: DATA_VIEWS,
        selectedView: DATA_VIEWS[0],
      };

      this.exchange = {
        currencies: _.concat(DIGITAL_CURRENCIES, PHYSICAL_CURRENCIES),
        from_currency: null,
        to_currency: null,
        fromFirstInput: true,
        toFirstInput: true,
        addDisabled: true,
      };
    },

    close() {
      this.restoreDefaults();
      this.$emit('closeDialog');
    },

    addStocks() {
      const {
        selectedCompanies,
        selectedFrequency,
        selectedView,
        selectedPoints,
        values
      } = this.stocks;

      const func = FREQUENCY_TO_STOCK_FUNCTION[selectedFrequency];

      const requests = [];

      _.forEach(selectedCompanies, (company) => {
        const request = {
          function: func,
          symbol: company.symbol,
        };

        if (func === FUNCTIONS.TIME_SERIES_INTRADAY) {
          request.interval = '1min';
        }

        requests.push(request);
      });

      let points = [];

      if (values === 'volume') {
        points.push('Volume');
      } else {
        points = _.filter(_.flatMap(selectedPoints, (v, k) => {
          return v ? k : null;
        }));
      }

      this.$emit('dataSourceSelected', {
        view: {
          name: selectedView.view,
          points
        },
        requests
      });
    },

    addCrypto() {
      const {
        selectedCurrencies,
        selectedFrequency,
        selectedView,
        selectedPoints,
        values
      } = this.crypto;

      const func = FREQUENCY_TO_DC_FUNCTION[selectedFrequency];

      const requests = [];

      _.forEach(selectedCurrencies, (currency) => {
        requests.push({
          function: func,
          symbol: currency.symbol,
          market: this.$store.getters.currencyValue,
        });
      });

      let points = [];

      if (values === 'volume') {
        points.push('Volume');
      } else if (values === 'market_cap') {
        points.push('Market Cap');
      } else if (func === FUNCTIONS.DIGITAL_CURRENCY_INTRADAY) {
          points.push('Price');
        } else {
          points = _.filter(_.flatMap(selectedPoints, (v, k) => {
            return v ? k : null;
          }));
        }

      this.$emit('dataSourceSelected', {
        view: {
          name: selectedView.view,
          points
        },
        requests
      });
    },

    addExchange() {
      const { from_currency, to_currency } = this.exchange;

      this.$emit('dataSourceSelected', {
        view: {
          name: 'exchange-view',
          points: ['From Currency', 'To Currency', 'Rate'],
        },
        requests: [
          {
            symbol: '',
            function: FUNCTIONS.CURRENCY_EXCHANGE_RATE,
            from_currency: from_currency.symbol,
            to_currency: to_currency.symbol,
          },
        ],
      });
    },

    expandStockPoints(val) {
      if (val === 'values') {
        this.stocks.pointsExpanded = true;
      } else {
        this.stocks.pointsExpanded = false;
      }
    },

    expandCryptoPoints(val) {
      if (val === 'values') {
        this.crypto.pointsExpanded = true;
      } else if (val === 'volume') {
        this.crypto.pointsExpanded = false;
      } else {
        this.crypto.pointsExpanded = false;
      }
    },

    replaceCryptoPoints() {
      const { selectedFrequency } = this.crypto;

      if (selectedFrequency === UPDATE_FREQUENCIES.REALTIME) {
        this.crypto.points = [];
        this.crypto.selectedPoints = null;
      } else {
        this.crypto.points = POINTS;
        this.crypto.selectedPoints = _.fromPairs(_.map(POINTS, (e) => [e, true]));
      }
    },
  },
  computed: {
    companyRules() {
      return [
        () => {
          return this.stocks.firstInput ||
                this.stocks.selectedCompanies.length > 0 ||
                'You must choose at least one';
        },
      ];
    },

    cryptoRules() {
      return [
        () => {
          return this.crypto.firstInput ||
                this.crypto.selectedCurrencies.length > 0 ||
                'You must choose at least one';
        },
      ];
    },
  },
};
</script>
<style>
.expansion-panel__header {
  padding: 0 !important;
}
</style>

