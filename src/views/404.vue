<template>
  <div>
    <div class="body_container">
      <div class="header">
        <a href="/">
          <img
            class="logo"
            style="margin-left: 20px;width:200px;height:80px"
            src="@/assets/logo1.png"
        /></a>
      </div>
      <div class="content">
        <div class="content-left">
          <div style="font-size: 200px;">404</div>
          <div style="font-size: 50px;">没有找到哦</div>
          <div style="font-size: 60px;">也许你应该...</div>
        </div>
        <img style="float:left;margin-left:50px;width:400px" src="@/assets/404pic.png" alt="???" />

        <div class="back-home">
          <a class="a" href="/">返回首页</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.back-home {
  margin-top: 64px;
  float: left;
  margin-left: 30px;
  font-size: 26px;
}
.content-left {
  color: #2f6fa3;
  text-shadow: 0 -1px 1px #b5b5b5;
  margin-left: 100px;
  float: left;
}
.content {
  width: 980px;
  margin: 0 auto;
  background: none;
  border: 0;
  box-shadow: none;
  min-height: 600px;
  border-radius: 5px;
  color: #525252;
  padding: 0 0 50px;
  padding-top: 0px;
  padding-top: 85px;
}
.logo {
  margin: 0;
  margin-left: 0px;
  position: relative;
  float: left;
}
.a {
  text-decoration: none;
  color: #2f6fa3;
}
.a:hover {
  text-decoration: underline;
  color: #2abe5c;
  opacity: 0.8;
}
.body_container {
  background-color: transparent !important;
}
div,
.a {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
}
.header {
  position: fixed;
  min-width: 1090px;
  min-height: 60px;
  padding: 10px 20px 0px 0px;
  z-index: 200;
  left: 0;
  right: 0;
  top: 0;
}
</style>
