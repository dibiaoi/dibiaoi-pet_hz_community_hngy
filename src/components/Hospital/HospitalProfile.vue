<template>
  <div class="profile">
    <div class="profile-content">
      <h3 class="title">医院资料</h3>
      <div class="userinfo-top">
        <div class="avatar-bg" @click="uploadTrigger('head_hz')">
          <div class="avatar-upload">
            <el-avatar :size="80" :src="url"></el-avatar>
          </div>
          <p style="font-size:10px;opacity:0.6;">点击头像上传</p>
        </div>
        <el-dialog width="20%" center title="上传头像" :visible.sync="avatarDialog">
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
        <div class="userinfo-top-right">
          <div class="right-1">
            <p style="font-size:20px;">
              {{ hospitalInfo.hospital_name_hz }}
            </p>
          </div>
        </div>
      </div>
      <div class="userinfo-bottom">
        <ul>
          <li>
            <router-link to="/hospital-center/hospital-edit-info" class="edit-info"
              >编辑医院信息</router-link
            >
          </li>
          <li class="li">
            营业时间：
            <span
              >{{ hospitalInfo.business_hours_hz.slice(0, 8) }} -
              {{ hospitalInfo.business_hours_hz.slice(8) }}
            </span>
          </li>
          <li class="li">
            联系电话：
            <span>{{ hospitalInfo.phone_hz }}</span>
          </li>
          <li class="li">
            电子邮箱：
            <span>{{ hospitalInfo.email ? hospitalInfo.email : '暂无' }}</span>
          </li>
          <li class="li">
            地址：
            <span>{{ hospitalInfo.address ? hospitalInfo.address : '暂无' }}</span>
          </li>
          <li class="li">
            地区：
            <span>
              {{ hospitalInfo.area_hz.belong_city.belong_province.province }}
              {{ hospitalInfo.area_hz.belong_city.city }}
              {{ hospitalInfo.area_hz.area }}</span
            >
          </li>
          <li class="li">
            建立时间：
            <span>{{ hospitalInfo.build_time_hz }}</span>
          </li>

          <li class="li">
            实名认证：
            <span>{{ hospitalInfo.real_name_hz ? hospitalInfo.real_name_hz : '未认证' }}</span>
            <router-link
              to="/hospital-center/hospital-auth"
              class="verified"
              v-show="!hospitalInfo.real_name_hz"
              >去认证</router-link
            >
          </li>
          <li class="li">
            状态：
            <span>{{ hospitalInfo.status_value_hz }}</span>
          </li>
          <li class="li">
            营业执照：
            <span v-if="!hospitalInfo.business_license_hz">暂未上传</span>
            <el-image
              v-if="hospitalInfo.business_license_hz"
              style="width:40px;height:40px"
              :src="hospitalInfo.business_license_hz"
              :preview-src-list="[hospitalInfo.business_license_hz]"
            ></el-image>
            <button
              class="verified"
              @click="uploadTrigger('business_license_hz')"
              v-show="!hospitalInfo.business_license_hz"
            >
              上传营业执照
            </button>
          </li>
          <li class="li">
            许可证：
            <span v-if="!hospitalInfo.license_hz">暂未上传</span>
            <el-image
              v-if="hospitalInfo.license_hz"
              style="width:40px;height:40px"
              :src="hospitalInfo.license_hz"
              :preview-src-list="[hospitalInfo.license_hz]"
            ></el-image>
            <button
              class="verified"
              @click="uploadTrigger('license_hz')"
              v-show="!hospitalInfo.license_hz"
            >
              上传许可证
            </button>
          </li>
        </ul>
      </div>

      <el-dialog width="40%" center title="上传营业执照" :visible.sync="businessDialog">
        <div class="el-dialog-body">
          <el-button @click="upLoadClick()">
            点击上传营业执照
            <input
              id="file"
              name="file"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              @change="uploadX"
            />
          </el-button>
          <el-image style="margin:15px 0px" :size="100" :src="businessPic"></el-image>
          <el-button type="primary" @click="upload()">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog width="40%" center title="上传许可证" :visible.sync="licenseDialog">
        <div class="el-dialog-body">
          <el-button @click="upLoadClick()">
            点击上传许可证
            <input
              id="file"
              name="file"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              @change="uploadX"
            />
          </el-button>
          <el-image style="margin:15px 0px" :size="100" :src="licensePic"></el-image>
          <el-button type="primary" @click="upload()">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios' // 引入axios
export default {
  computed: {
    hospitalInfo() {
      return this.$store.state.userInfo.hospitalInfo
    }
  },
  data() {
    return {
      url: '',
      avatarDialog: false,
      businessDialog: false,
      licenseDialog: false,
      uploadType: '',
      file: '',
      newHead: '',
      businessPic: '',
      licensePic: ''
    }
  },
  mounted() {
    this.url = this.hospitalInfo.head_hz
    this.newHead = this.hospitalInfo.head_hz
  },
  methods: {
    uploadX(ex) {
      this.file = ex
      const file = ex.target.files[0]
      const pic = window.URL.createObjectURL(file)
      if (this.uploadType === 'head_hz') {
        this.newHead = pic
      } else if (this.uploadType === 'business_license_hz') {
        this.businessPic = pic
      } else if (this.uploadType === 'license_hz') {
        this.licensePic = pic
      }
    },
    upload() {
      const e = this.file
      const file = e.target.files[0]
      const param = new FormData()
      param.append(this.uploadType, file)
      const headers = {
        headers: {
          'content-type': 'multipart/form-data',
          token: this.hospitalInfo.token
        }
      }
      // $URL
      axios.patch(this.$URL + '/v1/hospital/user/information/upload', param, headers).then(
        res => {
          console.log(res)
          if (res.status === 200) {
            if (this.uploadType === 'head_hz') {
              this.$store.dispatch('userInfo/autoLogin')
              this.$message({
                message: '上传头像成功',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.go(0)
              }, 1500)
            } else {
              this.$store.dispatch('userInfo/autoLogin')
              this.$message({
                message: '上传成功',
                type: 'success'
              })
              this.businessDialog = false
              this.licenseDialog = false
            }
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    upLoadClick() {
      document.getElementById('file').click()
    },
    uploadTrigger(val) {
      this.uploadType = val
      if (val === 'head_hz') {
        this.avatarDialog = true
      } else if (val === 'business_license_hz') {
        this.businessDialog = true
      } else {
        this.licenseDialog = true
      }
    }
  }
}
</script>

<style scoped>
.el-dialog-body {
  display: flex;
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
.userinfo-top-right {
  margin-left: 10px;
  width: 100%;
  position: relative;
  text-align: left;
  display: flex;
  align-items: center;
}
.right-1 {
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
}
.li span,
.li {
  font-size: 15px;
  color: #4d4d4d;
}
.right-1 p span,
.li span {
  padding: 0px 15px;
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
.li {
  position: relative;
  text-align: left;
  height: 50px;
  display: flex;
  align-items: center;
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
</style>
