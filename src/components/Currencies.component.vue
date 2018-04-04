<template>
  <v-layout
    row
    justify-center
  >
    <v-dialog
      v-model="currencyDialog"
      scrollable
      max-width="300px"
    >
      <v-card>
        <v-card-title>Select Currency</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group
            v-model="currencyValue"
            column
          >
            <v-radio
              label="Euro(EUR)"
              value="EUR"
            ></v-radio>
            <v-radio
              label="United States dollar(USD)"
              value="USD"
            ></v-radio>
            <v-radio
              label="Srpski dinar(RSD)"
              value="RSD"
            ></v-radio>
            <v-radio
              label="Australian dollar(AUD)"
              value="AUD"
            ></v-radio>
            <v-radio
              label="Japanese yen(JPY)"
              value="JPY"
            ></v-radio>
            <v-radio
              label="Pound sterling(GBP)"
              value="GBP"
            ></v-radio>
            <v-radio
              label="Swiss franc(CHF)"
              value="CHF"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="white"
            flat
            @click="closeCurrencyDialog"
          >OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
    methods: {
        closeCurrencyDialog() {
            this.$store.commit('changeVisibilityCurrencyDialog', false);
        }
    },
    computed: {
        currencyValue: {
            get() {
                return this.$store.getters.currencyValue;
            },
            set(value) {
                this.$store.commit('changeCurrency', value);
            }
        },
        currencyDialog: {
            get() {
                return this.$store.getters.currencyDialog;
            },
            set(value) {
                this.$store.commit('changeVisibilityCurrencyDialog', value);
            }
        }
    }
};
</script>
