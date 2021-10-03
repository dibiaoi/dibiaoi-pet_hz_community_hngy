<template>
  <div class="breadcrumb">
    <el-breadcrumb :default-active="$route.path" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, i) in breadList" :key="i" :to="item.path">{{
        item.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadList: []
    }
  },
  created() {
    this.getBreadList(this.$route)
  },
  watch: {
    $route(val) {
      this.getBreadList(val)
    }
  },
  methods: {
    getBreadList(val) {
      if (val.matched) {
        const matched = val.matched.filter(item => item.meta && item.meta.title)
        this.breadList = matched
      }
    }
  }
}
</script>

<style scoped>
.breadcrumb {
  margin: 10px 10px 10px 20px;
  padding: 15px;
  font-size: 16px;
  box-sizing: border-box;
  background: white;
}
.el-breadcrumb{
  font-size: 16px;
}
</style>
