<template>
  <v-app :dark="darkTheme">
    <v-toolbar app>
      <v-toolbar-title>Vue Your Finances</v-toolbar-title>
      <v-spacer></v-spacer>
      <settings></settings>
      <help></help>
    </v-toolbar>
    <v-content id="content">
      <v-tabs
        show-arrows
        slider-color="cyan"
      >
        <v-tab
          v-for="(tab, id) in tabs"
          :key="id"
          :href="'#tab-' + id"
        >
            {{ tab.name }}
        </v-tab>
        <v-tooltip
          bottom
          class="my-auto"
        >
          <v-btn
            fab
            small
            outline
            color="cyan"
            slot="activator"
            @click="addNewTab"
          >
            <v-icon>add</v-icon>
          </v-btn>
          <span>New tab</span>
        </v-tooltip>
        <v-dialog
          v-model="dialog"
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
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false">cancel</v-btn>
              <v-btn @click="renameNewTab">ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
              <home :tabId="id"></home>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-content>
    <v-footer app></v-footer>
    <wizard></wizard>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Settings from 'Components/Settings.component';
import Home from 'Components/Home.component';
import Help from 'Components/Help.component';
import Wizard from 'Components/Wizard.component';

export default {
  name: 'App',
  components: {
    Settings,
    Home,
    Help,
    Wizard
  },
  data() {
    return {
      toolbarItems: {
        'loggedIn': [{ icon: 'exit_to_app', text: 'Logout', path: '/logout' }],
        'loggedOut': [
          { icon: 'lock_open', text: 'Login', path: '/login' },
          { icon: 'lock', text: 'Register', path: '/register' },
        ],
        'admin': [{ icon: 'lock', text: 'AdminPanel', path: '/home' }],
      },
      numOfTabs: 1,
      dialog: false,
      newTabName: ''
    };
  },
  computed: {
    ...mapGetters([
      'activeUser',
      'tabs',
      'admin',
      'darkTheme'
    ]),
    authStatus() {
      return this.activeUser ? 'loggedIn' : 'loggedOut';
    },
  },
  methods: {
    addNewTab() {
      this.dialog = true;
      this.newTabName = '';
      this.$nextTick(() => {
        this.$refs.tabNameInput.focus();
      });
    },
    renameNewTab() {
      this.dialog = false;
      this.$store.commit('addTab', this.newTabName);
    }
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
