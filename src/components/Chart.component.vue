<template>
  <div>
    <app-table
      v-if="chartType === 'table'"
      :data="data"
      :points="points"
    ></app-table>

      <line-chart
        v-if="chartType === 'line'"
        :download="true"
        :data="data"
        legend="bottom"
      ></line-chart>

    <pie-chart
      v-else-if="chartType === 'pie'"
      :data="data"
    ></pie-chart>

    <column-chart
      v-else-if="chartType === 'column'"
      :data="data"
    ></column-chart>

    <bar-chart
      v-else-if="chartType === 'bar'"
      :data="data"
    ></bar-chart>

    <scatter-chart
      v-else-if="chartType === 'scatter'"
      :data="data"
      :xtitle="xTitle"
      :ytitle="yTitle"
    ></scatter-chart>
  </div>
</template>

<script>
import DataUtil from 'Util/data.util';
import AppTable from 'Components/Table.component';

export default {
  name: 'chart',
  components: {
    AppTable
  },
  props: {
    chartType: {
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