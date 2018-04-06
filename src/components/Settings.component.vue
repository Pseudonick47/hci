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
                  dark
                  value="00:01:00"
                  box
                  type="time-with-seconds"
                  color="white"
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
                @click="showCurrencyDialog"
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
            <v-list-tile>
              <v-layout row>
                <v-list-tile-action>
                  <v-text-field
                    label="Default height"
                    dark
                    v-model="defaultWindowHeight"
                    box
                    type="number"
                    color="white"
                  ></v-text-field>
                </v-list-tile-action>
              </v-layout>
            </v-list-tile>
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
  </div>
</template>

<script>

export default {
  data: () => ({
    settingsDialog: false
  }),
  methods: {
    showCurrencyDialog() {
      this.$store.commit('changeVisibilityCurrencyDialog', true);
    }
  },
  computed: {
    defaultWindowHeight: {
      get() {
        return this.$store.getters.defaultWindowHeight;
      },
      set(value) {
        this.$store.commit('changeDefaultWindowHeight', value);
      }
    },
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