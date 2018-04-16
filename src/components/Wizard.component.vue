
<template>
  <v-dialog
    v-model="showWizard"
    fixed
    persistent
    max-width="100%"
    transition="dialog-bottom-transition"
  >
    <v-stepper
      v-model="step"
      height="300px"
    >
      <v-stepper-header>
        <v-stepper-step
          step="1"
          :complete="step > 1"
        >Welcome</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          step="2"
          :complete="step > 2"
        >Types of view</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          step="3"
          :complete="step > 3"
        >Choose layout</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          step="4"
          :complete="step > 4"
        >Choose companies/currencies</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-layout row>
            <v-card class="card-app-photo">
              <div class="wiz-div">
                <img
                class="wiz-img"
                src="./../assets/app.png">
              </div>
            </v-card>
          </v-layout>
          <v-footer>
            <v-btn
              @mouseover="alertMessage(true)"
              @mouseout="alertMessage(false)"
              @click="closeWizard"
              left
              color="red"
            >
              <v-icon left>remove_circle</v-icon>skip wizard
            </v-btn>
            <div class="alert">
              <v-alert
                color="orange"
                v-model="alert"
                transition="scale-transition"
                icon="warning"
              >
                Not recommended!<br>If you skip this, we will choose default layout, companies and currencies.<br>You can change it later.
                <br>
              </v-alert>
            </div>
            <v-btn
              color="primary"
              @click="step = 2"
              right
              absolute
            >next</v-btn>
          </v-footer>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card class="app-card">
            <div id="left">
              <p class="mini-title">Graph</p>
              <p>
                <img
                  src="./../assets/graph.png"
                  height="220px"
                  width="350px"
                >
              </p>
              <p></p>
            </div>
            <div id="middle">
              <p class="mini-title">Table</p>
              <p>
                <img
                  src="./../assets/table.png"
                  height="220px"
                  width="350px"
                >
              </p>
              <p></p>
            </div>
            <div id="right">
              <p class="mini-title">Trend</p>
              <p><img src="./../assets/trend.png" width="350px"></p>
              <p></p>
            </div>
          </v-card>
          <v-card height="20px"></v-card>
          <v-card class="app-card">
            <div id="left">
              <p class="mini-title">Bar chart</p>
              <p>
                <img
                  src="./../assets/bar-chart.jpg"
                  width="350px"
                >
              </p>
              <p></p>
            </div>
            <div id="middle">
              <p class="mini-title">Column chart</p>
              <p>
                <img
                  src="./../assets/column-chart.png"
                  width="350px"
                >
              </p>
              <p></p>
            </div>
            <div id="right">
              <p class="mini-title">Scatter chart</p>
              <p>
                <img
                  src="./../assets/scatter-chart.jpg"
                  width="350px"
                >
              </p>
              <p></p>
            </div>
          </v-card>
          <v-footer>
            <v-btn
              color="primary"
              @click="step = 3"
              right
              absolute
            >next</v-btn>
            <v-btn
              flat
              @click="step = 1"
              left
              absolute
            >
              <v-icon left>arrow_back</v-icon>back
            </v-btn>
          </v-footer>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card>
            <!-- <p class="layoutChosen">Layout chosen: {{ layout }}</p> -->
            <div class="layout-options-wrapper">
              <div
                id="left-half"
                v-ripple
                @click="selectLayout('default-layout')"
              >
                <p class="mini-title">Default layout</p>
                <hr>
                <p height="5px"></p>
                <p>
                  <img
                    src="./../assets/default-layout.jpg"
                    height="300px"
                    width="500px"
                  >
                </p>
                <p>We will display predefined view-components with the data of the companies and currencies you have selected.</p>
              </div>
              <div
                id="right-half"
                v-ripple
                @click="selectLayout('advanced-layout')"
              >
                <p class="mini-title">Advanced layout</p>
                <hr>
                <p height="5px"></p>
                <p>
                  <img
                    src="./../assets/advanced-layout.png"
                    height="300px"
                    width="350px"
                  >
                </p>
                <p>You choose companies and currencies you want to see, as well as the way data is displayed, when you add new view-component.</p>
              </div>
            </div>
          </v-card>
          <v-card height="20px"></v-card>
          <hr>
          <v-card>
            <v-tooltip right>
              <v-icon
                large
                slot="activator"
              >info</v-icon>
              <span>You can change this later!</span>
            </v-tooltip>
          </v-card>
          <v-footer>
            <v-btn
              flat
              @click="step = 2"
              left
              absolute
            >
              <v-icon left>arrow_back</v-icon>back
            </v-btn>
            <v-btn
              color="primary"
              @click="companiesCurrenciesStep"
              right
              absolute
            >next</v-btn>
          </v-footer>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-layout row class="layout-options-wrapper">
            <v-card class="flex-item-equal">
              <p class="mini-title">Companies</p>
              <hr>
              <p height="5px"></p>
              <p class="list-label">Select companies:</p>
              <div class="container">
                <v-select
                  :items="companies"
                  v-model="selectedCompanies"
                  label="Companies that you are interested in"
                  item-text="name"
                  item-value="symbol"
                  return-object
                  autocomplete
                  required
                  multiple
                  clearable
                ></v-select>
              </div>
            </v-card>
            <v-card class="flex-item-equal">
              <p class="mini-title">Currencies</p>
              <hr>
              <p height="5px"></p>
              <p class="list-label">Select currencies:</p>
              <div class="container">
                <v-select
                  :items="currencies"
                  v-model="selectedCurrencies"
                  label="Digital currencies that you are interested in"
                  item-text="name"
                  item-value="symbol"
                  return-object
                  autocomplete
                  required
                  multiple
                  clearable
                ></v-select>
              </div>
            </v-card>
          </v-layout>
          <v-card>
            <v-tooltip right>
              <v-icon
                large
                slot="activator"
              >info</v-icon>
              <span>You can change this later!</span>
            </v-tooltip>
          </v-card>
          <v-footer>
            <v-btn
              color="success"
              @click="addComponents"
              right
              absolute
            >
            done<v-icon right>check_circle</v-icon>
            </v-btn>
            <v-btn
              flat
              @click="step = 3"
              left
              absolute
            >
              <v-icon dark left>arrow_back</v-icon>back
            </v-btn>
          </v-footer>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-dialog>
</template>

<script>
import * as _ from 'lodash';

import StorageController from 'Controllers/storage.controller';

import {
  COMPANIES,
  DIGITAL_CURRENCIES,
  FUNCTIONS,
} from 'Constants/data.constants';

export default {
  name: 'Wizard',
  data() {
    return {
      showWizard: false,
      alert: false,
      step: 1,
      layout: 'default-layout',
      companies: COMPANIES,
      currencies: DIGITAL_CURRENCIES,
      selectedCompanies: [],
      selectedCurrencies: [],
    };
  },
  methods: {
    addComponents() {
      const components = [];

      _.forEach(this.selectedCompanies, (company) => {
        components.push({
          view: {
            name: 'line-chart',
            points: ['Open', 'Close'],
          },
          requests: [
            {
              function: FUNCTIONS.TIME_SERIES_DAILY,
              symbol: company.symbol,
            },
          ],
        });
      });

      const market = this.$store.getters.currencyValue;

      _.forEach(this.selectedCurrencies, (currency) => {
        components.push({
          view: {
            name: 'line-chart',
            points: ['Open', 'Close'],
          },
          requests: [
            {
              function: FUNCTIONS.DIGITAL_CURRENCY_DAILY,
              symbol: currency.symbol,
              market,
            },
          ],
        });
      });


      this.$emit('dataSourceSelected', components);

      this.closeWizard();
    },

    selectLayout(layout) {
      if (layout === 'advanced-layout') {
        return this.closeWizard();
      }
      this.step = 4;
    },

    closeWizard() {
      this.showWizard = false;
      StorageController.markAsVisited();
    },

    alertMessage(value) {
      this.alert = value;
    },

    companiesCurrenciesStep() {
      if (this.layout === 'default-layout') {
        this.step = 4;
      } else {
        this.closeWizard();
      }
    }
  },
  mounted() {
    this.showWizard = StorageController.isFirstVisit();
  }
};
</script>

<style scoped>
.layoutChosen {
  font-size: 25px;
  text-align: center;
  border: 3px outset cornflowerblue;
}

.alert {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -200px;
  border: 10px outset white;
}

.layout-options-wrapper {
  display: flex;
}

.container {
  /* display: flex; */
  border: 1px outset white;
  border-radius: 25px;
  width:300px;
  height: 200px;
  overflow-y: scroll;
}

.text, .list-label {
  font-size: large;
  font-family: inherit;
  text-align: left;
}

.wiz-img {
  width: 100%;
  height: 100%;
  align-content: left;
}

.wiz-div {
  height: 500px;
}

#left, #middle, #right, #left-half, #right-half {
  display: inline-block;
  *display: inline;
  zoom: 1;
  vertical-align: top;
  font-size: 12px;
  margin-left: 15px;
  margin-right: 20px;
  border: 1px outset white;
  border-radius: 25px;
}

#left, #middle, #right {
  flex: 1;
}

#left-half, #right-half {
  width: 47%;
}

#left-half:hover, #right-half:hover {
  background-color: #43A047;
}

p {
  font-size: large;
  text-align: center;
}

p.wiz-info {
  font-size: large;
  text-align: left;
}

.mini-title {
  font-size: 28px;
  text-align: center;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}

div img {
  align-content: bottom;
}

.flex-item-equal {
  flex: 1;
}

/* Style only for certain cards */
.app-card {
  display: flex;
  /* width: 100%; */
  /* height: 100%; */
}

/*  Additional style for each v-card element. It has 'card' class by default */
.card {
  padding: 20px 5px 10px 5px;
}

.card-app-photo {
  width: 80%;
  height: 100%;
}

.card-app-info {
  padding: 10px;
  width: 30%;
  height: 100%;
}

</style>
