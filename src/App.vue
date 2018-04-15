<template>
  <v-app :dark="darkTheme">
    <v-toolbar app>
      <v-toolbar-title>Vue Your Finances</v-toolbar-title>
    </v-toolbar>
    <v-content id="content">
      <v-tabs
        show-arrows
        tab-slider="cyan"
        v-model="activeTab"
        ref="tabs"
        :key="updateTabs"
      >
        <v-tab
          v-for="(tab, id) in tabs"
          :key="id"
          :href="'#tab-' + id"
        >
            {{ tab.name }}
        </v-tab>
        <v-layout row justify-space-between mr-2>
        <v-tooltip
          bottom
          class="my-auto"
        >
          <v-btn
            flat
            fab
            small
            slot="activator"
            @click="addNewTab"
          >
            <v-icon>add</v-icon>
          </v-btn>
          <span>New tab</span>
        </v-tooltip>
        <v-menu
          open-on-hover
          bottom
          offset-y
        >
            <v-btn
              flat
              fab
              small
              slot="activator"
            >
              <v-icon>settings</v-icon>
            </v-btn>
          <v-list>
            <v-list-tile
              ripple
              avatar
              @click="showSourceDialog = true"
            >
              <v-list-tile-action>
                <v-icon color="purple">add_circle</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="mr-3">New View</v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile
              ripple
              avatar
              @click="addNewTab"
            >
              <v-list-tile-action>
                <v-icon color="green">add_circle</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="mr-3">New Tab</v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              ripple
              avatar
              @click.stop="confirmDelete = true"
              v-show="!oneTabRemaining"
            >
              <v-list-tile-action>
                <v-icon color="red">remove_circle</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="mr-3">Remove Tab</v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              ripple
              avatar
              @click.stop="renameTabDialog = true"
            >
              <v-list-tile-action>
                <v-icon color="blue">create</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="mr-3">Rename Tab</v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile
              ripple
              avatar
              @click.stop="$refs.help.show = true"
            >
              <v-list-tile-action>
                <v-icon color="light-grey">help</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="mr-3">Help</v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              ripple
              avatar
              @click.stop="$refs.settings.show = true"
            >
              <v-list-tile-action>
                <v-icon color="yellow">star</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="mr-3">Preferences</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>
        </v-layout>

        <v-tabs-items class="show-overflow">
          <v-tab-item
            v-for="(tab, id) in tabs"
            :key="id"
            :id="'tab-' + id"
            class="pa-0"
          >
            <v-container
              fluid
              class="pa-0"
            >
              <workspace :tabId="id" :ref="`home-${id}`"></workspace>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
      <v-btn
        color="red"
        dark
        small
        fixed
        bottom
        right
        fab
        @click="showSourceDialog = true"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-content>
    <v-footer app></v-footer>

    <!-- DIALOGS -->

    <v-dialog
      v-model="renameTabDialog"
      persistent
      max-width="300"
    >
      <v-card>
        <v-card-title>
          <span class="headline">New Tab Name</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            autofocus
            ref="tabNameInput"
            v-model="newTabName"
            label="Tab name:"
            required
            @keyup.enter="renameTab"
            @keyup.esc="renameTabDialog = false"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="renameTabDialog = false">cancel</v-btn>
          <v-btn @click="renameTab">ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="confirmDelete"
      persistent
      max-width="300px"
    >
      <v-card>
        <v-card-text>
          Delete this tab?
        </v-card-text>
      </v-card>
      <v-card-actions>
        <v-btn @click="removeTab">yes</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="confirmDelete = false">no</v-btn>
      </v-card-actions>
    </v-dialog>

    <data-source-dialog
      :model="showSourceDialog"
      @closeDialog="showSourceDialog = false"
      @dataSourceSelected="addComponent"
    ></data-source-dialog>
    <wizard></wizard>
    <settings ref="settings"></settings>
    <help ref="help"></help>
  </v-app>
</template>

<script>
import * as _ from 'lodash';

import { mapGetters } from 'vuex';

import DataSourceDialog from 'Components/DataSourceDialog.component';
import Help from 'Components/Help.component';
import Settings from 'Components/Settings.component';
import Wizard from 'Components/Wizard.component';
import Workspace from 'Components/Workspace.component';

export default {
  name: 'App',
  components: {
    DataSourceDialog,
    Help,
    Settings,
    Wizard,
    Workspace,
  },
  data() {
    return {
      renameTabDialog: false,
      confirmDelete: false,
      newTabName: '',
      activeTab: 'tab-0',
      updateTabs: 'tabs-update-0',
      showSourceDialog: false,
    };
  },
  computed: {
    ...mapGetters([
      'tabs',
      'darkTheme'
    ]),
    oneTabRemaining() {
      return _.keys(this.tabs).length === 1;
    },
    activeTabId() {
      return _.parseInt(_.join(_.slice(this.activeTab, 4), ''));
    },
  },
  methods: {
    addNewTab() {
      this.$store.commit('addTab');
    },

    renameTab() {
      if (!this.newTabName) {
        return;
      }

      this.$store.commit('renameTab', {
        tabId: this.activeTabId,
        name: this.newTabName
      });

      this.newTabName = '';
      this.renameTabDialog = false;

      // trigger tab re-render
      this.updateTabs = `tabs-update-${_.random(0, 10)}`;
    },

    removeTab() {
      this.$store.commit('removeTab', this.activeTabId);

      let newTabId = -1;
      _.each(_.keys(this.tabs), (key) => {
        if (key > this.activeTabId) {
          newTabId = _.parseInt(key);
          return false;
        }
      });

      if (newTabId === -1) {
        newTabId = _.last(_.keys(this.tabs).sort());
      }

      this.activeTab = `tab-${newTabId}`;

      this.confirmDelete = false;
    },
    addComponent(payload) {
      this.$refs[`home-${this.activeTabId}`][0].addComponent(payload);
    },
  }
};
</script>
<style>
.show-overflow {
  overflow: visible;
}

.my-auto{
  margin-top: auto;
  margin-bottom: auto;
}

#content {
  height: 100%;
}
</style>
