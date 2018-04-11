<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
      :rows-per-page-items="[5, 10, 20, 50, 100]"
      item-key="date"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td
          v-for="key in headers"
          :key="key.value"
        >{{ props.item[key.value] }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import * as _ from 'lodash';

export default {
  name: 'table-view',
  props: {
    data: {
      required: true
    },
    points: {
      required: true
    }
  },
  computed: {
    headers() {
      const headers = [];

      headers.push({
        text: 'Date',
        value: 'date'
      });
      _.forEach(this.points, (point) => {
        headers.push({
          text: _.upperFirst(point),
          value: point
        });
      });

      return headers;
    },
    items() {
      const mappedData = [];

      _.forOwn(this.data[0].data, (val, date) => {
        const row = {};

        row['date'] = date;
        _.forEach(this.data, (nesto) => {
          row[_.toLower(nesto.name)] = nesto.data[date];
        });

        mappedData.push(row);
      });

      return mappedData;
    }
  },
  data: () => ({
    pagination: {
      sortBy: 'date'
    }
  })
};

</script>