<template>
  <div style="width:100%; height:100%">
    <div id="content">
      <v-speed-dial
        v-model="menu"
        bottom
        right
        large
        fixed
        direction="top"
        :open-on-hover="true"
        transition="slide-y-reverse-transition"
      >
        <v-btn
          slot="activator"
          color="blue darken-2"
          dark
          fab
          open-on-hover
        >
          <v-icon>settings</v-icon>
        </v-btn>
        <v-tooltip left>
          <v-btn
            fab
            dark
            small
            color="red"
            slot="activator"
            @click="removeTab"
          >
            <v-icon>delete</v-icon>
          </v-btn>
          <span>Delete tab</span>
        </v-tooltip>
        <v-tooltip left>
          <v-btn
            fab
            dark
            small
            slot="activator"
            color="green"
            @click="renameDialog = true"
          >
            <v-icon>edit</v-icon>
          </v-btn>
          <span>Rename tab</span>
        </v-tooltip>
        <v-tooltip left>
          <v-btn
            fab
            dark
            small
            color="indigo"
            slot="activator"
            @click="dataSourceDialog = true"
          >
            <v-icon>add</v-icon>
          </v-btn>
          <span>New component</span>
        </v-tooltip>
      </v-speed-dial>
      <v-dialog
        v-model="renameDialog"
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
              <v-btn @click="renameDialog = false">cancel</v-btn>
              <v-btn @click="renameTab">ok</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
      <data-source-dialog
        :model="dataSourceDialog"
        @closeDataSourceDialog="dataSourceDialog = false"
        @dataSourceSelected="addComponent"
      >
      </data-source-dialog>
      <grid-layout
        :layout="layout"
        :col-num="8"
        :row-height="100"
        :is-draggable="draggable"
        :is-resizable="resizable"
        :vertical-compact="true"
        :use-css-transforms="false"
      >
        <grid-item
          v-for="item in layout"
          :key="item.i"
          class="hide-scrollbar-outer"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
        >
          <v-btn
            fab
            small
            color="red"
            @click="removeComponent(item.i)"
          >
            <v-icon dark>remove</v-icon>
          </v-btn>
          <data-frame
            :view="item.view.name"
            :sources="getSources(item.requests)"
            :points="item.view.points"
            class="hide-scrollbar-inner"
          ></data-frame>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GridLayout, GridItem } from 'vue-grid-layout';

import * as _ from 'lodash';

import DataFrame from 'Components/DataFrame.component';
import DataSourceDialog from 'Components/DataSourceDialog.component';

import DataController from 'Controllers/data.controller';

import DataUtil from 'Util/data.util';


export default {
  name: 'workspace',
  components: {
    GridLayout,
    GridItem,
    DataFrame,
    DataSourceDialog,
  },
  props: {
    tabId: {
      required: true
    }
  },
  watch: {
    renameDialog() {
      this.$nextTick(() => {
        this.$refs.tabNameInput.focus();
      });
    }
  },
  data: () => ({
    menu: false,
    index: 20,
    chartData: [],
    renameDialog: false,
    dataSourceDialog: false,
    newTabName: ''
  }),
  computed: {
    ...mapGetters([
      'draggable',
      'resizable',
      'defaultWindowHeight',
    ]),
    layout() {
      return this.$store.getters.layout(this.tabId);
    }
  },
  methods: {
    addComponent(payload) {
      const { view, requests } = payload;

      DataController.startMonitoring(requests);

      this.$store.commit('addComponent', { tabId: this.tabId, requests, view });
      this.$store.commit('updateLayoutStorage');
    },

    removeComponent(id) {
      this.$store.commit('removeComponent', { tabId: this.tabId, id });
      this.$store.commit('updateLayoutStorage');
    },
    removeTab() {
      this.$store.commit('removeTab', this.tabId);
    },
    renameTab() {
      this.$store.commit('renameTab', { tabId: this.tabId, name: this.newTabName });
      this.renameDialog = false;
    },
    getSources(requests) {
      return _.map(requests, DataUtil.computeSourceId);
    }
  }
};
</script>
<style>
#content {
  width: 100%;
}

.vue-grid-layout {
  background: transparent;
}

/* Hide scrollbars */
::-webkit-scrollbar { width: 0 !important }

.hide-scrollbar-outer {
 overflow: hidden;
}
.hide-scrollbar-inner {
  margin-right: -16px;
  margin-bottom: -16px;
  overflow-y: scroll;
  overflow-x: scroll;
  height: 100%;
}

.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}

.vue-resizable-handle {
  z-index: 5000;
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 0;
  background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=");
  background-position: bottom right;
  padding: 0 3px 3px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: se-resize;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}

.vue-grid-item.resizing {
  opacity: 0.9;
}

.vue-grid-item.static {
  background: #cce;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  /* background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") */
    /* no-repeat; */
  /* background-position: bottom right; */
  padding: 0 8px 8px 0;
  /* background-repeat: no-repeat; */
  /* background-origin: content-box; */
  /* box-sizing: border-box; */
  cursor: pointer;
}
</style>
