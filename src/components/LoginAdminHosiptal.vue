<template>
  <form>
    <div class="login-box-in">
      <div class="login-title">
        <span>{{ loginType }}登录</span>
      </div>

      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
        <el-form-item prop="usernamePass" style="margin-top: 20px">
          <el-input
            type="text"
            v-model="loginForm.usernamePass"
            autocomplete="off"
            placeholder="手机号（用户名）"
          />
        </el-form-item>
        <el-form-item prop="psdPass" style="margin-top: 20px">
          <el-input
            show-password
            type="password"
            v-model="loginForm.psdPass"
            autocomplete="off"
            placeholder="密码"
          />
        </el-form-item>
      </el-form>

      <div class="reg-bottom">
        <el-button type="primary" class="btnRegister" @click="handleType('loginForm')"
          >登录
          </el-button>
      </div>
      <div class="login-tk">
        <p class="login-p">
          <a>
            <router-link :to="{ name: 'find-psd-back', query: { userType: loginType==='管理员'?'admin':'hospital' } }">
              忘记密码？
            </router-link>
          </a>
          普通用户？
          <a id="homePage" href="/home">首页</a>
        </p>
        <p style="margin-top:10px;" v-if="loginType === '医院'">
          还未注册医院？
          <router-link to="/register-page?userType=hospital">去注册</router-link>
        </p>
      </div>
    </div>
    <a id="adminPage" style="display:none" href="/admin-home">管理员页</a>
  </form>
</template>

<script>
export default {
  props: ['loginType'],
  data() {
    const validUsernamePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号（用户名）'))
      } else {
        if (!/^1[35678]\d{9}$/.test(this.loginForm.usernamePass)) {
          callback(new Error('请输入正确的手机号'))
        }
        callback()
      }
    }
    const validPsdPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (!/[a-zA-Z0-9._]{8,20}/.test(this.loginForm.psdPass)) {
          callback(new Error('密码大小写字母8~20位'))
        }
      }
      callback()
    }
    return {
      loginForm: {
        usernamePass: '15555555555',
        psdPass: '15555555555'
      },
      rules: {
        usernamePass: [{ validator: validUsernamePass, trigger: 'blur' }],
        psdPass: [{ validator: validPsdPass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleType(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = {
            phone_hz: this.loginForm.usernamePass,
            password_hz: this.loginForm.psdPass
          }
          if (this.loginType === '管理员') {
            this.adminLogin(data)
          } else if (this.loginType === '医院') {
            this.hospitalLogin(data)
          }
        }
      })
    },
    adminLogin(data) {
      this.$store.dispatch('userInfo/loginAdmin', data).then(
        res => {
          console.log(res)
          if (res.status === 200) {
            this.$message({
              message: '管理员登录成功',
              type: 'success'
            })

            setTimeout(() => {
              document.getElementById('adminPage').click()
            }, 500)
          }
        },
        err => {
          console.log(err)
          if (err.status === 204) {
            console.log(204)
            this.$message({
              message: '登录 用户或者密码错误',
              type: 'error'
            })
          }
        }
      )
    },
    hospitalLogin(data) {
      this.$store.dispatch('userInfo/loginHospital', data).then(
        res => {
          console.log(res)
          if (res.status === 200) {
            this.$message({
              message: '医院登录成功',
              type: 'success'
            })
            setTimeout(() => {
              document.getElementById('homePage').click()
            }, 1000)
          }
        },
        err => {
          console.log(err)
          if (err.status === 204) {
            this.$message({
              message: '用户或密码错误',
              type: 'error'
            })
          }
        }
      )
    }
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

.modal-content {
  width: 350px;
  display: inline-block;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  /*width: 21rem;*/
  padding: 40px 24px 24px 24px;
  margin: 100px auto 0;
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
.reg-bottom {
  margin-top: 20px;
  margin-bottom: 20px;
}
.reg-bottom button {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  font-weight: 400;
  display: block;
}
.login-tk {
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
}
.login-tk a {
  color: #2abe5c;
}
</style>
