<template>
  <div>
    <div class="header">
      <div class="header-nav-wrap">
        <Banner></Banner>
      </div>
      <div class="banner-img">
        <!-- <img src="@/assets/bg1.png"/> -->

        <img :src="$URL + '/statics/shuffling/img1.jpg'" alt="" />
        <router-link class="banner-download-btn" :to="{ name: 'home' }">
          <p class="to-home">去首页了解更多</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
export default {
  name: 'welcome',
  components: {
    Banner
  },
  methods: {}
}
</script>

<style scoped>
.header-nav-wrap {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  background: rgba(250, 240, 230, 0.25);
  padding-bottom: 20px;
}
.banner-img {
  position: relative;
  height: 520px;
  width: 100%;
}

.banner-img img {
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center center;
}
.banner-img .banner-download-btn {
  background: Transparent;
  position: absolute;
  top: 335px;
  left: 65%;
  -webkit-transform: translate(50px, 0);
  -ms-transform: translate(50px, 0);
  transform: translate(50px, 0);
  width: 400px;
  height: 80px;
  cursor: pointer;
  border-radius: 50px;
  border: 0;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
}
.to-home:hover {
  font: 500 32px/150% '幼圆';
}
.to-home {
  background: rgb(254, 209, 1);
  padding: 20px;
  border-radius: 60px;
  font: 500 30px/150% '幼圆';
  color: #966a28;
  font-style: bold;
}
</style>
