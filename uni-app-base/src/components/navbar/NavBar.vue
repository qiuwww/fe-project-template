<template>
  <view class="navbar">
    <!-- <uni-nav-bar
      left-icon="back"
      left-text="返回"
      right-text="菜单"
      title="导航栏组件"
      background-color="gray"
      :fixed="true"
      :shadow="true"
      @clickLeft="clickLeftHandler"
      @clickRight="clickRightHandler"
    >
      <view>标题栏</view>
      <view slot="left">left</view>
      <view slot="right">right</view>
    </uni-nav-bar> -->
    <u-navbar back-text="返回" title="剑未配妥，出门已是江湖"></u-navbar>
  </view>
</template>

<script>
// 基于uni ui的navbar进行封装，https://ext.dcloud.net.cn/plugin?id=52
// 这里uni ui的navbar有问题

// import { uniNavBar } from '@dcloudio/uni-ui';
export default {
  components: {
    // uniNavBar,
  },
  methods: {
    clickLeftHandler() {
      debugger;
    },
    clickRightHandler() {
      debugger;
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: $uni-color-paragraph;
}
</style>
