<template>
  <div class="sign">
    <div class="logo2">
      <a href="/home">
        <img alt="Logo" id="Logo-register" src="@/assets/logo1.png" />
      </a>
    </div>
    <div
      class="modal-content login-box-content"
      v-bind:class="{ 'modal-content-hospital': userType === 'hospital' }"
    >
      <div class="login-logo">
        <img src="@/assets/logo1.png" />
      </div>
      {{ userType }}
      <RegisterTool :userType="userType"></RegisterTool>
    </div>
  </div>
</template>

<script>
import RegisterTool from '@/components/RegisterTool.vue'
export default {
  props: ['userType'],
  components: {
    RegisterTool
  }
}
</script>

<style scoped>
*,
:after,
:before {
  box-sizing: border-box;
}
img {
  max-width: 200px;
  height: auto;
  object-fit: cover;
  vertical-align: text-top;
}

ul,
div,
a,
li,
span,
label,
p {
  border: 0;
  font-family: inherit;
  font-size: 100%;
  font-style: inherit;
  font-weight: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
  box-sizing: border-box;
}
.reader-black-font {
  font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
    WenQuanYi Micro Hei, sans-serif;
}

body.no-padding {
  padding: 0 !important;
}

.sign {
  height: 100%;
  min-height: 750px;
  text-align: center;
  font-size: 14px;
  background-color: #f1f1f1;
}

.sign .logo,
.sign .logo2 {
  position: absolute;
  top: 56px;
  margin-left: 50px;
}

.sign .main {
  width: 400px;
  margin: 60px auto 0;
  padding: 50px 50px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  vertical-align: middle;
  display: inline-block;
}

.login-box-content {
  background: none;
  padding: 0;
}
.modal-content-hospital {
  width: 500px !important;
}
.modal-content {
  width: 400px;
  display: inline-block;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  /*width: 21rem;*/
  padding: 40px 24px 24px 24px;
  margin: 60px auto 0;
  position: relative;
  /* background-image: url(@/assets/model-bg.png); */
  background-repeat: no-repeat;
  background-size: 100%;
  overflow: hidden;
}

.login-box-content .login-box-top {
  padding: 30px 24px 24px;
  /* background-image: url(@/assets/model-bg.png); */
  background-repeat: no-repeat;
  background-size: 100%;
}

.box_hz {
  background-color: #fff;
  box-shadow: 0 0 0 1px #ebebed;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
}

.login-eye.button_hz {
  padding: 15px 10px;
}
.login-eye.button_hz {
  font-size: 13px;
  height: 40px;
}
button.text,
.button_hz.text {
  background: none;
  border: 0;
}
.login-tk {
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
}
.login-box-content b {
  font-weight: normal;
}
.login-box-content a {
  color: #2abe5c;
}

.reg-bottom {
  margin-top: 20px;
}
.reg-bottom button {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  font-weight: 400;
  display: block;
}

.site-terms {
  margin-top: 10px;
  padding: 10px 0;
  font-size: 12px;
  color: #999;
  border-top: 1px solid #f3f3f3;
  text-align: center;
  background: #f5f5f5;
}
#Logo-register {
  display: block;
  height: 80px;
}
</style>
