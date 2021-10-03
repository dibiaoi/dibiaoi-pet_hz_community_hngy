<template>
  <div class="top-user-info">
    <div class="user-tools">
      <div class="top-user-box">
        <div class="top-user-avatar avatar-parent" v-bind:class="{ disappear: hospitalVisible }">
          <el-popover
            placement="bottom"
            width="200"
            trigger="manual"
            v-model="visible"
            class="topuserinfo-popover"
          >
            <ul>
              <li>
                <router-link to="/user-center" class="top-my-home">
                  <el-avatar :size="30" :src="url"></el-avatar>
                  <p>
                    <b>{{ nickname }}</b>
                    <span class="top-user-link-des">个人中心</span>
                  </p>
                </router-link>
              </li>
              <li>
                <router-link to="/pet-adopt/sponsor-adopt" class="top-write-tiezi">
                 <svg t="1600238521084" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10953" width="18" height="18"><path d="M775.84 392.768l-155.2-172.352-459.872 422.848L122.4 831.2l190.56-12.832z m154.112-162.816l-131.2-150.944-0.288-0.32a16 16 0 0 0-22.592-0.96L644.704 198.304l155.168 172.352 128.832-118.464a15.936 15.936 0 0 0 1.248-22.24zM96 896h832v64H96z" fill="#707070" p-id="10954"></path></svg>
                  <p>发布领养</p>
                </router-link>
              </li>
              <li>
                <router-link to="/user-center/my-pets" class="top-write-tiezi">
                   <svg
                    t="1600238402471"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="10629"
                    width="18"
                    height="18"
                  >
                    <path
                      d="M966.14784 1.682286c83.510857-1.828571 33.078857 212.333714 3.2 317.933714 30.043429 69.558857 47.36 157.513143 47.36 269.458286 0 137.636571 0 418.468571-508.818286 418.468571C-0.910446 1007.542857 0.351269 737.042286 0.278126 589.129143c0-111.085714 15.36-198.345143 42.550857-267.062857-30.098286-105.984-80.566857-320 3.328-318.171429 0 0 87.149714-23.862857 221.421714 107.099429 72.228571-23.533714 154.368-30.793143 240.310857-30.793143 83.437714 0 163.346286 8.630857 234.166857 32.329143C877.809554-22.473143 966.14784 1.682286 966.14784 1.682286z m-779.885714 650.057143a55.862857 55.862857 0 1 0 0-111.725715 55.862857 55.862857 0 0 0 0 111.725715z m316.562285 175.158857a111.725714 111.725714 0 0 0 111.725715-111.725715c0-10.112-223.451429-10.112-223.451429 0a111.725714 111.725714 0 0 0 111.725714 111.725715z m316.525715-175.177143a55.862857 55.862857 0 1 0 0-111.725714 55.862857 55.862857 0 0 0 0 111.725714z"
                      p-id="10630"
                      fill="#707070"
                    ></path>
                  </svg>
                  <p>我的宠物</p>
                </router-link>
              </li>

              <li>
                <router-link to="/user-center/my-adopts" class="top-write-tiezi">
                  <svg t="1600238568613" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11185" width="18" height="18"><path d="M696.32 614.4h-358.4c-43.52 0-76.8 33.28-76.8 76.8v51.2c0 15.36 12.8 25.6 25.6 25.6h51.2v179.2c0 15.36 12.8 25.6 25.6 25.6h307.2c12.8 0 25.6-10.24 25.6-25.6v-179.2h51.2c12.8 0 25.6-10.24 25.6-25.6v-51.2c0-43.52-35.84-76.8-76.8-76.8z m-51.2 307.2h-256v-153.6h256v153.6z m76.8-204.8h-409.6v-25.6c0-12.8 12.8-25.6 25.6-25.6h358.4c12.8 0 25.6 12.8 25.6 25.6v25.6z m-130.56-657.92c-43.52-7.68-84.48-7.68-128-5.12-217.6 25.6-391.68 207.36-407.04 424.96-10.24 166.4 66.56 314.88 189.44 404.48a25.6 25.6 0 0 0 40.96-20.48c0-7.68-5.12-15.36-10.24-20.48-110.08-81.92-176.64-217.6-166.4-358.4 12.8-194.56 168.96-355.84 360.96-378.88 15.36-2.56 30.72-2.56 46.08-2.56 225.28 0 409.6 184.32 409.6 409.6 0 133.12-64 256-168.96 330.24-7.68 5.12-10.24 12.8-10.24 20.48 0 20.48 23.04 33.28 40.96 20.48 120.32-87.04 197.12-230.4 189.44-389.12-10.24-217.6-174.08-396.8-386.56-435.2z" fill="#707070" p-id="11186"></path><path d="M824.32 512m-25.6 0a25.6 25.6 0 1 0 51.2 0 25.6 25.6 0 1 0-51.2 0Z" fill="#707070" p-id="11187"></path><path d="M209.92 512m-25.6 0a25.6 25.6 0 1 0 51.2 0 25.6 25.6 0 1 0-51.2 0Z" fill="#707070" p-id="11188"></path><path d="M281.6 345.6v-10.24c0-2.56 2.56-5.12 5.12-5.12 2.56-2.56 5.12-2.56 7.68-2.56h58.88c12.8 0 25.6 0 33.28 2.56 10.24 2.56 17.92 5.12 23.04 10.24s10.24 12.8 12.8 20.48 5.12 20.48 5.12 33.28-2.56 23.04-5.12 33.28-7.68 15.36-12.8 23.04-12.8 10.24-23.04 12.8c-10.24 2.56-20.48 5.12-33.28 5.12h-33.28v61.44c0 5.12-2.56 7.68-5.12 10.24s-7.68 5.12-15.36 5.12-12.8-2.56-15.36-5.12c-2.56-2.56-5.12-7.68-5.12-10.24v-184.32z m40.96 84.48h33.28c12.8 0 23.04-2.56 25.6-7.68 5.12-5.12 7.68-15.36 7.68-28.16 0-7.68 0-12.8-2.56-15.36-2.56-5.12-5.12-7.68-7.68-10.24-2.56-2.56-7.68-5.12-10.24-5.12s-7.68-2.56-12.8-2.56h-33.28v69.12zM488.96 506.88h74.24c7.68 0 12.8 0 15.36 2.56s5.12 7.68 5.12 12.8-2.56 10.24-5.12 12.8c-2.56 2.56-7.68 2.56-15.36 2.56h-94.72c-5.12 0-10.24 0-15.36-2.56-2.56-2.56-5.12-7.68-5.12-12.8v-179.2c0-5.12 2.56-10.24 5.12-12.8 2.56-2.56 7.68-2.56 15.36-2.56h94.72c5.12 0 10.24 0 12.8 5.12 2.56 2.56 5.12 7.68 5.12 12.8s-2.56 10.24-5.12 12.8c-2.56 2.56-7.68 2.56-12.8 2.56h-74.24v51.2h71.68c7.68 0 10.24 2.56 15.36 5.12 2.56 2.56 5.12 7.68 5.12 12.8s-2.56 10.24-5.12 12.8c-2.56 2.56-7.68 2.56-15.36 2.56h-71.68v61.44zM704 360.96v166.4c0 5.12-2.56 7.68-5.12 10.24s-7.68 5.12-15.36 5.12-12.8-2.56-15.36-5.12c-2.56-2.56-5.12-7.68-5.12-10.24v-166.4h-38.4c-2.56 0-7.68-2.56-10.24-5.12-2.56-2.56-5.12-7.68-5.12-12.8s2.56-10.24 5.12-12.8 7.68-5.12 10.24-5.12h117.76c5.12 0 7.68 2.56 10.24 5.12s5.12 7.68 5.12 12.8c0 7.68-2.56 10.24-5.12 12.8-2.56 2.56-7.68 5.12-10.24 5.12h-38.4z" fill="#707070" p-id="11189"></path></svg>
                  <p>我的领养</p>
                </router-link>
              </li>
              <li>
                <a class="top-login-out" @click="logout">
                 <svg t="1600238678592" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6130" width="18" height="18"><path d="M522.48161534 511.00836199a37.54216601 37.54216601 0 0 1-38.24568301-36.71073799V36.90260601C484.23593233 16.564601 501.37613833 0 522.48161534 0c21.16943299 0 38.37359398 16.628557 38.37359399 36.90260599v437.20315001a37.60612199 37.60612199 0 0 1-38.30963801 36.90260599zM510.96953633 1023.295845a497.385736 497.385736 0 0 1-346.001907-138.27285101A470.460265 470.460265 0 0 1 60.07980533 734.98224001a457.413243 457.413243 0 0 1 17.587897-402.794826A483.187507 483.187507 0 0 1 226.55724833 167.564695a39.20502201 39.20502201 0 0 1 53.46720701 8.570102 35.943267 35.943267 0 0 1-8.95383801 51.35666 408.42295401 408.42295401 0 0 0-125.60956501 139.040323 380.85792199 380.85792199 0 0 0-47.26347698 184.57698799c0 106.422768 42.978425 206.449937 121.00473399 281.66218101a417.760529 417.760529 0 0 0 291.895139 116.655727 418.01635199 418.01635199 0 0 0 291.89514-116.59177101 388.596597 388.596597 0 0 0 120.876822-281.726137 380.53814199 380.53814199 0 0 0-47.135565-184.57698799 408.03921801 408.03921801 0 0 0-125.80143301-138.912411 35.943267 35.943267 0 0 1-9.40153099-50.653144l0.63956-0.767472a39.14106601 39.14106601 0 0 1 53.403252-8.57010201 482.547947 482.547947 0 0 1 148.82559001 164.558763 456.965551 456.965551 0 0 1 17.65185299 402.794826 469.820705 469.820705 0 0 1-104.887824 150.10471 489.90288599 489.90288599 0 0 1-155.54096899 101.17837599A503.461556 503.461556 0 0 1 510.96953633 1023.295845z" p-id="6131" fill="#707070"></path></svg>
                  <p>登出</p>
                </a>
              </li>
            </ul>

            <div slot="reference" @click="judgeLoginState()">
              <el-avatar :size="40" :src="url"></el-avatar>
            </div>
          </el-popover>
          <!---->
        </div>
        <div class="top-user-avatar avatar-parent" v-bind:class="{ disappear: !hospitalVisible }">
          <HospitalTop></HospitalTop>
        </div>
      </div>
      <LoginDialog></LoginDialog>
    </div>
  </div>
</template>

<script>
import LoginDialog from '@/components/LoginDialog.vue'
import HospitalTop from '@/components/Hospital/HospitalTop.vue'
export default {
  computed: {
    userState() {
      return this.$store.state.userInfo.userState
    },
    userInformations() {
      return this.$store.state.userInfo.userInformation
    }
  },
  components: {
    LoginDialog,
    HospitalTop
  },
  data() {
    return {
      url: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      visible: false,
      hospitalVisible: false,
      nickname: '昵称',
      head_hz: ''
    }
  },

  created() {
    if (localStorage.getItem('role') === 'admin') {
      this.$router.replace('/admin-home')
    }
    if (localStorage.getItem('role') === 'hospital') {
      this.hospitalVisible = true
      this.visible = false
    }

    // bannerlogin为1就是已经登录过 0就是没有
    if (localStorage.getItem('bannerlogin') === null) {
      localStorage.setItem('bannerlogin', 0)
    }
    console.log(localStorage.getItem('bannerlogin'))
    if (localStorage.getItem('bannerlogin') == 0) {
      localStorage.setItem('bannerlogin', 1)
      this.$store.dispatch('userInfo/autoLogin')
    }
  },
  mounted() {
    if (this.$store.state.userInfo.userState) {
      this.nickname = this.userInformations.nickname_hz
      this.head_hz = this.userInformations.head_hz
    }
    if (this.head_hz) {
      this.url = this.head_hz
    }
  },
  methods: {
    judgeLoginState() {
      if (localStorage.getItem('role') === 'hospital') {
        this.hospitalVisible = true
        this.visible = false
      } else if (localStorage.getItem('role') === 'admin') {
        this.hospitalVisible = false
        this.visible = false
        this.$router.replace('/admin-home')
      } else if (this.userState === 'true' || this.userState === true) {
        this.hospitalVisible = false
        this.$store.state.app.userLoginDialogPop = true
        // this.$children[1].isDisplay = true
        this.visible = !this.visible
      } else if (this.userState === false || this.userState === 'false') {
        this.hospitalVisible = false
        // this.$children[1].isDisplay = false
        console.log(this.$store.state.app.userLoginDialogPop)
        this.$store.state.app.userLoginDialogPop = false
        // 此处应跳转至登录页
        console.log(this.$store.state.app.userLoginDialogPop)
      } else {
      }
    },
    logout() {
      this.$store.state.logoutSocket = true
      localStorage.setItem('bannerlogin', 0)
      localStorage.setItem('userToken', '')
      localStorage.setItem('userState', false)
      localStorage.setItem('userInformation', JSON.stringify({ data: '无' }))
      localStorage.setItem('role', '')
      this.$router.go(0)
      // location.reload()
      // this.$router.replace('/home')
    }
  }
}
</script>

<style scoped>
.top-login-out:hover{
  cursor: pointer;
}
.disappear {
  display: none !important;
}
.top-user-info {
  display: flex;
}
ul {
  list-style: none;
}
.top-user-box {
  margin-right: 30px;
  display: flex;
  align-items: center;
  position: relative;
}

span {
  height: 15px;
  display: inline-block;
}
.span-eng {
  margin-top: 6px;
  color: #ebeef5;
}

.avatar-parent {
  position: relative;
  display: block;
}
img.avatar_hz {
  background-color: #eee;
}
.top-user-avatar img {
  width: 40px;
  height: 40px;
  display: block;
  cursor: pointer;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

a.top-my-home {
  border-bottom: 1px solid #ebeef5;
  align-items: center;
}

a {
  display: flex;
  width: 100%;
  font-size: 15px;
  padding-left: 10px;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  vertical-align: top;
  align-items: center;
}
a:hover {
  background-color: #fafafa;
}
p {
  margin-left: 8px;
  line-height: 1.5;
}
span.top-user-link-des {
  display: block;
  color: #b2bac2;
  font-size: 12px;
  color: #ccc;
}
</style>
<style>
.topuserinfo-popover {
  padding: 0px;
}
</style>
