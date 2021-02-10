# fe-project-template

这个还要结合具体的项目，最后再抽出来一个默认的模板项目。就是需要先结合业务进行开发，后续再抽离，先有实践再总结。

1. PT-react(project-template-react)： react 的项目模板，主要用来做后台系统，较大的系统；
   1. umi + antd + ts；
   2. 结合原有的一些项目及使用经验进行；
2. PT-miniprogram： 小程序模板；
   1. umi + ts；
   2. 参考：data-collection-FullStack/uni-app-miniprogram；

## 包括的内容

### admin

1. 左侧选项卡 menu+layout；
2. 登陆页面 layout；
3. 失败页面/成功页面；
4. 弹框信息；
5. message；

## template-react

使用 [react](https://react.docschina.org/docs/getting-started.html)+[umi](https://umijs.org/zh-CN/docs)+[antd](https://ant-design.gitee.io/docs/react/getting-started-cn)+[typescipt](https://www.tslang.cn/docs/handbook/basic-types.html) 构建的后端模板项目，包括基本的一些文件夹及文件和一般语法声明。

- 默认的脚手架内置了 @umijs/preset-react，**包含布局、权限、国际化、dva、简易数据流等常用功能**。

```bash
$ mkdir template-react && cd template-react
# umi
$ yarn create @umijs/umi-app
# antd
# 使用@umijs/umi-app创建的项目，antd可以直接使用

# 创建页面
$ mpx umi g page demo/index --typescript
```
