<template>
  <v-dialog
    v-model="showWizard"
    fixed
    persistent
    max-width="100%"
    transition="dialog-bottom-transition"
  >
    <!-- <v-card tile height="70%">
      <v-toolbar card dark color="primary">
        <v-btn icon @click.native="dialog = false" dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click.native="dialog = false">Save</v-btn>
        </v-toolbar-items>
        <v-menu bottom right offset-y>
          <v-btn slot="activator" dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="(item, i) in items" :key="i" @click="">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-card-text height="300px"> -->
        <v-stepper v-model="step" height="300px">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="step > 1">Name of step 1</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" :complete="step > 2">Name of step 2</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">Name of step 3</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card color="transparent" class="mb-5" height="500px" center>
                <img
                  src="http://3.bp.blogspot.com/_gx7OZdt7Uhs/TQEKxf3PewI/AAAAAAAAFUk/64Amp7FVTr8/s1600/3d+desktop+PC+Wallpaper.jpg"
                  class="img-settings"
                >
              </v-card>

              <v-btn color="primary" @click.native="step = 2">Continue</v-btn>
              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card color="transparent" class="mb-5" height="500px"></v-card>
              <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card color="transparent" class="mb-5" height="500px"></v-card>
              <v-btn color="primary" @click.native="step = 1">Continue</v-btn>
              <v-btn right flat>Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      <!-- </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="dialog3=false">Close</v-btn>
      </v-card-actions>
      <div style="flex: 1 1 auto;"/>
    </v-card> -->
  </v-dialog>
</template>
<script>
import StorageController from 'Controllers/storage.controller';

export default {
  name: 'Wizard',
  data() {
    return {
      showWizard: true,
      step: 1
    };
  },
  methods: {},
  mounted() {
    this.showWizard = StorageController.isFirstVisit;
  }
};
</script>
<style>
.img-settings {
  max-width: 100%;
  max-height: 100%;
}
</style>

