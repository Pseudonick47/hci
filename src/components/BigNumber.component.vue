<template>
  <div class="mx-2 px-3 currency-wrapper">
    <span class="currency-to">{{ stockCourse }}</span>
    <span class="currency">{{ currency }}</span>
    <v-icon class="currency-arrow">{{ trendingIcon }}</v-icon>
  </div>
</template>

<script>
import * as _ from 'lodash';

export default {
  name: 'big-number-view',
  props: {
    data: {
      required: true
    }
  },
  computed: {
    stockCourse() {
      return 34798;
    },
    currency() {
      return 'eur';
    },
    trendingIcon() {
      if (1 > 2) {
        return 'trending_up';
      }
      if (2 > 1) {
        return 'trending_down';
      }
      return 'trending_flat';
    }
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
  font-size: 5vh;
}

.currency-arrow {
  flex: auto;

  font-size: 10vh;
  position: relative;
  top: 1vh;
}

.currency-to {
  flex: auto;
  font-size: 10vh;
}
</style>

