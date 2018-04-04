<template>
  <div wrapper>
    <v-menu
      offset-x
      :close-on-content-click="false"
      :nudge-width="400"
      v-model="menu"
    >
      <v-btn
        color="grey"
        dark slot="activator"
      >Settings</v-btn>
      <v-card>
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-layout row>
                <v-subheader>Refresh frequency</v-subheader>
                <v-text-field
                  dark
                  value="00:01:00"
                  type="time-with-seconds"
                ></v-text-field>
              </v-layout>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
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
            <v-list-tile-action>
              <v-switch
                v-model="draggable"
                color="green"
              ></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Draggable windows</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            @click="menu = false"
          >Cancel</v-btn>
          <v-btn
            color="yellow"
            flat
            @click="menu = false"
            >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({
      menu: false
    }),
    computed: {
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
      }
    }
  };
</script>