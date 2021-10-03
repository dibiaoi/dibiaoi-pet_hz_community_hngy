<template>
  <div class="myfollow">
    <div v-if="hasFans">
      <ul>
        <li class="myf-li" v-for="fansUser in fansUserList" :key="fansUser.focus_hz.id">
          <div class="li-content">
            <div class="myf-avatar">
              <el-avatar :size="80" :src="fansUser.focus_hz.head_hz"></el-avatar>
            </div>
            <div class="myf-top-right">
              <div class="top-right-title">
                <span>
                  <strong>{{ fansUser.focus_hz.nickname_hz }}</strong>
                </span>
                <div class="myf-focus-btn">
                  <button class="empty_hz" @click="checkFansPersonalPage(fansUser.focus_hz.id)">
                    ta的主页
                  </button>
                </div>
              </div>
              <div class="user-fans-follow">
                <span>粉丝：{{ fansUser.focus_hz.fans_count_hz }}</span>
                <span>关注：{{ fansUser.focus_hz.focus_count_hz }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="offset"
          :page-sizes="[2, 5, 10]"
          :page-size="limit"
          layout="total,sizes,  prev, pager, next, jumper"
          :total="fansTotalCount"
        ></el-pagination>
      </div>
    </div>
    <div class="list-null" v-if="!hasFans">
      <h3 class="title" style="color:#999;">其他用户暂时还没有关注你(╥╯^╰╥)</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offset: 0,
      limit: 2,
      hasFans: false
    }
  },
  computed: {
    fansUserList() {
      return this.$store.state.UserActions.fansUserList
    },
    fansTotalCount() {
      return this.$store.state.UserActions.fansTotalCount
    }
  },
  mounted() {
    this.getFanUserList()
  },
  methods: {
    getFanUserList() {
      this.$store.dispatch('UserActions/getFanUserList', {
        limit: this.limit,
        offset: this.offset
      })
    },
    handleSizeChange(val) {
      this.limit = val
      this.getFanUserList()
    },
    handleCurrentChange(val) {
      this.offset = val
      this.getFanUserList()
    },
    checkFansPersonalPage(id) {
      this.$router.push('/user/personal-page/' + id)
    }
  },
  watch: {
    fansUserList(val) {
      if (val.length === 0) {
        this.hasFans = false
      } else {
        this.hasFans = true
      }
    }
  }
}
</script>

<style scoped>
.list-null {
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
}
.myfollow {
  height: 100%;
}
.pagination {
  margin-top: 20px;
  width: 100%;
  padding-bottom: 10px;
}
.li-content {
  display: flex;
}
.myf-top-right span {
  padding: 0px 15px;
}
.myf-li {
  border-bottom: 0.5px solid #e0e0e073;
  padding: 10px 15px;
}
.myf-avatar {
  padding: 10px;
}
.myf-top-right {
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}
.top-right-title {
  font-size: 20px;
  color: #4d4d4d;
  min-height: 40px;
}
.user-fans-follow {
  min-height: 40px;
}
.myf-focus-btn {
  float: right;
  margin-right: 20px;
}
</style>
