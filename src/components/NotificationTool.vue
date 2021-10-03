<template>
  <div class="notification" @click="toNotificatioCenter()">
    <i v-if="!isGet" style="opacity:0.8;" class="el-icon-bell"></i>
    <el-dropdown v-if="isGet" trigger="hover">
      <el-badge :value="totalCount" :max="99" class="item">
        <i style="opacity:0.8;" class="el-icon-bell"></i>
      </el-badge>
      <el-dropdown-menu slot="dropdown">
        <router-link to="" @click.native="clearFoot('/notification-center/follow')">
          <el-dropdown-item class="clearfix">
            关注
            <el-badge
              v-if="followList.filter(x => x.status_hz == 0).length"
              class="mark"
              :value="followList.filter(x => x.status_hz == 0).length"
            />
          </el-dropdown-item>
        </router-link>
        <router-link to="" @click.native="clearFoot('/notification-center/collect')">
          <el-dropdown-item class="clearfix">
            收藏
            <el-badge
              v-if="collectList.filter(x => x.status_hz == 0).length"
              class="mark"
              :value="collectList.filter(x => x.status_hz == 0).length"
            />
          </el-dropdown-item>
        </router-link>
        <router-link to="" @click.native="clearFoot('/notification-center/remark')">
          <el-dropdown-item class="clearfix">
            留言
            <el-badge
              v-if="remarkList.filter(x => x.status_hz == 0).length"
              class="mark"
              :value="remarkList.filter(x => x.status_hz == 0).length"
            />
          </el-dropdown-item>
        </router-link>
        <router-link to="" @click.native="clearFoot('/notification-center/like')">
          <el-dropdown-item class="clearfix">
            点赞
            <el-badge
              v-if="likeList.filter(x => x.status_hz == 0).filter(x => x.status_hz == 0).length"
              class="mark"
              :value="likeList.length"
            /> </el-dropdown-item
        ></router-link>

        <router-link to="" @click.native="clearFoot('/notification-center/adopt')">
          <el-dropdown-item class="clearfix">
            领养
            <el-badge
              v-if="adoptList.filter(x => x.status_hz == 0).length"
              class="mark"
              :value="adoptList.filter(x => x.status_hz == 0).length"
            /> </el-dropdown-item
        ></router-link>

        <router-link to="" @click.native="clearFoot('/notification-center/pet-help')">
          <el-dropdown-item class="clearfix">
            众筹
            <el-badge
              v-if="petHelpList.filter(x => x.status_hz == 0).length"
              class="mark"
              :value="petHelpList.filter(x => x.status_hz == 0).length"
            /> </el-dropdown-item
        ></router-link>
        <router-link to="/notification-center/news">
          <el-dropdown-item class="clearfix">
            资讯
            <el-badge
              v-if="newsList.filter(x => x.status_hz == 0).length"
              class="mark"
              :value="newsList.filter(x => x.status_hz == 0).length"
            /> </el-dropdown-item
        ></router-link>
        <router-link to="" @click.native="clearFoot('/notification-center/chat')">
          <el-dropdown-item class="clearfix">
            消息
            <el-badge
              v-if="newsList.filter(x => x.status_hz == 0).length"
              class="mark"
              :value="newsList.filter(x => x.status_hz == 0).length"
            /> </el-dropdown-item
        ></router-link>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  computed: {
    // ...mapGetters(['notificationList']),
    // .getters['childs/getCurChildId']
    notificationList() {
      return this.$store.getters['notification/notificationList']
      // state.notification.notificationList
    },
    collectList() {
      return this.$store.state.notification.collectList
    },
    likeList() {
      return this.$store.state.notification.likeList
    },
    remarkList() {
      return this.$store.state.notification.remarkList
    },
    adoptList() {
      return this.$store.state.notification.adoptList
    },
    followList() {
      return this.$store.state.notification.followList
    },
    fansList() {
      return this.$store.state.notification.fansList
    },
    petHelpList() {
      return this.$store.state.notification.petHelpList
    },
    newsList() {
      return this.$store.state.notification.newsList
    }
  },
  created() {
    console.log(this.notificationList)
    if (this.notificationList.length > 0) {
      this.isGet = true
    }
  },
  data() {
    return {
      isGet: false,
      List: [],
      totalCount: 0
    }
  },
  mounted() {
    this.totalCount = 0
    this.notificationList.filter(val => {
      if (val.status_hz == 0) {
        this.totalCount++
      }
    })
  },
  methods: {
    clearFoot(list) {
      this.$router.push(list)
    },
    toNotificatioCenter() {
      this.$router.push('/notification-center')
    }
  },
  watch: {
    notificationList(list) {
      this.totalCount = 0
      list.filter(val => {
        if (val.status_hz == 0) {
          this.totalCount++
        }
      })

      console.log('list.length:' + list.length)
      if (list.length > 0) {
        this.isGet = true
      }
    }
  }
}
</script>
<style>
.clearfix {
  width: 100px;
  height: 40px;
}
</style>
<style scoped>
.notification:hover {
  cursor: pointer;
}
</style>
