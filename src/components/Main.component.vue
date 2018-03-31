<template>
  <div
    id="main-component"
    class="wrapper">
    <wrapper
      v-for="(component, index) in children"
      :key="index"
      :element="component"
      @right-click="showContextMenu">
    </wrapper>
    <!-- <v-btn color="success"
           @click="getResults">
           Fetch
    </v-btn> -->
    <v-menu
      offset-y
      v-model="showMenu"
      absolute
      :position-x="contextMenuX"
      :position-y="contextMenuY">
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" @click="item.callback">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-select
        :items="items2"
        segmented
        label="Select"
        target="#main-component">
      </v-select>
    </v-menu>
  </div>
</template>

<script>
import Vue from 'vue';
import * as _ from 'lodash';
import StocksService from 'Api/stocks.service';
import Wrapper from 'Components/Wrapper.component.vue';

export default {
  name: 'Main',
  components: {
    Wrapper,
  },
  data() {
    return {
      clickedElementId: null,
      contextMenuX: 0,
      contextMenuY: 0,
      showMenu: false,
      items: [
        { title: 'Split Horizontally', callback: () => this.splitWrapper('horizontal') },
        { title: 'Split Vertically', callback: () => this.splitWrapper('vertical') },
      ],
      items2: [
        'Graph',
        'Table',
      ],
      currentId: 100,
      children: [
        {
          id: 1,
          componentType: 'wrapper',
          orientation: 'horizontal',
          children: [
            {
              id: 12,
              componentType: 'wrapper',
              orientation: 'vertical',
              children: [],
            },
            {
              id: 13,
              componentType: 'wrapper',
              orientation: 'vertical',
              children: [
                {
                  id: 14,
                  componentType: 'wrapper',
                  children: [],
                  orientation: 'vertical',
                },
                {
                  id: 15,
                  componentType: 'wrapper',
                  children: [],
                  orientation: 'vertical',
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    getResults() {
      const parameters = {
        symbol: 'EUR',
        apiFunction: 'TIME_SERIES_DAILY',
      };

      StocksService.fetchStockData(parameters).then((result) => {
        console.log(result.data);
      });
    },
    showContextMenu (data) {
      const event = data.event;

      this.clickedElementId = data.id;
      this.showMenu = false;
      this.contextMenuX = event.clientX;
      this.contextMenuY = event.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
    getElementById(root, id) {
      if (root.id === id) {
        return root;
      }

      let element = null;
      _.forEach(root.children, (child) => {
        if (child.id === id) {
          element = child;
          return false;
        }
        element = this.getElementById(child, id);
        if (element) {
          return false;
        }
      });

      return element;
    },
    splitWrapper(orientation) {
      const element = this.getElementById(this.children[0], this.clickedElementId);
      element.orientation = orientation;
      element['children'].push({
        id: this.currentId++,
        children: [],
        orientation: 'horizontal',
        componentType: 'wrapper',
       });
       element['children'].push({
        id: this.currentId++,
        children: [],
        componentType: 'wrapper',
        orientation: 'horizontal',
       });
    },
  },
};
</script>
<style>
  .wrapper {
    height: 100%;
    width: 100%;
    border: 1px solid red;
    position: relative;
  }
</style>
