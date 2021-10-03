<template>
  <div class="hospital">
    <h3 class="title">修改众筹{{ id }}</h3>
    <div class="userinfo-bottom">
      <EditPetHelp :type="'edit'" :helpId="id"></EditPetHelp>
    </div>
  </div>
</template>

<script>
import EditPetHelp from '@/components/PetHelp/EditPetHelp.vue'
export default {
  props: ['id'],
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
