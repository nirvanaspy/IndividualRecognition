<template>
  <!--<a-layout style="min-height: 100%;">
    <div>
      <a-layout-header>
        <div :class="['top-nav-header-index', theme]">
          <div class="header-index-wide">
            <div class="signal-logo-box">
              <span class="icon">
                <svg-icon icon-class="logo"></svg-icon>
              </span>
              <span class="text">个体识别深度学习</span>
            </div>
            <div class="signal-user-menu">
              <user-menu></user-menu>
            </div>
          </div>
        </div>
      </a-layout-header>
    </div>
    <a-layout-content>
      <div class="signal-type-container">
        <div
          class="signal-item"
          v-for="(signal, index) in signalList"
          :key="index"
          ondblclick="handleChooseSignal(signal.id)"
        >
          <span class="signal-icon" v-if="computeSignalIcon(signal.id)">
            <svg-icon :icon-class="signal.id"></svg-icon>
          </span>
          <span class="signal-name-icon" v-else>{{ signal.name }}</span>
          <span class="signal-name">{{ signal.name }}</span>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer>
      <global-footer></global-footer>
    </a-layout-footer>
  </a-layout>-->
  <div class="signal-type-container">
    <a-row>
      <a-col
        v-for="(signal, index) in signalList"
        :key="index"
        :xs="24"
        :md="12"
        :lg="8"
      >
        <div class="signal-item" ondblclick="handleChooseSignal(signal.id)">
          <div class="signal-icon" v-if="computeSignalIcon(signal.id)">
            <svg-icon :icon-class="signal.id"></svg-icon>
          </div>
          <div class="signal-name-icon" v-else>{{ signal.name }}</div>
          <span class="signal-name">{{ signal.name }}</span>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import GlobalFooter from '../../components/GlobalFooter/GlobalFooter'
// import UserMenu from '../../components/tools/UserMenu'

import { mapGetters } from 'vuex'
export default {
  name: 'SignalMenu',
  components: {
    // GlobalFooter,
    // UserMenu
  },
  data() {
    return {
      signalList: [
        {
          name: 'ADS-B',
          id: 'ads-b'
        },
        {
          name: 'IFF',
          id: ' iff'
        },
        {
          name: '雷达',
          id: 'radar'
        },
        {
          name: '通信',
          id: 'connection'
        },
        {
          name: 'AIS',
          id: 'ais'
        }
      ],
      existIcons: ['radar', 'connection']
    }
  },
  methods: {
    handleChooseSignal(id) {
      console.log(id)
    }
  },
  computed: {
    ...mapGetters(['theme']),
    computeSignalIcon() {
      return function(id) {
        let icon = this.existIcons.find(icon => icon === id)
        if (icon) {
          return id
        } else {
          return null
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../components/index.less';
.signal-type-container {
  width: 60%;
  min-width: 600px;
  min-height: 300px;
  margin: 0 auto;
  margin-top: 120px;
  text-align: center;

  // 禁止选中文字
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
  .signal-item {
    display: inline-block;
    width: 100%;
    border-radius: 6px;
    padding: 40px;
    text-align: center;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    &:hover {
      background: #dfdfdf;
      -webkit-transform: scale(1.1); /*1.1放大值*/
      -moz-transform: scale(1.1);
      -o-transform: scale(1.1);
      -ms-transform: scale(1.1);
    }
    .signal-icon {
      height: 120px;
      line-height: 120px;
      font-size: 100px;
    }
    .signal-name {
      display: block;
      font-size: 20px;
    }
    .signal-name-icon {
      height: 120px;
      line-height: 120px;
      color: #3f51b5;
      font-size: 80px;
      background: linear-gradient(20deg, #1aabe2, #3f51b5);
      -webkit-background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
    }
  }
}
</style>
