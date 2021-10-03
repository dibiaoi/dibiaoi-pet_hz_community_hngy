<template>
  <div class="profile">
    <div class="profile-content">
      <h3 class="title">编辑医院信息</h3>
      <div class="EditUserInfo-bottom">
        <el-form
          :model="editHospitalForm"
          ref="editHospitalForm"
          label-width="90px"
          style="width:800px"
        >
          <el-form-item label="医院名称:" class="el-form-item">
            <el-input v-model="editHospitalForm.hospitalName"></el-input>
          </el-form-item>
          <el-form-item label="地区:" class="el-form-item">
            <el-cascader
              size="large"
              :options="options"
              v-model="editHospitalForm.selectedOptions"
              @change="handdleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="营业时间:">
            <el-time-picker
              is-range
              v-model="editHospitalForm.businessHours"
              value-format="HH:mm:ss"
              range-separator="至"
              start-placeholder="营业开始时间"
              end-placeholder="营业结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </el-form-item>

          <el-form-item label="地址:">
            <el-input
              v-model="editHospitalForm.address"
              type="textarea"
              placeholder="请输入地址"
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="建立日期:">
            <el-date-picker
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择医院建立日期"
              :picker-options="expireTimeOption"
              v-model="editHospitalForm.hospitalDate"
              @Change="123"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="联系电话:" class="el-form-item">
            <el-input v-model="editHospitalForm.contactPhone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱:" class="el-form-item">
            <el-input v-model="editHospitalForm.email"></el-input>
          </el-form-item>
          <el-form-item label="封面:" class="el-form-item">
            <el-button @click="uploadTrigger(0)" class="upload-pic">
              <input
                v-show="false"
                id="fileTop"
                name="file"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                @change="petImageUpload"
              />
              上传图片
            </el-button>
          </el-form-item>
          <el-form-item style="margin-left:100px">
            <img
              style="width:300px;height:200px"
              :src="editHospitalForm.defaultImg.image_hz"
              v-if="editHospitalForm.defaultImg"
            />
          </el-form-item>
          <el-form-item label="图片:" class="el-form-item">
            <el-button @click="uploadTrigger(1)" class="upload-pic">
              <input
                v-show="false"
                id="file"
                name="file"
                type="file"
                text="上传头像"
                accept="image/png, image/gif, image/jpeg"
                @change="petImageUpload"
              />
              上传图片
            </el-button>
          </el-form-item>
          <el-form-item style="margin-left:60px">
            <li class="pic-list" v-for="item in editHospitalForm.images" :key="item.id">
              <div style="width:300px; height:200px;display: contents;">
                <i @click="delPic(item.id)" class="iconfont del-pic" font-size="100px">&#xe622;</i>
                <img :src="item.image_hz" style="width:300px; height:200px" />
              </div></li
          ></el-form-item>
          <el-form-item class="form-item-bottom">
            <el-button type="primary" @click="postHospitalInfo()" style="margin-right:20px;"
              >确定修改</el-button
            >
            <el-button @click="resetForm('ruleForm')">取消 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import axios from 'axios' // 引入axios
export default {
  computed: {
    hospitalInfo() {
      return this.$store.state.userInfo.hospitalInfo
    }
  },
  data() {
    return {
      imageType: 1,
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() > Date.now() - 8.64e6
        }
      },
      options: regionData,
      url: '',
      editHospitalForm: {
        selectedOptions: [],
        hospitalName: '',
        businessHours: [],
        address: '',
        email: '',
        buildTime: '',
        hospitalDate: '',
        contactPhone: '',
        defaultImg: {},
        images: []
      }
    }
  },
  methods: {
    delPic(imgId) {
      this.editHospitalForm.images = this.editHospitalForm.images.filter(obj => obj.id !== imgId)
      console.log(this.editHospitalForm.images)
    },
    uploadTrigger(x) {
      this.imageType = x
      if (x === 0) {
        document.getElementById('fileTop').click()
      } else {
        document.getElementById('file').click()
      }
    },
    petImageUpload(e) {
      const file = e.target.files[0]
      const param = new FormData()
      param.append('image_hz', file)
      const headers = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }

      axios.post(this.$URL + '/v1/hospital/user/image/create', param, headers).then(
        res => {
          console.log(res)
          if (res.status === 201) {
            this.$message({
              message: '上传成功',
              type: 'success'
            })
            if (this.imageType === 0) {
              this.editHospitalForm.defaultImg = { id: res.data.id, image_hz: res.data.image_hz }
            } else {
              this.editHospitalForm.images.push({ id: res.data.id, image_hz: res.data.image_hz })
            }
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    handdleChange(value) {
      console.log(value)
    },
    postHospitalInfo() {
      const form = this.editHospitalForm
      const imgs = []
      for (const img of form.images) {
        imgs.push(img.id)
      }
      const info = {
        hospital_name_hz: form.hospitalName,
        business_hours_hz: form.businessHours[0] + form.businessHours[1],
        area_hz: form.selectedOptions[2],
        address: form.address,
        build_time_hz: form.hospitalDate,
        email: form.email,
        contact_phone_hz: form.contactPhone,
        default_image_hz: form.defaultImg.id,
        images_hz: imgs
      }
      console.log(info)
      this.$store.dispatch('hospitalInfo/patchHospitalInfo', info).then(
        res => {
          console.log(res)
          this.$message({ message: res.detail, type: 'success' })
          this.$store.dispatch('userInfo/autoLogin')
        },
        err => {
          console.log(err)
        }
      )
    }
  },
  mounted() {
    const info = this.hospitalInfo
    console.log(info)
    const form = this.editHospitalForm
    this.url = info.head_hz
    form.hospitalName = info.hospital_name_hz
    const province = info.area_hz.belong_city.belong_province.id.toString()
    const city = info.area_hz.belong_city.id.toString()
    const area = info.area_hz.id.toString()
    form.selectedOptions = [province, city, area]
    form.businessHours = [info.business_hours_hz.slice(0, 8), info.business_hours_hz.slice(8)]
    form.address = info.address
    form.hospitalDate = info.build_time_hz
    form.contactPhone = info.contact_phone_hz
    form.defaultImg = info.default_image_hz
    form.images = info.images_hz ? info.images_hz : []
    form.email = info.email
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
.upload-pic {
  background-color: #efefef;
  width: 200px;
  height: 50px;
  border-radius: 50px;
}
.pic-list:hover {
  opacity: 0.6;
}
.pic-list:hover .del-pic {
  opacity: 1;
}
.del-pic {
  position: relative;
  font-size: 40px;
  opacity: 0;
  cursor: pointer;
  left: 170px;
  bottom: 100px;
}
</style>
