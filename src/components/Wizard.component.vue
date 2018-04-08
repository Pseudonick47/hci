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
          <v-card class="card">
            <div class="wiz-div">
              <img
              class="wiz-img"
              src="./../assets/app-ss.jpg"
              >
            </div>
          </v-card>
          <v-footer>
            <v-tooltip right>
              <v-btn
                flat
                @click="closeWizard"
                left
                slot="activator"
              >
                <v-icon left>remove_circle</v-icon>skip wizard
              </v-btn>
              <span>Not recommended!<br>If you skip this, we will choose default layout, companies and currenices.<br>You can change it later.</span>
            </v-tooltip>
            <v-btn
              color="primary"
              @click="step = 2"
              right
              absolute
            >next</v-btn>
          </v-footer>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card class="card">
            <div id="left">
              <p class="mini-title">Graph</p>
              <p><img src="./../assets/graph.png"></p>
              <p>Can I help you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis, nulla tristique lobortis imperdiet, libero ipsum consequat ligula, non congue nisl augue nec turpis. Mauris rhoncus tristique arcu nec consequat.</p>
            </div>
            <div id="middle">
              <p class="mini-title">Table</p>
              <p><img src="./../assets/table.jpg"></p>
              <p>Can I help you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis, nulla tristique lobortis imperdiet, libero ipsum consequat ligula, non congue nisl augue nec turpis. Mauris rhoncus tristique arcu nec consequat.</p>
            </div>
            <div id="right">
              <p class="mini-title">Pie chart</p>
              <p><img src="./../assets/pie-chart.png"></p>
              <p>Can I help you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis, nulla tristique lobortis imperdiet, libero ipsum consequat ligula, non congue nisl augue nec turpis. Mauris rhoncus tristique arcu nec consequat.</p>
            </div>
          </v-card>
          <v-card height="20px"></v-card>
          <v-card class="card">
            <div id="left">
              <p class="mini-title">Bar chart</p>
              <p><img src="./../assets/bar-chart.jpg"></p>
              <p>Can I help you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis, nulla tristique lobortis imperdiet, libero ipsum consequat ligula, non congue nisl augue nec turpis. Mauris rhoncus tristique arcu nec consequat.</p>
            </div>
            <div id="middle">
              <p class="mini-title">Column chart</p>
              <p><img src="./../assets/column-chart.png"></p>
              <p>Can I help you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis, nulla tristique lobortis imperdiet, libero ipsum consequat ligula, non congue nisl augue nec turpis. Mauris rhoncus tristique arcu nec consequat.</p>
            </div>
            <div id="right">
              <p class="mini-title">Scatter chart</p>
              <p><img src="./../assets/scatter-chart.jpg"></p>
              <p>Can I help you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis, nulla tristique lobortis imperdiet, libero ipsum consequat ligula, non congue nisl augue nec turpis. Mauris rhoncus tristique arcu nec consequat.</p>
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
          <v-card class="card">
            <div id="left-half">
              <p class="mini-title">Default layout</p>
              <hr>
              <p height="5px"></p>
              <p><img src="./../assets/default-layout.jpg"></p>
              <p>Can I help you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis, nulla tristique lobortis imperdiet, libero ipsum consequat ligula, non congue nisl augue nec turpis. Mauris rhoncus tristique arcu nec consequat.</p>
            </div>
            <div id="right-half">
              <p class="mini-title">Advanced layout</p>
              <hr>
              <p height="5px"></p>
              <p><img src="./../assets/advanced-layout.png"></p>
              <p>Can I help you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis, nulla tristique lobortis imperdiet, libero ipsum consequat ligula, non congue nisl augue nec turpis. Mauris rhoncus tristique arcu nec consequat.</p>
            </div>
          </v-card>
          <v-card height="20px"></v-card>
          <hr>
          <v-card>
            <p class="text">Please, choose layout:</p>
            <v-radio-group
              v-model="layout"
              row
            >
              <v-radio
                label="Default layout"
                value="default-layout"
                color="orange"
              ></v-radio>
              <v-radio
                label="Advanced layout"
                value="advanced-layout"
                color="orange">
              </v-radio>
            </v-radio-group>
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
              @click="step = 4"
              right
              absolute
            >next</v-btn>
          </v-footer>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-layout row>
            <v-card>
              <p class="mini-title">Companies</p>
              <hr>
              <p height="5px"></p>
              <p class="list-label">Select currencies:</p>
              <div class="container">
                <template v-for="company in companies">
                  <v-checkbox
                    :key="company.id"
                    :label='company.name'
                    v-model="selectedCompanies"
                    :value='company.id'
                  ></v-checkbox>
                </template>
              </div>
            </v-card>
            <v-card>
              <p class="mini-title">Currencies</p>
              <hr>
              <p height="5px"></p>
              <p class="list-label">Select currencies:</p>
              <div class="container">
                <template v-for="currency in currencies">
                  <v-checkbox
                    :key="currency.id"
                    :label='currency.name'
                    v-model="selectedCurrencies"
                    :value='currency.id'
                  ></v-checkbox>
                </template>
              </div>
            </v-card>
          </v-layout>
          <v-footer>
            <v-btn
              color="success"
              @click="closeWizard"
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
import StorageController from 'Controllers/storage.controller';

export default {
  name: 'Wizard',
  data() {
    return {
      showWizard: true,
      step: 1,
      layout: 'default-layout',
      selectedCompanies: [],
      selectedCurrencies: [],
      companies: [
        { name: 'Facebook', id: 'FB' },
        { name: 'Microsoft', id: 'MSFT' }],
      currencies: [
        { name: 'Euro(EUR)', id: 'EUR' },
        { name: 'United States dollar(USD)', id: 'USD' },
        { name: 'Serbian dinar(RSD)', id: 'RSD' },
        { name: 'Australian dollar(AUD)', id: 'AUD' },
        { name: 'Japanese yen(JPY)', id: 'JPY' },
        { name: 'Pound sterling(GBP)', id: 'GBP' },
        { name: 'Swiss franc(CHF)', id: 'CHF' }]
    };
  },
  methods: {
    closeWizard() {
      this.showWizard = false;
    }
  },
  mounted() {
    this.showWizard = StorageController.isFirstVisit();
  }
};
</script>

<style>

.container {
  border: 1px outset white;
  border-radius: 25px;
  width:300px;
  height: 400px;
  overflow-y: scroll;
}

.text, .list-label {
  font-size: large;
  font-family: inherit;
  text-align: left;
}

.wiz-img {
  width: 50%;
  height: 50%;
}

.wiz-div {
  text-align: center;
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
  width: 30%;
}

#left-half, #right-half {
  width: 47%;
}

p {
  font-size: large;
  text-align: center;
}

.mini-title {
  font-size: 28px;
  text-align: center;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}

div img {
  align-content: bottom;
  width: 300px;
}

.card {
  width: 100%;
  height: 100%;
}

</style>
