<template>
  <div style="width:100%; height:100%">
    <div id="content">
      <grid-layout
        :layout="layout"
        :col-num="100"
        :row-height="1"
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
            @click="activeComponent = item.i, confirmDelete = true"
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
    <v-dialog
      v-model="confirmDelete"
      persistent
      max-width="300px"
    >
      <v-card>
        <v-card-text>
          Delete this component?
        </v-card-text>
      </v-card>
      <v-card-actions>
        <v-btn @click="removeComponent">yes</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="confirmDelete = false">no</v-btn>
      </v-card-actions>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GridLayout, GridItem } from 'vue-grid-layout';

import * as _ from 'lodash';

import DataFrame from 'Components/DataFrame.component';

import DataController from 'Controllers/data.controller';

import DataUtil from 'Util/data.util';


export default {
  name: 'workspace',
  components: {
    GridLayout,
    GridItem,
    DataFrame,
  },
  props: {
    tabId: {
      required: true
    }
  },
  data() {
    return {
      confirmDelete: false,
      activeComponent: -1,
    };
  },
  computed: {
    ...mapGetters([
      'draggable',
      'resizable',
    ]),
    layout() {
      return this.$store.getters.layout(this.tabId);
    },
  },
  methods: {
    addComponent(payload) {
      const { view, requests } = payload;

      DataController.startMonitoring(requests);

      this.$store.commit('addComponent', { tabId: this.tabId, requests, view });
      this.$store.commit('updateLayoutStorage');
    },

    removeComponent() {
      this.$store.commit('removeComponent', {
        tabId: this.tabId,
        id: this.activeComponent
      });

      this.$store.commit('updateLayoutStorage');

      this.confirmDelete = false;
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
    },
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
  z-index: 20;
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
