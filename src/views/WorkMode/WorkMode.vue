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
            <div v-show="activeMode === 1" class="setting-info-container">
              <!--采集存储-->
              <a-row :gutter="40">
                <a-col :span="12" class="col-setting-box">
                  <div class="setting-box">
                    基本设置
                  </div>
                </a-col>
                <a-col :span="12" class="col-setting-box">
                  <div class="setting-box">
                    高级设置
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
          <div class="flow-chart"></div>
          <div class="flow-detail"></div>
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
      activeMode: 1
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
    padding: 14px;
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
      color: #33a4e6;
    }
  }
  .setting-info {
    height: calc(100% - 120px);
    margin-top: 20px;
    background: rgba(127, 127, 127, 0.1);
    padding: 20px 20px 0;
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
  }
  .setting-button-container {
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
}
</style>
