<template>
  <div class="list">
    <p v-if="newsList.length === 0">
      ta还没有发布任何信息哦
    </p>
    <ul v-if="isShow">
      <!-- <span v-for="(news, index) in newsList" :key="index">{{ index }}</span> -->
      <li class="li" v-for="(news, index) in newsList" :key="index">
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
</template>

<script>
import handleDate from '@/plugins/TimeHandler.js'
export default {
  data() {
    return {
      newsList: '',
      isShow: false
    }
  },
  props: ['id'],
  created() {
    this.getNewsList()
  },
  methods: {
    handleDate(str) {
      return handleDate(str)
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
    getNewsList() {
      const data = {
        state_hz: 1,
        author_hz: this.id,
        ordering: '-create_time_hz'
      }

      this.$store.dispatch('editNews/getNewsList', data).then(
        res => {
          console.log(res)
          this.newsList = res.results
          this.isShow = true
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
</style>
