<template>
  <div
    id="state_chart"
    :style="{ height: height, width: width }"
    style="min-height: 800px;background: #fff;"
  ></div>
</template>

<script>
export default {
  name: 'StateMonitor',
  data() {
    return {
      height: '100%',
      width: '100%',
      chart: null,
      list: [],
      dataList: [
        {
          name: 'server',
          x: 450,
          y: 100,
          deviceInfo: {
            id: 'server',
            cpu: '34%',
            gpu: '40%',
            disk: '46%',
            ram: '30%',
            cpuNum: 8
          },
          symbolSize: 40
        },
        {
          name: '节点1',
          x: 300,
          y: 300,
          id: 1,
          deviceInfo: {
            id: 1,
            cpu: '34%',
            gpu: '40%',
            disk: '46%',
            ram: '30%',
            cpuNum: 8
          }
        },
        {
          name: '节点2',
          x: 400,
          y: 300,
          id: 2,
          deviceInfo: {
            id: 2,
            cpu: '34%',
            gpu: '40%',
            disk: '46%',
            ram: '30%',
            cpuNum: 8
          }
        },
        {
          name: '节点3',
          x: 500,
          y: 300,
          id: 3,
          deviceInfo: {
            id: 3,
            cpu: '34%',
            gpu: '40%',
            disk: '46%',
            ram: '30%',
            cpuNum: 8
          }
        },
        {
          name: '节点4',
          x: 600,
          y: 300,
          id: 4,
          deviceInfo: {
            id: 4,
            cpu: '34%',
            gpu: '40%',
            disk: '46%',
            ram: '30%',
            cpuNum: 8
          }
        }
      ],
      dataItem: {},
      linksList: [
        {
          source: 'server',
          target: 1
        },
        {
          source: 'server',
          target: 2
        },
        {
          source: 'server',
          target: 3
        },
        {
          source: 'server',
          target: 4
        }
      ],
      linksItem: {},
      centerDevice: {},
      centerX: 300,
      centerY: 400,
      childX: 550,
      stepY: 200,
      title: '设备组件关系图'
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(document.getElementById('state_chart'))

      this.chart.setOption({
        /*title: {
          text: this.title
        },*/
        tooltip: {
          formatter: function(x) {
            let res
            if (x.data.deviceInfo) {
              res =
                '<div><p>设备id：' +
                x.data.deviceInfo.id +
                '</p></div>' +
                '<div><p>CPU使用率：' +
                x.data.deviceInfo.cpu +
                '</p></div>' +
                '<div><p>GPU使用率：' +
                x.data.deviceInfo.gpu +
                '</p></div>' +
                '<div><p>磁盘使用率：' +
                x.data.deviceInfo.disk +
                '</p></div>' +
                '<div><p>内存使用率：' +
                x.data.deviceInfo.ram +
                '</p></div>' +
                '<div><p>CPU核心数：' +
                x.data.deviceInfo.cpuNum +
                '</p></div>'
            }
            return res
          }
        },
        animationDurationUpdate: 300,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 30,
            itemStyle: {
              normal: {
                color: 'rgb(79, 97, 185)'
              }
            },
            symbol:
              'image://data:image/png;base64,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',
            // symbol: 'image://./static/app.png',
            // symbol: 'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
            roam: true,
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  fontSize: 16,
                  fontFamily: 'Arial',
                  fontWeight: 700,
                  textShadow: 'none',
                  color: '#777'
                }
              }
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 16
                }
              }
            },
            data: this.dataList,
            links: this.linksList
          }
        ]
      })
    },
    initConfig() {}
  },
  watch: {
    detailList() {
      this.list = this.detailList
      this.initConfig()
      this.initChart()
    }
  }
}
</script>
