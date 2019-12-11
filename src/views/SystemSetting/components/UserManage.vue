<template>
  <div>
    <!--<div style="margin-bottom: 10px;text-align: right;">
      <a-button type="primary" @click="checkUserSum">
        用户统计
      </a-button>
    </div>-->
    <a-table
      bordered
      :dataSource="dataSource"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      :columns="columns"
      rowKey="id"
      :pagination="pagination"
    >
      <template slot="name" slot-scope="text">
        <editable-cell :text="text" />
      </template>
      <template slot="operation" slot-scope="name, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="确认删除吗"
          @confirm="() => onDelete()"
        >
          <a href="javascript:;">删除</a>
        </a-popconfirm>
        <span style="margin-left: 10px">
          <a href="javascript:;">修改</a>
        </span>
      </template>
    </a-table>
    <!--<div
      id="myChart"
      style="width: 100%; height: 100%;min-height: 400px;margin-top: 40px;"
    ></div>-->
    <a-row :gutter="30">
      <a-col :span="12">
        <div
          id="userNumChart"
          style="width: 100%; height: 100%;min-height: 600px;"
        ></div>
      </a-col>
      <a-col :span="12">
        <div
          id="userTypeChart"
          style="width: 100%; height: 100%;min-height: 600px;"
        ></div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const dataSource = []
// dataSource.push(null)
for (let i = 0; i < 11; i++) {
  dataSource.push({
    name: `用户${i + 1}`,
    auth: `用户`,
    createTime: '2019-12-06 19:30:08',
    id: i
  })
}

export default {
  name: 'Article',
  components: {},
  data() {
    return {
      pagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${dataSource.length} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      dataSource,
      drawerVisible: false,
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '角色',
          dataIndex: 'auth',
          align: 'center'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      selectedRowKeys: [],
      userNumOption: {
        title: {
          text: '用户数量统计',
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
      userTypeOption: {
        title: {
          text: '用户类型统计',
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
      }
    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onDelete() {},

    /*checkUserSum() {
      this.drawerVisible = true
      this.$nextTick(() => {
        this.drawPie()
      })
    },*/

    onClose() {
      this.drawerVisible = false
    },
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
    this.drawPie('userNumChart', this.userNumOption)
    this.drawPie('userTypeChart', this.userTypeOption)
  }
}
</script>

<style lang="less" scoped>
.app-list {
  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 188px;
  }
  .meta-cardInfo {
    zoom: 1;
    margin-top: 16px;

    > div {
      position: relative;
      text-align: left;
      float: left;
      width: 50%;

      p {
        line-height: 32px;
        font-size: 24px;
        margin: 0;

        &:first-child {
          color: rgba(0, 0, 0, 0.45);
          font-size: 12px;
          line-height: 20px;
          margin-bottom: 4px;
        }
      }
    }
  }
}
#userNumChart,
#userTypeChart {
  padding: 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.2);
}
</style>
