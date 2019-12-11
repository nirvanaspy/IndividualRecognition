<template>
  <div>
    <a-tabs defaultActiveKey="1">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="user" />
          配置设置
        </span>
        <user-manage></user-manage>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="safety-certificate" />
          结果展示
        </span>
        <auth-manage></auth-manage>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  name: 'WorkMode'
}
</script>

<style scoped></style>
