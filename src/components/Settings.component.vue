<template>
  <div wrapper>
      <v-dialog
        max-width="600"
        v-model="settingsDialog"
        persistent
      >
        <v-btn
          color="grey"
          dark
          slot="activator"
        >Settings</v-btn>
        <v-card>
          <v-list>
            <v-subheader>Data options</v-subheader>
            <v-list-tile>
              <v-list-tile-action>
                <v-text-field
                  label="Refresh frequency"
                  value="00:01:00"
                  box
                  type="time-with-seconds"
                  color="black"
                ></v-text-field>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-subheader>Change currency</v-subheader>
              <v-btn
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
            <!--
            <v-list-tile>
              <v-layout row>
                <v-list-tile-action>
                  <v-text-field
                    label="Default height"
                    v-model="defaultWindowHeight"
                    box
                    type="number"
                    color="black"
                  ></v-text-field>
                </v-list-tile-action>
              </v-layout>
            </v-list-tile>
            -->
            <v-list-tile>
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
          </v-list>
          <v-card>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
                @click="settingsDialog = false"
              >OK</v-btn>
            </v-card-actions>
          </v-card>
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
                color="grey"
                flat
                @click="currencyDialog = false"
              >OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
  </div>
</template>

<script>

export default {
  data() {
    return {
      settingsDialog: false,
      currencyDialog: false
    };
  },
  computed: {
    /* defaultWindowHeight: {
      get() {
        return this.$store.getters.defaultWindowHeight;
      },
      set(value) {
        this.$store.commit('changeDefaultWindowHeight', value);
      }
    }, */
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