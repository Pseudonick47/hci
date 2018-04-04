<template>
  <v-app dark>
    <!-- <v-navigation-drawer app></v-navigation-drawer> -->
    <v-toolbar app>
      <v-toolbar-title>Vue Your Finances</v-toolbar-title>
      <v-spacer></v-spacer>
      <settings></settings>
      <help></help>
    </v-toolbar>
    <v-content id="content">
      <currencies v-show="currencyDialog"></currencies>
      <v-tabs
        dark
        color="grey"
        show-arrows
      >
        <v-tabs-slider color="white"></v-tabs-slider>
        <v-tooltip bottom>
          <v-btn
            fab
            small
            color="green"
            slot="activator"
            @click="addNewTab"
          >
            <v-icon dark>add</v-icon>
          </v-btn>
          <span>New tab</span>
        </v-tooltip>
        <v-tab v-for="(tab, id) in tabs" :key="id" :href="'#tab-' + id">
            {{ tab.name }}
        </v-tab>
        <v-tabs-items>
          <v-tab-item
            v-for="(tab, id) in tabs"
            :key="id"
            :id="'tab-' + id"
          >
            <v-container fluid fill-height>
              <home :tabId="id"></home>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Settings from 'Components/Settings.component';
import Home from 'Components/Home.component';
import Help from 'Components/Help.component';
import Currencies from 'Components/Currencies.component';

export default {
  name: 'App',
  components: {
    Settings,
    Home,
    Help,
    Currencies
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
      'currencyDialog'
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
#content {
  height: 100%;
}
</style>
