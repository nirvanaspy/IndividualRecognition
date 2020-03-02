<template>
  <div class="http-server-setting-container">
    <div style="text-align: right;height: 30px;margin-bottom: 10px;">
      <a-button type="primary" @click="handleAdd()">新增</a-button>
    </div>
    <a-table
      bordered
      :dataSource="httpServerList"
      :columns="columns"
      :pagination="false"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      rowKey="id"
    >
      <template
        v-for="(col, index) in columns"
        :slot="col.dataIndex"
        slot-scope="text, record"
      >
        <div :key="index">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, col, record)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="action" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record)">保存</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="真的放弃编辑吗?"
              @confirm="() => cancel(record)"
            >
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a class="edit" @click="() => edit(record)">修改</a>
            <a-divider type="vertical" />
            <a class="delete" @click="() => del(record)">删除</a>
          </span>
        </div>
      </template>
    </a-table>
    <a-modal
      title="新增Http服务器配置信息"
      :width="800"
      v-model="visible"
      @ok="addSetting"
    >
      <a-form :form="form">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="监听端口"
        >
          <a-input-number
            placeholder="请输入监听端口"
            v-decorator="[
              'ListenPort',
              {
                rules: [{ required: true, message: '请输入监听端口' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="监听ip"
        >
          <a-input
            placeholder="请输入监听ip"
            v-decorator="[
              'ListenIp',
              {
                rules: [{ required: true, message: '请输入监听ip' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="Http最大处理线程数量"
        >
          <a-input-number
            placeholder="请输入Http最大处理线程数量"
            v-decorator="[
              'ThreadMaxCount',
              {
                rules: [{ required: true, message: '请输入监听ip' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import _ from 'lodash'
import {
  getSettingConfig,
  addSettingConfig,
  modifySettingConfig,
  deleteSettingConfig
} from '@/api/systemSetting'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
export default {
  name: 'HttpServerSetting',
  data() {
    return {
      httpServerList: [
        {
          ListenIp: '192.168.1.100',
          ListenPort: 21432,
          ThreadMaxCount: 100,
          configItemId: 0,
          configItemType: 4
        }
      ],
      selectedRowKeys: [],
      columns: [
        {
          title: '监听ip',
          dataIndex: 'ListenIp',
          align: 'center',
          scopedSlots: { customRender: 'ListenIp' }
        },
        {
          title: '监听端口',
          dataIndex: 'ListenPort',
          align: 'center',
          scopedSlots: { customRender: 'ListenPort' }
        },
        {
          title: 'Http最大处理线程数量',
          dataIndex: 'ThreadMaxCount',
          align: 'center',
          scopedSlots: { customRender: 'ThreadMaxCount' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '120px',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      visible: false,
      form: this.$form.createForm(this, { name: 'httpServerForm' }),
      formItemLayout
    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    edit(row) {
      row.editable = true
      row.backUp = Object.assign({}, row)
      let targetIndex = this.httpServerList.findIndex(
        item => item.configItemId === row.configItemId
      )
      this.$set(this.httpServerList, targetIndex, row)
    },
    // eslint-disable-next-line
    del(row) {
      this.$confirm({
        title: '警告',
        content: `真的要删除吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          console.log('OK')
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    save(row) {
      console.log(row)
      row.editable = false
      let targetIndex = this.httpServerList.findIndex(
        item => item.configItemId === row.configItemId
      )
      this.$set(this.httpServerList, targetIndex, row)
    },
    cancel(row) {
      row = _.cloneDeep(row.backUp)
      row.backUp = undefined
      row.editable = false
      let targetIndex = this.httpServerList.findIndex(
        item => item.configItemId === row.configItemId
      )
      this.$set(this.httpServerList, targetIndex, row)
    },
    handleChange(value, column, record) {
      record[column.dataIndex] = value
    },
    handleAdd() {
      this.visible = true
    },
    addSetting() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let params = { ...values }
          params.type = 2
          params.configItemType = 2
          addSettingConfig(params).then()
        }
      })
    }
  },
  created() {
    getSettingConfig(4).then()
  }
}
</script>

<style scoped></style>
