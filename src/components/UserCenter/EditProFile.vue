<template>
  <div class="profile">
    <div class="profile-content">
      <h3 class="title">修改个人资料</h3>
      <div class="EditUserInfo-bottom">
        <el-form :model="editUserForm" ref="editUserForm" label-width="60px" style="width:500px">
          <el-form-item label="昵称:" class="el-form-item">
            <el-input v-model="editUserForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="性别:" class="el-form-item">
            <el-radio-group v-model="editUserForm.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
              <el-radio label="0">保密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="地区:" class="el-form-item">
            <el-cascader
              size="large"
              :options="options"
              v-model="editUserForm.selectedOptions"
              @change="handdleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="简介:" class="el-form-item">
            <el-input
              type="textarea"
              style="width:300px"
              rows="4"
              v-model="editUserForm.introduction"
              maxlength="35"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-bottom">
            <el-button type="primary" @click="patchUserInfo()" style="margin-right:20px;">确定修改</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
export default {
  computed: {
    userInformation() {
      return this.$store.state.userInfo.userInformation
    }
  },
  data() {
    return {
      options: regionData,
      url: '',
      editUserForm: {
        selectedOptions: [],
        nickname: '',
        sex: '',
        introduction: ''
      }
    }
  },
  methods: {
    handdleChange(value) {
      console.log(value)
    },
    patchUserInfo() {
      this.$store
        .dispatch('EditUserInfo/patchUserInfo', {
          nickname: this.editUserForm.nickname,
          sex: parseInt(this.editUserForm.sex),
          area: parseInt(this.editUserForm.selectedOptions[2]),
          introduction: this.editUserForm.introduction,
          token: this.userInformation.token
        })
        .then(
          res => {
            if (res === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$store.dispatch('userInfo/autoLogin')
              setTimeout(() => {
                this.$router.go(0)
              }, 1000)
            }
          },
          err => {
            if (err === 400) {
              this.$message({
                message: '参数错误，请核对',
                type: 'error'
              })
            } else if (err === 401) {
              this.$alert('您还没有登录，即将返回首页.....', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })
                .then(() => {
                  setTimeout(() => {
                    this.$router.replace('/home')
                  }, 2000)
                })
                .catch(() => {
                  this.$router.replace('/home')
                })
            } else {
              this.$message({
                message: '参数错误，请核对',
                type: 'error'
              })
            }
          }
        )
    }
  },
  mounted() {
    this.url = this.userInformation.head_hz
    this.editUserForm.sex = this.userInformation.sex_hz.toString()
    this.editUserForm.nickname = this.userInformation.nickname_hz
    const province = this.userInformation.area_hz.belong_city.belong_province.id.toString()
    const city = this.userInformation.area_hz.belong_city.id.toString()
    const area = this.userInformation.area_hz.id.toString()
    this.editUserForm.selectedOptions = [province, city, area]
    this.editUserForm.introduction = this.userInformation.introduction_hz
  }
}
</script>

<style scoped>
.el-form-item {
  display: flex;
  justify-content: left;
  align-items: left;
}
.form-item-bottom {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.profile-content {
  padding: 10px;
}
.title {
  font-size: 20px;
  color: #333;
}
.EditUserInfo-bottom {
  border-top: 1px solid #f1f1f1;
  display: flex;
  margin: 10px;
  padding: 30px 10px;
}
</style>