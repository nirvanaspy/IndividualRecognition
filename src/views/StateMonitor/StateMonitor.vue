<template>
  <div class="state-container">
    <dv-border-box-11 title="状态监控">
      <div id="state-chart"></div>
    </dv-border-box-11>
  </div>
</template>

<script>
import {
  uiSymbol,
  serverSymbol,
  nodeSymbol,
  gatherSymbol,
  advanceSymbol,
  fileSymbol,
  dataSymbol
} from './symbols'
export default {
  name: 'StateMonitor',
  data() {
    return {
      height: '100%',
      chart: null,
      nodes: [
        // client 类节点
        {
          type: 'client',
          nodeName: 'Client',
          nodeId: 'client1'
        },
        //  调度服务器
        {
          type: 'server',
          nodeName: '调度服务器',
          nodeId: 'server1'
        },
        // 文件存储服务器
        {
          type: 'fileServer',
          nodeName: '文件服务器1',
          nodeId: 'fileServer1'
        },
        {
          type: 'fileServer',
          nodeName: '文件服务器2',
          nodeId: 'fileServer2'
        },
        {
          type: 'fileServer',
          nodeName: '文件服务器3',
          nodeId: 'fileServer3'
        },
        // 数据服务器
        {
          type: 'dataServer',
          nodeName: '数据服务器1',
          nodeId: 'dataServer1'
        },
        {
          type: 'dataServer',
          nodeName: '数据服务器2',
          nodeId: 'dataServer2'
        },
        {
          type: 'dataServer',
          nodeName: '数据服务器3',
          nodeId: 'dataServer3'
        },
        // 常规计算节点
        {
          type: 'normalNode',
          nodeName: '常规计算节点1',
          nodeId: 'normalNode1'
        },
        {
          type: 'normalNode',
          nodeName: '常规计算节点2',
          nodeId: 'normalNode2'
        },
        {
          type: 'normalNode',
          nodeName: '常规计算节点3',
          nodeId: 'normalNode3'
        },
        {
          type: 'normalNode',
          nodeName: '常规计算节点4',
          nodeId: 'normalNode4'
        },
        /*{
          type: 'normalNode',
          nodeName: '常规计算节点5'
        },
        {
          type: 'normalNode',
          nodeName: '常规计算节点6'
        },*/
        // 高级计算节点
        {
          type: 'advanceNode',
          nodeName: '高级计算节点1',
          nodeId: 'advanceNode1'
        },
        {
          type: 'advanceNode',
          nodeName: '高级计算节点2',
          nodeId: 'advanceNode2'
        },
        {
          type: 'advanceNode',
          nodeName: '高级计算节点3',
          nodeId: 'advanceNode3'
        },
        {
          type: 'advanceNode',
          nodeName: '高级计算节点4',
          nodeId: 'advanceNode4'
        },
        // 采集节点
        {
          type: 'gatherNode',
          nodeName: '采集节点1',
          nodeId: 'gatherNode1'
        },
        {
          type: 'gatherNode',
          nodeName: '采集节点2',
          nodeId: 'gatherNode2'
        },
        {
          type: 'gatherNode',
          nodeName: '采集节点3',
          nodeId: 'gatherNode3'
        },
        {
          type: 'gatherNode',
          nodeName: '采集节点4',
          nodeId: 'gatherNode1'
        },
        {
          type: 'gatherNode',
          nodeName: '采集节点5',
          nodeId: 'gatherNode5'
        }
      ],
      chartData: {
        nodes: [],
        lines: [],
        linesData: []
      },
      title: '设备组件关系图',
      xMax: 1000, // 笛卡尔坐标系x轴最大值
      yMax: 1000, // 笛卡尔坐标系y轴最大值
      xDivide: 400, // x坐标轴每个坐标间的间隔
      yDivide: 400, // y坐标轴每个坐标间的间隔
      symbolSize: 40,
      yMargin: 800,
      xMargin: 200
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
      window.onresize = () => {
        if (this.chart) {
          this.chart.resize()
        }
      }
    })
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
      this.chart = this.$echarts.init(document.getElementById('state-chart'))
      this.$nextTick(() => {
        this.chart.resize()
      })
      this.initConfig()
      let option = {
        backgroundColor: 'transparent',
        xAxis: {
          min: 0,
          max: this.xMax,
          show: false,
          type: 'value'
        },
        yAxis: {
          min: 0,
          max: this.yMax,
          show: false,
          type: 'value'
        },
        series: [
          {
            type: 'graph',
            coordinateSystem: 'cartesian2d',
            label: {
              normal: {
                show: true,
                position: 'bottom',
                color: '#00FFFF'
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: function(item) {
                    return item.data.nodeName
                  }
                }
              }
            },
            data: this.chartData.nodes
          },
          {
            type: 'lines',
            polyline: true,
            coordinateSystem: 'cartesian2d',
            lineStyle: {
              normal: {
                width: 2,
                color: '#175064',
                curveness: 0.3
              }
            },
            effect: {
              show: true,
              trailLength: 0,
              symbol: 'arrow',
              color: '#00FFFF',
              symbolSize: 8
            },
            data: this.chartData.lines
          }
        ]
      }
      this.chart.setOption(option)
    },
    initConfig() {
      let fileServerList = []
      let dataServerList = []
      let gatherNodeList = []
      let normalNodeList = []
      let advanceNodeList = []
      let clientList = []
      let serverList = []

      // 获取各模块节点分组与图片
      this.nodes.forEach(node => {
        node.symbolSize = this.symbolSize
        node.itemStyle = {
          normal: {
            color: '#12b5d0'
          }
        }
        switch (node.type) {
          case 'client':
            node.symbol = uiSymbol
            clientList.push(node)
            break
          case 'server':
            node.symbol = serverSymbol
            serverList.push(node)
            break
          case 'fileServer':
            node.symbol = fileSymbol
            fileServerList.push(node)
            break
          case 'dataServer':
            node.symbol = dataSymbol
            dataServerList.push(node)
            break
          case 'gatherNode':
            node.symbol = gatherSymbol
            gatherNodeList.push(node)
            break
          case 'normalNode':
            node.symbol = nodeSymbol
            normalNodeList.push(node)
            break
          case 'advanceNode':
            node.symbol = advanceSymbol
            advanceNodeList.push(node)
            break
          default:
            break
        }
      })

      // 获取坐标系x轴与y轴范围
      let normalLength = normalNodeList.length
      let advanceLength = advanceNodeList.length
      let fileLength = fileServerList.length
      let dataLength = dataServerList.length
      let gatherLength = gatherNodeList.length
      let serverLength = serverList.length
      let clientLength = clientList.length
      this.xMax = Math.max(
        (normalLength + advanceLength) * this.xDivide + this.xMargin * 2,
        serverLength * this.xDivide + this.xMargin * 2,
        1000
      )
      this.yMax = Math.max(
        (fileLength + dataLength) * this.yDivide + this.yMargin * 2,
        gatherLength * this.yDivide + this.yMargin * 2,
        1000
      )

      //  服务器节点坐标
      if (serverLength > 1) {
        serverList.forEach((node, index) => {
          node.value = [
            this.xMargin + (index + 1) * this.xDivide,
            this.yMax / 2
          ]
        })
      } else if (serverLength === 1) {
        serverList[0].value = [this.xMax / 2, this.yMax / 2]
      }

      // client节点坐标
      if (clientLength > 1) {
        serverList.forEach((node, index) => {
          node.value = [
            this.xMargin + (index + 1) * this.xDivide,
            this.yMax - this.xMargin
          ]
        })
      } else if (clientLength === 1) {
        clientList[0].value = [this.xMax / 2, this.yMax - 100]
      }

      // 文件存储服务器节点坐标
      fileServerList.forEach((node, index) => {
        node.value = [0, -(index + 1) * this.yDivide + this.yMax]
      })

      // 数据存储服务器节点坐标
      dataServerList.forEach((node, index) => {
        node.value = [
          0,
          -this.yMargin - (fileLength + index + 1) * this.yDivide + this.yMax
        ]
      })

      // 采集节点坐标
      gatherNodeList.forEach((node, index) => {
        // node.value = [this.xMax - 200, 100 + (index + 1) * this.yDivide]
        node.value = [
          this.xMax,
          -this.xMargin - (index + 1) * this.yDivide + this.yMax
        ]
      })

      // 常规计算节点坐标
      normalNodeList.forEach((node, index) => {
        node.value = [index * this.xDivide, 0]
      })

      // 高级计算节点坐标
      advanceNodeList.forEach((node, index) => {
        node.value = [
          this.xMargin + (normalLength + index + 1) * this.xDivide,
          0
        ]
      })

      this.chartData.nodes = serverList.concat(
        serverList,
        clientList,
        fileServerList,
        dataServerList,
        gatherNodeList,
        normalNodeList,
        advanceNodeList
      )

      // 5大类中继节点
      let fileConcatNode = {
        nodeName: '文件存储服务器',
        symbol: fileSymbol,
        symbolSize: this.symbolSize,
        type: 'fileConcat',
        value: [
          this.xMax / 4,
          (fileServerList[0].value[1] +
            fileServerList[fileLength - 1].value[1]) /
            2
        ],
        itemStyle: {
          normal: {
            color: '#12b5d0'
          }
        },
        nodeId: 'fileConcat'
      }

      let dataConcatNode = {
        nodeName: '数据存储服务器',
        symbol: dataSymbol,
        symbolSize: this.symbolSize,
        type: 'dataConcat',
        value: [
          this.xMax / 4,
          (dataServerList[0].value[1] +
            dataServerList[dataLength - 1].value[1]) /
            2
        ],
        itemStyle: {
          normal: {
            color: '#12b5d0'
          }
        },
        nodeId: 'dataConcat'
      }

      let gatherConcatNode = {
        nodeName: '采集服务器',
        symbol: gatherSymbol,
        symbolSize: this.symbolSize,
        type: 'gatherConcat',
        value: [
          this.xMax * 0.75,
          (gatherNodeList[gatherLength - 1].value[1] +
            gatherNodeList[0].value[1]) /
            2
        ],
        itemStyle: {
          normal: {
            color: '#12b5d0'
          }
        },
        nodeId: 'dataConcat'
      }

      let normalConcatNode = {
        nodeName: '常规计算节点',
        symbol: nodeSymbol,
        symbolSize: this.symbolSize,
        type: 'normalConcat',
        value: [
          (normalNodeList[advanceLength - 1].value[0] +
            normalNodeList[0].value[0]) /
            2,
          600
        ],
        itemStyle: {
          normal: {
            color: '#12b5d0'
          }
        },
        nodeId: 'normalConcat'
      }

      let advanceConcatNode = {
        nodeName: '高级计算节点',
        symbol: advanceSymbol,
        symbolSize: this.symbolSize,
        type: 'advanceConcat',
        value: [
          (advanceNodeList[advanceLength - 1].value[0] +
            advanceNodeList[0].value[0]) /
            2,
          600
        ],
        itemStyle: {
          normal: {
            color: '#12b5d0'
          }
        },
        nodeId: 'advanceConcat'
      }

      let concatNodeList = [
        fileConcatNode,
        dataConcatNode,
        gatherConcatNode,
        normalConcatNode,
        advanceConcatNode
      ]

      this.chartData.nodes = this.chartData.nodes.concat(concatNodeList)

      // 节点间连线数据
      let linkList = []
      serverList.forEach(serverNode => {
        clientList.forEach(client => {
          linkList.push({
            fromNodeId: serverNode.nodeId,
            toNodeId: client.nodeId,
            coords: [serverNode.value, client.value]
          })
        })

        concatNodeList.forEach(node => {
          linkList.push({
            fromNodeId: serverNode.nodeId,
            toNodeId: node.nodeId,
            coords: [
              serverNode.value,
              [serverNode.value[0], node.value[1]],
              node.value
            ]
          })
        })

        this.chartData.nodes.forEach(node => {
          if (node.type == 'fileServer') {
            linkList.push({
              fromNodeId: fileConcatNode.nodeId,
              toNodeId: node.nodeId,
              coords: [fileConcatNode.value, node.value]
            })
          }
          if (node.type == 'dataServer') {
            linkList.push({
              fromNodeId: dataConcatNode.nodeId,
              toNodeId: node.nodeId,
              coords: [dataConcatNode.value, node.value]
            })
          }
          if (node.type == 'normalNode') {
            linkList.push({
              fromNodeId: normalConcatNode.nodeId,
              toNodeId: node.nodeId,
              coords: [normalConcatNode.value, node.value]
            })
          }
          if (node.type == 'advanceNode') {
            linkList.push({
              fromNodeId: advanceConcatNode.nodeId,
              toNodeId: node.nodeId,
              coords: [advanceConcatNode.value, node.value]
            })
          }
          if (node.type == 'gatherNode') {
            linkList.push({
              fromNodeId: gatherConcatNode.nodeId,
              toNodeId: node.nodeId,
              coords: [gatherConcatNode.value, node.value]
            })
          }
        })
        /*fileServerList.forEach(node => {
          let lineData = {
            fromNodeId: serverNode.nodeId,
            toNodeId: node.nodeId,
            coords: [
              serverNode.value,
              [node.value[0] + this.xMax / 4, serverNode.value[1]],
              [node.value[0] + this.xMax / 4, node.value[1]],
              node.value
            ]
          }
          linkList.push(lineData)
        })*/
      })
      // console.log(linkList)
      this.chartData.lines = linkList
    }
  },
  watch: {}
}
</script>

<style lang="less" scoped>
.state-container {
  margin-right: 30px;
  height: calc(100% - 60px);

  #state-chart {
    position: relative;
    height: 100%;
    width: 100%;
    // background: url('1.jpeg') center center;
    // background-size: cover;
    height: 100%;
    // min-height: 600px;
    // background: rgba(3, 13, 23, 0.5);
    // border: 2px solid rgb(14, 65, 108);
    // border-radius: 4px;
  }
}
</style>
