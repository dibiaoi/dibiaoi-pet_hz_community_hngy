<template>
  <div class="profile">
    <div class="profile-content">
      <h3 class="title">个人资料</h3>
      <div class="userinfo-top">
        <div class="avatar-bg" @click="uploadTrigger()">
          <div class="avatar-upload">
            <el-avatar :size="80" :src="url"></el-avatar>
          </div>
          <el-dialog
            width="20%"
            :append-to-body="true"
            center
            title="上传头像"
            :visible.sync="dialogVisible"
          >
            <div class="el-dialog-body">
              <el-button @click="upLoadClick()">
                点击上传头像
                <input
                  id="file"
                  name="file"
                  type="file"
                  text="上传头像"
                  accept="image/png, image/gif, image/jpeg"
                  @change="uploadX"
                />
              </el-button>
              <el-avatar style="margin:15px 0px" :size="100" :src="newHead"></el-avatar>
              <el-button type="primary" @click="upload()">确定</el-button>
            </div>
          </el-dialog>
          <p style="font-size:10px;opacity:0.6;">点击头像上传</p>
        </div>

        <div class="userinfo-top-right">
          <router-link
            :to="{ name: 'personal-page', params: { id: userInformation.id } }"
            class="edit-info"
            >查看个人主页</router-link
          >
          <div class="right-1">
            <p>
              昵称:
              <span>{{ userInformation.nickname_hz }}</span>
            </p>
            <p>
              简介:
              <span>{{ userInformation.introduction_hz }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="userinfo-bottom">
        <ul>
          <li>
            <router-link to="/user-center/edit-pro-file" class="edit-info"
              >修改个人资料</router-link
            >
          </li>
          <li class="userinfo-li">
            昵称：
            <span>{{ userInformation.nickname_hz }}</span>
          </li>
          <li class="userinfo-li">
            姓名：
            <span>{{ userInformation.real_name_hz }}</span>
          </li>
          <li class="userinfo-li">
            性别：
            <span>{{ userInformation.sex_value_hz }}</span>
          </li>

          <li class="userinfo-li">
            身份：
            <span>{{ userInformation.identity_value_hz }}</span>
            <el-button
              class="verified"
              @click="applyForVolunteer()"
              v-show="userInformation.identity_value_hz == '普通用户' ? true : false"
              >申请成为志愿者</el-button
            >
          </li>
          <li class="userinfo-li">
            余额：
            <span>{{ userInformation.balance_hz }}</span>
          </li>
          <li class="userinfo-li">
            关注人数：
            <span>{{ userInformation.focus_count_hz }}</span>
          </li>
          <li class="userinfo-li">
            地区：
            <span>
              {{ userInformation.area_hz.belong_city.belong_province.province }}
              {{ userInformation.area_hz.belong_city.city }}
              {{ userInformation.area_hz.area }}
            </span>
          </li>
          <li class="userinfo-li">
            手机号：
            <span>{{ userInformation.phone_hz }}</span>
          </li>
          <li class="userinfo-li">
            实名认证：
            <span>{{ userInformation.verified_hz ? '已认证' : '未认证' }}</span>
            <router-link
              to="/user-center/authentication"
              class="verified"
              v-show="!userInformation.verified_hz"
              >去认证</router-link
            >
          </li>
          <li class="userinfo-li">
            注册时间：
            <span>{{ userInformation.create_time_hz.slice(0, 10) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios' // 引入axios
export default {
  computed: {
    userInformation() {
      return this.$store.state.userInfo.userInformation
    }
  },
  data() {
    return {
      url: '',
      dialogVisible: false,
      file: '',
      newHead: ''
    }
  },
  mounted() {
    this.url = this.userInformation.head_hz
    this.newHead = this.userInformation.head_hz
  },
  methods: {
    uploadX(ex) {
      this.file = ex
      const file = ex.target.files[0]
      this.newHead = window.URL.createObjectURL(file)
    },
    upLoadClick() {
      document.getElementById('file').click()
    },
    upload() {
      const e = this.file
      const file = e.target.files[0]
      const param = new FormData()
      param.append('head_hz', file)
      const headers = {
        headers: {
          'content-type': 'multipart/form-data',
          token: this.userInformation.token
        }
      }

      axios.patch(this.$URL + '/v1/user/avatar/upload', param, headers).then(
        res => {
          console.log(res)
          if (res.status === 200) {
            this.$store.dispatch('userInfo/autoLogin')
            this.$message({
              message: '上传头像成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.go(0)
            }, 1500)
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    uploadTrigger() {
      this.dialogVisible = true
    },
    handleVolunteerCode(val) {
      if (val === 200) {
        this.$store.dispatch('userInfo/autoLogin')
        this.$message({
          message: '申请志愿者成功！管理员审核后则正式成为志愿者',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.go(0)
        }, 2000)
      } else if (val === 1007) {
        this.$message({
          message: '请实名认证',
          type: 'warning'
        })
      } else if (val === 1008) {
        this.$message({
          message: '您已经是志愿者了',
          type: 'warning'
        })
      }
    },
    applyForVolunteer() {
      this.$alert('确定申请为志愿者？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          this.$store.dispatch('EditUserInfo/applyForVolunteer').then(res => {
            this.handleVolunteerCode(res)
          })
        })
        .catch(() => {})
    }
  },
  watch: {
    volunteerCode: function(val) {
      this.handleVolunteerCode(val)
    }
  }
}
</script>

<style scoped>
.el-dialog-body {
  text-align: initial;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

ul {
  width: 100%;
}
.profile-content {
  padding: 10px;
}
.title {
  font-size: 20px;
  color: #333;
  line-height: 30px;
}
.userinfo-top,
.userinfo-bottom {
  border-top: 1px solid #f1f1f1;
  display: flex;
  margin: 10px;
  padding: 10px 10px 0px 10px;
}
.userinfo-top-right {
  margin-left: 10px;
  width: 100%;
  height: 100%;
  position: relative;
  text-align: left;
}
.userinfo-li {
  position: relative;
  text-align: left;
  height: 35px;
  display: flex;
  align-items: center;
}
.right-1 {
  height: 35px;
  width: 100%;
}
.userinfo-top-right .right-1 p,
.userinfo-li span,
.userinfo-li {
  font-size: 15px;
  color: #4d4d4d;
}
.right-1 p span,
.userinfo-li span {
  padding: 0px 15px;
}
.verified {
  padding: 5px;
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  background-color: #fff;
  margin-left: 30px;
  color: #000;
}
.edit-info {
  padding: 7px;
  font-size: 13px;
  border-radius: 4px;
  border: 1px solid #f1f1f1;
  background-color: #fff;
  color: #3183c7;
  float: right;
}
.edit-info:hover {
  color: #2f6fa3;
}
.avatar-upload {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  display: inline-block;
  *display: inline;
  *zoom: 1;
  border-radius: 40px;
}
#file {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  width: 1px;
  height: 1px;
  cursor: pointer;
}
.avatar-upload:hover {
  color: #444;
  background: #eee;
  border-color: #ccc;
  text-decoration: none;
  opacity: 0.6;
  filter: alpha(opacity=60);
}
.avatar-bg {
  border-radius: 50px;
}
</style>
<style>
.userinfo-top .el-dialog__wrapper {
  z-index: 2300 !important;
}
.userinfo-top .el-dialog {
  z-index: 2300;
}
</style>
