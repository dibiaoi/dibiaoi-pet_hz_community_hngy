<template>
  <div>
    <banner></banner>
    <div id="content" class="site-content animate__animated animate__fadeIn animate__faster">
      <div class="container animate__animated animate__fadeIn animate__faster">
        <div style="display:flex;">
          <div class="adopt-home-left" v-if="haveSearch">
            <div class="search-banner">
              <span>" {{ searchVal }} " 共搜索到 {{ adoptCount }} 条：</span>
            </div>
            <div class="adopt-list">
              <ul>
                <li class="adopt-li" v-for="adopt in searchList" :key="adopt.id">
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
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[2, 5, 10]"
                :page-size="size"
                layout="total, prev, pager, next, jumper"
                :total="adoptCount"
              ></el-pagination>
            </div>
          </div>
          <div
            v-if="!haveSearch"
            class="no-content adopt-home-left animate__animated animate__fadeIn animate__faster"
          >
            <span>没有搜索到哦(・。・)</span>
          </div>
          <div style="height:100%;width:20%;">
            <div class="adopt-home-right">广告位1</div>
            <div class="adopt-home-right" style="margin-top:10px">
              广告位2
            </div>
          </div>
        </div>
      </div>
    </div>

    <footerItem></footerItem>
  </div>
</template>

<script>
import { showLoading, endLoading } from '@/plugins/Loading.js'
import Banner2 from '@/components/Banner2.vue'
import footerItem from '@/components/Footer.vue'

export default {
  components: {
    banner: Banner2,
    footerItem
  },
  props: ['searchVal'],
  data() {
    return {
      haveSearch: true,
      searchList: [],
      size: 10,
      page: 1,
      adoptCount: ''
    }
  },
  mounted() {
    console.log(this.searchVal)
    this.getSearchList()
  },

  methods: {
    getSearchList() {
      showLoading('.adopt-home-left')
      const data = {
        search: this.searchVal,
        page: this.page,
        size: this.size
      }
      this.$store.dispatch('adoptPostList/getMyAdoptPosts', data).then(
        res => {
          console.log(res)
          if (res.count === 0) {
            this.$message({ message: '没有搜索到哦', type: 'warning' })
            this.haveSearch = false
            endLoading()
          } else {
            this.haveSearch = true
            this.adoptCount = res.count
            this.searchList = res.results
            endLoading()
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    clickTopic(adoptId) {
      this.$router.push('/pet-adopt/adopt-info/' + adoptId)
    },
    handleSizeChange(val) {
      this.size = val
      this.getSearchList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getSearchList()
    }
  },
  watch: {
    searchVal(val) {
      console.log(val)
      this.getSearchList()
    }
  }
}
</script>
<style scoped>
.no-content {
  height: 300px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.no-content > span {
  font-size: 20px;
  color: #999696;
}
.search-banner {
  margin: 10px 10px 10px 20px;
  padding: 15px;
  font-size: 16px;
  box-sizing: border-box;
  background: white;
  display: flex;
}
.search-banner > span {
  font-size: 20px;
}
.pagination {
  margin: 10px 0;
}
.container {
  width: 1200px;
  height: 100%;
}
.site-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.adopt-home-left {
  height: 100%;
  width: 75%;
  margin: 0px 10px 0px 0px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
.top-right-title {
  margin-bottom: 10px;
  font-size: 18px;
  color: #4d4d4d;
}
.top-right-title a {
  color: #4d4d4d;
  cursor: pointer;
}
.pet-adopt-title:hover {
  color: #2abe5c;
  text-decoration: underline;
}
.li-status-name {
  font-size: 14px;
  min-height: 25px;
  color: #999;
}
.adopt-home-right {
  background: #fff;
  height: 200px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
