<template>
  <el-aside class="main-aside">
    <el-menu
      background-color="#001519"
      text-color="#fff"
      active-text-color="#409eff"
      :collapse-transition="false"
      :unique-opened="true"
      :router="true"
      :default-active="$route.path"
      :collapse="isCollapse"
    >
      <label class="aside-title">
        <span>管理员页</span>
      </label>
      <Siderbar :menuData="routers" @saveNavStart="saveNavStart"></Siderbar> </el-menu
  ></el-aside>
</template>

<script>
import Siderbar from '@/components/Admin/Siderbar.vue'
export default {
  components: {
    Siderbar
  },
  computed: {
    isCollapse() {
      return this.$store.state.app.sidebar.opened
    },
    routers() {
      const adminList = ['/admin-home', '/admin-user']
      const router = []
      this.$router.options.routes.filter(item => {
        for (const i of adminList) {
          if (item.path === i) {
            router.push(item)
          }
        }
      })
      return router[0].children
    }
  },
  data() {
    return {
      activePath: this.$route.path
    }
  },
  methods: {
    saveNavStart(activePath) {
      sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
  created() {
    this.activePath = sessionStorage.getItem('activePath')
  },
  watch: {
    activePath(newVal) {
      console.log(newVal)
    },
    isCollapse(newVAl) {
      console.log(this.$store.state.app.sidebar)
      console.log(newVAl)
    }
  }
}
</script>

<style scoped>
.main-aside {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.el-menu,
.el-aside {
  height: 100%;
  width: 100% !important;
}
.aside-title {
  height: 60px;
  width: 100%;
  display: flex;
  color: #efefef;
  justify-content: center;
  align-items: center;
  border-block: 1px solid #fff;
}
.el-menu--collapse {
  /* width: 0px !important; */
  overflow: hidden;
  transition: margin-left 0.28s;
}
</style>
