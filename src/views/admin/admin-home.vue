<template>
  <div class="wrapper">
    <el-container class="box">
      <div class="aside" :class="{ 'aside-active': isActive }">
        <AdminAside />
      </div>
      <div class="content" :class="{ 'content-active': isActive }">
        <div class="content-top">
          <div @click="toggleClick" class="header-left-box">
            <i
              style="font-size: 20px"
              :class="{ 'is-active': isActive }"
              class="el-icon-s-fold"
            ></i>
          </div>
          <Breadcrumb class="breadcrumb"> </Breadcrumb>
          <div class="header-right">
            <div style="margin-right: 15px">
              <el-avatar
                src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
              ></el-avatar>
            </div>
            <el-dropdown>
              <span class="el-dropdown-link">
                admin<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided @click.native="adminLogout()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <router-view class="admin-content"></router-view>
      </div>
    </el-container>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb2.vue'
import AdminAside from '@/components/Admin/AdminAside.vue'
export default {
  components: {
    AdminAside,
    Breadcrumb
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggleClick() {
      this.isActive = !this.isActive
      this.$store.dispatch('app/toggleSideBar')
    },
    adminLogout() {
      console.log(1111)
      localStorage.setItem('bannerlogin', 0)
      localStorage.setItem('userToken', '')
      localStorage.setItem('userState', false)
      localStorage.setItem('userInformation', JSON.stringify({ data: 123 }))
      localStorage.setItem('role', '')
      location.reload()
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>
.admin-content {
  margin: 20px;
}
.is-active {
  transform: rotate(180deg);
  transition: all 0.5s;
}
.header-left-box {
  padding: 0 15px;
  height: 60px;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.header-right {
  width: 200px;
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
}
.aside-active {
  width: 0% !important;
}
.content-active {
  width: 100% !important;
}
.aside {
  width: 15%;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
}
.box,
.wrapper {
  width: 100%;
  min-height: 720px;
  overflow: hidden;
}
.content {
  width: 85%;
  background-color: #fff;
}
.content-top {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
.breadcrumb {
  width: 100%;
  margin: 0;
  height: 60px;
  align-items: center;
  display: flex;
}
</style>
