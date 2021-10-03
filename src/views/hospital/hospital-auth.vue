<template>
  <div class="authentication">
    <h3 class="title">实名认证</h3>
    <AuthTool :phone_hz="hospitalInfo.phone_hz" :userType="'hospital'"></AuthTool>
  </div>
</template>

<script>
import AuthTool from '@/components/AuthTool.vue'
export default {
  components: {
    AuthTool
  },
  computed: {
    hospitalInfo() {
      return this.$store.state.userInfo.hospitalInfo
    }
  }
}
</script>

<style scoped>
.authentication {
  margin: 20px;
}

.auth-content {
  border-top: 1px solid #f1f1f1;
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 20px;
}
.form-btn {
  margin-top: 50px;
}
</style>
