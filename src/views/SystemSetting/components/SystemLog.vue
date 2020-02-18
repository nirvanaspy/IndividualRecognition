<template>
  <div>
    <div>
      <span>选择系统日志日期：</span>
      <a-date-picker :disabledDate="disabledDate" @change="onDateChange" />
    </div>
    <input type="file" @change="getLogContent($event)" />
    <div>{{ logContent }}</div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'SystemLog',
  data() {
    return {
      logContent: ''
    }
  },
  methods: {
    onDateChange(date, dateString) {
      console.log(date, dateString)
    },
    disabledDate(current) {
      return current && current > moment().endOf('day')
    },
    getLogContent(e) {
      if (e.target) {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload = () => {
          if (reader.result) {
            this.logContent = reader.result
          }
        }
        reader.readAsText(file)
      }
    }
  },
  created() {}
}
</script>

<style scoped></style>
