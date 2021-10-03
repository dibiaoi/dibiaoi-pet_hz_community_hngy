<template>
  <div class="change">
    <div class="changeMypsd">
      <el-form
        style="margin-top:20px"
        :model="ruleFindPsd"
        status-icon
        :rules="rules"
        ref="ruleFindPsd"
        label-width="100"
      >
        <el-form-item prop="oldPsd" label="原密码:" style="margin-top: 20px">
          <el-input
            clearable
            show-password
            type="password"
            v-model="ruleFindPsd.oldPsd"
            autocomplete="off"
            placeholder="请输入原密码"
          />
        </el-form-item>
        <el-form-item prop="newPsd" label="新密码:" style="margin-top: 20px">
          <el-input
            show-password
            type="password"
            v-model="ruleFindPsd.newPsd"
            autocomplete="off"
            placeholder="请输入新密码"
            clearable
          />
        </el-form-item>
        <el-form-item prop="Psd2" label="确认密码:" style="margin-top: 20px">
          <el-input
            show-password
            type="password"
            v-model="ruleFindPsd.Psd2"
            autocomplete="off"
            placeholder="确定新密码"
            clearable
          />
        </el-form-item>
        <el-form-item class="reg-bottom">
          <el-button type="primary" @click="postNewPsd('ruleFindPsd')">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userType', 'phone_hz'],
  data() {
    const valiPsdPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
      } else {
        if (!/[a-zA-Z0-9._]{8,20}/.test(this.ruleFindPsd.newPsd)) {
          callback(new Error('密码大小写字母8~20位'))
        }
      }
      callback()
    }
    const oldPsdPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入原密码'))
      } else {
        if (!/[a-zA-Z0-9._]{8,20}/.test(this.ruleFindPsd.oldPsd)) {
          callback(new Error('密码大小写字母8~20位'))
        }
      }
      callback()
    }
    const Psd2Pass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确定密码'))
      } else if (this.ruleFindPsd.newPsd !== this.ruleFindPsd.Psd2) {
        callback(new Error('密码不一致'))
      }
      callback()
    }
    return {
      ruleFindPsd: {
        newPsd: '',
        oldPsd: '',
        Psd2: ''
      },
      rules: {
        newPsd: [{ validator: valiPsdPass, trigger: 'blur' }],
        oldPsd: [{ validator: oldPsdPass, trigger: 'blur' }],
        Psd2: [{ validator: Psd2Pass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleStatusCode(val) {
      let goPath = ''
      if (this.userType === 'user') {
        goPath = '/user-center'
      } else if (this.userType === 'hospital') {
        goPath = '/hospital-center'
      } else {
        goPath = '/admin-home'
      }
      switch (val) {
        case 200:
          {
            this.$message({
              message: '修改密码成功',
              type: 'success'
            })
            this.$store.dispatch('userInfo/autoLogin')
            setTimeout(() => {
              this.$router.replace(goPath)
            }, 1000)
          }
          break
        case 1004:
          {
            this.$message({
              message: '原密码错误',
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
    },
    postNewPsd(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          if (this.userType === 'user') {
            this.changeUserPsd()
          } else if (this.userType === 'hospital') {
            this.changeHospitalPsd()
          } else {
            this.changeAdminPsd()
          }
        }
      })
    },
    changeUserPsd() {
      this.$store
        .dispatch('ChangePsd/postNewPsd', {
          phone: this.phone_hz,
          oldPsd: this.ruleFindPsd.oldPsd,
          newPsd: this.ruleFindPsd.newPsd
        })
        .then(
          res => {
            console.log(res)
            this.handleStatusCode(res.code)
          },
          err => {
            console.log(err)
          }
        )
    },
    changeHospitalPsd() {
      this.$store
        .dispatch('hospitalOperation/changHospitalPsd', {
          phone_hz: this.phone_hz,
          old_password_hz: this.ruleFindPsd.oldPsd,
          new_password_hz: this.ruleFindPsd.newPsd
        })
        .then(
          res => {
            console.log(res)
            this.handleStatusCode(res.code)
          },
          err => {
            console.log(err)
          }
        )
    },
    changeAdminPsd() {
      this.$store
        .dispatch('adminLogin/findAdminPsdBack', {
          phone_hz: this.phone_hz,
          old_password_hz: this.ruleFindPsd.oldPsd,
          new_password_hz: this.ruleFindPsd.newPsd
        })
        .then(
          res => {
            console.log(res)
            this.handleStatusCode(res.code)
          },
          err => {
            console.log(err)
          }
        )
    }
  }
}
</script>

<style scoped>
.change {
  border-top: 1px solid #f1f1f1;
  margin: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
}
.reg-bottom {
  margin-top: 20px;
}
.reg-bottom button {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  text-align: center;
}
.changeMypsd {
  width: 300px;
}
</style>
