<template>
  <div class="wrapper">
    <chart
      :chart-type="'line'"
    ></chart>
  </div>
</template>

<script>
import StocksService from 'Api/stocks.service';
import Chart from 'Components/Chart.vue';

export default {
  name: 'Main',
  components: {
    VueDraggableResizable,
    Chart,
  },
  data() {
    return {
      clickedElementId: null,
      contextMenuX: 0,
      contextMenuY: 0,
      showMenu: false,
      items: [
        { title: 'Split Horizontally', callback: () => this.splitWrapper('horizontal') },
        { title: 'Split Vertically', callback: () => this.splitWrapper('vertical') },
      ],
      items2: [
        'Graph',
        'Table',
      ],
      currentId: 100,
    };
  },
  methods: {
    getResults() {
      const parameters = {
        symbol: 'EUR',
        apiFunction: 'TIME_SERIES_DAILY',
      };

      StocksService.fetchStockData(parameters).then((result) => {
        console.log(result.data);
      });
    },
    showContextMenu (data) {
      const event = data.event;

      this.clickedElementId = data.id;
      this.showMenu = false;
      this.contextMenuX = event.clientX;
      this.contextMenuY = event.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    }
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
