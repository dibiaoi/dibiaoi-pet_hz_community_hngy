<template>
  <div>
    <banner></banner>
    <div id="content" class="site-content">
      <router-view></router-view>
    </div>
    <footerItem></footerItem>
  </div>
</template>

<script>
import Banner2 from '@/components/Banner2.vue'
import footerItem from '@/components/Footer.vue'
export default {
  components: {
    banner: Banner2,
    footerItem
  }
}
</script>
<style scoped>
.site-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>;
