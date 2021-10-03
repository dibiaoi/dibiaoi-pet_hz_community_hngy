<template>
  <div class="container animate__animated animate__fadeIn animate__faster">
    <div style="display:flex;">
      <div class="news-home-left">
        <Breadcrumb></Breadcrumb>
        <div class="select">
          <div class="tool-bar">
            <span @click="timeSelect()">
              最新
              <i class="el-icon-arrow-down" :class="{ timeselct: isTimeSlect }"></i>
            </span>

            <el-input
              @keyup.enter.native="selectTrigger()"
              style="width:200px;margin-left:20px;"
              v-model="searchValue"
              placeholder="搜索"
            >
              <el-button
                slot="append"
                :span="10"
                icon="el-icon-search"
                @click="selectTrigger()"
              ></el-button>
            </el-input>
          </div>
          <div class="label">
            <a
              href="javascript:"
              v-for="(item, index) in labelList"
              :key="index"
              v-bind:class="{ stateActive: item.id === labelId ? true : false }"
              @click="clickStatus(item.id)"
              ># {{ item.label }}
            </a>
          </div>
        </div>
        <div class="list">
          <ul>
            <li class="li" v-for="news in newsList" :key="news.id">
              <div class="li-content">
                <div class="top">
                  <div class="top-title">
                    <a @click="toNewsInfo(news.id)">
                      <span class="pet-adopt-title">{{ news.title_hz }}</span>
                    </a>
                  </div>
                  <div class="li-status-name">
                    <span
                      style="float:right; padding:0 5px;"
                      v-for="item in news.label_hz"
                      :key="item.id"
                    >
                      # {{ item.name_hz }}
                    </span>
                    <span>
                      {{ handleDate(news.create_time_hz) }}
                    </span>
                  </div>
                  <div class="li-status-name" style="color:#777777;">
                    <span>{{ des(news.Introduction_hz, 40) }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="pagination">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="size"
            layout="total, prev, pager, next, jumper"
            :total="newsCount"
          ></el-pagination>
        </div>
      </div>
      <div style="height:100%;width:20%;">
        <div class="news-home-right" v-if="isShowPost">
          <router-link class="post-news" to="/user/news-post-page">发布资讯</router-link>
        </div>
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
            全部标签
          </span>
          <ul>
            <li
              @click="clickStatus(item.id)"
              class="label-li"
              v-for="item in labelListFilter"
              :key="item.id"
              v-bind:class="{ tagActive: item.id === labelId ? true : false }"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import handleDate from '@/plugins/TimeHandler.js'
export default {
  data() {
    return {
      isTimeSlect: false,
      searchValue: '',
      ordering: '-create_time_hz',
      labelList: [],
      newsList: [],
      newsCount: null,
      page: 1,
      size: 10,
      labelId: ''
    }
  },
  components: {
    Breadcrumb
  },
  computed: {
    isShowPost() {
      return localStorage.getItem('role') === 'volunteer'
    },
    labelListFilter: function() {
      return this.labelList.filter(obj => obj.id !== '')
    }
  },
  created() {
    this.getAllLabel()
    this.getNewsList()
  },
  methods: {
    getAllLabel() {
      this.labelList.push({ id: '', label: '不限' })
      this.$store.dispatch('postNews/getAllLabel').then(
        res => {
          for (const label of res.results) {
            this.labelList.push({ id: label.id, label: label.name_hz })
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    timeSelect(ordering) {
      this.isTimeSlect = !this.isTimeSlect
      this.ordering = this.ordering === 'create_time_hz' ? '-create_time_hz' : 'create_time_hz'
      this.getNewsList()
    },
    getNewsList() {
      const data = {
        state_hz: 1,
        search: this.searchValue,
        ordering: this.ordering,
        page: this.page,
        size: this.size
      }
      if (this.labelId && this.labelId !== '') {
        data.label_hz = this.labelId
      }
      this.$store.dispatch('editNews/getNewsList', data).then(
        res => {
          console.log(res)
          this.newsList = res.results
          this.newsCount = res.count
        },
        err => {
          console.log(err)
        }
      )
    },
    handleDate(str) {
      return handleDate(str)
    },
    clickStatus(labelId) {
      this.labelId = labelId
      this.getNewsList()
    },
    des(str, length) {
      let newStr = ''
      if (str.length >= length) {
        newStr = str.slice(0, length) + '...'
      } else {
        newStr = str
      }
      return newStr
    },
    toNewsInfo(newsId) {
      this.$router.push({ name: 'news-info', params: { id: newsId } })
    },
    selectTrigger() {
      this.getNewsList()
    },
    handleSizeChange(val) {
      this.size = val
      this.getNewsList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getNewsList()
    }
  }
}
</script>

<style scoped>
.areaActive {
  color: #000;
  font-weight: bold;
}
.container {
  width: 1200px;
  height: 100%;
}
.news-home-left {
  height: 100%;
  width: 75%;
  margin: 0px 10px 0px 0px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.news-home-right {
  background-color: #fff;
  margin-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.tool-bar {
  width: 100%;
  padding: 10px 0px;
  display: flex;
  margin-left: 20px;
  text-align: center;
  align-items: center;
}
.timeselct {
  transform: rotate(180deg);
}
.tool-bar span {
  padding: 0px 15px;
  font-size: 16px;
  color: #4d4d4d;
}
.list {
  border-top: 0.5px solid #e0e0e073;
}
.li {
  border-bottom: 0.5px solid #e0e0e073;
  padding: 10px 25px;
}
.li-content {
  display: flex;
  align-items: center;
}
.top {
  margin: 10px 0px 0px 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}

.top-title {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #4d4d4d;
}
.top-title a {
  color: #4d4d4d;
  cursor: pointer;
}
.top-title a:hover {
  color: #2abe5c;
  text-decoration: underline;
}

.li-status-name {
  font-size: 14px;
  min-height: 25px;
  color: #999;
}
.label {
  padding: 0px 0px 0px 25px;
  height: 40px;
  margin: 10px 0;
}
.label a {
  padding: 7px 20px;
  font-size: 14px;
  float: left;
  color: #4d4d4d;
  border: #f1f1f1 solid 1px;
  border-radius: 5px;
  margin: 0px 5px;
}
.label a:hover,
.label-li:hover {
  color: green;
}
.stateActive {
  background: #2abe5c;
}
.pagination {
  margin: 10px 0;
}
.post-news {
  background-color: #429b61;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  opacity: 0.8;
}
.post-news:hover {
  opacity: 1;
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
}
.all-label > span > svg {
  margin: 0 5px;
}
.tagActive {
  border-left: 5px solid #2abe5c;
}
</style>
