<template>
  <div class="mx-2 px-3 currency-wrapper">
    <span class="currency-from">
      <v-text-field
        v-model="amount"
      ></v-text-field>
    </span>
    <span class="currency">{{ currencyFrom }}</span>
    <v-icon class="currency-arrow">trending_flat</v-icon>
    <span class="currency-to">{{ exchangedAmount }}</span>
    <span class="currency">{{ currencyTo }}</span>
  </div>
</template>

<script>
import * as _ from 'lodash';

export default {
  name: 'app-exchange',
  props: {
    data: {
      required: true
    }
  },
  computed: {
    exchangedAmount() {
      return this.amount * 50;
    },
    currencyFrom() {
      return 'eur';
    },
    currencyTo() {
      return 'rsd';
    }
  },
  data: () => ({
    amount: 1
  })
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

.currency-from {
  flex: auto;
  font-size: 10vh;
  display: inline-block;
}

.currency-from input {
  height: 10vh;
  font-size: 10vh;
}

.currency-to {
  flex: auto;
  font-size: 10vh;
}
</style>

