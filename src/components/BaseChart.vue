<template>
<div class="flex items-center justify-center px-4">
  <div class="max-w-4xl bg-white w-full rounded-lg shadow-xl">
  <div>
    <vue3-chart-js
        :id="lineChart.id"
        :type="lineChart.type"
        :data="lineChart.data"
        :options="lineChart.options"
    ></vue3-chart-js>
  </div>
  </div>

  </div>

</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

export default {
  name: 'base-chart',
  components: {
    Vue3ChartJs,
  },
  props: {
    graphLabels: Array,
    graphData: Array,
  },
  setup (props) {
    const lineChart = {
      id: 'line',
      type: 'line',
      data: {
        labels: props.graphLabels, // ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Evolution of price',
          data: props.graphData, // [50, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "y",
            },
          },
        },
      },
    }

    return {
      lineChart
    }
  },
}
</script>
