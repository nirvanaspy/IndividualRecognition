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
          <div class="setting-info"></div>
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
    padding: 20px;
    .ant-radio-group {
      label {
        font-size: 28px;
        .mode-text {
          color: #ced4ea;
        }
      }
    }
    .type-container {
      display: inline-block;
      // height: 60px;
      line-height: 50px;
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
    height: calc(100% - 140px);
    margin-top: 20px;
    background: rgba(127, 127, 127, 0.1);
  }
}
</style>
