<template>
  <v-app dark>
    <!-- <v-navigation-drawer app></v-navigation-drawer> -->
    <v-toolbar app>
      <v-toolbar-title>Vue Your Finances</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-btn
          fab
          small
          color="red"
          slot="activator"
        >
          <v-icon dark>add</v-icon>
        </v-btn>
        <span>New window</span>
      </v-tooltip>
      <settings></settings>
      <!-- <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat
               v-if="admin"
               v-for="item in toolbarItems['admin']"
               :key="item.text"
               :to="item.path">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.text }}
        </v-btn>
        <v-btn flat
               v-for="item in toolbarItems[authStatus]"
               :key="item.text"
               :to="item.path">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.text }}
        </v-btn>
      </v-toolbar-items> -->
    </v-toolbar>
    <v-content id="content">
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
            v-on:click="numOfTabs += 1"
          >
            <v-icon dark>add</v-icon>
          </v-btn>
          <span>New tab</span>
        </v-tooltip>
        <v-tab v-for="i in numOfTabs" :key="i" :href="'#tab-' + i">
            Tab {{ i }}
        </v-tab>
        <v-tabs-items>
          <v-tab-item v-for="i in numOfTabs" :key="i" :id="'tab-' + i">
            <v-container fluid fill-height>
              <router-view></router-view>
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

export default {
  name: 'App',
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
      'admin',
    ]),
    authStatus() {
      return this.activeUser ? 'loggedIn' : 'loggedOut';
    },
  },
  components: {
    Settings
  }
};
</script>