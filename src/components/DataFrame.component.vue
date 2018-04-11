<template>
  <div>
    <table-view
      v-if="view === 'table-view'"
      :data="data"
      :points="points"
    ></table-view>

    <line-chart
      v-if="view === 'line-chart'"
      :download="true"
      :data="data"
      legend="bottom"
    ></line-chart>

    <pie-chart
      v-else-if="view === 'pie-chart'"
      :data="data"
    ></pie-chart>

    <column-chart
      v-else-if="view === 'column-chart'"
      :data="data"
    ></column-chart>

    <bar-chart
      v-else-if="view === 'bar-chart'"
      :data="data"
    ></bar-chart>

    <scatter-chart
      v-else-if="view === 'scatter-chart'"
      :data="data"
      :xtitle="xTitle"
      :ytitle="yTitle"
    ></scatter-chart>
  </div>
</template>

<script>
import DataUtil from 'Util/data.util';
import TableView from 'Components/TableView.component';

export default {
  name: 'data-frame',
  components: {
    TableView
  },
  props: {
    view: {
      type: String,
      required: true
    },
    params: {
      type: Object,
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
      return this.$store.getters.points(DataUtil.computeId(this.params), this.points);
    }
  }
};

</script>