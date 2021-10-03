<template>
  <div class="hospital-service">
    <h3 class="title">添加医院服务</h3>
    <div class="userinfo-bottom">
      <HospitalServiceEdit :type="'create'"></HospitalServiceEdit>
    </div>
  </div>
</template>

<script>
import HospitalServiceEdit from '@/components/Hospital/HospitalServiceEdit'
export default {
  components: {
    HospitalServiceEdit
  }
}
</script>

<style scoped>
.hospital-service {
  padding: 20px;
}

.userinfo-bottom {
  border-top: 1px solid #f1f1f1;
  display: flex;
  margin: 10px;
  padding: 40px 10px 0px 10px;
  justify-content: center;
}
</style>
