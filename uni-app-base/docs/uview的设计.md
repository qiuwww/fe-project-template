从上面我们可以看出，uView 把"$u"挂载到了Vue.prototype上，所以我们在项目的内部可以使用this.$u.xxx 这种形式。

## 关于\$u

uView 将$u对象同时挂载到了uni对象上，这意味着您可以在外部的js文件中，通过uni.$u.xxx 的形式去调用 uView 提供的一些工具方法，而不再像从前一样必须在\*.vue 中通过 this.\$u.xxx 的形式调用。
