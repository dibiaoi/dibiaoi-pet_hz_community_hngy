<template>
  <div class="auth-content">
    <el-form :model="authForm" :rules="rules" status-icon ref="authForm" label-with="50px">
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="authForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCardCode">
        <el-input v-model="authForm.idCardCode"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input type="text" v-model="authForm.code" autocomplete="off" placeholder="请输入验证码">
          <el-button style="width:100px;" slot="append">
            <span @click="sendVerification" v-if="verifie">验证码</span>
            <span v-if="!verifie">{{ second }} s</span>
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item class="form-btn">
        <el-button type="button" @click="123" style="margin-right: 20px">取消</el-button>
        <el-button type="primary" @click="postAuthentication('authForm')">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['phone_hz', 'userType'],
  data() {
    const idCardCodePass = (rule, value, callback) => {
      if (
        !/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(
          this.authForm.idCardCode
        )
      ) {
        callback(new Error('请输入正确格式的身份证号！'))
      }
      callback()
    }
    return {
      verifieCode: 0,
      second: 30,
      verifie: true,
      authForm: {
        realName: '',
        idCardCode: '',
        code: ''
      },
      rules: {
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 2, message: '没有一个字的名字哦', trigger: 'blur' }
        ],
        idCardCode: [
          { required: true, message: '请输入身份证号哦！', trigger: 'blur' },
          { validator: idCardCodePass, trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleCode(val) {
      if (val === 200) {
        this.$message({
          message: '认证成功',
          type: 'success'
        })
        this.$store.dispatch('userInfo/autoLogin')
        setTimeout(() => {
          this.$router.replace(
            this.userType === 'user' ? '/user-center/profile' : '/hospital-center/profile'
          )
        }, 800)
      } else if (val === 1001) {
        this.$message({
          message: '验证码错误',
          type: 'error'
        })
      } else if (val === 1005) {
        this.$message({
          message: '身份证号非法',
          type: 'error'
        })
      } else if (val === 1006) {
        this.$message({
          message: '用户已实名认证 无需重复认证',
          type: 'error'
        })
        setTimeout(() => {
          this.$router.replace(
            this.userType === 'user' ? '/user-center/profile' : '/hospital-center/profile'
          )
        }, 800)
      }
    },
    sendVerification() {
      this.$store
        .dispatch('Register/sendVerification', {
          phone: this.phone_hz
        })
        .then(
          res => {
            console.log(res)
            if (res === 200) {
              this.$message({
                message: '发送验证码成功',
                type: 'success'
              })
            }
          },
          err => {
            console.log(err)
          }
        )
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
    postAuthentication(formname) {
      this.$refs[formname].validate(valid => {
        console.log(this.userType)
        if (valid) {
          if (this.userType === 'user') {
            this.userAuth()
          } else if (this.userType === 'hospital') {
            this.hospitalAuth()
          }
        }
      })
    },
    userAuth() {
      this.$store
        .dispatch('EditUserInfo/postAuthentication', {
          realName: this.authForm.realName,
          idCardCode: this.authForm.idCardCode,
          code: this.authForm.code
        })
        .then(
          res => {
            console.log(res)
            this.handleCode(res.code)
          },
          err => {
            this.handleCode(err.response.status)
          }
        )
    },
    hospitalAuth() {
      this.$store
        .dispatch('hospitalOperation/hospitalAuth', {
          real_name_hz: this.authForm.realName,
          id_card_hz: this.authForm.idCardCode,
          code: this.authForm.code
        })
        .then(
          res => {
            console.log(res)
            this.handleCode(res.code)
          },
          err => {
            this.handleCode(err.response.status)
          }
        )
    }
  }
}
</script>

<style scoped>
.auth-content {
  border-top: 1px solid #f1f1f1;
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 20px;
}
.form-btn {
  margin-top: 50px;
}
</style>
