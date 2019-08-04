<template>
  <div class='container'>Article</div>
</template>

<script>
export default {
  created () {
    this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles').then(res => console.log(res.data))
  }
}
</script>

<style scoped lang='less'></style>
