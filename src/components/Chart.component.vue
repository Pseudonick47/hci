<template>
  <div>
    <line-chart
      v-if="type === 'line'"
      :download="true"
      :data="data"
      legend="bottom"
    ></line-chart>

    <pie-chart
      v-else-if="type === 'pie'"
      :data="data"
    ></pie-chart>

    <column-chart
      v-else-if="type === 'column'"
      :data="data"
    ></column-chart>

    <bar-chart
      v-else-if="type === 'bar'"
      :data="data"
    ></bar-chart>

    <scatter-chart
      v-else-if="type === 'scatter'"
      :data="data"
      :xtitle="xTitle"
      :ytitle="yTitle"
    ></scatter-chart>
  </div>
</template>

<script>
import DataUtil from 'Util/data.util';

export default {
  name: 'chart',
  props: {
    type: {
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