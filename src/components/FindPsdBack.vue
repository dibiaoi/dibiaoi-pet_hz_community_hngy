<template>
  <form>
    <div class="login-box-in">
      <div class="login-title">
        <span>找回密码</span>
      </div>

      <el-form
        style="margin-top:30px"
        :model="ruleFindPsd"
        status-icon
        :rules="rules"
        ref="ruleFindPsd"
      >
        <el-form-item prop="phonePass">
          <el-input
            placeholder="请输入手机号"
            v-model="ruleFindPsd.phonePass"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="codePass" style="margin-top: 30px">
          <el-input
            type="text"
            v-model="ruleFindPsd.codePass"
            autocomplete="off"
            placeholder="请输入验证码"
          >
            <el-button slot="append">
              <span @click="sendVerification" v-if="verifie">获取取验证码</span>
              <span v-if="!verifie">{{ second }}s</span>
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="newPsd" style="margin-top: 30px">
          <el-input
            show-password
            type="password"
            v-model="ruleFindPsd.newPsd"
            autocomplete="off"
            placeholder="请输入新密码"
          />
        </el-form-item>
      </el-form>

      <div class="login-tk">
        <p v-if="userType === 'user'">
          还未注册？
          <a><router-link to="/register-page?userType=user">注册</router-link> </a>
        </p>
      </div>
      <div class="reg-bottom">
        <!---->
        <el-button type="button" @click="handleUserType('ruleFindPsd')">确认</el-button>
        <!---->
        <!---->
      </div>
    </div>

    <div class="site-terms">
      <span>请填写注册时的手机号</span>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    const valiPhonePass = (tule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号（用户名）'))
      } else {
        if (!/^1[35678]\d{9}$/.test(this.ruleFindPsd.phonePass)) {
          callback(new Error('请输入正确的手机号'))
        }
        callback()
      }
    }
    const valiCodePass = (tule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入验证码'))
      }
      callback()
    }
    const valiPsdPass = (tule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (!/[a-zA-Z0-9._]{8,20}/.test(this.ruleFindPsd.newPsd)) {
          callback(new Error('密码大小写字母8~20位'))
        }
      }
      callback()
    }
    return {
      ruleFindPsd: {
        phonePass: '',
        codePass: '',
        newPsd: ''
      },
      rules: {
        phonePass: [{ validator: valiPhonePass, trigger: 'blur' }],
        codePass: [{ validator: valiCodePass, trigger: 'blur' }],
        newPsd: [{ validator: valiPsdPass, trigger: 'blur' }]
      },
      verifieCode: 0,
      second: 30,
      verifie: true
    }
  },
  props: ['userType'],
  methods: {
    handleUserType(formname) {
      this.$refs[formname].validate(valid => {
        if (valid && this.verifieCode === 200) {
          if (this.userType === 'user') {
            this.postUserNewPsd()
          } else if (this.userType === 'admin') {
            this.postAdminNewPsd()
          } else if (this.userType === 'hospital') {
            this.postHospitalNewPsd()
          }
        } else {
          this.$message({ message: '请获取验证码', type: 'warning' })
        }
      })
    },
    sendVerification() {
      if (/^1[35678]\d{9}$/.test(this.ruleFindPsd.phonePass)) {
        this.$store
          .dispatch('Register/sendVerification', {
            phone: this.ruleFindPsd.phonePass
          })
          .then(
            res => {
              console.log(res)
              this.verifieCode = res
              this.$message({
                message: '验证码发送成功',
                type: 'success'
              })
              this.verifie = false
              const vm = this
              const time = setInterval(() => {
                let second = vm.second
                second--
                vm.second = second
                if (second == 0) {
                  clearInterval(time)
                  vm.second = 30
                  vm.verifie = true
                }
              }, 1000)
            },
            err => {
              console.log(err)
            }
          )
      } else {
        this.$message({ message: '请输入正确的手机号哦', type: 'warning' })
      }
    },
    postUserNewPsd() {
      this.$store
        .dispatch('ChangePsd/postNewPsd', {
          phone: this.ruleFindPsd.phonePass,
          code: this.ruleFindPsd.codePass,
          newPsd: this.ruleFindPsd.newPsd
        })
        .then(
          res => {
            console.log(res)
            this.handleResponse(res.code)
          },
          err => {
            console.log(err)
          }
        )
    },
    postAdminNewPsd() {
      const data = {
        phone_hz: this.ruleFindPsd.phonePass,
        code: this.ruleFindPsd.codePass,
        new_password_hz: this.ruleFindPsd.newPsd
      }
      this.$store.dispatch('adminLogin/findAdminPsdBack', data).then(
        res => {
          console.log(res)
          this.handleResponse(res.code)
        },
        err => {
          console.log(err)
        }
      )
    },
    postHospitalNewPsd(){
      const data = {
        phone_hz: this.ruleFindPsd.phonePass,
        code: this.ruleFindPsd.codePass,
        new_password_hz: this.ruleFindPsd.newPsd
      }
       this.$store.dispatch('hospitalOperation/changHospitalPsd', data).then(
        res => {
          console.log(res)
          this.handleResponse(res.code)
        },
        err => {
          console.log(err)
        }
      )
    },
    handleResponse(code) {
      switch (code) {
        case 200:
          {
            this.$message({
              message: '修改密码成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.go(-1)
            }, 800)
          }
          break
        case 1004:
          {
            this.$message({
              message: '验证码错误',
              type: 'error'
            })
          }
          break
        case 1003:
          {
            this.$message({
              message: '用户未注册',
              type: 'warning'
            })
          }
          break

        default:
          break
      }
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
  width: 400px;
  display: inline-block;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  /*width: 21rem;*/
  padding: 40px 24px 24px 24px;
  margin: 100px auto 0;
  position: relative;
  /* background-image: url(../assets/model-bg.png); */
  background-repeat: no-repeat;
  background-size: 100%;
  overflow: hidden;
}

.login-box-content .login-box-top {
  padding: 30px 24px 24px;
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
  margin-top: 15px;
  text-align: right;
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
