<template>
  <div>
    <h3 class="title">修改密码</h3>
    <ChangePsdTool :phone_hz="hospitalInfo.phone_hz" :userType="'hospital'"></ChangePsdTool>
  </div>
</template>

<script>
import ChangePsdTool from '@/components/ChangePsdTool.vue'
export default {
   computed: {
    hospitalInfo() {
      return this.$store.state.userInfo.hospitalInfo
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
