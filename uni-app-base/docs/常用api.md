## 常用 api

uni.setNavigationBarTitle(); // 修改导航栏的标题

uni.setTabBarItem(); // 设置单个的 Tabbar Item

## 在 uni-app 中，可以有如下实现全局变量的方式：

[对比文档](https://www.uviewui.com/guide/globalVariable.html#%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F)

- 本地存储
- 配置文件
- 挂载 Vue.prototype
- globalData
  - globalData 也不是动态响应的
  - 需要在页面的 **onShow 生命周期**中获取 globalData 的值
  - 对 globalData 的定义，需要在 App.vue 中进行
  - getApp().globalData.userName = "诗圣"；设置
  - this.author = getApp().globalData.userName;获取
- Vuex
  - uView 封装的有点看不懂：https://www.uviewui.com/guide/globalVariable.html#%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0
