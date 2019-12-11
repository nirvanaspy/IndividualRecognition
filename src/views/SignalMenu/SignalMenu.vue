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
  <div style="height: 100%;">
    <div class="view-title">
      <div class="view-title-btn">信号导航</div>
    </div>
    <div class="signal-type-container">
      <a-row :gutter="30">
        <a-col :span="2"></a-col>
        <a-col v-for="(signal, index) in signalList" :key="index" :span="4">
          <div
            class="signal-item"
            @dblclick="handleChooseSignal(signal.id)"
            @contextmenu.prevent="onSignalRightClick($event, signal)"
          >
            <!--<div class="signal-icon" v-if="computeSignalIcon(signal.id)">
              <svg-icon :icon-class="signal.id"></svg-icon>
            </div>
            <div class="signal-name-icon" v-else>{{ signal.name }}</div>
            <span class="signal-name">{{ signal.name }}</span>-->
            <div class="signal-icon">
              <img :src="signal.src" alt="" />
            </div>
          </div>
          <div class="signal-name">{{ signal.name }}</div>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>
      <vue-context ref="signalContextMenu">
        <div style="padding: 0" slot-scope="signal">
          <li @click="changeImg(signal)">更换图片</li>
        </div>
      </vue-context>
      <a-modal
        title="更改图片"
        :visible="visible"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <upload-image></upload-image>
      </a-modal>
    </div>
  </div>
</template>

<script>
// import GlobalFooter from '../../components/GlobalFooter/GlobalFooter'
// import UserMenu from '../../components/tools/UserMenu'

import { mapGetters } from 'vuex'
import VueContext from 'vue-context'
import 'vue-context/src/sass/vue-context.scss'

import UploadImage from './comonents/UploadImage'
export default {
  name: 'SignalMenu',
  components: {
    VueContext,
    UploadImage
    // GlobalFooter,
    // UserMenu
  },
  data() {
    return {
      visible: false,
      signalList: [
        {
          name: 'ADS-B',
          id: 'ads-b',
          src: require('./assets/ads-b.jpg')
        },
        {
          name: 'IFF',
          id: ' iff',
          src: require('./assets/iff.jpg')
        },
        {
          name: '雷达',
          id: 'radar',
          src: require('./assets/radar.jpg')
        },
        {
          name: '通信',
          id: 'connection',
          src: require('./assets/connection.jpg')
        },
        {
          name: 'AIS',
          id: 'ais',
          src: require('./assets/ais.jpg')
        }
      ],
      existIcons: ['radar', 'connection']
    }
  },
  methods: {
    handleChooseSignal(id) {
      console.log(id)
      this.$router.push('/workMode')
    },
    onSignalRightClick(event, data) {
      this.$refs.signalContextMenu.open(event, data)
    },
    changeImg(signal) {
      console.log(signal)
      this.visible = true
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
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
  width: 100%;
  min-width: 600px;
  min-height: 300px;
  position: relative;
  top: 40%;
  margin: -160px auto 0;
  text-align: center;

  // 禁止选中文字
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
  .signal-item {
    display: inline-block;
    width: 100%;
    max-width: 400px;
    height: 300px;
    border-radius: 6px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    border: 3px dashed rgb(14, 65, 108);
    background: rgba(3, 13, 23, 0.3);
    &:hover {
      // background: #dfdfdf;
      background: rgba(3, 13, 23, 0.5);
      -webkit-transform: scale(1.1); /*1.1放大值*/
      -moz-transform: scale(1.1);
      -o-transform: scale(1.1);
      -ms-transform: scale(1.1);
    }
    .signal-icon {
      /*height: 200px;
      width: 200px;*/
      width: 100%;
      height: 100%;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
    /*.signal-name {
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
    }*/
  }
  .signal-name {
    margin-top: 20px;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
  }
}
</style>
