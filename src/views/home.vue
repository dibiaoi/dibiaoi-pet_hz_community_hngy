<template>
  <div>
    <router-view />
    <banner></banner>
    <div id="content" class="content animate__animated animate__fadeIn animate__faster">
      <div class="content-area">
        <Silder></Silder>
        <div class="site-content">
          <div class="content-left ">
            <div class="content-left-div bg">
              <div class="left-div-banner">
                <span @click="to(1)" class="more">更多...</span>
                <h3 style="postion:absolute;text-align: left;">最新领养</h3>
              </div>
              <AdoptList :type="'homePage'"></AdoptList>
            </div>
            <div class="content-left-div bg" style="margin-top:10px; ">
              <div class="left-div-banner" style="border-bottom: 0.5px solid #e0e0e073;">
                <span @click="to(2)" class="more">更多...</span>
                <h3 style="text-align: left;">最新众筹</h3>
              </div>
              <HelpList style="padding-bottom:15px;"></HelpList>
            </div>
          </div>
          <div class="content-right bg">
            <div class="news-home-right all-label" style="min-height:300px; ">
              <span>
                <svg
                  t="1601968639200"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5386"
                  width="18"
                  height="18"
                >
                  <path
                    d="M323.008 786.752c-52.928 0-96-43.072-96-96s43.072-96 96-96 96 43.072 96 96-43.072 96-96 96z m0-128c-17.632 0-32 14.336-32 32s14.368 32 32 32 32-14.336 32-32-14.368-32-32-32z"
                    p-id="5387"
                  ></path>
                  <path
                    d="M416.096 927.072H284.224c-159.936 0-186.912-59.232-186.912-192v-140.8c0-74.272 14.304-96.256 70.72-150.976l327.04-319.904C531.648 87.904 600.96 88 637.376 123.296l263.072 256.032c18.336 17.792 28.864 43.552 28.864 70.656 0 27.296-10.656 53.28-29.248 71.264L610.048 815.84c-65.504 64.576-112.832 111.232-193.952 111.232zM566.24 159.488c-10.496 0-20.16 3.52-26.528 9.696L212.672 489.12c-49.952 48.48-51.36 54.528-51.36 105.152v140.8c0 110.272 8.352 128 122.912 128h131.872c52.672 0 83.744-28.48 148.992-92.8l26.656-26.144 263.232-268.256c6.784-6.592 10.336-15.808 10.336-25.888 0-9.888-3.424-18.88-9.472-24.736L592.768 169.216c-6.336-6.176-16.032-9.728-26.528-9.728z"
                    p-id="5388"
                  ></path>
                </svg>
                最新资讯
              </span>
              <ul>
                <li
                  @click="toNewsInfo(item.id)"
                  class="label-li"
                  v-for="item in newsList"
                  :key="item.id"
                >
                  {{ item.title_hz }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footerItem></footerItem>
  </div>
</template>

<script>
import Banner2 from '@/components/Banner2.vue'
import Silder from '@/components/Silder.vue'
import footerItem from '@/components/Footer.vue'
import AdoptList from '@/components/User/AdoptList.vue'
import HelpList from '@/components/User/HelpList.vue'
export default {
  data() {
    return {
      newsList: []
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    to(type) {
      if (type === 1) {
        this.$router.push('/pet-adopt/adopt-home')
      } else {
        this.$router.push('/pet-help/pet-help-home')
      }
    },
    getNewsList() {
      const data = {
        state_hz: 1,
        ordering: '-create_time_hz',
        page: 1,
        size: 6
      }

      this.$store.dispatch('editNews/getNewsList', data).then(
        res => {
          console.log(res)
          this.newsList = res.results
        },
        err => {
          console.log(err)
        }
      )
    },
    toNewsInfo(newsId) {
      this.$router.push({ name: 'news-info', params: { id: newsId } })
    }
  },
  components: {
    banner: Banner2,
    Silder,
    footerItem,
    AdoptList,
    HelpList
  }
}
</script>

<style scoped>
.content {
  margin: 0;
  padding: 0;
  z-index: 0;
  position: relative;
}
.site-content {
  margin-top: 10px;
  width: 1100px;
  display: flex;
}
.content-left {
  height: 100%;
  width: 75%;
}
.content-right {
  height: 100%;
  width: 25%;
  margin: 0px 0px 0px 10px;
}
.bg {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.more {
  cursor: pointer;
  font-size: 14px;
  /* float: right; */
  top: 22px;
  position: absolute;
  right: 30px;
}
.left-div-banner {
  padding: 0 25px;
  overflow: hidden;
  position: relative;
}
.more:hover {
  text-decoration: underline;
}
.all-label {
  width: 100%;
}
.all-label > span,
.label-li {
  padding: 12px 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  border-bottom: 1px solid #f3f3f3;
}
.label-li {
  cursor: pointer;
  font-size: 12px;
  color: #4d4d4d;
  line-height: 1.2;
  text-align: left;
}
.label-li:hover {
  text-decoration: underline;
}
.all-label > span > svg {
  margin: 0 5px;
}
</style>
<style>
.content-area {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 100%;
  width: 100%;
}
</style>
