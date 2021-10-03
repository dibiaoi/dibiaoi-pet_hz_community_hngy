<template>
  <div class="hospital">
    <h3 class="title">帮助众筹列表</h3>
    <ListPetHelp :type="'petHelp'"></ListPetHelp>
  </div>
</template>

<script>
import ListPetHelp from '@/components/PetHelp/ListPetHelp'
export default {
  components:{
    ListPetHelp
  }
}

</script>

<style scoped>
.hospital {
  padding: 20px;
}

.userinfo-bottom {
  border-top: 1px solid #f1f1f1;
  margin: 10px;
}
.li-content {
  display: flex;
}

</style>
