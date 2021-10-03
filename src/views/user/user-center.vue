<template>
  <div>
    <Banner2></Banner2>
    <div class="content animate__animated animate__fadeIn animate__faster">
      <div class="container">
        <div class="left-aside">
          <ul class="aside box">
            <li
              :class="{ active: tab.path === sel }"
              v-for="(tab, index) in tabs"
              :key="index"
              @click="select(tab)"
            >
              <div class="li-div">
                <router-link :to="tab.path" class="li-link">
                  <p>
                    <i :class="tab.icon"></i>
                    {{ tab.label }}
                  </p>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
        <div class="right-content">
          <div class="box">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <footerItem></footerItem>
  </div>
</template>

<script>
import Banner2 from '@/components/Banner2.vue'
import footerItem from '@/components/Footer.vue'
export default {
  data() {
    return {
      sell: this.$route.path,
      tabs: [
        { label: '个人资料', path: '/user-center/profile', icon: 'el-icon-user', id: '1' },
        { label: '我的关注', path: '/user-center/my-follow', icon: 'el-icon-orange', id: '2' },
        { label: '我的粉丝', path: '/user-center/my-fans', icon: 'el-icon-s-check', id: '3' },
        {
          label: '修改密码',
          path: '/user-center/change-my-psd',
          icon: 'el-icon-takeaway-box',
          id: '4'
        },
        {
          label: '设置支付密码',
          path: '/user-center/change-pay-psd',
          icon: 'el-icon-takeaway-box',
          id: '5'
        },
        { label: '我的宠物', path: '/user-center/my-pets', icon: 'el-icon-takeaway-box', id: '5' },
        {
          label: '添加宠物',
          path: '/user-center/add-pet',
          icon: 'el-icon-takeaway-box',
          id: '6'
        },
        {
          label: '我发布的领养',
          path: '/user-center/my-adopts-posts',
          icon: 'el-icon-s-goods',
          id: '7'
        },
        { label: '我的领养', path: '/user-center/my-adopts', icon: 'el-icon-news', id: '8' },
        { label: '我的收藏', path: '/user-center/my-collect', icon: 'el-icon-star-off', id: '9' },
        { label: '我的订单', path: '/user-center/my-order', icon: 'el-icon-tickets', id: '10' },
        {
          label: '我发布的资讯',
          path: '/user-center/my-posts',
          icon: 'el-icon-s-management',
          id: '11'
        }
      ]
    }
  },

  computed: {
    sel: {
      get() {
        return this.sell
      },
      set(val) {
        this.sell = val
      }
    }
  },
  components: {
    Banner2,
    footerItem
  },
  methods: {
    handle() {
      if (localStorage.getItem('role') === 'user') {
        this.tabs.splice(
          this.tabs.findIndex(item => item.label === '/user-center/my-posts'),
          1
        )
      }
    },
    select(tab) {
      this.sel = tab.path
    }
  },
  created() {
    this.handle()
    if (this.$store.state.userInfo.userState === 'false') {
      //不是登录状态，就返回首页
      this.$alert('您还没有登录，即将返回首页.....', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          setTimeout(() => {
            this.$router.replace('/home')
          }, 2000)
        })
        .catch(() => {
          this.$router.replace('/home')
        })
    }
  }
}
</script>

<style scoped>
.aside .active {
  color: #2abe5c;
}
.content {
  display: flex;
  margin: 0 auto;
  max-width: 100%;
  min-height: 600px;
  width: 100%;
  justify-content: center;
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
  width: 1100px;
  display: flex;
}
.left-aside {
  display: flex;
  width: 300px;
  margin-right: 20px;
}
.right-content {
  background-color: #fff;
  width: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  height: min-content;
}

.box {
  width: 100%;
  height: inherit;
}
.aside li {
  border-top: 1px solid #f3f3f3;
  min-height: 50px;
  width: 100%;
  line-height: 50px;
  font-size: 14px;
  color: #4d4d4d;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
}
.aside li:hover {
  background: #f5f6f7;
}
.li-div {
  padding: 5px 15px;
  display: flex;
  justify-content: space-between;
  align-self: center;
  cursor: pointer;
}
.li-link {
  font-size: 14px;
  color: #4d4d4d;
  height: 35px;
  width: inherit;
}
</style>
