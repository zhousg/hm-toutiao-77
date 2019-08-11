<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
            <el-form-item label="手机：">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传头像 -->
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action=""
            :http-request="myUpload"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      userForm: {
        id: null,
        name: null,
        intro: null,
        email: null,
        photo: null,
        mobile: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    myUpload (result) {
      // 选中图片后 触发函数  选择的结果result
      // 文件信息获取 result.file
      // axios + formdata 进行上传
      const formData = new FormData()
      formData.append('photo', result.file)
      this.$http.patch('user/photo', formData).then(res => {
        // 上传头像成功
        this.$message.success('修改头像成功')
        // 预览
        this.userForm.photo = res.data.data.photo
        // 同步本地存储
        store.setUser({ photo: this.userForm.photo })
        // 同步HOME组件
        eventBus.$emit('updatePhoto', this.userForm.photo)
      })
    },
    // 获取用户信息
    async getUserInfo () {
      // 后台的头像可能和前端本地保存头像 不一致。保存后进行过修改,重新登录可同步。
      const { data: { data } } = await this.$http.get('user/profile')
      this.userForm = data
    },
    // 保存用户信息
    async saveUserInfo () {
      // PATCH 请求类型做修改  局部修改
      // PUT 请求类型做修改 完整修改
      await this.$http.patch('user/profile', {
        // 安装后台需要提交数据
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('保存设置成功')
      // 当你刷新页面的时候  HOME组件使用的本地存储的数据  更新本地存储
      store.setUser({ name: this.userForm.name })
      // 更新HOME组件用户名
      eventBus.$emit('updateName', this.userForm.name)
    }
  }
}
</script>

<style scoped lang='less'></style>
