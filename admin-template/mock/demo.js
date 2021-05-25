// 这里的请求的结果都是与当前的页面服务器同地址，所有的地址会自动合并到一起
// http://localhost:8001/api/test

import mockjs from 'mockjs';

export default {
  // 支持值为 Object 和 Array
  'GET /api/test': { users: [1, 2] },
  // GET POST 可省略
  '/api/test/users': { id: 1 },
  // 支持自定义函数，API 参考 express@4
  'POST /api/test/users/create': (req, res) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('OK');
  },
  'GET /api/test/currentUser': {
    name: 'momo.zxy',
    avatar:
      'https://pics0.baidu.com/feed/4b90f603738da97772275f27bb193d1c8618e304.jpeg?token=658a3acc4d4aaf9c9ecf1e894ab44610&s=55A9B9541ABE4C9E943CFBA00300F085',
    userid: '00000001',
    notifyCount: 12,
  },
  // 使用 mockjs 等三方库
  'GET /api/test/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
  }),
  // 如何模拟延迟
  'POST /api/test/forms': (req, res) => {
    setTimeout(() => {
      res.send('Ok');
    }, 1000);
  },
  // 如果你需要动态生成 Mock 数据，你应该通过函数进行处理
  // 静态的，每次得到的数据一样，缓存了
  '/api/test/random/static': mockjs.mock({
    // 只随机一次
    'number|1-100': 100,
  }),
  // 动态的
  '/api/test/random/dynamic': (req, res) => {
    res.send(
      mockjs.mock({
        // 每次请求均产生随机值
        'number|1-100': 100,
      }),
    );
  },

  // mockjs示例
  '/api/test/1': mockjs.mock({
    hello: '@cname',
    'list|20-30': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1, // 添加索引
        name: '@cname',
        'age|1-100': 100,
        color: '@color',
        hehe: '@name',
        'index|+1': 1,
        'index_name|5-10': '@string',
        'new_value|50000-60000': 1,
        // 后边的是控制小数点位数的
        'x|-20-50.1-10': 50,
        'y|-20-30.1-10': 30,
        name2: '@cname',
        jc: '@string',
        'zdf|1-100.2': 100,
        'zcb|1-200.2': 200,
        'q5|5000-10000': 10000,
        'q10|2000-5000': 5000,
        'q20|1000-2000': 2000,
      },
    ],
  }),
  '/api/test/2': mockjs.mock({
    'fetch-2': '@cname',
    'list|20-30': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1, // 添加索引
        name: '@cname',
        'age|1-100': 100,
        color: '@color',
        hehe: '@name',
        'index|+1': 1,
        'index_name|5-10': '@string',
        'new_value|50000-60000': 1,
        // 后边的是控制小数点位数的
        'x|-20-50.1-10': 50,
        'y|-20-30.1-10': 30,
        jc: '@string',
        'zdf|1-100.2': 100,
        'zcb|1-200.2': 200,
        'q5|5000-10000': 10000,
        'q10|2000-5000': 5000,
        'q20|1000-2000': 2000,
      },
    ],
  }),
  '/api/test/3': mockjs.mock({
    name: 'Jack', // 写死的字符串
    'age|10-20': 1, // 最小到最大之间的一个数值
    color: '@color', // 6位16进制数
    title: '@string(5, 10)', // 一个字符串
    number: '@float(1, 10000, 2, 2)', // (min, max, dmin, dmax); 最小两位小数，最大也是两位小数
    date: '@date("yyyy-MM-dd")', // 返回一个随机的日期
    now: '@now(yyyy-MM-dd)', // 返回当前日期
    province: '@province', // 省份
    cname: '@cname(3, 10)', // 中文名字
    cword: '@cword(3, 10)', // 中文字符
    'randomArr|1': ['A', 'B'], // 随机取10个
    string20: ['@string(10, 20)', '@cword(5-10)'],
    url: '@url()',
    paragraph: '@cparagraph()',
    email: '@email()',
    'data|4': [
      {
        // 一个数组，长度为4
        'id|+1': 1, // 添加索引
        'list|20-30': [
          {
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1, // 添加索引
            name: '@cname',
            'age|1-100': 100,
            color: '@color',
            hehe: '@name',
            'index|+1': 1,
            'index_name|5-10': '@string',
            'new_value|50000-60000': 1,
            // 后边的是控制小数点位数的
            'x|-20-50.1-10': 50,
            'y|-20-30.1-10': 30,
            jc: '@string',
            'zdf|1-100.2': 100,
            'zcb|1-200.2': 200,
            'q5|5000-10000': 10000,
            'q10|2000-5000': 5000,
            'q20|1000-2000': 2000,
          },
        ],
      },
    ],
  }),
};
