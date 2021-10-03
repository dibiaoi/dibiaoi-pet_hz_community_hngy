<template>
  <div>
    <banner></banner>
    <div class="content">
      <div class="container">
        <div class="init-content top-content">
          <div class="pp-avatar">
            <el-avatar :size="120" :src="userPublicInfo.head_hz"></el-avatar>
          </div>
          <div class="top-right">
            <div class="top-right-title">
              <span>
                <strong>{{ userPublicInfo.nickname_hz }}</strong>
              </span>
              <div class="pp-top-btn">
                <!-- <button class="empty_hz">
                  <span>私信</span>
                </button> -->
                <button class="solid_hz" @click="clickUserFocus">
                  <span>{{ userFocus }}</span>
                </button>
              </div>
            </div>
            <div class="pp-top-sex-identity">
              <span>{{
                userPublicInfo.sex_hz === 0 ? '保密' : userPublicInfo.sex_hz === 1 ? '男' : '女'
              }}</span>
              <span>|</span>
              <span>{{ userPublicInfo.identity_value_hz }}</span>
            </div>
            <div class="pp-top-introduction">
              <span>简介:</span>
              <span>{{ userPublicInfo.introduction_hz }}</span>
            </div>
          </div>
        </div>
        <div class="bottom-content">
          <div class="init-content bottom-left">
            <div class="left-header">
              <span @click="selectNav('adopt')" :class="{ active: showAdopt }">领养信息</span>
              <span @click="selectNav('news')" v-if="showNews" :class="{ active: !showAdopt }"
                >资讯</span
              >
            </div>

            <div v-show="showAdopt" class="adopt-div">
              <AdoptList :id="id"></AdoptList>
            </div>
            <div v-show="!showAdopt" v-if="showNews" class="news-div">
              <NewsList :id="id"></NewsList>
            </div>
          </div>
          <div class="bottom-right">
            <div class="fans-follow init-content">
              <div class="fans">
                <span class="item-count">{{ userPublicInfo.fans_count_hz }}</span>
                <p>粉丝</p>
              </div>
              <div class="follow">
                <span class="item-count">{{ userPublicInfo.focus_count_hz }}</span>
                <p>关注</p>
              </div>
            </div>
            <div class="bottom-right-b init-content">
              <div class="right-b-a">
                <span style="margin-right:auto">注册时间</span>
                <span>{{
                  userPublicInfo.create_time_hz ? userPublicInfo.create_time_hz.slice(0, 10) : ''
                }}</span>
              </div>
              <div class="right-b-a">
                <span style="margin-right:auto">实名认证</span>
                <span>{{ userPublicInfo.verified_hz ? '已认证' : '未认证' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footerItem></footerItem>
  </div>
</template>

<script>
import { getUserPage, userFocusJudge } from '@/request/api.js'
import Banner2 from '@/components/Banner2.vue'
import footerItem from '@/components/Footer.vue'
import AdoptList from '@/components/User/AdoptList.vue'
import NewsList from '@/components/User/NewsList.vue'

export default {
  computed: {
    showNews() {
      return this.userPublicInfo.identity_hz === 2
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
      userPublicInfo: {},
      showAdopt: true
    }
  },
  components: {
    banner: Banner2,
    footerItem,
    AdoptList,
    NewsList
  },

  props: ['id'],
  created() {
    getUserPage(this.id).then(
      res => {
        console.log(res)
        this.userPublicInfo = res.data
      },
      err => {
        console.log(err)
        this.$message({
          message: '未找到用户 将返回首页',
          type: 'error'
        })
        setTimeout(() => {
          this.$router.replace('/home')
        }, 1000)
      }
    )
  },
  mounted() {
    userFocusJudge(this.id).then(
      res => {
        console.log(res)
        this.userFocus = res.data.detail === '关注' ? '已关注' : '未关注'
      },
      err => {
        console.log(err)
      }
    )
  },
  watch: {},
  methods: {
    clickUserFocus() {
      const isCancel = this.userFocus === '已关注'
      const words = isCancel ? '取消关注' : '关注'

      this.$alert('确定' + words + '该用户吗？', '提示', {
        comfirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$store.dispatch('UserActions/userFocusMethod', {
          id: this.id,
          isCancel
        })
      })
    },
    selectNav(type) {
      if (type === 'adopt') {
        this.showAdopt = true
      } else {
        this.showAdopt = false
      }
    }
  }
}
</script>
<style scoped>
.top-right span {
  padding: 0px 15px;
}
.item-count {
  font-weight: 600;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 100%;
  width: 100%;
}
i {
  padding-right: 10px;
}
div {
  border: 0;
  margin: 0;
  padding: 0;
}
.container {
  width: 1000px;
}
.top-content {
  height: 180px;
  display: flex;
}
.bottom-content {
  margin-top: 15px;
  display: flex;
}

.init-content {
  background-color: #fdfdfd;
  width: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}
.bottom-left {
  margin-right: 15px;
  width: 100%;
  min-height: 300px;
  height: fit-content;
}
.bottom-right {
  width: 400px;
}
.pp-avatar {
  position: relative;
  height: 200px;
  width: 200px;
  padding: 30px;
}
.top-right {
  margin-top: 40px;
  margin-bottom: 40px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}
.top-right-title {
  font-size: 25px;
  color: #4d4d4d;
  min-height: 40px;
  padding: 10px;
}
.pp-top-btn {
  float: right;
  margin-right: 20px;
}
.pp-top-sex-identity,
.pp-top-introduction {
  height: 40px;
  padding: 10px;
}
.fans {
  flex: 1;
  margin: 5px;
}
.fans-follow {
  padding: 16px 0;
  display: flex;
  margin-bottom: 15px;
}
.follow {
  flex: 1;
  margin: 5px;
  border-left: 1px solid #e0e0e0;
}
.fans span {
  font-size: 15px;
}
.bottom-right-b {
  height: 300px;
  padding: 25px;
}
.right-b-a {
  display: flex;
  font-size: 15px;
  padding: 15px 0px;
  border-bottom: 1px solid #e0e0e0;
}
.left-header {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0 auto;
  height: 50px;
  max-width: 960px;
  white-space: nowrap;
  border-bottom: 1px solid #ebebeb;
}
.left-header:hover {
  opacity: 0.7;
}
.left-header span {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 7.5rem;
  height: 100%;
}
.left-header .active {
  box-shadow: inset 0 -2px 0 #3780f7;
  color: #3780f7;
}
</style>
