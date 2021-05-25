<template>
  <view>
    <u-icon name="photo"></u-icon>
    <u-icon name="cut"></u-icon>
    <u-icon name="photo" color="#2979ff" size="28"></u-icon>
    <u-icon
      label="uView"
      size="40"
      name="https://cdn.uviewui.com/uview/example/button.png"
    ></u-icon>

    <u-icon name="smile" custom-prefix="custom-icon"></u-icon>
    <!-- 1.这样是结合了u-icon的使用，复制出来的时候，需要去掉前面的custom-icon，然后根据name来区分，统一似乎更好一点 -->

    <u-icon
      name="sync"
      label="sync"
      custom-prefix="custom-icon"
      size="40"
    ></u-icon>

    <!-- 2.这里直接使用了icon标签来做，与一般的使用没什么区别 -->
    <icon class="custom-icon custom-icon-earth" size="60" type="" />
    
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
