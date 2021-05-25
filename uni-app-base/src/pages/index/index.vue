<template>
  <view class="content">
    <h2>测试原生标签，多端应用，哈哈哈哈</h2>
    <div>
      <span>测试原生模块编译小程序</span>
    </div>
    <h2>uni</h2>
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
    </view>
    <h2>uni ui组件，图文卡片模式</h2>
    <uni-card
      title="标题文字"
      mode="style"
      :is-shadow="true"
      thumbnail="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
      extra="Dcloud 2019-05-20 12:32:19"
      note="Tips"
    >
      uni-app 是一个使用 Vue.js
      开发所有前端应用的框架，开发者编写一套代码，可编译到iOS、Android、H5、以及各种小程序等多个平台。即使不跨端，uni-app同时也是更好的小程序开发框架。
    </uni-card>
    <h2>uview-ui组件</h2>
    <u-button class="custom-style">雪月夜</u-button>
    <u-rate :count="count" v-model="value"></u-rate>

    <u-action-sheet :list="list" v-model="show"></u-action-sheet>
  </view>
</template>

<script lang="ts">
// 使用easycom就不需要单个引入了
// import {uniBadge, uniCard} from '@dcloudio/uni-ui'

export default {
  // components: {uniBadge, uniCard},
  data() {
    return {
      title: 'Hello',
      count: 4,
      value: 2,
      list: [
        {
          text: '点赞',
          color: 'blue',
          fontSize: 28,
        },
        {
          text: '分享',
        },
        {
          text: '评论',
        },
      ],
      show: true,
    };
  },
  onLoad() {
    // test
    // 或者(二者等价)
    console.log("this.$u", this.$u);
  },
  methods: {},
};
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
