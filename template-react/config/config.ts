// 整体配置
// 这里的内容主要是用在
import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  base: '/docs/',
  // 输出文件的前置路径
  publicPath: '/static/',
  // 文件是否添加hash字段
  hash: true,
  // 浏览器模式 history(历史模式) ｜
  history: {
    type: 'hash',
  },
  routes: routes,
});
