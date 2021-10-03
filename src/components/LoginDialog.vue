<template>
  <div>
    <!-- 登录弹出框 -->
    <div class="signform" ref="signform" v-bind:class="{ display: isDisplay }" id="signform">
      <div class="signclose">
        <span class="close-button" @click="signclose" width="35px">×</span>
      </div>

      <div class="sign-logo">
        <img src="@/assets/logo1.png" />
      </div>
      <div class="login-title">
        <span>
          <b>登录</b>
        </span>
      </div>

      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px">
        <el-form-item prop="usernamePass" required>
          <el-input
            placeholder="手机号（用户名）"
            type="text"
            v-model="ruleForm.usernamePass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="psdPass" style="margin-top: 20px">
          <el-input
            show-password
            placeholder="密码"
            type="password"
            v-model="ruleForm.psdPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <p class="login-p">
        <a>
          <router-link :to="{ name: 'find-psd-back', query: { userType: 'user' } }"
            >忘记密码？</router-link
          ></a
        >
        <span>
          新用户？
          <a> <router-link to="/register-page?userType=user">注册</router-link> </a>
        </span>
      </p>

      <div class="login-bottom">
        <button class="btn_login" @click="submitToLogin('ruleForm')">登录</button>
      </div>
      <p class="login-p">
        <span>
          <a> <router-link to="/admin-login">管理员登录</router-link></a>
        </span>
        <span>
          <a> <router-link to="/hospital-login">医院登录</router-link></a>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isDisplay: {
      get() {
        return this.$store.state.app.userLoginDialogPop
      },
      set(value) {
        this.$store.state.app.userLoginDialogPop = value
      }
    }
  },
  data() {
    const validUsernamePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号（用户名）'))
      } else {
        if (!/^1[35678]\d{9}$/.test(this.ruleForm.usernamePass)) {
          // console.log(/^1[35678]\d{9}$/.test( this.ruleForm.usernamePass))
          callback(new Error('请输入正确的手机号'))
          // this.$ref.ruleForm.validateField("usernamePass");
        }
        callback()
      }
    }
    const valiPsdPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (!/[a-zA-Z0-9._]{8,20}/.test(this.ruleForm.psdPass)) {
          callback(new Error('密码大小写字母8~20位'))
        }
      }
      callback()
    }

    return {
      ruleForm: {
        usernamePass: '18000000000',
        psdPass: '00000000'
      },
      rules: {
        usernamePass: [{ validator: validUsernamePass, trigger: 'blur' }],
        psdPass: [{ validator: valiPsdPass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    signclose() {
      this.isDisplay = true
    },
    submitToLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 格式正确提交post登录
          this.$store
            .dispatch('userInfo/getUserInfo', {
              name: this.ruleForm.usernamePass,
              psd: this.ruleForm.psdPass
            })
            .then(
              res => {
                console.log(res)
                if (res === 200) {
                  this.$message({
                    message: '登录成功！',
                    type: 'success'
                  })
                  this.isDisplay = true
                  setTimeout(() => {
                    this.$router.go(0)
                  }, 200)
                }
              },
              err => {
                console.log(err)
                if (err === 204) {
                  this.$message({
                    message: '密码错误',
                    type: 'warning'
                  })
                } else {
                  this.$message({
                    message: '登录失败',
                    type: 'error'
                  })
                }
              }
            )
        } else {
          this.$message({
            message: '格式错误',
            type: 'error'
          })
        }
      })
    }
  },
  watch: {
    isDisplay(val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>
/* 登录提示框样式 */
.signform {
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  padding: 30px 30px 30px;
  background: url(../assets/model-bg.png) no-repeat;
  background-color: rgba(0, 0, 0, 0);
  background-repeat: repeat;
  background-size: auto;
  background-repeat: no-repeat;
  background-size: 100%;
  position: fixed;
  background-color: #ffffff;
  top: 20%;
  left: 40%;
  width: 350px;
  height: 450px;
  text-align: center;
  z-index: 999;
}
.signclose {
  margin-top: 5px;
  position: absolute;
  right: 0;
  top: 0;
  line-height: 1;
  font-size: 30px;
  height: 43px;
  display: block;
  line-height: 34px;
  width: 38px;
  text-align: center;
  cursor: pointer;
  color: #b2bac2;
  z-index: 6;
}
.sign-logo {
  margin-top: 30px;
  align-items: center;
  display: flex;
  justify-content: center;
  line-height: 1;
}
.sign-logo img {
  display: block;
  height: 60px;
}
.login-title {
  color: #b2bac2;
  font-size: 13px;
  margin-bottom: 20px;
  text-align: center;
}
.login-box-des {
  font-size: 12px;
  color: #338cff;
  text-align: right;
  display: block;
  width: 100%;
  margin-top: 5px;
}

.login-eye {
  position: absolute;
  right: 1px;
  background: none;
  border: 0;
  color: inherit;
  padding: 13px 13px;
  display: flex;
  top: 0;
  height: inherit;
  align-items: center;
}
.login-tk,
p.login-p {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.login-p a {
  color: #2abe5c;
  font-size: 14px;
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
a:hover,
a:focus {
  color: #2a6496;
  text-decoration-line: none;
}
.login-p a {
  color: #2abe5c;
  font-size: 14px;
}
.login-bottom button {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  font-weight: 400;
  display: block;
}
button {
  border-radius: 4px;
  color: #fff;
  padding: 8px 16px;
  transition: opacity 0.2s;
  position: relative;
  cursor: pointer;
  font-size: 12px;
  margin: 0;
}
.login-bottom {
  margin-top: 20px;
}
button {
  background: #2abe5c;
  border: 1px solid #2abe5c;
}
</style>
<style>
.display {
  display: none;
}
</style>
