<template>
  <v-app :dark="darkTheme">
    <v-toolbar app>
      <v-toolbar-title>Vue Your Finances</v-toolbar-title>
      <v-spacer></v-spacer>
      <settings></settings>
      <help></help>
    </v-toolbar>
    <v-content id="content">
      <currencies v-show="currencyDialog"></currencies>
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
import Currencies from 'Components/Currencies.component';
import Wizard from 'Components/Wizard.component';

export default {
  name: 'App',
  components: {
    Settings,
    Home,
    Help,
    Currencies,
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
      numOfTabs: 1
    };
  },
  computed: {
    ...mapGetters([
      'activeUser',
      'tabs',
      'admin',
      'currencyDialog',
      'darkTheme'
    ]),
    authStatus() {
      return this.activeUser ? 'loggedIn' : 'loggedOut';
    },
  },
  methods: {
    addNewTab() {
      this.$store.commit('addTab');
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
