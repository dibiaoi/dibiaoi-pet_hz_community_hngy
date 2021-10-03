<template>
  <div>
    <h3 class="title">设置支付密码</h3>
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
            <el-button type="primary" @click="postNewPayPsd('ruleFindPsd')">确认</el-button>
          </el-form-item></el-form
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const valiPsdPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新支付密码'))
      } else {
        if (!/^([0-9]){6}$/.test(this.ruleFindPsd.newPsd)) {
          callback(new Error('支付密码为6位数字'))
        }
      }
      callback()
    }
    const oldPsdPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入原支付密码'))
      } else {
        if (!/^([0-9]){6}$/.test(this.ruleFindPsd.oldPsd)) {
          callback(new Error('支付密码为6位数字'))
        }
      }
      callback()
    }
    const Psd2Pass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确定支付密码'))
      } else if (this.ruleFindPsd.newPsd !== this.ruleFindPsd.Psd2) {
        callback(new Error('支付密码不一致'))
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
  computed: {
    userInformation() {
      return this.$store.state.userInfo.userInformation
    }
  },
  methods: {
    postNewPayPsd(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          this.changePayPsd()
        }
      })
    },
    changePayPsd() {
      const data = {
        phone_hz: this.userInformation.phone_hz,
        old_pay_password_hz: this.ruleFindPsd.oldPsd,
        new_pay_password_hz: this.ruleFindPsd.newPsd
      }
      this.$store.dispatch('ChangePsd/changePayPassword', data).then(
        res => {
          console.log(res)
          if (res.code === 200) {
            this.$message({
              message: res.detail,
              type: 'success'
            })
            this.$router.push('/user-center/profile')
          } else if (res.code == 1004) {
            this.$message({
              message: res.detail,
              type: 'warning'
            })
          }
        },
        err => {
          console.log(err)
          this.$message({
            message: '参数错误',
            type: 'warning'
          })
        }
      )
    }
  },
  components: {}
}
</script>
<style>
.title {
  font-size: 20px;
  color: #333;
  line-height: 30px;
}
</style>
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
