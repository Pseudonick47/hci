<template>
  <div wrapper>
    <v-dialog
      max-width="600"
      v-model="show"
    >
      <v-card>
        <v-toolbar>
          <v-container class="pa-0">
            <v-layout row justify-space-between>
              <v-toolbar-title class="mt-2">General settings</v-toolbar-title>
              <v-btn
                fab
                flat
                small
                @click="show = false"
              >
                <v-icon>clear</v-icon>
              </v-btn>
            </v-layout>
          </v-container>
        </v-toolbar>
        <v-list>
          <v-list-tile>
            <v-subheader>Change currency</v-subheader>
            <v-btn
              small
              color="blue"
              dark
              @click="currencyDialog = true"
            >{{ currencyValue }}</v-btn>
          </v-list-tile>
          <v-divider></v-divider>
          <v-subheader>Window options</v-subheader>
          <v-list-tile>
            <v-list-tile-action>
              <v-switch
                v-model="draggable"
                color="green"
              ></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Draggable windows</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-switch
                v-model="resizable"
                color="green"
              ></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Resizable windows</v-list-tile-title>
          </v-list-tile>
          <v-divider></v-divider>
          <v-subheader>Theme options</v-subheader>
          <v-list-tile>
            <v-list-tile-action>
              <v-switch
                v-model="darkTheme"
                color="green"
              ></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Dark theme</v-list-tile-title>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-container align-center class="py-2 pl-3">
              <v-layout row justify-start>
                <v-btn
                  small
                  right
                  dark
                  color="error"
                  @click="confirmReset = true"
                >
                  <v-icon>autorenew</v-icon>
                  Reset All
                </v-btn>
              </v-layout>
            </v-container>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>
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
          <v-card-text
            style="height: 300px;"
            @keyup.enter="currencyDialog = false">
            <v-radio-group
              v-model="currencyValue"
              column
            >
              <v-radio
                v-for="currency in currencies" :key="currency.symbol"
                :label="currency.name"
                :value="currency.symbol"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="grey"
              flat
              @click="currencyDialog = false"
            >OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-dialog
      v-model="confirmReset"
      persistent
      max-width="300px"
    >
      <v-card>
        <v-card-text class="text-md-center">
          Are you sure you want to reset all?
          Tabs and components will be lost.
        </v-card-text>
      </v-card>
      <v-card-actions>
        <v-btn @click="resetAll">yes</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="confirmReset = false">no</v-btn>
      </v-card-actions>
    </v-dialog>
  </div>
</template>

<script>
import StorageController from 'Controllers/storage.controller';
import { PHYSICAL_CURRENCIES } from 'Constants/data.constants';

export default {
  name: 'settings',
  data() {
    return {
      show: false,
      confirmReset: false,
      currencyDialog: false,
      currencies: PHYSICAL_CURRENCIES,
    };
  },
  methods: {
    resetAll() {
      StorageController.clearStorage();

      this.confirmReset = false;
      location.reload(true);
    }
  },
  computed: {
    darkTheme: {
      get() {
        return this.$store.getters.darkTheme;
      },
      set() {
        this.$store.commit('changeTheme');
      }
    },
    draggable: {
      get() {
        return this.$store.getters.draggable;
      },
      set() {
        this.$store.commit('changeDraggable');
      }
    },
    resizable: {
      get() {
        return this.$store.getters.resizable;
      },
      set() {
        this.$store.commit('changeResizable');
      }
    },
    currencyValue: {
      get() {
        return this.$store.getters.currencyValue;
      },
      set(value) {
        this.$store.commit('changeCurrency', value);
      }
    }
  }
};
</script>