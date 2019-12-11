<template>
  <div class="sys-setting-container">
    <div class="view-title">
      <div class="view-title-btn">系统管理</div>
    </div>
    <a-tabs defaultActiveKey="2">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="user" />
          用户管理
        </span>
        <user-manage></user-manage>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="safety-certificate" />
          权限管理
        </span>
        <auth-manage></auth-manage>
      </a-tab-pane>
      <a-tab-pane key="3">
        <span slot="tab">
          <a-icon type="setting" />
          系统设置
        </span>
        权限管理
      </a-tab-pane>
      <a-tab-pane key="4">
        <span slot="tab">
          <a-icon type="lock" />
          加密授权
        </span>
        加密授权
      </a-tab-pane>
      <a-tab-pane key="5">
        <span slot="tab">
          <a-icon type="file-search" />
          系统简介
        </span>
        <system-intro></system-intro>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import UserManage from './components/UserManage'
import AuthManage from './components/AuthManage'
import SystemIntro from './components/SystemIntro'
export default {
  name: 'SystemSetting',
  components: {
    UserManage,
    AuthManage,
    SystemIntro
  }
}
</script>

<style lang="less" scoped>
.sys-setting-container {
  // padding: 0 20px 0;
}
</style>
