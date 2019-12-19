<template>
  <div class="work-mode-container">
    <a-tabs defaultActiveKey="1">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="setting" />
          配置设置
        </span>
        <div class="work-mode-setting">
          <div class="setting-type">
            <a-radio-group
              name="radioGroup"
              :defaultValue="1"
              v-model="activeMode"
            >
              <a-radio :value="1">
                <div style="" class="type-container">
                  <span class="mode-icon">
                    <svg-icon icon-class="mode1"></svg-icon>
                  </span>
                  <span class="mode-text">采集存储</span>
                </div>
              </a-radio>
              <a-radio :value="2">
                <div style="" class="type-container">
                  <span class="mode-icon">
                    <svg-icon icon-class="mode2"></svg-icon>
                  </span>
                  <span class="mode-text">数据标注</span>
                </div>
              </a-radio>
              <a-radio :value="3">
                <div style="" class="type-container">
                  <span class="mode-icon">
                    <svg-icon icon-class="mode3"></svg-icon>
                  </span>
                  <span class="mode-text">模型训练</span>
                </div>
              </a-radio>
              <a-radio :value="4">
                <div style="" class="type-container">
                  <span class="mode-icon">
                    <svg-icon icon-class="mode4"></svg-icon>
                  </span>
                  <span class="mode-text">推理识别</span>
                </div>
              </a-radio>
            </a-radio-group>
          </div>
          <div class="setting-info">
            <div class="setting-info-container">
              <!--采集存储-->
              <a-row :gutter="40">
                <a-col :span="12" class="col-setting-box">
                  <div class="setting-box">
                    <div class="setting-title">基本设置</div>
                    <div class="setting-form">
                      <a-form :form="baseSettingForm">
                        <a-form-item
                          label="工作模式"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-radio-group default-value="1">
                            <a-radio :value="1">手动模式</a-radio>
                            <a-radio :value="2">自动模式</a-radio>
                          </a-radio-group>
                        </a-form-item>
                        <a-form-item
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
                          label="基本配置1"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-input></a-input>
                        </a-form-item>
                        <a-form-item
                          label="基本配置2"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-input></a-input>
                        </a-form-item>
                        <a-form-item
                          label="基本配置3"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-input></a-input>
                        </a-form-item>
                        <a-form-item
                          label="基本配置4"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-input-number></a-input-number>
                        </a-form-item>
                      </a-form>
                    </div>
                  </div>
                </a-col>
                <a-col :span="12" class="col-setting-box">
                  <div class="setting-box">
                    <div class="setting-title">高级设置</div>
                    <div class="setting-form">
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
                    </div>
                  </div>
                </a-col>
                <div class="setting-button-container">
                  <a-button type="primary" style="margin: 12px 20px"
                    >启动</a-button
                  >
                </div>
              </a-row>
            </div>
            <!--<div v-show="activeMode === 2" class="setting-info-container">
              数据标注
            </div>
            <div v-show="activeMode === 3" class="setting-info-container">
              模型训练
            </div>
            <div v-show="activeMode === 4" class="setting-info-container">
              推理识别
            </div>-->
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="file" />
          结果展示
        </span>
        <div class="work-mode-result">
          <div class="flow-btn-container">
            <a-button type="primary" style="margin-right: 10px;"
              >暂停/运行</a-button
            >
            <a-button type="primary">结束</a-button>
          </div>
          <div class="flow-chart">
            <a-steps :current="currentStep">
              <a-step v-for="(item, index) in steps" :key="index">
                <div
                  class="custom-step"
                  slot="icon"
                  :class="{ 'current-step': currentStep === index }"
                  @dblclick="setCurrentStep(index)"
                >
                  {{ item.title }}
                </div>
              </a-step>
            </a-steps>
          </div>
          <div class="flow-detail">
            <div class="flow-detail-title">
              {{ steps[currentStep] ? steps[currentStep].title : '' }}
            </div>
            <div class="flow-detail-content">
              <a-card title="流程结果" :bordered="false">
                <template>
                  <a-skeleton active />
                </template>
              </a-card>
              <a-card title="流程结果" :bordered="false">
                <template>
                  <a-skeleton active />
                </template>
              </a-card>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  name: 'WorkMode',
  data() {
    return {
      currentStep: 3,
      activeMode: 1,
      formLayout: 'horizontal',
      baseSettingForm: this.$form.createForm(this, { name: 'coordinated' }),
      advanceSettingForm: this.$form.createForm(this, { name: 'coordinated' }),
      startValue: null,
      endValue: null,
      endOpen: false,
      steps: [
        {
          title: '流程1',
          status: 1
        },
        {
          title: '流程2',
          status: 0
        },
        {
          title: '流程3',
          status: 0
        },
        {
          title: '流程4',
          status: 0
        }
      ]
    }
  },
  methods: {
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
    setCurrentStep(index) {
      this.currentStep = index
    }
  }
}
</script>

<style lang="less" scoped>
.work-mode-container {
  height: 100%;
  .work-mode-setting {
    height: 100%;
    padding: 10px 10px;
  }
  .setting-type {
    background: rgba(127, 127, 127, 0.1);
    padding: 20px;
    border-radius: 4px;
    .ant-radio-group {
      label {
        font-size: 20px;
        .mode-text {
          color: #ced4ea;
        }
      }
    }
    .type-container {
      display: inline-block;
      // height: 60px;
      line-height: 40px;
      padding: 4px 26px;
      margin-right: 40px;
      background: #1c5ea3;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(39, 107, 270, 1);
    }
    .mode-icon {
      margin-right: 10px;
      color: #d8f0ff;
    }
  }
  .setting-info {
    height: calc(100% - 120px);
    margin-top: 20px;
    background: rgba(127, 127, 127, 0.1);
    padding: 20px 20px 0;
    border-radius: 4px;
    .setting-info-container {
      height: 100%;
    }
  }
  .ant-row {
    height: 100%;
  }
  .col-setting-box {
    height: calc(100% - 60px);
    .setting-box {
      width: 100%;
      height: 100%;
      padding: 10px;
      background: rgba(0, 0, 0, 0.2);
    }
    .setting-title {
      color: #198efc;
      font-weight: 700;
      font-size: 18px;
      height: 30px;
      line-height: 30px;
    }
    .setting-form {
      margin-top: 20px;
      .ant-radio-group {
        label {
          font-size: 16px;
          color: #ced4ea;
        }
      }
      .ant-form-item-label {
        label {
          color: #ced4ea !important;
        }
      }
    }
  }
  .setting-button-container {
    height: 40px;
    line-height: 40px;
    text-align: right;
  }

  .work-mode-result {
    height: 100%;
    .flow-btn-container {
      text-align: right;
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
    }
    .flow-chart {
      background: rgba(127, 127, 127, 0.1);
      padding: 20px;
      border-radius: 4px;
    }
    .flow-detail {
      height: calc(100% - 120px);
      margin-top: 20px;
      background: rgba(127, 127, 127, 0.1);
      padding: 20px 20px 0;
      border-radius: 4px;
      .flow-detail-title {
        height: 40px;
        line-height: 40px;
        font-size: 20px;
      }
    }
  }
  .custom-step {
    padding: 4px 20px;
    border-radius: 4px;
    background: #607090;
    color: #ced4ea;
    cursor: pointer;
    &.current-step {
      background: #315cce;
    }
    // 禁止选中文字
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    user-select: none;
  }
  .ant-card {
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>
