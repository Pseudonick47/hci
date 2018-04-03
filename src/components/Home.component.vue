<template>
  <div style="width:100%; height:100%">
    <div id="content">
      <br/>
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
            <!-- <v-btn
              fab
              small
              color="indigo"
              @click="addItem"
            >
              <v-icon >add</v-icon>
            </v-btn> -->
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
import { GridLayout, GridItem } from 'vue-grid-layout';
import Chart from 'Components/Chart.vue';

export default {
  name: 'Home',
  components: {
    GridLayout,
    GridItem,
    Chart
  },
  data: () => ({
    draggable: true,
    resizable: true,
    index: 20,
    dummyData: [
      { name: 'Workout', data: [['Jan', 4], ['Feb', 21], ['Mar', 13], ['Apr', 52], ['May', 33]] },
      { name: 'Call parents', data: [['Jan', 4], ['Feb', 42], ['Mar', 23], ['Apr', 52], ['May', 33]] },
      { name: 'Workout', data: [['Jan', 3], ['Feb', 122], ['Mar', 13], ['Apr', 52], ['May', 33]] },
      { name: 'Call parents', data: [['Jan', 4], ['Feb', 72], ['Mar', 73], ['Apr', 52], ['May', 33]] },
      { name: 'Workout', data: [['Jan', 2], ['Feb', 83], ['Mar', 13], ['Apr', 52], ['May', 33]] },
      { name: 'Call parents', data: [['Jan', 4], ['Feb', 92], ['Mar', 23], ['Apr', 52], ['May', 33]] },
      { name: 'Workout', data: [['Jan', 1], ['Feb', 23], ['Mar', 13], ['Apr', 52], ['May', 33]] },
      { name: 'Call parents', data: [['Jan', 4], ['Feb', 92], ['Mar', 113], ['Apr', 52], ['May', 33]] },
    ],
    chartData: [['Jan', 4], ['Feb', 2], ['Mar', 10], ['Apr', 5], ['May', 3]],
    layout: []
  }),
  methods: {
    addItem() {
      const item = { 'x': 0, 'y': 0, 'w': 2, 'h': 2, 'i': String(this.index), chartType: 'line', chartData: this.dummyData };
      this.index++;
      this.layout.push(item);
    }
  },
  mounted() {
    this.layout = [
      { 'x': 0, 'y': 0, 'w': 2, 'h': 2, 'i': '0', chartType: 'line', chartData: this.dummyData },
      { 'x': 2, 'y': 0, 'w': 2, 'h': 4, 'i': '1', chartType: 'line', chartData: this.chartData },
      { 'x': 4, 'y': 0, 'w': 2, 'h': 5, 'i': '2', chartType: 'line', chartData: this.chartData },
      { 'x': 6, 'y': 0, 'w': 2, 'h': 3, 'i': '3', chartType: 'line', chartData: this.dummyData },
      { 'x': 8, 'y': 0, 'w': 2, 'h': 3, 'i': '4', chartType: 'line', chartData: this.chartData },
      { 'x': 10, 'y': 0, 'w': 2, 'h': 3, 'i': '5', chartType: 'line', chartData: this.dummyData },
      { 'x': 0, 'y': 5, 'w': 2, 'h': 5, 'i': '6', chartType: 'line', chartData: this.chartData },
      { 'x': 2, 'y': 5, 'w': 2, 'h': 5, 'i': '7', chartType: 'line', chartData: this.dummyData },
      { 'x': 4, 'y': 5, 'w': 2, 'h': 5, 'i': '8', chartType: 'line', chartData: this.chartData },
      { 'x': 6, 'y': 4, 'w': 2, 'h': 4, 'i': '9', chartType: 'line', chartData: this.chartData },
      { 'x': 8, 'y': 4, 'w': 2, 'h': 4, 'i': '10', chartType: 'line', chartData: this.dummyData },
      { 'x': 10, 'y': 4, 'w': 2, 'h': 4, 'i': '11', chartType: 'line', chartData: this.chartData },
      { 'x': 0, 'y': 10, 'w': 2, 'h': 5, 'i': '12', chartType: 'line', chartData: this.chartData },
      { 'x': 2, 'y': 10, 'w': 2, 'h': 5, 'i': '13', chartType: 'line', chartData: this.dummyData },
      { 'x': 4, 'y': 8, 'w': 2, 'h': 4, 'i': '14', chartType: 'line', chartData: this.chartData },
      { 'x': 6, 'y': 8, 'w': 2, 'h': 4, 'i': '15', chartType: 'line', chartData: this.dummyData },
      { 'x': 8, 'y': 10, 'w': 2, 'h': 5, 'i': '16', chartType: 'line', chartData: this.chartData },
      { 'x': 10, 'y': 4, 'w': 2, 'h': 2, 'i': '17', chartType: 'line', chartData: this.chartData },
      { 'x': 0, 'y': 9, 'w': 2, 'h': 3, 'i': '18', chartType: 'line', chartData: this.dummyData },
      { 'x': 2, 'y': 6, 'w': 2, 'h': 2, 'i': '19', chartType: 'line', chartData: this.chartData },
    ];
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
