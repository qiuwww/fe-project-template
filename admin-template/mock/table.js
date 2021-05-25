import mockjs from 'mockjs';

export default {
  'GET /api/enum/status': {
    code: 0,
    msg: 'success',
    data: [
      {
        desc: '待审核',
        value: 1,
      },
      {
        desc: '已通过',
        value: 2,
      },
    ],
  },
  'POST /api/movie/list': (req, res) => {
    console.log('req', req.params, req.query, req.body);
    setTimeout(() => {
      res.send(
        mockjs.mock({
          code: 0,
          msg: '@cparagraph()',
          // 每次请求均产生随机值
          'data|100-200': [
            {
              'id|+1': 1,
              'name|2-4': '@cname',
              pkgname: '@string',
              'platform|1': ['IOS', 'Andriod'],
              'string20|1': ['@string(10, 20)', '@cword(5-10)'],
              'deeplink|1-2': true,
              'status|1': ['待审核', '已通过'],
              'num|1-100': 0,
              addedTime: '@date("yyyy-MM-dd")',
            },
          ],
          total: 100,
        }),
      );
    }, 1000);
  },
};
