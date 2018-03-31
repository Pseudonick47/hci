<template>
  <div class="component-wrapper"
       :class="element.orientation"
       :id="element.id"
       @right-click="onRightClick(data)"
       @contextmenu.self="onContextMenuEvent($event)">
    <template v-for="(comp, index) in element.children">
      <graph
        v-if="comp.componentType === 'graph'"
        :key="index"
        :element="comp">
      </graph>
      <wrapper
        @right-click="onRightClick($event, id)"
        v-else-if="comp.componentType === 'wrapper'"
        :key="index"
        :element="comp">
      </wrapper>
    </template>
  </div>
</template>

<script>
import Graph from 'Components/Graph.component.vue';

export default {
  name: 'Wrapper',
  props: {
    element: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    Graph,
  },
  computed: {
    id() {
      return this.element.id;
    },
  },
  methods: {
    onContextMenuEvent(event) {
      this.$emit('right-click', { event, id: this.id });
    },
    onRightClick(data) {
      event.preventDefault();
      this.$emit('right-click', { event: data.event, id: data.id });
    },
  },
};
</script>
<style>
.vertical {
  flex-direction: row;
}
.horizontal {
  flex-direction: column;
}
.component-wrapper {
  box-sizing: border-box;
  display: flex;
  border: 1px solid white;
  width: 100%;
  height: 100%;
}
</style>

