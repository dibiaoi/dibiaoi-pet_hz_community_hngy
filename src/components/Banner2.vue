<template>
  <div class="banner2">
    <div class="banner-top">
      <div class="banner-top-content">
        <div class="banner-top-content-left">
          <ul>
            <li>
              <a href="/home">公告</a>
            </li>
            <li>
              <a href="/home">联系我们</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="banner-bottom" :class="{ fixed: show }">
      <div class="wrapper_hz">
        <div class="header-logo">
          <div class="logo">
            <router-link :to="{ name: 'home' }" rel="home">
              <img itemprop="logo" src="../assets/logo1.png" />
            </router-link>
          </div>
        </div>
        <div class="mobile-box" id="mobile-menu" ref="MobileMenu">
          <div class="top-menu" id="top-menu">
            <ul class="top-menu-ul" id="top-menu-ul">
              <li class="depth-0" v-for="item in bannerTitle" :key="item.path">
                <router-link :to="{ name: item.path }" active-class="active">
                  <span>{{ item.value }}</span>
                </router-link>
              </li>

              <li class="depth-0 downloadCode">
                <a>
                  <el-popover placement="top-start" width="200" trigger="hover">
                    <vue-qr :text="downloadCode" size="180" :callback="test" qid="testid"></vue-qr>
                    <span slot="reference"> <i class="el-icon-mobile-phone"></i>APP下载 </span>
                  </el-popover>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="search-box">
          <SearchTool></SearchTool>
        </div>
        <NotificationTool style="margin-left:40px;"></NotificationTool>
        <div class="header-user">
          <!-- 用户头像 -->
          <TopUserInfo></TopUserInfo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopUserInfo from '@/components/TopUserInfo.vue'

import SearchTool from '@/components/SearchTool.vue'
import NotificationTool from '@/components/NotificationTool.vue'

import VueQr from 'vue-qr'
export default {
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  data() {
    return {
      downloadCode: this.$URL + '/statics/app/app-release.apk',
      show: false,
      bannerTitle: [
        {
          value: '首页',
          path: 'home'
        },
        {
          value: '宠物领养',
          path: 'pet-adopt'
        },
        {
          value: '帮助众筹',
          path: 'pet-help'
        },
        {
          value: '资讯',
          path: 'news-information'
        }
      ]
    }
  },
  components: {
    VueQr,
    TopUserInfo,
    NotificationTool,
    SearchTool
  },
  methods: {
    searchInfo() {},
    handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 30) {
        // 当页面滚动到高度300px处，动态绑定class 来设置头部固定定位
        this.show = true
      } else {
        this.show = false
      }
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style scoped>
.depth-0 > a > span:hover {
  cursor: pointer;
}
.fixed {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
}
</style>
<style scoped>
.active {
  color: #2abe5c;
}
.banner2 {
  margin-bottom: 20px;
}
ul {
  list-style: none;
}
.banner-top {
  background-color: #fff;
  border-bottom: 1px solid #f7f7f7;
  width: 100%;
  position: relative;
  z-index: 4;
}
.banner-top-content {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  width: 1100px;
  max-width: 100%;
  margin: 0 auto;
}
.banner-top-content-left {
  display: flex;
  align-items: center;
  line-height: 1;
  opacity: 1;
  transition: opacity 0.5s;
}
.banner-top-content-left ul {
  display: flex;
  align-items: center;
}
.banner-top-content-left ul li {
  margin-right: 20px;
}
.banner-top-content-left ul li a {
  display: flex;
  align-items: center;
  opacity: 0.5;
  transition: opacity 0.2s ease-out;
  padding: 13px 0;
}
.banner-top-content-left ul li a:hover {
  display: flex;
  align-items: center;
  opacity: 1;
  padding: 13px 0;
}
.banner-bottom {
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07);
}
.search-box {
  margin-left: 20px;
}

.wrapper_hz {
  display: flex;
  height: 70px;
  align-items: center;
  position: relative;
  z-index: 2;
}
.wrapper_hz {
  width: 1100px;
  max-width: 100%;
  margin: 0 auto;
  padding: 30px 0px 30px 0px;
}
.header-logo {
  padding: 14px 0;
}
.logo {
  display: flex;
}
.logo a {
  margin: 0 auto;
  display: flex;
}
a {
  color: inherit;
  text-decoration: none;
}
.logo img {
  display: block;
  height: 50px;
  max-width: 150px;
  height: auto;
  object-fit: cover;
}

.top-menu .top-menu-ul {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}
ul {
  display: block;
  list-style-type: disc;
  list-style: none;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
.top-menu ul li.depth-0 {
  display: flex;
}
.header li {
  list-style: none;
}
.depth-0 a {
  font-size: 15px;
  display: flex;
  align-items: center;
  padding: 25px;
  position: relative;
  z-index: 2;
  height: 60px;
}
.depth-0 a :hover,
.depth-0 a :focus {
  color: #2abe5c;
  transition-duration: 0.2s;
}
.header-user {
  position: absolute;
  right: 0;

  z-index: 5;
}
</style>
