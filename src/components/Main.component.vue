<template>
  <div class="wrapper">
    <vue-draggable-resizable :w="100" :h="100" v-on:dragging="onDrag" v-on:resizing="onResize" :parent="true">
      <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
      X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
    </vue-draggable-resizable>
    <v-btn color="success"
           @click="getResults">
           Fetch
    </v-btn>
    <vue-draggable-resizable :w="100" :h="100" v-on:dragging="onDrag" v-on:resizing="onResize" :parent="true">
      <p>Nova komponentica<br></p>
      <chart></chart>
    </vue-draggable-resizable>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import StocksService from 'Api/stocks.service';
import Chart from './../components/Chart.vue';

export default {
  name: 'Main',
  components: {
    VueDraggableResizable,
    Chart,
  },
  data() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
  },
  methods: {
    onResize(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag(x, y) {
      this.x = x;
      this.y = y;
    },
    getResults() {
      const parameters = {
        symbol: 'EUR',
        apiFunction: 'TIME_SERIES_DAILY',
      };

      StocksService.fetchStockData(parameters).then((result) => {
        console.log(result.data);
      });
    },
  },
};
</script>
<style>
  .wrapper {
    height: 100%;
    width: 100%;
    border: 1px solid red;
    position: relative;
  }
</style>
