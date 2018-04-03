<template>
    <vue-chartist :data="podaci" :options="options" type="Line"></vue-chartist>
</template>

<script>
import VueChartist from 'v-chartist'

export default {
    name: 'chart',
    components: {
        VueChartist
    },
    data: function () {
        return {
            podaci: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                series: [
                    [12, 9, 7, 8, 5],
                    [2, 1, 3.5, 7, 3],
                    [1, 3, 4, 5, 6]
                ]
            },
            options: {
                fullWidth: true,
                chartPadding: {
                    right: 40
                },
                strech: true
            }
        };
    }
}

</script>