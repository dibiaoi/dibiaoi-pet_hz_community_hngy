<template>
  <div>
    <banner></banner>
    <div class="content">
      <div class="container">
        <div class="left-aside">
          <ul class="aside box">
            <li :class="{ active: tab.path === sel }" v-for="(tab, index) in tabs" :key="index">
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
  components: {
    banner: Banner2,
    footerItem
  },
  data() {
    return {
      sell: this.$route.path,
      tabs: [
        { label: '关注', path: '/notification-center/follow', icon: 'el-icon-orange', id: '2' },
        { label: '点赞', path: '/notification-center/like', icon: 'el-icon-s-check', id: '3' },
        { label: '收藏', path: '/notification-center/collect', icon: 'el-icon-s-check', id: '4' },
        { label: '留言', path: '/notification-center/remark', icon: 'el-icon-s-check', id: '5' },
        { label: '领养', path: '/notification-center/adopt', icon: 'el-icon-s-check', id: '7' },
        { label: '众筹', path: '/notification-center/pet-help', icon: 'el-icon-s-check', id: '8' },
        { label: '资讯', path: '/notification-center/news', icon: 'el-icon-s-check', id: '9' },
        { label: '私信', path: '/notification-center/chat', icon: 'el-icon-s-check', id: '10' }
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
  width: 200px;
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
  /* justify-content: space-between; */
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
