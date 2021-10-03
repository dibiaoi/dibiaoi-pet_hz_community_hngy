<template>
  <div>
    找回密码
    <ChangePsdTool :userType="'admin'" :phone_hz="adminInfo.phone_hz"></ChangePsdTool>
  </div>
</template>

<script>
import ChangePsdTool from '@/components/ChangePsdTool'
export default {
  computed: {
    adminInfo() {
      return this.$store.state.userInfo.adminInfo
    }
  },
  components: {
    ChangePsdTool
  }
}
</script>

<style lang="scss" scoped></style>
