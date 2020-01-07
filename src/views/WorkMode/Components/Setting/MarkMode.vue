<template>
  <div class="mode-setting-container">
    <div class="col-setting-box">
      <div class="setting-box">
        <div class="setting-title">
          <span>基本设置</span>
          <a-tooltip placement="top">
            <template slot="title">
              <span>高级设置</span>
            </template>
            <span class="advance-setting-btn" @click="showAdvanceSettingForm">
              <a-icon type="setting" />
            </span>
          </a-tooltip>
        </div>

        <!--资源列表及采集设备配置信息-->
        <div class="resource-container">
          <div class="resource-form">
            <dv-border-box-4
              :color="['#124ef5', '#87ecf5']"
              style="padding: 40px;"
            >
              <div class="mark-mode-box" style="margin-bottom: 20px;">
                <a-radio-group default-value="1" v-model="markMode">
                  <a-radio :value="1"
                    ><span style="color: #ced4ea;">在线标注</span></a-radio
                  >
                  <a-radio :value="2"
                    ><span style="color: #ced4ea;">离线标注</span></a-radio
                  >
                </a-radio-group>
              </div>
              <a-table
                v-show="markMode === 1"
                bordered
                :dataSource="markResourceList"
                :rowSelection="{
                  selectedRowKeys: markSelectedRowKeys,
                  onChange: onMarkSelectChange
                }"
                :columns="markResourceColumns"
                rowKey="id"
                :pagination="false"
              >
                <template slot="state" slot-scope="state">
                  <span
                    :style="{
                      color: state === 0 ? 'red' : 'green'
                    }"
                  >
                    {{ state === 0 ? '忙碌' : '空闲' }}
                  </span>
                </template>
              </a-table>
              <a-table
                v-show="markMode === 2"
                bordered
                :dataSource="markFileList"
                :rowSelection="{
                  selectedRowKeys: markSelectedRowKeys,
                  onChange: onMarkSelectChange
                }"
                :columns="markFileColumns"
                rowKey="id"
                :pagination="false"
              >
                <template slot="name" slot-scope="name, record">
                  <span>
                    <svg-icon
                      icon-class="folder"
                      v-if="record.isFile === false"
                    ></svg-icon>
                    <svg-icon icon-class="file" v-else></svg-icon>
                  </span>
                  {{ name }}
                </template>
              </a-table>
            </dv-border-box-4>
          </div>
        </div>

        <!--基本设置form-->
        <div class="setting-form">
          <dv-border-box-4
            :color="['#124ef5', '#87ecf5']"
            style="padding: 40px;height: 300px;"
          >
            <a-form :form="baseSettingForm">
              <a-form-item
                label="工作模式"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-radio-group default-value="2" v-model="modelChoose">
                  <a-radio :value="1"
                    ><span style="color: #ced4ea;">手动模式</span></a-radio
                  >
                  <a-radio :value="2"
                    ><span style="color: #ced4ea;">自动模式</span></a-radio
                  >
                </a-radio-group>
              </a-form-item>
              <a-form-item
                v-show="modelChoose === 2"
                label="开始时间"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-date-picker
                  :disabledDate="disabledStartDate"
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  v-model="startValue"
                  placeholder="开始时间"
                  @openChange="handleStartOpenChange"
                />
              </a-form-item>
              <a-form-item
                v-show="modelChoose === 2"
                label="结束时间"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-date-picker
                  :disabledDate="disabledStartDate"
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  v-model="endValue"
                  placeholder="结束时间"
                  @openChange="handleStartOpenChange"
                />
              </a-form-item>
              <a-form-item
                label="结束后操作"
                v-show="modelChoose === 2"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-radio-group default-value="1">
                  <a-radio :value="1"
                    ><span style="color: #ced4ea;">关机</span></a-radio
                  >
                  <a-radio :value="2"
                    ><span style="color: #ced4ea;">待机</span></a-radio
                  >
                </a-radio-group>
              </a-form-item>
            </a-form>
          </dv-border-box-4>
        </div>
      </div>
      <div class="setting-button-container">
        <a-button type="primary" style="margin: 12px 20px">启动</a-button>
      </div>
    </div>

    <a-modal title="高级设置" v-model="advanceFormVisible">
      <a-form :form="advanceSettingForm">
        <a-form-item
          label="高级配置1"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input></a-input>
        </a-form-item>
        <a-form-item
          label="高级配置2"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input></a-input>
        </a-form-item>
        <a-form-item
          label="高级配置3"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input></a-input>
        </a-form-item>
        <a-form-item
          label="高级配置4"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input></a-input>
        </a-form-item>
        <a-form-item
          label="高级配置5"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input></a-input>
        </a-form-item>
        <a-form-item
          label="高级配置6"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input></a-input>
        </a-form-item>
        <a-form-item
          label="高级配置7"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'MarkMode',
  data() {
    return {
      formLayout: 'horizontal',
      advanceFormVisible: false,
      baseSettingForm: this.$form.createForm(this, { name: 'coordinated' }),
      markSettingForm: this.$form.createForm(this, { name: 'coordinated' }),
      advanceSettingForm: this.$form.createForm(this, { name: 'coordinated' }),
      markResourceList: [
        { name: '采集设备1', id: '1', state: 1, type: 'PCIe' },
        { name: '采集设备2', id: '2', state: 1, type: 'USB' },
        { name: '采集设备3', id: '3', state: 0, type: '网口' },
        { name: '采集设备4', id: '4', state: 0, type: 'PCIe' },
        { name: '采集设备5', id: '5', state: 1, type: 'USB' }
      ],
      markFileList: [
        { name: 'Dir', path: 'D:/data/Dir1', isFile: false },
        { name: 'Dir', path: 'D:/data/Dir2', isFile: false },
        { name: 'Dir', path: 'D:/data/Dir3', isFile: false },
        { name: 'Dir', path: 'D:/data/Dir4', isFile: false },
        { name: 'Dir', path: 'D:/data/Dir5', isFile: false },
        { name: 'file1', path: 'D:/data/Dir1/file1', isFile: true },
        { name: 'file1', path: 'D:/data/Dir2/file1', isFile: true },
        { name: 'file1', path: 'D:/data/Dir3/file1', isFile: true },
        { name: 'file1', path: 'D:/data/Dir4/file1', isFile: true },
        { name: 'file1', path: 'D:/data/Dir5/file1', isFile: true },
        { name: 'file2', path: 'D:/data/Dir1/file2', isFile: true },
        { name: 'file2', path: 'D:/data/Dir2/file2', isFile: true },
        { name: 'file2', path: 'D:/data/Dir3/file2', isFile: true },
        { name: 'file2', path: 'D:/data/Dir4/file2', isFile: true },
        { name: 'file2', path: 'D:/data/Dir5/file2', isFile: true },
        { name: 'file3', path: 'D:/data/Dir1/file3', isFile: true },
        { name: 'file3', path: 'D:/data/Dir2/file3', isFile: true },
        { name: 'file3', path: 'D:/data/Dir3/file3', isFile: true },
        { name: 'file3', path: 'D:/data/Dir4/file3', isFile: true },
        { name: 'file3', path: 'D:/data/Dir5/file3', isFile: true },
        { name: 'file4', path: 'D:/data/Dir1/file4', isFile: true },
        { name: 'file4', path: 'D:/data/Dir2/file4', isFile: true },
        { name: 'file4', path: 'D:/data/Dir3/file4', isFile: true },
        { name: 'file4', path: 'D:/data/Dir4/file4', isFile: true },
        { name: 'file4', path: 'D:/data/Dir5/file4', isFile: true }
      ],
      markResourceColumns: [
        {
          title: '名称',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '类型',
          dataIndex: 'type',
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'state',
          align: 'center',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '设备ID',
          dataIndex: 'id',
          align: 'center'
        }
      ],
      markFileColumns: [
        {
          title: '名称',
          dataIndex: 'name',
          align: 'left',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '路径',
          dataIndex: 'path',
          align: 'center'
        }
      ],
      markSelectedRowKeys: [],
      markPagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${this.markResourceList.length} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      modelChoose: 2,
      startValue: null,
      endValue: null,
      endOpen: false,
      markMode: 1
    }
  },
  methods: {
    onMarkSelectChange(selectedRowKeys) {
      this.markSelectedRowKeys = selectedRowKeys
    },
    disabledStartDate(startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    },
    showAdvanceSettingForm() {
      this.advanceFormVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
@import '../Styles/index.less';
</style>
