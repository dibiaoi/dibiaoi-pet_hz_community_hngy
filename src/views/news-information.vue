<template>
  <div>
    <banner></banner>
    <div id="content" class="site-content animate__animated animate__fadeIn animate__faster">
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
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
  watch: {}
}
</script>
<style scoped>
.site-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
