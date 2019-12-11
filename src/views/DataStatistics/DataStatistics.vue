<template>
  <div class="data-statistics-container">
    <div class="view-title">
      <div class="view-title-btn">数据统计</div>
    </div>
    <a-row :gutter="30">
      <a-col :span="8">
        <div
          id="signalBaseChart"
          style="width: 100%; height: 100%;min-height: 600px;"
        ></div>
      </a-col>
      <a-col :span="8">
        <div
          id="dataMarkBaseChart"
          style="width: 100%; height: 100%;min-height: 600px;"
        ></div>
      </a-col>
      <a-col :span="8">
        <div
          id="modelBaseChart"
          style="width: 100%; height: 100%;min-height: 600px;"
        ></div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'DataStatistics',
  data() {
    return {
      signalOption: {
        title: {
          text: '原始信号库统计',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {},
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: 'center',
          data: ['type1', 'type2', 'type3', 'type4'],
          textStyle: {
            color: '#fff'
          }
        },
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
            encode: {
              itemName: 'product',
              value: '2013'
            },
            radius: '65%',
            center: ['50%', '50%']
            // No encode specified, by default, it is '2012'.
          }
        ]
      },
      dataMarkOption: {
        title: {
          text: '数据标注库统计',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {},
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: 'center',
          data: ['type1', 'type2', 'type3', 'type4'],
          textStyle: {
            color: '#fff'
          }
        },
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
            encode: {
              itemName: 'product',
              value: '2013'
            },
            radius: '65%',
            center: ['50%', '50%']
          }
        ]
      },
      modelOption: {
        title: {
          text: '模型库统计',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {},
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: 'center',
          data: ['type1', 'type2', 'type3', 'type4'],
          textStyle: {
            color: '#fff'
          }
        },
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
            encode: {
              itemName: 'product',
              value: '2014'
            },
            radius: '65%',
            center: ['50%', '50%']
          }
        ]
      }
    }
  },
  methods: {
    drawPie(id, option) {
      let myChart = this.$echarts.init(document.getElementById(id))
      myChart.setOption(option)
      this.$nextTick(() => {
        window.onresize = () => {
          if (myChart) {
            myChart.resize()
          }
        }
      })
    }
  },
  mounted() {
    this.drawPie('signalBaseChart', this.signalOption)
    this.drawPie('dataMarkBaseChart', this.dataMarkOption)
    this.drawPie('modelBaseChart', this.modelOption)
  }
}
</script>

<style scoped>
#signalBaseChart,
#dataMarkBaseChart,
#modelBaseChart {
  padding: 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.3);
}
</style>
