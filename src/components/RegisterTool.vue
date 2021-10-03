<template>
  <form>
    <div class="login-box-in">
      <div class="login-title">
        <span>{{ userType === 'user' ? '用户' : '医院' }}注册</span>
      </div>

      <el-form :model="formRegisterRule" status-icon :rules="rules" ref="formRegisterRule">
        <el-form-item v-if="userType === 'user'" prop="nicknamePass" style="margin-top: 20px">
          <el-input
            type="text"
            v-model="formRegisterRule.nicknamePass"
            autocomplete="off"
            placeholder="昵称"
          />
        </el-form-item>
        <el-form-item v-if="userType === 'hospital'" prop="hospitalName" style="margin-top: 20px">
          <el-input
            type="text"
            v-model="formRegisterRule.hospitalName"
            autocomplete="off"
            placeholder="医院名称"
          />
        </el-form-item>
        <el-form-item prop="usernamePass" style="margin-top: 20px">
          <el-input
            type="text"
            v-model="formRegisterRule.usernamePass"
            autocomplete="off"
            placeholder="手机号（用户名）"
          />
        </el-form-item>
        <el-form-item prop="codePass" style="margin-top: 20px">
          <el-input
            type="text"
            v-model="formRegisterRule.codePass"
            autocomplete="off"
            placeholder="请输入验证码"
          >
            <el-button slot="append">
              <span @click="sendVerification" v-if="verifie">获取验证码</span>
              <span v-if="!verifie">{{ second }}s</span>
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item v-if="userType === 'hospital'" prop="hospitalDate" style="margin-top: 20px">
          <el-date-picker
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择医院建立日期"
            :picker-options="expireTimeOption"
            v-model="formRegisterRule.hospitalDate"
            @Change="123"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          v-if="userType === 'hospital'"
          label="营业时间："
          prop="hospitalTime"
          style="margin-top: 20px"
        >
          <el-time-picker
            is-range
            v-model="formRegisterRule.hospitalTime"
            value-format="HH:mm:ss"
            range-separator="至"
            start-placeholder="营业开始时间"
            end-placeholder="营业结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item prop="psdPass" style="margin-top: 20px">
          <el-input
            show-password
            type="password"
            v-model="formRegisterRule.psdPass"
            autocomplete="off"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item prop="checkpsdPass" style="margin-top: 20px">
          <el-input
            show-password
            type="password"
            v-model="formRegisterRule.checkpsdPass"
            autocomplete="off"
            placeholder="确认密码"
          />
        </el-form-item>
      </el-form>

      <!---->
      <div class="login-tk">
        <p>
          已有帐号？
          <a> <router-link to="/home">登录</router-link> </a>
        </p>
      </div>
      <div class="reg-bottom">
        <!---->
        <el-button type="button" class="btnRegister" @click="handleUserType('formRegisterRule')"
          >快速注册</el-button
        >
        <!---->
        <!---->
      </div>
    </div>

    <div class="site-terms">
      <span>
        注册登录即表示同意
        <a href target="_blank">用户协议</a>、
        <a href target="_blank">隐私政策</a>
      </span>
    </div>
  </form>
</template>

<script>
export default {
  props: ['userType'],
  computed: {},
  data() {
    const validNicknamePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入昵称'))
      }
      callback()
    }
    const validUsernamePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号（用户名）'))
      } else {
        if (!/^1[35678]\d{9}$/.test(this.formRegisterRule.usernamePass)) {
          callback(new Error('请输入正确的手机号'))
        }
        callback()
      }
    }
    const validCodePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入验证码'))
      }
      callback()
    }
    const validPsdPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (!/[a-zA-Z0-9._]{8,20}/.test(this.formRegisterRule.psdPass)) {
          callback(new Error('密码大小写字母8~20位'))
        }
      }
      callback()
    }
    const validCheckpsdPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确定密码'))
      } else if (value !== this.formRegisterRule.psdPass) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    const hospitalTimePass = (rule, value, callback) => {
      console.log(value + '------------')
      if (value === null) {
        callback(new Error('请选择营业时间'))
      }
      callback()
    }
    return {
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() > Date.now() - 8.64e6
        }
      },
      formRegisterRule: {
        nicknamePass: '',
        usernamePass: '',
        codePass: '',
        psdPass: '',
        checkpsdPass: '',
        hospitalName: '',
        hospitalDate: '',
        hospitalTime: ['09:00:00', '20:00:00']
      },
      rules: {
        nicknamePass: [{ validator: validNicknamePass, trigger: 'blur' }],
        usernamePass: [{ validator: validUsernamePass, trigger: 'blur' }],
        codePass: [{ validator: validCodePass, trigger: 'blur' }],
        psdPass: [{ validator: validPsdPass, trigger: 'blur' }],
        checkpsdPass: [{ validator: validCheckpsdPass, trigger: '' }],
        hospitalName: [
          { required: true, message: '请输入医院名称', trigger: 'blur' },
          { min: 4, max: 20, message: '长度4-20个字符', trigger: 'blur' }
        ],
        hospitalDate: [
          { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ],
        hospitalTime: [{ validator: hospitalTimePass, trigger: 'blur' }]
      },
      verifieCode: 0,
      second: 30,
      verifie: true
    }
  },
  methods: {
    sendVerification() {
      if (/^1[35678]\d{9}$/.test(this.formRegisterRule.usernamePass)) {
        this.$store
          .dispatch('Register/sendVerification', {
            phone: this.formRegisterRule.usernamePass
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
                if (second === 0) {
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
    handleUserType(formname) {
      this.$refs[formname].validate(valid => {
        console.log(valid)
        console.log(this.verifieCode)
        if (valid && this.verifieCode === 200) {
          if (this.userType === 'user') {
            this.registerUser()
          } else if (this.userType === 'hospital') {
            this.registerHospital()
          }
        } else {
          this.$message({
            message: '请获取验证码',
            type: 'error'
          })
        }
      })
    },
    registerUser() {
      this.$store
        .dispatch('Register/registerUser', {
          phone: this.formRegisterRule.usernamePass,
          nickname: this.formRegisterRule.nicknamePass,
          psd: this.formRegisterRule.psdPass,
          code: this.formRegisterRule.codePass
        })
        .then(
          res => {
            this.handleRespondCode(res)
          },
          err => {
            console.log(err)
          }
        )
    },
    registerHospital() {
      const data = {
        phone_hz: this.formRegisterRule.usernamePass,
        password_hz: this.formRegisterRule.psdPass,
        hospital_name_hz: this.formRegisterRule.hospitalName,
        business_hours_hz:
          this.formRegisterRule.hospitalTime[0] + this.formRegisterRule.hospitalTime[1],
        build_time_hz: this.formRegisterRule.hospitalDate,
        code: this.formRegisterRule.codePass
      }
      this.$store.dispatch('hospitalOperation/registerHospital', data).then(
        res => {
          console.log(res)
          this.handleRespondCode(res)
        },
        err => {
          console.log(err)
        }
      )
    },
    handleRespondCode(res) {
      if (res.code) {
        if (res.code === 1002) {
          this.$message({
            // 返回1002已存在
            message: res.detail,
            type: 'error'
          })
        } else if (res.code === 1001) {
          this.$message({
            message: res.detail,
            type: 'error'
          })
        }
      } else {
        this.$alert('返回首页吗？', '注册成功', {
          comfirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$router.go(-1)
        })
      }
    }
  }
}
</script>

<style scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
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
