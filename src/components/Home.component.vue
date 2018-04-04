<template>
  <div style="width:100%; height:100%">
    <div id="content">
      <br/>
        <v-tooltip right>
          <v-btn
            fab
            small
            color="indigo"
            @click="addComponent"
            slot="activator"
          >
            <v-icon>add</v-icon>
          </v-btn>
          <span>New component</span>
        </v-tooltip>
      <grid-layout
        :layout="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="draggable"
        :is-resizable="resizable"
        :vertical-compact="true"
        :use-css-transforms="false"
      >
        <grid-item
          v-for="item in layout"
          :key="item.i"
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
          <chart
            :chartType="item.chartType"
            :chartData="item.chartData"
          ></chart>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GridLayout, GridItem } from 'vue-grid-layout';
import Chart from 'Components/Chart.component';

export default {
  name: 'Home',
  components: {
    GridLayout,
    GridItem,
    Chart
  },
  props: {
    tabId: {
      required: true
    }
  },
  data: () => ({
    index: 20,
    chartData: []
  }),
  computed: {
    ...mapGetters([
      'draggable',
      'resizable',
    ]),
    layout() {
      return this.$store.getters.layout(this.tabId);
    }
  },
  methods: {
    addComponent() {
      // ovde ide i modal za biranje tipa ili sta vec
      this.$store.commit('addComponent', this.tabId);
    },
    removeComponent(id) {
      this.$store.commit('removeComponent', { tabId: this.tabId, id });
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

/* scrollable content */
.vue-grid-item {
  overflow: scroll;
}

/* Hide scrollbars */
::-webkit-scrollbar {
    display: none;
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
