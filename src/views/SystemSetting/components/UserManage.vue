<template>
  <div>
    <div style="margin-bottom: 10px;text-align: right;">
      <a-button type="primary" @click="checkUserSum">
        用户统计
      </a-button>
    </div>
    <!--<div class="app-list">
      <a-list
        :grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }"
        :dataSource="dataSource"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <template v-if="item === null">
            <a-button class="new-btn" type="dashed">
              <a-icon type="plus" />
              新增用户
            </a-button>
          </template>
          <template v-else>
            <a-card :hoverable="true">
              <a-card-meta>
                <div style="margin-bottom: 3px" slot="title">
                  {{ item.title }}
                </div>
                <a-avatar
                  class="card-avatar"
                  slot="avatar"
                  :src="require('@/assets/avatar.png')"
                  size="small"
                />
                <div class="meta-cardInfo" slot="description">
                  <div>
                    <p>用户信息1</p>
                    <p>
                      <span>{{ item.activeUser }}</span>
                    </p>
                  </div>
                  <div>
                    <p>用户信息2</p>
                    <p>{{ item.newUser | NumberFormat }}</p>
                  </div>
                </div>
              </a-card-meta>
              <template class="ant-card-actions" slot="actions">
                <a>
                  <a-icon type="download" />
                </a>
                <a>
                  <a-icon type="edit" />
                </a>
                <a>
                  <a-icon type="share-alt" />
                </a>
                <a>
                  <a-dropdown>
                    <a class="ant-dropdown-link" href="javascript:;">
                      <a-icon type="ellipsis" />
                    </a>
                    <a-menu slot="overlay">
                      <a-menu-item>
                        <a href="javascript:;">1st menu item</a>
                      </a-menu-item>
                      <a-menu-item>
                        <a href="javascript:;">2nd menu item</a>
                      </a-menu-item>
                      <a-menu-item>
                        <a href="javascript:;">3rd menu item</a>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
                </a>
              </template>
            </a-card>
          </template>
        </a-list-item>
      </a-list>
    </div>-->

    <a-table
      bordered
      :dataSource="dataSource"
      :columns="columns"
      rowKey="id"
      :pagination="false"
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
    <div
      id="myChart"
      style="width: 100%; height: 100%;min-height: 400px;margin-top: 40px;"
    ></div>
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
      dataSource,
      drawerVisible: false,
      option: {
        title: [
          {
            text: '用户总量统计',
            x: '25%',
            y: '30%',
            textStyle: {
              color: '#fff'
            }
          },
          {
            text: '用户类型统计',
            x: '75%',
            y: '30%',
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
            radius: 150,
            center: ['25%', '40%']
            // No encode specified, by default, it is '2012'.
          },
          {
            type: 'pie',
            radius: 150,
            center: ['75%', '40%'],
            encode: {
              itemName: 'product',
              value: '2013'
            }
          }
        ]
      },
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
      ]
    }
  },
  methods: {
    onDelete() {},
    checkUserSum() {
      this.drawerVisible = true
      this.$nextTick(() => {
        this.drawPie()
      })
    },
    onClose() {
      this.drawerVisible = false
    },
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
</style>
