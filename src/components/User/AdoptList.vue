<template>
  <div class="adopt-list">
    <p style="height:100px;" v-if="adoptPosts.length === 0">
      ta还没有发布任何信息哦
    </p>
    <ul>
      <li class="adopt-li" v-for="adopt in adoptPosts" :key="adopt.id">
        <div class="li-content">
          <el-image
            style="width: 70px; height: 70px;padding:5px;"
            fit="cover"
            :src="adopt.pet_hz.default_image_hz.image_hz"
          ></el-image>

          <div class="top-right">
            <div class="top-right-title">
              <a @click="clickTopic(adopt.id)">
                <span class="pet-adopt-title">{{ adopt.title_hz }}</span>
              </a>
            </div>
            <div class="li-status-name">
              <span>
                <svg
                  t="1600239392782"
                  class="icon"
                  viewBox="0 0 1123 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="12529"
                  width="16"
                  height="16"
                >
                  <path
                    d="M58.235871 98.568258C26.095484 98.568258 0 124.729806 0 157.068387v798.620903c0 32.206452 26.095484 58.500129 58.235871 58.500129h1006.625032c32.140387 0 58.235871-26.161548 58.235871-58.500129V157.068387a58.467097 58.467097 0 0 0-58.235871-58.500129h-212.859871l38.746839 38.978065V40.002065c0-21.537032-17.341935-38.978065-38.746839-38.978065-21.371871 0-38.713806 17.441032-38.713806 38.978065v136.456258h251.573677a19.257806 19.257806 0 0 1-19.224774-19.422968v798.620903c0-10.768516 8.654452-19.422968 19.224774-19.422968H58.235871c10.669419 0 19.224774 8.621419 19.224774 19.422968V157.068387a19.323871 19.323871 0 0 1-19.224774 19.422968h212.859871c21.371871 0 38.713806-17.441032 38.713806-38.978065 0-21.504-17.341935-38.978065-38.713806-38.978064H58.235871z m174.113032 38.978065c0 21.470968 17.341935 38.945032 38.746839 38.945032 21.371871 0 38.713806-17.441032 38.713806-38.978065V40.035097c0-21.537032-17.341935-38.978065-38.713806-38.978065-21.404903 0-38.746839 17.441032-38.746839 38.978065v97.478193zM1123.096774 332.304516v-38.978064H0v136.390193c0 21.504 17.341935 38.978065 38.713806 38.978065 21.404903 0 38.746839-17.474065 38.746839-38.978065V332.304516l-38.746839 38.978065h1045.669162l-38.746839-38.978065v97.412129c0 21.504 17.341935 38.978065 38.746839 38.978065 21.371871 0 38.713806-17.474065 38.713806-38.978065V332.304516z m-270.963613 253.159226c21.371871 0 38.713806-17.441032 38.713807-38.978065 0-21.470968-17.341935-38.945032-38.713807-38.945032H271.095742c-21.404903 0-38.746839 17.441032-38.746839 38.978065 0 21.504 17.341935 38.978065 38.746839 38.978064h581.037419z m-581.037419 116.934193c-21.404903 0-38.746839 17.408-38.746839 38.945033 0 21.504 17.341935 38.978065 38.746839 38.978064h387.402323c21.371871 0 38.713806-17.474065 38.713806-38.978064 0-21.537032-17.341935-38.978065-38.713806-38.978065H271.095742zM852.001032 176.458323l-38.713806-38.978065v78.022194c0 21.504 17.341935 38.978065 38.713806 38.978064 21.404903 0 38.746839-17.474065 38.746839-38.978064V98.535226H271.095742c-21.404903 0-38.746839 17.474065-38.746839 38.978064 0 21.537032 17.341935 38.978065 38.746839 38.978065h580.90529zM309.842581 137.51329c0-21.504-17.341935-38.978065-38.713807-38.978064-21.404903 0-38.746839 17.474065-38.746839 38.978064v78.022194c0 21.504 17.341935 38.978065 38.746839 38.978064 21.371871 0 38.713806-17.474065 38.713807-38.978064V137.51329z"
                    p-id="12530"
                    fill="#8a8a8a"
                  ></path>
                </svg>
                {{ adopt.create_time_hz.slice(0, 10) }}
              </span>
            </div>
            <div class="li-status-name">
              <span class="span-content">描述：{{ adopt.description_hz }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import { showLoading, endLoading } from '@/plugins/Loading.js'
export default {
  data() {
    return {
      adoptPosts: []
    }
  },
  props: ['id', 'type'],

  created() {
    this.getMyAdopt()
  },
  mounted() {
    // showLoading('.adopt-list')
  },
  methods: {
    clickTopic(adoptId) {
      this.$router.push('/pet-adopt/adopt-info/' + adoptId)
    },
    getMyAdopt() {
      let data = {}
      if (this.type === 'homePage') {
        data = { ordering: '-create_time_hz', page: 1, size: 5, state_hz: 1 }
      } else {
        data = { ordering: '-create_time_hz', user_hz: this.id, state_hz: 1 }
      }

      this.$store.dispatch('adoptPostList/getMyAdoptPosts', data).then(
        res => {
          this.adoptCount = res.count
          this.adoptPosts = res.results
          console.log(this.adoptPosts)
        },
        err => {
          console.log(err)
        }
      )
    }
  }
}
</script>

<style scoped>
.adopt-list {
  border-top: 0.5px solid #e0e0e073;
}
.adopt-li {
  border-bottom: 0.5px solid #e0e0e073;
  padding: 10px 25px;
}
.li-content {
  display: flex;
  align-items: center;
}
.top-right {
  margin: 10px 0px 0px 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}
.pet-adopt-title:hover {
  color: #2abe5c;
  text-decoration: underline;
}
.top-right-title {
  margin-bottom: 10px;
  font-size: 18px;
  color: #4d4d4d;
}
.top-right-title a {
  color: #4d4d4d;
  cursor: pointer;
}
.li-status-name {
  font-size: 14px;
  min-height: 25px;
  color: #999;
}
</style>
