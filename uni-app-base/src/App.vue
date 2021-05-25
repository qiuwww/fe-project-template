<script>
export default {
  onLaunch: function() {
    console.log('App Launch');
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  },
};
</script>

<style lang="scss">
/* 此处为style标签内容的最前面 */
// 生产用本地
// @import './static/icons/iconfont.css';
// 开发用线上
@import 'http://at.alicdn.com/t/font_2422195_dnl6posdy5e.css';

@import 'styles/uni-common.scss';
// uni ui的默认风格是中型的，与uni-app基础组件风格一致。但它支持uni.scss，可以方便的扩展和切换App的风格。
@import 'styles/uview-ui-common.scss';
</style>
