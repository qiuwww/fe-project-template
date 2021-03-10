# steps

启动多个开发工具的后台会造成串环境。

sass-loader 版本太高了。

## step1 create

```bash
$ vue create -p dcloudio/uni-preset-vue uni-app-base
$ 选择默认模板
```

## step2，添加 tabBar，tabBar 样式定制

## step3 添加 [扩展组件（uni-ui）](https://uniapp.dcloud.io/component/README?id=uniui)

这里要注意 sass 编译器，如下配置可以：

```
"node-sass": "^4.14.1",
"sass-loader": "^8.0.2",
```

```bash
# 使用npm包的形式调用uni ui
$ yarn add @dcloudio/uni-ui
```

后续需要修改 easycom 配置规则。

uni-ui 是 DCloud 提供的一个跨端 ui 库，它是基于 vue 组件的、flex 布局的、无 dom 的跨全端 ui 框架。

uni-ui 不包括基础组件，它是基础组件的补充。

引入方式：

1. [使用 npm 引入](https://ext.dcloud.net.cn/plugin?id=55)，方便一些。
2. 需要配置 easycom 规则，让 npm 安装的组件支持 easycom。
3. uni-ui 不支持使用 Vue.use() 的方式安装。

这里选择安装 uni-app，但是以安装包的形式，然后移动到外边。**选择推荐的这种模式**。

## step4 添加 uView

[npm 安装](https://www.uviewui.com/components/install.html#npm%E5%AE%89%E8%A3%85)
[npm 安装方式配置](https://www.uviewui.com/components/npmSetting.html)

## step5 styles 整理

1. 主题定制 uni-app；
2. uni ui；
3. uView；

## step6 自定义头部组件

1. 左右的样式；
2. 标题栏的颜色/样式调整；

## step7 自定义 icon，扩展 icon 自定义图标库

<https://www.uviewui.com/components/icon.html>

## step 8 一个完整的接口请求

请求方法的封装，基于 uni-app 的 request 进行封装。

## step 9 各种 loading/dialog 的封装

## step 10 各端调试方法

1. HbuilderX 具有调试工具；

## android 和 iosios 调试打包方法

首页启动页面；

## 不同平台的条件判断书写方法

## 使用 cli 创建项目和使用 HBuilderX 可视化界面创建项目有什么区别

https://uniapp.dcloud.io/quickstart-cli?id=%e4%bd%bf%e7%94%a8cli%e5%88%9b%e5%bb%ba%e9%a1%b9%e7%9b%ae%e5%92%8c%e4%bd%bf%e7%94%a8hbuilderx%e5%8f%af%e8%a7%86%e5%8c%96%e7%95%8c%e9%9d%a2%e5%88%9b%e5%bb%ba%e9%a1%b9%e7%9b%ae%e6%9c%89%e4%bb%80%e4%b9%88%e5%8c%ba%e5%88%ab

HBuilderX 可视化界面创建的项目，**编译器在 HBuilderX 的安装目录下的 plugin 目录**，随着 HBuilderX 的升级**会自动升级编译器**。

所以如果是处理创建的项目，使用 HBuildX 运行就会有问题。

已经使用 cli 创建的项目，如果想继续在 HBuilderX 里使用，可以把工程拖到 HBuilderX 中。**注意如果是把整个项目拖入 HBuilderX，则编译时走的是项目下的编译器**。

## 多端开发

## 遇到的问题

1. Cannot read property 'mark' of undefined

这里小程序开发工具的**增强编译**功能打开就好了。

2. sass 编译器出错的问题；

修改为 node-sass 与 sass-loader 组合的形式。

"node-sass": "^4.14.1",
"sass-loader": "^8.0.2",
