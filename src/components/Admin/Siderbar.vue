<template>
  <div>
    <label v-for="menu in menuData" :key="menu.id">
      <el-submenu :index="String(menu.id)" v-if="menu.children">
        <template slot="title">
          <i :class="menu.meta.icon"></i>
          <span>{{ menu.name }}</span>
        </template>
        <Siderbar :menuData="menu.children"></Siderbar>
      </el-submenu>
      <el-menu-item :index="menu.path" @click="saveNavStart(menu.path)" v-else>
        <i :class="menu.meta.icon"></i>
        <span>{{ menu.name }}</span>
      </el-menu-item>
    </label>
  </div>
</template>

<script>
import Siderbar from '@/components/Admin/Siderbar.vue'
export default {
  name: 'Siderbar',
  components: {
    Siderbar
  },
  props: ['menuData'],
  methods: {
    saveNavStart(activePath) {
      this.$emit('saveNavStart', activePath)
    }
  }
}
</script>

<style scoped>
.el-menu-item.is-active {
  background: #318ee4 !important;
  color:#fff!important;
}
.el-submenu__title:hover {
  background-color: #fff !important;
}
.el-menu-item:hover {
  background-color: rgba(204, 204, 204) !important;
}
</style>
