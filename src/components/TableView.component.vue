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
  },
  computed: {
    headers() {
      const headers = [];

      headers.push({
        text: 'Date',
        value: 'date'
      });
      _.forEach(this.data, (source) => {
        headers.push({
          text: source.name,
          value: _.snakeCase(source.name),
        });
      });

      return headers;
    },
    items() {
      if (_.isEmpty(this.data)) {
        return [];
      }

      // extract columns and convert them into snake case
      const cols = _.concat(_.map(this.data, (e) => _.snakeCase(e.name)), 'date');

      const dates = _.keys(this.data[0].data);
      const values = _.zip(..._.map(this.data, (e) => _.toArray(e.data)));

      // data is now grouped by date
      const combinedData = _.map(_.zip(values, dates), (e) => _.flatten(e));

      // create rows as objects where key is a column name and values is the
      // data
      return _.map(combinedData, (e) => _.zipObject(cols, e));
    }
  },
  data: () => ({
    pagination: {
      sortBy: 'date'
    }
  })
};

</script>