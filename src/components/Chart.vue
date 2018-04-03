<template>
  <div>
    <line-chart
      v-if="chartType === 'line'"
      :download="true"
      :data="chartData"
    ></line-chart>

    <pie-chart
      v-else-if="chartType === 'pie'"
      :data="chartData"
    ></pie-chart>

    <column-chart
      v-else-if="chartType === 'column'"
      :data="chartData"
    ></column-chart>

    <bar-chart
      v-else-if="chartType === 'bar'"
      :data="chartData"
    ></bar-chart>

    <scatter-chart
      v-else-if="chartType === 'scatter'"
      :data="chartData"
      :xtitle="xTitle"
      :ytitle="yTitle"
    ></scatter-chart>
  </div>
</template>

<script>

export default {
  name: 'chart',
  props: {
    chartType: {
      type: String,
      required: true
    },
    chartData: {
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
  }
};

</script>