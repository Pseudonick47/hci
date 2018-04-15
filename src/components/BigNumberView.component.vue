<template>
  <div class="mx-2 px-3 currency-wrapper">
    <v-container>
      <v-layout row v-for="entity in entities" :key="entity">
        <v-layout row>
          <span>{{ entity }}</span>
        </v-layout>
        <v-layout row>
          <span class="currency-to">{{ current[entity] }}</span>
          <span class="currency">{{ currency }}</span>
          <v-icon class="currency-arrow">{{ trendingIcon(entity) }}</v-icon>
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import * as _ from 'lodash';

export default {
  name: 'big-number-view',
  props: {
    data: {
      required: true,
    }
  },
  data() {
    return {
      current: {},
      previous: {},
    };
  },
  watch: {
    data(val) {
      this.previous = this.current;
      this.current = {};
      _.each(val, (el) => {
        this.current[el.name] = el.data[_.last(_.keys(el.data).sort())];
      });
      console.log(this.current);
    }
  },
  methods: {
    trendingIcon(entity) {
      if (_.isEmpty(this.previous)) {
        return 'trending_flat';
      }
      if (this.previous[entity] < this.current[entity]) {
        return 'trending_up';
      }
      if (this.previous[entity] > this.current[entity]) {
        return 'trending_down';
      }
      return 'trending_flat';
    }
  },
  computed: {
    entities() {
      return _.keys(this.current);
    },
    currency() {
      return this.$store.getters.currencyValue;
    },
  }
};

</script>
<style>

.currency-wrapper{
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
}

.currency {
  flex: auto;
  font-size: 3vh;
}

.currency-arrow {
  flex: auto;

  font-size: 5vh;
  position: relative;
  top: 1vh;
}

.currency-to {
  flex: auto;
  font-size: 5vh;
}
</style>

