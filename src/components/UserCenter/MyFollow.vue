<template>
  <div class="myfollow">
    <div v-if="hasFocus">
      <ul>
        <li class="myf-li" v-for="focusUser in focusUserList" :key="focusUser.focus_hz.id">
          <div class="li-content">
            <div class="myf-avatar">
              <el-avatar :size="80" :src="focusUser.focus_hz.head_hz"></el-avatar>
            </div>
            <div class="myf-top-right">
              <div class="top-right-title">
                <span>
                  <strong>{{focusUser.focus_hz.nickname_hz}}</strong>
                </span>
                <div class="myf-focus-btn">
                  <button
                    class="solid_hz"
                    @click="checkFansPersonalPage(focusUser.focus_hz.id)"
                  >ta的主页</button>
                  <span></span>
                  <button class="empty_hz" @click="clickUserFocus(focusUser.focus_hz.id)">取消关注</button>
                </div>
              </div>
              <div class="user-fans-follow">
                <span>粉丝：{{focusUser.focus_hz.fans_count_hz}}</span>
                <span>关注：{{focusUser.focus_hz.focus_count_hz}}</span>
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
          :page-sizes="[ 2, 5, 10]"
          :page-size="limit"
          layout="total,sizes,  prev, pager, next, jumper"
          :total="focusTotalCount"
        ></el-pagination>
      </div>
    </div>
    <div class="list-null" v-if="!hasFocus">
      <h3 class="title" style="color:#999;">你暂时还没有关注其他用户(╥╯^╰╥)</h3>
    </div>
  </div>
</template>

<script >
export default {
  computed: {
    focusUserList() {
      return this.$store.state.UserActions.focusUserList
    },
    focusTotalCount() {
      return this.$store.state.UserActions.focusTotalCount
    },
    userFocus: {
      get() {
        return this.$store.state.UserActions.userFocus
      },
      set(newVal) {
        this.$store.state.UserActions.userFocus = newVal
      }
    }
  },
  data() {
    return {
      offset: 0,
      limit: 2,
      hasFocus: true
    }
  },
  mounted() {
    this.getFocusUserList()
  },
  methods: {
    getFocusUserList() {
      this.$store.dispatch('UserActions/getFocusUserList', {
        limit: this.limit,
        offset: this.offset
      })
    },
    clickUserFocus(id) {
      const isCancel = true
      this.$alert('确定取消关注该用户吗？', '提示', {
        comfirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$store.dispatch('UserActions/userFocusMethod', {
          id,
          isCancel
        })
        this.getFocusUserList()
      })
    },
    handleSizeChange(val) {
      this.limit = val
      this.getFocusUserList()
    },
    handleCurrentChange(val) {
      this.offset = val
      this.getFocusUserList()
    },
    checkFansPersonalPage(id) {
      this.$router.push('/user/personal-page/' + id)
    }
  },
  watch: {
    focusUserList(val) {
      if (val.length === 0) {
        this.hasFocus = false
      } else {
        this.hasFocus = true
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