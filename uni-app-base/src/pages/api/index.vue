<template>
  <div>
    api
  </div>
</template>

<script>
export default {
  onLoad() {
    this.getData();
  },
  methods: {
    getData() {
      // 不带header
      this.$u.get('http://qiuww.site:7001/info', {}).then((res) => {
        console.log(res);
      });
      this.$u
        .post('/user/login', {
          username: 'lisa',
          password: '123456',
        })
        .then((res) => {
          // res为服务端返回的数据
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
