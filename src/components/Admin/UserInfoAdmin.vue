<template>
  <div class="content">
    <el-scrollbar style="height:400px">
      <el-form v-model="userInfo" label-width="100px">
        <el-form-item label="id">
          <span>{{ userInfo.id }}</span>
        </el-form-item>
        <el-form-item label="头像">
          <el-avatar :src="userInfo.head_hz"></el-avatar>
        </el-form-item>
        <el-form-item label="性别">
          <span>{{ userInfo.sex_value_hz }}</span>
        </el-form-item>
        <el-form-item label="身份">
          <span>{{ userInfo.identity_value_hz }}</span>
        </el-form-item>
        <el-form-item label="实名认证">
          <span>{{ userInfo.verified_hz ? '已实名' : '未实名' }}</span>
        </el-form-item>
        <el-form-item label="关注">
          <span>{{ userInfo.focus_count_hz }}</span>
        </el-form-item>
        <el-form-item label="粉丝">
          <span>{{ userInfo.fans_count_hz }}</span>
        </el-form-item>
        <el-form-item label="昵称">
          <span>{{ userInfo.nickname_hz }}</span>
        </el-form-item>
        <el-form-item label="手机号">
          <span>{{ userInfo.phone_hz }}</span>
        </el-form-item>
        <el-form-item label="简介">
          <span>{{ userInfo.introduction_hz }}</span>
        </el-form-item>
        <el-form-item label="积分">
          <span>{{ userInfo.integral_hz }}</span>
        </el-form-item>
        <el-form-item label="余额">
          <span>{{ userInfo.balance_hz }}</span>
        </el-form-item>
        <el-form-item label="注册时间">
          <span>{{ userInfo.create_time_hz.slice(0, 10) }}</span>
        </el-form-item>
        <el-form-item label="地区">
          <span> {{ userInfo.area_hz.belong_city.belong_province.province }}</span>
          <span> {{ userInfo.area_hz.belong_city.city }}</span>
          <span> {{ userInfo.area_hz.area }}</span>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
import { showLoading, endLoading } from '@/plugins/Loading.js'
export default {
  props: ['id'],
  data() {
    return {
      userInfo: ''
    }
  },
  created() {
    showLoading()
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch('adminLogin/getUserInfoAdmin', this.id).then(
        res => {
          console.log(res)
          this.userInfo = res
          setTimeout(() => {
            endLoading()
          }, 150)
        },
        err => {
          console.log(err)
        }
      )
    }
  },
  watch: {
    id() {
      showLoading()
      this.getUserInfo()
    }
  }
}
</script>

<style scoped>
.el-form {
  margin: 20px;
}
.content {
  margin: 20px;
  height: 100%;
}
.el-form-item {
  border-bottom: 1px solid #efefef;
}
</style>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
