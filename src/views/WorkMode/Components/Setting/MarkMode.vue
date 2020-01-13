<template>
  <div class="mode-setting-container">
    <!--基本设置-->
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

        <!--资源列表及配置信息-->
        <div class="resource-container mark-container">
          <a-row :gutter="40">
            <a-col :span="12" style="height: 100%;">
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
                      selectedRowKeys: markResourceSelectedRowKeys,
                      onChange: onMarkResourceSelectChange
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
                      selectedRowKeys: markFileSelectedRowKeys,
                      onChange: onMarkFileSelectChange
                    }"
                    :columns="markFileColumns"
                    rowKey="path"
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
            </a-col>
            <a-col :span="12" style="height: 100%;">
              <!--基本设置form-->
              <div class="resource-form">
                <dv-border-box-4
                  :color="['#124ef5', '#87ecf5']"
                  style="padding: 40px;"
                >
                  <a-form :form="baseSettingForm">
                    <a-form-item
                      label="标注方式"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-select
                        defaultValue="interpretation"
                        style="width: 240px"
                        v-model="markType"
                      >
                        <a-select-option value="interpretation"
                          >解译标注</a-select-option
                        >
                      </a-select>
                    </a-form-item>
                    <a-form-item
                      label="工作模式"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-radio-group default-value="2" v-model="modelChoose">
                        <a-radio :value="1"
                          ><span style="color: #ced4ea;"
                            >手动模式</span
                          ></a-radio
                        >
                        <a-radio :value="2"
                          ><span style="color: #ced4ea;"
                            >自动模式</span
                          ></a-radio
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
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="setting-button-container">
        <a-button type="primary" style="margin: 12px 20px">启动</a-button>
      </div>
    </div>

    <!--高级设置-->
    <a-modal
      title="高级设置"
      v-model="advanceFormVisible"
      width="800px"
      class="cus-modal"
      :footer="null"
    >
      <div class="advance-setting-box">
        <a-radio-group v-model="processChoose" style="width: 100%;">
          <a-row style="height: 100%;">
            <a-col :span="12" style="height: 100%;">
              <div class="custom-setting-box">
                <a-radio :value="1"><span>用户自定义流程</span></a-radio>
                <a-select
                  defaultValue="interpretation"
                  style="width: 240px; margin-top: 10px;"
                  v-model="userSelectOption"
                >
                  <a-select-option
                    v-for="(option, index) in userOptions"
                    :key="index"
                    :value="option.value"
                    >{{ option.label }}</a-select-option
                  >
                </a-select>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="sys-setting-box">
                <a-radio :value="2"><span>系统默认流程</span></a-radio>
                <a-checkbox-group
                  @change="onSysProcessOptionChange"
                  style="width: 100%;"
                >
                  <div
                    class="option-box"
                    v-for="(option, index) in sysProcessOptions"
                    :key="`process${index}`"
                  >
                    <a-checkbox :value="option.value">{{
                      option.label
                    }}</a-checkbox>
                    <span
                      style="color: #000;float: right;"
                      v-if="option.setting"
                    >
                      <a-button icon="ellipsis" size="small"></a-button>
                    </span>
                  </div>
                </a-checkbox-group>
              </div>
            </a-col>
          </a-row>
        </a-radio-group>
      </div>
      <div class="reset-box">
        <a-button type="default">恢复出厂设置</a-button>
      </div>
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
      baseSettingForm: this.$form.createForm(this),
      markSettingForm: this.$form.createForm(this),
      advanceSettingForm: this.$form.createForm(this),
      markResourceList: [
        { name: '采集设备1', id: '1', state: 1, type: 'PCIe' },
        { name: '采集设备2', id: '2', state: 1, type: 'USB' },
        { name: '采集设备3', id: '3', state: 0, type: '网口' },
        { name: '采集设备4', id: '4', state: 0, type: 'PCIe' },
        { name: '采集设备5', id: '5', state: 1, type: 'USB' }
      ],
      markFileList: [
        {
          name: 'Dir1',
          path: 'D:/data/Dir1',
          isFile: false,
          children: [
            { name: 'file1', path: 'D:/data/Dir1/file1', isFile: true },
            { name: 'file2', path: 'D:/data/Dir1/file2', isFile: true },
            { name: 'file3', path: 'D:/data/Dir1/file3', isFile: true },
            { name: 'file4', path: 'D:/data/Dir1/file4', isFile: true }
          ]
        },
        {
          name: 'Dir2',
          path: 'D:/data/Dir2',
          isFile: false,
          children: [
            {
              name: 'file1',
              path: 'D:/data/Dir2/file1',
              isFile: false,
              children: [
                {
                  name: 'file1-1-1',
                  path: 'D:/data/Dir2/file2/file1-1-1',
                  isFile: true
                }
              ]
            },
            { name: 'file2', path: 'D:/data/Dir2/file2', isFile: true },
            { name: 'file3', path: 'D:/data/Dir2/file3', isFile: true },
            { name: 'file4', path: 'D:/data/Dir2/file4', isFile: true }
          ]
        },
        {
          name: 'Dir3',
          path: 'D:/data/Dir3',
          isFile: false,
          children: [
            { name: 'file1', path: 'D:/data/Dir3/file1', isFile: true },
            { name: 'file2', path: 'D:/data/Dir3/file2', isFile: true },
            { name: 'file3', path: 'D:/data/Dir3/file3', isFile: true },
            { name: 'file4', path: 'D:/data/Dir3/file4', isFile: true }
          ]
        },
        {
          name: 'Dir',
          path: 'D:/data/Dir4',
          isFile: false,
          children: [
            { name: 'file1', path: 'D:/data/Dir4/file1', isFile: true },
            { name: 'file2', path: 'D:/data/Dir4/file2', isFile: true },
            { name: 'file3', path: 'D:/data/Dir4/file3', isFile: true },
            { name: 'file4', path: 'D:/data/Dir4/file4', isFile: true }
          ]
        },
        {
          name: 'Dir5',
          path: 'D:/data/Dir5',
          isFile: false,
          children: [
            { name: 'file1', path: 'D:/data/Dir5/file1', isFile: true },
            { name: 'file2', path: 'D:/data/Dir5/file2', isFile: true },
            { name: 'file3', path: 'D:/data/Dir5/file3', isFile: true },
            { name: 'file4', path: 'D:/data/Dir5/file4', isFile: true }
          ]
        },
        {
          name: 'file1-1',
          path: 'D:/data/Dir1/file1-1',
          isFile: true
        },
        {
          name: 'file1-2',
          path: 'D:/data/Dir1/file1-2',
          isFile: true
        },
        {
          name: 'file1-3',
          path: 'D:/data/Dir1/file1-3',
          isFile: true
        }
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
          title: '设备ID',
          dataIndex: 'id',
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'state',
          align: 'center',
          scopedSlots: { customRender: 'state' }
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
      markResourceSelectedRowKeys: [],
      markFileSelectedRowKeys: [],
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
      markMode: 1, // 1：在线 2：离线
      markType: '', // 标注方式：解译标注
      processChoose: '', // 1: 用户自定义流程  2: 系统默认流程
      sysProcessOptions: [
        { label: '数据解析', value: '数据解析', setting: {} },
        { label: '脉冲检测', value: '脉冲检测', setting: {} },
        { label: '脉冲质量分析', value: '脉冲质量分析', setting: {} },
        { label: '模式检测', value: '模式检测' },
        { label: '质量评估', value: '质量评估', setting: {} },
        { label: '数据清洗', value: '数据清洗', setting: {} },
        { label: '数据解码', value: '数据解码' },
        { label: '有效脉冲提取', value: '有效脉冲提取' },
        { label: '标注置信度评估', value: '标注置信度评估', setting: {} }
      ],
      userOptions: [
        { label: '用户流程1', value: '用户流程1' },
        { label: '用户流程2', value: '用户流程2' },
        { label: '用户流程3', value: '用户流程3' },
        { label: '用户流程4', value: '用户流程4' }
      ],
      userSelectOption: null,
      selectedSysProcess: [],
      selectedUserProcess: []
    }
  },
  methods: {
    onMarkResourceSelectChange(selectedRowKeys) {
      this.markResourceSelectedRowKeys = selectedRowKeys
    },
    onMarkFileSelectChange(selectedRowKeys) {
      this.markFileSelectedRowKeys = selectedRowKeys
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
    },
    onSysProcessOptionChange(checkedValues) {
      this.selectedSysProcess = checkedValues
      this.$emit('processChange', this.selectedSysProcess)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../Styles/index.less';
.sys-setting-box {
  padding-left: 20px;
  border-left: 1px solid #fff;
}
.option-box {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin: 3px 0;
  // text-align: center;
  color: #fff;
}

.reset-box {
  height: 30px;
  line-height: 30px;
  padding: 10px 0;
  border-top: 1px solid #3182c7;
  margin-top: 10px;
  text-align: center;
}
.setting-form {
  margin-top: 0;
}
.resource-container.mark-container {
  height: calc(100% - 80px);
}
</style>
