<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" max-width="650">
      <v-card>
        <v-card-title class="headline">What should we present to you?</v-card-title>
        <!-- <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text> -->
        <v-tabs
          v-model="tabs"
          fixed-tabs
          centered
          show-arrows
        >
          <v-tabs-slider></v-tabs-slider>
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
                  :items="companies"
                  v-model="companyModel"
                  label="Companies that you are interested in"
                  item-text="name"
                  item-value="symbol"
                  return-object
                  autocomplete
                  required
                  multiple
                  clearable
                  :rules="companyRules"
                  @change="companyFirstInput = false, companyButtonDisabled = false"
                  @update:error="(err) => err ? companyButtonDisabled = err : null"
                ></v-select>
              </v-layout>
              <v-layout row>
                <v-select
                  :items="updateFrequencies"
                  v-model="updateFrequencyModel"
                  label="How often would you like us to update stock values?"
                ></v-select>
              </v-layout>
              <v-layout row>
                <v-select
                  :items="views"
                  v-model="viewModel"
                  item-text="name"
                  item-value="view"
                  label="How would you like to see them?"
                  return-object
                ></v-select>
              </v-layout>

              <v-layout row>
                <v-expansion-panel
                  class="elevation-0"
                  expand
                  popup
                >
                  <v-expansion-panel-content
                    :value="true"
                    hide-actions
                  >
                    <div
                      slot="header"
                    >
                      <v-radio-group
                        v-model="companyPointTypeModel"
                        label="What would you like to see?"
                        row
                        @click.native="expandStockPoints($event)"
                      >
                        <v-radio label="Values" value="values" ></v-radio>
                        <v-radio label="Volume" value="volume"></v-radio>
                      </v-radio-group>
                    </div>
                    <v-container fluid py-0 my-0>
                      <v-layout row wrap px-3>
                        <v-flex
                          v-for="(point, i) in companyPoints"
                          :key="i"
                          xs6 sm3
                        >
                          <v-checkbox
                            v-model="companyPointsModel[point]"
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
                    :disabled="companyButtonDisabled"
                    @click="companySelected"
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
                  :items="digitalCurrencies"
                  v-model="digitalCurrencyModel"
                  label="Digital currencies that you are interested in"
                  item-text="name"
                  item-value="symbol"
                  return-object
                  autocomplete
                  required
                  multiple
                  clearable
                  :rules="digitalCurrencyRules"
                  @change="digitalCurrencyFirstInput = false, digitalCurrencyButtonDisabled = false"
                  @update:error="(err) => err ? digitalCurrencyButtonDisabled = err : null"
                ></v-select>
              </v-layout>
              <v-layout row>
                <v-select
                  :items="updateFrequencies"
                  v-model="updateFrequencyModel"
                  label="How often would you like us to update values?"
                ></v-select>
              </v-layout>
              <v-layout row>
                <v-select
                  :items="views"
                  v-model="viewModel"
                  item-text="name"
                  item-value="view"
                  label="How would you like to see values?"
                  return-object
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
                    :disabled="digitalCurrencyButtonDisabled"
                    @click="digitalCurrencySelected"
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
                  :items="exchangeCurrencies"
                  v-model="exchangeFromCurrencyModel"
                  label="From currency"
                  item-text="name"
                  item-value="symbol"
                  return-object
                  autocomplete
                  required
                  clearable
                  @change="exchangeFromCurrencyFirstInput = false, exchangeCurrencyButtonDisabled = false"
                  @update:error="(err) => err ? exchangeCurrencyButtonDisabled = err : null"
                ></v-select>
              </v-layout>
              <v-layout row>
                <v-select
                  :items="exchangeCurrencies"
                  v-model="exchangeToCurrencyModel"
                  label="To currency"
                  item-text="name"
                  item-value="symbol"
                  return-object
                  autocomplete
                  required
                  clearable
                  @change="exchangeToCurrencyFirstInput = false, exchangeCurrencyButtonDisabled = false"
                  @update:error="(err) => err ? exchangeCurrencyButtonDisabled = err : null"
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
                    :disabled="exchangeCurrencyButtonDisabled"
                    @click="exchangeCurrencySelected"
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

const COMPANY_POINTS = ['Open', 'Close', 'High', 'Low'].sort();

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

      companies: COMPANIES,
      companyModel: [],
      companyFirstInput: true,
      companyButtonDisabled: true,
      companyPointTypeModel: 'values',
      companyPoints: COMPANY_POINTS,
      companyPointsModel: _.fromPairs(_.map(COMPANY_POINTS, (e) => [e, true])),
      companyPointsExpanded: true,

      digitalCurrencies: DIGITAL_CURRENCIES,
      digitalCurrencyModel: [],
      digitalCurrencyFirstInput: true,
      digitalCurrencyButtonDisabled: true,

      exchangeCurrencies: _.concat(DIGITAL_CURRENCIES, PHYSICAL_CURRENCIES),
      exchangeFromCurrencyModel: null,
      exchangeToCurrencyModel: null,
      exchangeFromCurrencyFirstInput: true,
      exchangeToCurrencyFirstInput: true,
      exchangeCurrencyButtonDisabled: true,

      updateFrequencies: [UPDATE_FREQUENCIES.REALTIME, UPDATE_FREQUENCIES.DAILY, UPDATE_FREQUENCIES.WEEKLY, UPDATE_FREQUENCIES.MONTHLY],
      updateFrequencyModel: UPDATE_FREQUENCIES.DAILY,

      views: DATA_VIEWS,
      viewModel: DATA_VIEWS[0],
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
      this.companyModel = [];
      this.companyFirstInput = true;
      this.compayButtonDisabled = true;
      this.companyPoints = COMPANY_POINTS;
      this.companyPointsModel = _.fromPairs(_.map(COMPANY_POINTS, (e) => [e, true]));

      this.digitalCurrencyModel = [];
      this.digitalCurrencyFirstInput = true;
      this.digitalCurrencyButtonDisabled = true;

      this.exchangeFromCurrencyModel = null;
      this.exchangeToCurrencyModel = null;
      this.exchangeFromCurrencyFirstInput = true;
      this.exchangeToCurrencyFirstInput = true;
      this.exchangeCurrencyButtonDisabled = true;

      this.updateFrequencyModel = UPDATE_FREQUENCIES.DAILY;
      this.viewModel = DATA_VIEWS[0];
    },

    close() {
      this.restoreDefaults();
      this.$emit('closeDataSourceDialog');
    },

    companySelected() {
      const func = FREQUENCY_TO_STOCK_FUNCTION[this.updateFrequencyModel];

      const requests = [];

      _.forEach(this.companyModel, (company) => {
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

      if (this.companyPointTypeModel === 'volume') {
        points.push('Volume');
      } else {
        points = _.filter(_.flatMap(this.companyPointsModel, (v, k) => {
          return v ? k : null;
        }));
      }

      this.$emit('dataSourceSelected', {
        view: {
          name: this.viewModel.view,
          points
        },
        requests
      });
    },

    digitalCurrencySelected() {
      console.log('Digital currencies', {
        view: this.viewModel.view,
        source: {
          function: FREQUENCY_TO_DC_FUNCTION[this.updateFrequencyModel],
          symbols: _.map(this.digitalCurrencyModel, (el) => el.symbol),
        },
      });
    },

    exchangeCurrencySelected() {
      console.log('Exchange currencies', {
        view: this.viewModel.view,
        source: {
          function: FUNCTIONS.CURRENCY_EXCHANGE_RATE,
          from_currency: this.exchangeFromCurrencyModel.symbol,
          to_currency: this.exchangeToCurrencyModel.symbol,
        },
      });
    },
    expandStockPoints(e) {
      if (this.companyPointTypeModel === 'values' && this.companyPointsExpanded) {
        e.stopPropagation();
      } else if (this.companyPointTypeModel === 'values' && !this.companyPointsExpanded) {
        this.companyPointsExpanded = true;
      } else if (this.companyPointTypeModel === 'volume' && this.companyPointsExpanded) {
        this.companyPointsExpanded = false;
      } else {
        e.stopPropagation();
      }
    },
    test(e) {
      e.preventDefault();
    },
  },
  computed: {
    companyRules() {
      return [() => this.companyFirstInput || this.companyModel.length > 0 || 'You must choose at least one'];
    },
    digitalCurrencyRules() {
      return [() => this.digitalCurrencyFirstInput || this.digitalCurrencyModel.length > 0 || 'You must choose at least one'];
    },
  },
};
</script>
