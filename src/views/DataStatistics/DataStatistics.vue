<template>
  <div id="myChart" style="width: 100%; height: 100%;min-height: 1000px;"></div>
</template>

<script>
export default {
  name: 'DataStatistics',
  data() {
    return {
      option: {
        title: [
          {
            text: '原始信号库统计',
            x: '23%',
            y: '30%',
            textStyle: {
              color: '#fff'
            }
          },
          {
            text: '数据标注库统计',
            x: '73%',
            y: '30%',
            textStyle: {
              color: '#fff'
            }
          },
          {
            text: '模型库统计',
            x: '23%',
            y: '75%',
            textStyle: {
              color: '#fff'
            }
          }
        ],
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['type1', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ['type2', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ['type3', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['type4', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
          ]
        },
        series: [
          {
            type: 'pie',
            radius: 200,
            center: ['25%', '30%']
            // No encode specified, by default, it is '2012'.
          },
          {
            type: 'pie',
            radius: 200,
            center: ['75%', '30%'],
            encode: {
              itemName: 'product',
              value: '2013'
            }
          },
          {
            type: 'pie',
            radius: 200,
            center: ['25%', '75%'],
            encode: {
              itemName: 'product',
              value: '2014'
            }
          }
        ]
      }
    }
  },
  methods: {
    drawPie() {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption(this.option)
    }
  },
  mounted() {
    this.drawPie()
  }
}
</script>

<style scoped></style>
