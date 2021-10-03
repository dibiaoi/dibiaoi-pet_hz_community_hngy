<template>
  <div>
    <Banner2></Banner2>
    <div class="content">
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
        { label: '医院资料', path: '/hospital-center/profile', icon: 'el-icon-user', id: '1' },
        {
          label: '编辑资料',
          path: '/hospital-center/hospital-edit-info',
          icon: 'el-icon-takeaway-box',
          id: '2'
        },
        {
          label: '医院服务',
          path: '/hospital-center/hospital-services',
          icon: 'el-icon-present',
          id: '3'
        },
        {
          label: '添加新服务',
          path: '/hospital-center/hospital-create-service',
          icon: 'el-icon-present',
          id: '4'
        },
        {
          label: '众筹列表',
          path: '/hospital-center/pet-help-list',
          icon: 'el-icon-present',
          id: '5'
        },
        {
          label: '发起众筹',
          path: '/hospital-center/create-pet-help',
          icon: 'el-icon-present',
          id: '6'
        },
        {
          label: '修改密码',
          path: '/hospital-center/hospital-change-psd',
          icon: 'el-icon-postcard',
          id: '7'
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
    select(tab) {
      this.sel = tab.path
    }
  },
  created() {
    if (this.$store.state.userInfo.userState === 'false') {
      //不是登录状态，就返回首页
      this.$alert('您还没有登录.....', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          setTimeout(() => {
            this.$router.replace('/hospital-login')
          }, 2000)
        })
        .catch(() => {
          this.$router.replace('/hospital-login')
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
