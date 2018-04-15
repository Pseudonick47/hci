<template>
  <div>
    <table-view
      v-if="view === 'table-view'"
      :data="data"
      style="height:100%;width:100%"
    ></table-view>

    <line-chart
      v-if="view === 'line-chart'"
      :download="true"
      :data="data"
      legend="bottom"
      height="85%"
    ></line-chart>

    <exchange-view
      v-if="view === 'exchange-view'"
      :data="data"
    ></exchange-view>

   <big-number-view
      v-if="view === 'big-number-view'"
      :data="data"
    ></big-number-view>

    <pie-chart
      v-else-if="view === 'pie-chart'"
      :data="data"
      height="85%"
    ></pie-chart>

    <column-chart
      v-else-if="view === 'column-chart'"
      :data="data"
      height="85%"
    ></column-chart>

    <bar-chart
      v-else-if="view === 'bar-chart'"
      :data="data"
      height="85%"
    ></bar-chart>

    <scatter-chart
      v-else-if="view === 'scatter-chart'"
      :data="data"
      :xtitle="xTitle"
      :ytitle="yTitle"
      height="85%"
    ></scatter-chart>
  </div>
</template>

<script>
import TableView from 'Components/TableView.component';
import ExchangeView from 'Components/ExchangeView.component';
import BigNumberView from 'Components/BigNumber.component';

export default {
  name: 'data-frame',
  components: {
    TableView,
    ExchangeView,
    BigNumberView
  },
  props: {
    view: {
      type: String,
      required: true
    },
    sources: {
      type: Array,
      required: true
    },
    points: {
      type: Array,
      required: false,
      default: () => []
    },
    xTitle: {
      type: String,
      required: false,
      default: ''
    },
    yTitle: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    data() {
      return this.$store.getters.data(this.sources, this.points);
    }
  }
};

</script>