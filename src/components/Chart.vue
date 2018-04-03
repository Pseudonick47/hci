<template>
  <div>
    <line-chart :data="chartData"></line-chart>
    <pie-chart :data="[['Blueberry', 44], ['Strawberry', 23]]"></pie-chart>
    <column-chart :data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]"></column-chart>
    <bar-chart :data="[['Work', 32], ['Play', 1492]]"></bar-chart>
    <scatter-chart :data="[[174.0, 80.0], [176.5, 82.3]]" xtitle="Size" ytitle="Population"></scatter-chart>
    <line-chart :data="data" :download="true"/>
  </div>
</template>

<script>

export default {
  name: 'chart',
  data: () => ({
    data: [
      { name: 'Workout', data: [['Jan', 4], ['Feb', 21], ['Mar', 13], ['Apr', 52], ['May', 33]] },
      { name: 'Call parents', data: [['Jan', 4], ['Feb', 42], ['Mar', 23], ['Apr', 52], ['May', 33]] },
      { name: 'Workout', data: [['Jan', 3], ['Feb', 122], ['Mar', 13], ['Apr', 52], ['May', 33]] },
      { name: 'Call parents', data: [['Jan', 4], ['Feb', 72], ['Mar', 73], ['Apr', 52], ['May', 33]] },
      { name: 'Workout', data: [['Jan', 2], ['Feb', 83], ['Mar', 13], ['Apr', 52], ['May', 33]] },
      { name: 'Call parents', data: [['Jan', 4], ['Feb', 92], ['Mar', 23], ['Apr', 52], ['May', 33]] },
      { name: 'Workout', data: [['Jan', 1], ['Feb', 23], ['Mar', 13], ['Apr', 52], ['May', 33]] },
      { name: 'Call parents', data: [['Jan', 4], ['Feb', 92], ['Mar', 113], ['Apr', 52], ['May', 33]] },
    ],
    chartData: [['Jan', 4], ['Feb', 2], ['Mar', 10], ['Apr', 5], ['May', 3]]
  }),
};

</script>