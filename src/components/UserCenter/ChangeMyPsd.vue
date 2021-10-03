<template>
  <div>
    <h3 class="title">修改密码</h3>
    <ChangePsdTool :phone_hz="userInformation.phone_hz" :userType="'user'"></ChangePsdTool>
  </div>
</template>

<script>
import ChangePsdTool from '@/components/ChangePsdTool.vue'
export default {
   computed: {
    userInformation() {
      return this.$store.state.userInfo.userInformation
    }
  },
  components: {
    ChangePsdTool
  }
}
</script>
<style>
.title {
  font-size: 20px;
  color: #333;
  line-height: 30px;
}
</style>
