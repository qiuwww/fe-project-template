<template>
  <view>
    <!-- <custom-tab-bar
      direction="horizontal"
      :show-icon="false"
      :selected="selected"
      @onTabItemTap="onTabItemTap"
    /> -->
    <!-- <UViewUI /> -->
    <UniUI />
  </view>
</template>

<script>
import UViewUI from './uview-ui';
import UniUI from './uni-ui';

export default {
  components: {
    UViewUI,
    UniUI,
  },
  methods: {
    onTabItemTap() {},
  },
};
</script>

<style lang="scss" scoped></style>
