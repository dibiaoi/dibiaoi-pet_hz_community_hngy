<template>
  <div class="hospital">
    <h3 class="title">发起宠物帮助众筹</h3>
    <div class="userinfo-bottom">
      <EditPetHelp :type="'create'"></EditPetHelp>
    </div>
  </div>
</template>

<script>
import EditPetHelp from '@/components/PetHelp/EditPetHelp.vue'
export default {
  components: { EditPetHelp }
}
</script>

<style scoped>
.hospital {
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
