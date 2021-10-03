<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-link to="/home"></router-link>

    <router-view></router-view>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {}
  },
  created() {
    if (localStorage.getItem('role') !== 'admin' && localStorage.getItem('role')) {
      this.$initWebSocket()
      this.$initWebSocketChat()
    }
  },
  destroyed() {
    console.log(this.$store.state.logoutSocket)
    if (this.$store.state.logoutSocket) {
      this.websock.onclose()
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.empty_hz {
  background: #fff;
  border: 1px solid #2abe5c;
  border-radius: 3px;
  color: #2abe5c !important;
  padding: 8px 16px;
  transition: opacity 0.2s;
  position: relative;
  cursor: pointer;
  font-size: 13px;
  margin: 0;
  margin-right: 10px;
}
.solid_hz {
  background: #2abe5c;
  border: 1px solid #2abe5c;
  border-radius: 3px;
  color: #fff;
  padding: 8px 16px;
  transition: opacity 0.2s;
  position: relative;
  cursor: pointer;
  font-size: 13px;
  margin: 0;
}
.span-content {
  overflow: hidden;
  font-size: 16px;
  opacity: 0.8;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 300px;
  display: block;
}
</style>
