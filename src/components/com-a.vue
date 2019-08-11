<template>
  <div class='container'>COM-A {{msg}}</div>
</template>

<script>
import eventBus from '@/components/eventBus'
export default {
  name: 'com-a',
  data () {
    return {
      msg: ''
    }
  },
  created () {
    // 事件需要提前绑定，才能触发。
    eventBus.$on('b2a', (data) => {
      this.msg = data
    })
  }
}
</script>

<style scoped lang='less'></style>
