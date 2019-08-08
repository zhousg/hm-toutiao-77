<template>
  <el-select clearable :value="value" @change="fn" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
// computed 计算属性使用场景：当你需要一个新数据，需要依赖data中的数据。
// watch 侦听器的使用场景：当你需要监听某一个属性的变化，去做一些开销较大操作(异步操作)
// watch: {
//   'reqParams.channel_id': function (newVal, oldVal) {
//     if (newVal === '') {
//       this.reqParams.channel_id = null
//     }
//   }
// },
// 注意：当你清空内容的时候，值为空字符，处理成null数据。
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // myValue: null,
      channelOptions: []
    }
  },
  created () {
    // 获取频道下拉选项数据
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
      // 空字符处理成null
      if (val === '') val = null
      // 数据提交给父组件使用
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang='less'></style>
