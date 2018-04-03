<template>
  <div class="wrapper">
    <chart></chart>
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
