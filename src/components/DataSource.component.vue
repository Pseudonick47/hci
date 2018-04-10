<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" max-width="650">
      <v-card>
        <v-card-title class="headline">What should we present?</v-card-title>
        <!-- <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text> -->
        <v-tabs
          v-model="tabs"
          fixed-tabs
          py-3
        >
          <v-tabs-slider></v-tabs-slider>
          <v-container>
            <v-layout>
              <v-flex xs4>
              <v-tab href="#tabs-stocks" class="primary--text">Stocks</v-tab>
              </v-flex>
              <v-flex xs4>
              <v-tab href="#tabs-digital-currencies" class="primary--text">Digital Currencies</v-tab>
              </v-flex>
              <v-flex xs4>
              <v-tab href="#tabs-currency-exchange-rate" class="primary--text">Exchange rate</v-tab>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tabs>
        <v-tabs-items v-model="tabs" class="elevation-1">
          <v-tab-item
            key="tab-stocks"
            id="tabs-stocks"
            pa-5
          >
            <v-container>
              <v-layout row>
                <v-flex pa-4>
                  <v-select
                    :items="companies"
                    v-model="companyModel"
                    label="Select company"
                    autocomplete
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex>
                  <v-btn @click="selectedCompany">ADD</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <v-tab-item
            key="tab-digital-currencies"
            id="tabs-digital-currencies"
          >
            <v-container>
              <v-layout row>
                <v-flex pa-4>
                  <v-select
                    :items="digital_currencies"
                    v-model="digitalCurrencyModel"
                    label="Select digital currency"
                    autocomplete
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex>
                  <v-btn @click="selectedDigitalCurrency">ADD</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <v-tab-item
            key="tab-currency-exchange-rate"
            id="tabs-currency-exchange-rate"
          >
            <v-card>
              <v-card-text>Hi</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import * as _ from 'lodash';
import { COMPANIES, DIGITAL_CURRENCIES } from 'Constants/data.constants';

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
      companyModel: 'GOOG',
      digitalCurrencyModel: 'BTC',
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
    close() {
      this.$emit('closeDataSourceDialog');
    },
    selectedCompany() {
      const symbol = COMPANIES[
        this.companyModel.replace(' ', '_').toUpperCase()
      ];

      this.$emit('dataSourceSelected', {
        dataView: {
          type: 'chart',
          subtype: 'line'
        },
        dataSource: {
          apiParams: {
            function: 'TIME_SERIES_DAILY',
            symbol
          },
          points: ['high', 'low'],
        }
      });
    },
    selectedDigitalCurrency() {
      const symbol = DIGITAL_CURRENCIES[
        this.digitalCurrencyModel.replace(' ', '_').toUpperCase()
      ];

      this.$emit('dataSourceSelected', {
        dataView: {
          type: 'chart',
          subtype: 'line'
        },
        dataSource: {
          apiParams: {
            function: 'DIGITAL_CURRENCY_DAILY',
            symbol,
            market: this.$store.getters.currencyValue,
          },
          points: ['high', 'low'],
        }
      });
    },
  },
  computed: {
    companies() {
      const data = [];
      _.forEach(Reflect.ownKeys(COMPANIES).sort(), (el) => {
        data.push(_.startCase(el.replace('_', ' ').toLowerCase()));
      });
      return data;
    },
    digital_currencies() {
      const data = [];
      _.forEach(Reflect.ownKeys(DIGITAL_CURRENCIES).sort(), (el) => {
        data.push(_.startCase(el.replace('_', ' ').toLowerCase()));
      });
      return data;
    }
  }
};
</script>

