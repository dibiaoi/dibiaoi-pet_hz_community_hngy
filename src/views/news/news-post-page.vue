<template>
  <div>
    <NewsTemplate  class="contianer"></NewsTemplate>
  </div>
</template>

<script>
import NewsTemplate from '@/components/News/NewsTemplate.vue'
export default {
  components: {
    NewsTemplate
  }
}
</script>

<style scoped>
.contianer {
  position: static;
  height: 500px;
}
</style>
