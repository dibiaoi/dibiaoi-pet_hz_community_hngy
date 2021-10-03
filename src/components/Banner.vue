<template>
  <div class="wrapper_hz">
    <div class="header-logo">
      <div class="logo">
        <a href="/home" rel="home">
          <img itemprop="logo" src="../assets/logo1.png" />
        </a>
      </div>
    </div>
    <div class="mobile-box" id="mobile-menu" ref="MobileMenu">
      <div class="top-menu" id="top-menu">
        <ul class="top-menu-ul" id="top-menu-ul">
          <li class="depth-0">
            <a href="/home">
              <div>
                <span>首页</span>
                <br />
                <span class="span-eng">Home</span>
              </div>
            </a>
          </li>
          |
          <li class="depth-0">
            <a href="/pet-adopt">
              <span class="hob" style="background-color:#607d8b"></span>
              <div>
                <span>宠物领养</span>
                <br />
                <span class="span-eng">Adoption</span>
              </div>
            </a>
          </li>
          |
          <li class="depth-0">
            <a href="/pet-help/pet-help-home">
              <span class="hob" style="background-color:#607d8b"></span>

              <p>
                帮助众筹
                <br />
                <span class="span-eng">Interflow</span>
              </p>
            </a>
          </li>
          |
          <li class="depth-0">
            <a href="/news-information/news-home">
              <span class="hob" style="background-color:#607d8b"></span>
              <div>
                <span>资讯</span>
                <br />
                <span class="span-eng">Information</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="header-user">
      <!-- 用户头像 -->
      <TopUserInfo></TopUserInfo>
    </div>
  </div>
</template>

<script>
import TopUserInfo from '@/components/TopUserInfo.vue'

export default {
  components: {
    TopUserInfo
  },
  created() {
    // localStorage.setItem("userInformation",JSON.stringify( {data:123}));
  }
}
</script>

<style scoped>
.wrapper_hz {
  display: flex;
  height: 58px;
  align-items: center;
  position: relative;
  z-index: 2;
}
.wrapper_hz {
  width: 1100px;
  max-width: 100%;
  margin: 0 auto;
  margin-top: 20px;
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
  margin-left: 50px;
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
  padding: 40px;
  position: relative;
  z-index: 2;
  height: 60px;
}
.depth-0 a :hover,
.depth-0 a :focus {
  font-size: 18px;
  transition-duration: 0.2s;
}

.top-user-info {
  display: flex;
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
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) */
}
.span-eng {
  margin-top: 6px;
  /* color: #ebeef5; */
  color: #f5f5f5;
}
.header-user {
  position: absolute;
  right: 0;

  z-index: 5;
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
</style>
