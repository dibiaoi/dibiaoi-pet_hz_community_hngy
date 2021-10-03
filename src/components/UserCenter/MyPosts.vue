<template>
  <div>
    <!-- 筛选框 -->
    <div class="tool-bar">
      <span></span>
      <span @click="timeSelect('create_time_hz')">
        创建时间
        <i class="el-icon-arrow-down" :class="{ timeselct: isCreateTimeSlect }"></i>
      </span>
      <span @click="timeSelect('edit_time_hz')">
        编辑时间
        <i class="el-icon-arrow-down" :class="{ timeselct: isEditTimeSlect }"></i>
      </span>

      <span>状态</span>
      <el-select style="width:150px" v-model="stateValue" @change="selectTrigger()">
        <el-option
          v-for="item in state"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
      <span></span>
      <el-input
        style="width:150px"
        @keyup.enter.native="selectTrigger()"
        v-model="searchValue"
        placeholder="搜索"
      >
      </el-input>
      <el-button
        style="margin-left:5px"
        type="primary"
        icon="el-icon-search"
        plain
        @click="selectTrigger()"
      ></el-button>
    </div>

    <div>
      <ul>
        <li class="li" v-for="news in newsList" :key="news.id">
          <div class="li-content">
            <div class="top-right">
              <div class="top-right-title">
                <span @click="toNewsInfo(news.id)">
                  <strong class="news-title">{{ news.title_hz }}</strong>
                </span>

                <div class="myf-focus-btn">
                  <button @click="editNews(news.id)" class="empty_hz edit-btn">编辑</button>
                  <button @click="delNews(news.id)" class="empty_hz delete">删除</button>
                </div>
              </div>
              <div class="li-status-name">
                <span>{{ des(news.Introduction_hz, 40) }}</span>
              </div>
              <div class="li-status-name">
                <span>状态：{{ news.state_value_hz }}</span>
              </div>

              <div class="li-status-time">
                <span style="float:right;">
                  上次编辑{{ handleDate(news.edit_time_hz).slice(3) }}</span
                >
                <span style="float:right;margin-right:20px;">
                  创建于{{ handleDate(news.create_time_hz).slice(3) }}</span
                >
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :current-page="page"
        :page-sizes="[2, 5, 10]"
        :page-size="size"
        layout="total,sizes,  prev, pager, next, jumper"
        :total="newsCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import handleDate from '@/plugins/TimeHandler.js'
export default {
  computed: {
    userInformation() {
      return this.$store.state.userInfo.userInformation
    }
  },
  data() {
    return {
      isCreateTimeSlect: false,
      isEditTimeSlect: false,
      newsList: [],
      userType: '',
      userTypeList: [
        { value: '', label: '不限' },
        { value: 0, label: '平台用户' },
        { value: 1, label: '管理员' }
      ],
      stateValue: '',
      state: [
        { value: '', label: '不限' },
        { value: -1, label: '打回' },
        { value: 0, label: '审核' },
        { value: 1, label: '审核通过' }
      ],
      searchValue: '',
      ordering: '',
      page: 1,
      size: 5,
      newsCount: 0
    }
  },
  created() {
    this.getNewsList()
  },

  methods: {
    handleDate(str) {
      return handleDate(str)
    },
    getNewsList() {
      const data = {
        state_hz: this.stateValue,
        type_hz: this.userType,
        search: this.searchValue,
        ordering: this.ordering,
        page: this.page,
        size: this.size,
        author_hz: this.userInformation.id
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
    delNews(newsId) {
      this.$confirm('确定要删除这篇资讯吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        distinguishCancelAndClose: true,
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('editNews/delNews', newsId).then(
            res => {
              console.log(res)
            },
            err => {
              console.log(err)
              if (err.status === 204) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })

                this.getNewsList()
              }
            }
          )
        })
        .catch(action => {
          if (action === 'cancel') {
          }
        })
    },
    toNewsInfo(newsId) {
      this.$router.push({ name: 'news-info', params: { id: newsId } })
    },
    editNews(newsId) {
      // { name: 'personal-page', params: { id: userId } }
      this.$router.push({ name: 'news-edit-page', params: { newsId: newsId } })
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
    timeSelect(ordering) {
      if (ordering === 'create_time_hz') {
        this.isCreateTimeSlect = !this.isCreateTimeSlect
        this.ordering = this.ordering === 'create_time_hz' ? '-create_time_hz' : 'create_time_hz'
      } else {
        this.isEditTimeSlect = !this.isEditTimeSlect
        this.ordering = this.ordering === 'edit_time_hz' ? '-edit_time_hz' : 'edit_time_hz'
      }
      this.getNewsList()
    },
    selectTrigger() {
      this.getNewsList()
    },
    handlePageChange(val) {
      this.page = val
      this.getNewsList()
    },
    handleSizeChange(val) {
      this.size = val
      this.getNewsList()
    }
  }
}
</script>

<style scoped>
.tool-bar {
  height: 60px;
  width: 100%;
  padding: 10px 0px;
  display: flex;
  text-align: center;
  align-items: center;
}
.tool-bar span {
  padding: 0px 15px;
  font-size: 15px;
  color: #4d4d4d;
}
.li {
  border-bottom: 0.5px solid #e0e0e073;
  padding: 10px 30px;
}
.li-content {
  display: flex;
}
.top-right {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}
.top-right-title {
  font-size: 18px;
  color: #4d4d4d;
}
.myf-focus-btn {
  float: right;
}
.li-status-name {
  font-size: 14px;
  min-height: 25px;
}
.li-status-time {
  color: #999;
  font-size: 12px;
}
.news-title {
  cursor: pointer;
}
.news-title:hover {
  color: #2abe5c;
  text-decoration: underline;
}
.edit-btn {
  color: #409eff !important;
  border: 1px solid #409eff;
}
.delete {
  color: #e7bb68 !important;
  border: 1px solid #e7bb68;
}
.pagination {
  margin-top: 20px;
  width: 100%;
  padding-bottom: 10px;
}
.timeselct {
  transform: rotate(180deg);
}
</style>
