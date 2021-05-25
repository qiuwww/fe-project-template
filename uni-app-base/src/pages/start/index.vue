<template>
  <view>
    <text>这里是启动页面</text>
  </view>
</template>

<script>
export default {
  name: 'start',

  onShow() {
    uni.navigateTo({
      url: 'pages/index/index',
    });

    setTimeout(() => {
      uni.redirectTo({
        url: 'pages/index/index',
      });
      debugger;
    }, 3000);
  },
};
</script>

<style lang="scss" scoped></style>
