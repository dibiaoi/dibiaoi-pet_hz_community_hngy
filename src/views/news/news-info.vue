<template>
  <div>
    <div class="site-content">
      <div class="container">
        <div class="content-body">
          <div style="margin-left:30px;">
            <Breadcrumb></Breadcrumb>
          </div>

          <div class="content" v-if="isShow">
            <div class="content-top">
              <strong class="topic">{{ newsInfo.title_hz }}</strong>
              <div class="under-topic">
                <span class="under-topic-collect" @click="collect()" style="margin:0px 10px">
                  <i v-show="!collectStats" class="el-icon-star-off">
                    {{ newsInfo.collect_count }}
                  </i>
                  <i v-show="collectStats" class="el-icon-star-on"> <span>已收藏</span> </i>
                </span>
                <span style="margin:0px 10px">
                  <svg
                    style="margin-right:5px;"
                    t="1600241514118"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="14118"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M288.01 489.07h447.98c17.672 0 31.998 14.327 31.998 32s-14.326 31.998-31.999 31.998H288.011c-17.673 0-32-14.326-32-31.998s14.327-32 32-32z m0-191.99h447.98c17.672 0 31.998 14.326 31.998 31.999s-14.326 31.999-31.999 31.999H288.011c-17.673 0-32-14.327-32-32s14.327-31.998 32-31.998z m16 573.116l184.699-143.655a63.998 63.998 0 0 1 39.29-13.48h351.983c17.672 0 31.999-14.327 31.999-32V169.087c0-17.672-14.327-31.999-32-31.999H144.018c-17.672 0-31.999 14.327-31.999 31.999v511.975c0 17.673 14.327 32 31.999 32h95.995c35.345 0 63.997 28.652 63.997 63.996v93.138zM528 777.058L317.478 940.796c-20.925 16.275-51.08 12.505-67.355-8.42a47.994 47.994 0 0 1-10.11-29.468v-125.85h-95.996c-53.016 0-95.995-42.98-95.995-95.996V169.087c0-53.016 42.979-95.995 95.995-95.995h735.965c53.016 0 95.995 42.979 95.995 95.995v511.975c0 53.017-42.979 95.996-95.995 95.996H527.999z"
                      p-id="14119"
                      fill="#515151"
                    ></path></svg
                  >{{ newsInfo.comment_count }}
                </span>
              </div>
              <div class="top-info">
                <div
                  style="display: inherit;align-items: center;"
                  @click="toUserPage(newsInfo.author_hz.id)"
                >
                  <el-avatar
                    :size="40"
                    :src="newsInfo.author_hz === null ? '' : newsInfo.author_hz.head_hz"
                    >{{ newsInfo.author_hz === null ? 'admin' : '' }}</el-avatar
                  >
                  <span style="margin-left:5px;">{{
                    newsInfo.author_hz === null ? '宠圈官方' : newsInfo.author_hz.nickname_hz
                  }}</span>
                </div>
                <span class="adopt-create-time">
                  <svg
                    t="1600242832524"
                    class="icon"
                    viewBox="0 0 1123 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="14534"
                    width="18"
                    height="18"
                  >
                    <path
                      d="M58.235871 98.568258C26.095484 98.568258 0 124.729806 0 157.068387v798.620903c0 32.206452 26.095484 58.500129 58.235871 58.500129h1006.625032c32.140387 0 58.235871-26.161548 58.235871-58.500129V157.068387a58.467097 58.467097 0 0 0-58.235871-58.500129h-212.859871l38.746839 38.978065V40.002065c0-21.537032-17.341935-38.978065-38.746839-38.978065-21.371871 0-38.713806 17.441032-38.713806 38.978065v136.456258h251.573677a19.257806 19.257806 0 0 1-19.224774-19.422968v798.620903c0-10.768516 8.654452-19.422968 19.224774-19.422968H58.235871c10.669419 0 19.224774 8.621419 19.224774 19.422968V157.068387a19.323871 19.323871 0 0 1-19.224774 19.422968h212.859871c21.371871 0 38.713806-17.441032 38.713806-38.978065 0-21.504-17.341935-38.978065-38.713806-38.978064H58.235871z m174.113032 38.978065c0 21.470968 17.341935 38.945032 38.746839 38.945032 21.371871 0 38.713806-17.441032 38.713806-38.978065V40.035097c0-21.537032-17.341935-38.978065-38.713806-38.978065-21.404903 0-38.746839 17.441032-38.746839 38.978065v97.478193zM1123.096774 332.304516v-38.978064H0v136.390193c0 21.504 17.341935 38.978065 38.713806 38.978065 21.404903 0 38.746839-17.474065 38.746839-38.978065V332.304516l-38.746839 38.978065h1045.669162l-38.746839-38.978065v97.412129c0 21.504 17.341935 38.978065 38.746839 38.978065 21.371871 0 38.713806-17.474065 38.713806-38.978065V332.304516z m-270.963613 253.159226c21.371871 0 38.713806-17.441032 38.713807-38.978065 0-21.470968-17.341935-38.945032-38.713807-38.945032H271.095742c-21.404903 0-38.746839 17.441032-38.746839 38.978065 0 21.504 17.341935 38.978065 38.746839 38.978064h581.037419z m-581.037419 116.934193c-21.404903 0-38.746839 17.408-38.746839 38.945033 0 21.504 17.341935 38.978065 38.746839 38.978064h387.402323c21.371871 0 38.713806-17.474065 38.713806-38.978064 0-21.537032-17.341935-38.978065-38.713806-38.978065H271.095742zM852.001032 176.458323l-38.713806-38.978065v78.022194c0 21.504 17.341935 38.978065 38.713806 38.978064 21.404903 0 38.746839-17.474065 38.746839-38.978064V98.535226H271.095742c-21.404903 0-38.746839 17.474065-38.746839 38.978064 0 21.537032 17.341935 38.978065 38.746839 38.978065h580.90529zM309.842581 137.51329c0-21.504-17.341935-38.978065-38.713807-38.978064-21.404903 0-38.746839 17.474065-38.746839 38.978064v78.022194c0 21.504 17.341935 38.978065 38.746839 38.978064 21.371871 0 38.713806-17.474065 38.713807-38.978064V137.51329z"
                      p-id="14535"
                      fill="#9d9d9d"
                    ></path>
                  </svg>
                  <span>{{ handleDate(newsInfo.create_time_hz) }}</span>
                </span>
              </div>
            </div>

            <div class="content-major">
              <mavon-editor
                class="md"
                :value="newsInfo.content_hz"
                :subfield="false"
                :defaultOpen="'preview'"
                :toolbarsFlag="false"
                :editable="false"
                :scrollStyle="true"
                :ishljs="true"
              ></mavon-editor>
              <div style="float:right;margin-right:30px;">
                <el-tag
                  style="margin:0px 2px;"
                  type="success"
                  v-for="feature in newsInfo.label_hz"
                  :key="feature.name_hz"
                  >{{ feature.name_hz }}</el-tag
                >
              </div>
            </div>
          </div>
          <div class="loading" style="height:300px;" v-if="!isShow"></div>
          <div>
            <Remark :model="'information'" :id="id"></Remark>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import Remark from '@/components/Comment/Remark.vue'
import handleDate from '@/plugins/TimeHandler.js'
import { showLoading, endLoading } from '@/plugins/Loading.js'

import 'mavon-editor/dist/css/index.css'

export default {
  components: { Breadcrumb, Remark },
  data() {
    return {
      isShow: false,
      newsInfo: '',
      newsContent: '',
      collectStats: false
    }
  },
  props: ['id'],
  created() {
    showLoading('.loading')
    this.getNewsById()
    this.checkIsCollect()
  },
  methods: {
    toUserPage(userId) {
      if (userId) {
        this.$router.push({ name: 'personal-page', params: { id: userId } })
      }
    },
    handleDate(str) {
      return handleDate(str)
    },
    getNewsById() {
      this.$store.dispatch('editNews/getNewsById', this.id).then(
        res => {
          console.log(res)
          this.newsInfo = res
          endLoading()
          this.isShow = true
        },
        err => {
          console.log(err)
        }
      )
    },
    collect() {
      const cancel = this.collectStats
      this.$store
        .dispatch('collect/postCollect', {
          model: 'information',
          cancel,
          id: this.id
        })
        .then(
          res => {
            console.log(res)
            this.$message({
              message: res.data.detail,
              type: 'success'
            })
            this.checkIsCollect()
            this.collectStats === true
              ? this.newsInfo.collect_count--
              : this.newsInfo.collect_count++
          },
          err => {
            console.log(err)
          }
        )
    },
    checkIsCollect() {
      this.$store
        .dispatch('collect/checkIsCollect', {
          id: this.id,
          model: 'information'
        })
        .then(
          res => {
            this.collectStats = res.data.is_collect
          },
          err => {
            console.log(err)
          }
        )
    }
  }
}
</script>

<style>
.markdown-body {
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px !important;
}
.v-show-content {
  background-color: #fff !important;
}
</style>
<style scoped>
.breadcrumb {
  padding: 25px 25px 25px 20px;
  margin: 0;
}
.site-content {
  display: flex;
  justify-content: center;
}
* {
  text-align: left;
}
.container {
  width: 1100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.content-body {
  margin: 0px 20px 20px 20px;
}

.content-left {
  width: 700px;
  margin-right: 10px;
  height: 100%;
  float: left;
}
.content-right {
  width: 450px;
  height: 100%;
  float: right;
}
.comment-body {
  background-color: #fff;
  margin: 0 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.content {
  text-align: left;
  margin: 20px;
}
.content-top {
  margin: 20px 30px;
}
.content-major {
  margin: 20px 30px;
}
.topic {
  font-size: 24px;
  width: 100%;
  display: block;
  padding: 10px 0px;
  border-bottom: 1px solid #efefef;
  padding-left: 5px;
}
.top-info {
  margin: 20px 0px;
  align-items: center;
  display: flex;
  color: #4d4d4d;
}
.top-info:hover div {
  opacity: 0.8;
  cursor: pointer;
}
.under-topic {
  float: right;
  margin-top: 30px;
  display: flex;
}
.under-topic > span {
  display: flex;
  align-items: center;
}
.under-topic-collect:hover {
  cursor: pointer;
}
.adopt-create-time {
  margin-left: 30px;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.adopt-create-time > span {
  margin: 0 5px;
}
</style>
