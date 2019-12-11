<template>
  <div>
    <!--<div style="margin-bottom: 10px;text-align: right;">
      <a-button type="primary" @click="checkAuth">查看权限树</a-button>
    </div>-->
    <a-table
      bordered
      :dataSource="authList"
      :columns="columns"
      rowKey="id"
      :pagination="pagination"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
    >
      <template slot="name" slot-scope="text">
        <editable-cell :text="text" />
      </template>
      <template slot="operation" slot-scope="name, record">
        <a-popconfirm
          v-if="authList.length"
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
    <div class="tree-container">
      <a-row>
        <a-col :span="8">
          <ul id="workMode" class="ztree"></ul>
        </a-col>
        <a-col :span="8">
          <ul id="signalMode" class="ztree"></ul>
        </a-col>
        <a-col :span="8">
          <ul id="fileAuth" class="ztree"></ul>
        </a-col>
      </a-row>
    </div>
    <!--<a-drawer
      title="权限树"
      placement="right"
      width="300"
      :closable="false"
      @close="onClose"
      :visible="drawerVisible"
    >
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="工作模式" key="1">
          <ul id="workMode" class="ztree"></ul>
        </a-tab-pane>
        <a-tab-pane tab="信号类型" key="2" forceRender>
          <ul id="signalMode" class="ztree"></ul>
        </a-tab-pane>
      </a-tabs>
    </a-drawer>-->
  </div>
</template>

<script>
export default {
  name: 'AuthManage',
  data() {
    return {
      selectedRowKeys: [],
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
      authList: [
        {
          name: '用户1',
          auth: '这是用户1',
          id: '1',
          createTime: '2010-8-31 11:00:00'
        },
        {
          name: '用户2',
          auth: '这是用户2',
          id: '2',
          createTime: '2010-8-31 11:01:00'
        },
        {
          name: '用户3',
          auth: '这是用户3',
          id: '3',
          createTime: '2010-8-31 11:02:00'
        },
        {
          name: '用户4',
          auth: '这是用户4',
          id: '4',
          createTime: '2010-8-31 11:03:00'
        },
        {
          name: '用户5',
          auth: '这是用户5',
          id: '5',
          createTime: '2010-8-31 11:03:00'
        },
        {
          name: '用户6',
          auth: '这是用户6',
          id: '6',
          createTime: '2010-8-31 11:03:00'
        },
        {
          name: '用户7',
          auth: '这是用户7',
          id: '7',
          createTime: '2010-8-31 11:03:00'
        },
        {
          name: '用户8',
          auth: '这是用户8',
          id: '8',
          createTime: '2010-8-31 11:03:00'
        },
        {
          name: '用户9',
          auth: '这是用户9',
          id: '9',
          createTime: '2010-8-31 11:03:00'
        },
        {
          name: '用户10',
          auth: '这是用户10',
          id: '10',
          createTime: '2010-8-31 11:03:00'
        },
        {
          name: '用户11',
          auth: '这是用户11',
          id: '11',
          createTime: '2010-8-31 11:03:00'
        }
      ],
      drawerVisible: false,
      setting: {},
      workModeNodes: [
        { name: '工作模式1', open: true, iconSkin: 'mode' },
        { name: '工作模式2', open: true, iconSkin: 'mode' },
        { name: '工作模式3', open: true, iconSkin: 'mode' },
        { name: '工作模式4', open: true, iconSkin: 'mode' },
        { name: '工作模式5', open: true, iconSkin: 'mode' },
        { name: '工作模式6', open: true, iconSkin: 'mode' },
        { name: '工作模式7', open: true, iconSkin: 'mode' },
        { name: '工作模式8', open: true, iconSkin: 'mode' }
      ],
      signalTypeNodes: [
        { name: '信号类型1', open: true, iconSkin: 'signal' },
        { name: '信号类型2', open: true, iconSkin: 'signal' },
        { name: '信号类型3', open: true, iconSkin: 'signal' },
        { name: '信号类型4', open: true, iconSkin: 'signal' },
        { name: '信号类型5', open: true, iconSkin: 'signal' },
        { name: '信号类型6', open: true, iconSkin: 'signal' },
        { name: '信号类型7', open: true, iconSkin: 'signal' },
        { name: '信号类型8', open: true, iconSkin: 'signal' }
      ],
      fileAuthNodes: [
        { name: '文件导出1', open: true, iconSkin: 'signal' },
        { name: '文件导出2', open: true, iconSkin: 'signal' },
        { name: '文件导出3', open: true, iconSkin: 'signal' },
        { name: '文件导出4', open: true, iconSkin: 'signal' },
        { name: '文件导出5', open: true, iconSkin: 'signal' },
        { name: '文件导出6', open: true, iconSkin: 'signal' },
        { name: '文件导出7', open: true, iconSkin: 'signal' },
        { name: '文件导出8', open: true, iconSkin: 'signal' }
      ],
      pagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${this.authList.length} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20']
      }
    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onDelete() {},
    checkAuth() {
      this.drawerVisible = true
      this.$nextTick(() => {
        this.initWorkTree()
        this.initSignalTree()
      })
    },
    onClose() {
      this.drawerVisible = false
    },
    initWorkTree() {
      $.fn.zTree.init($('#workMode'), this.setting, this.workModeNodes)
    },
    initSignalTree() {
      $.fn.zTree.init($('#signalMode'), this.setting, this.signalTypeNodes)
    },
    initFileTree() {
      $.fn.zTree.init($('#fileAuth'), this.setting, this.fileAuthNodes)
    }
  },
  mounted() {
    this.initWorkTree()
    this.initSignalTree()
    this.initFileTree()
  }
}
</script>

<style lang="less" scoped>
.tree-container {
  // border: 1px solid #ddd;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px;
}
</style>
