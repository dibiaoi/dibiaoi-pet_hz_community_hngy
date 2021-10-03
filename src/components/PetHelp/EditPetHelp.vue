<template>
  <el-form
    :model="createPetHelpForm"
    ref="createPetHelpForm"
    :rules="rules"
    label-width="90px"
    style="width:600px"
  >
    <div class="pet-avatar" @click="uploadTrigger(0)">
      <el-avatar :size="100" :src="createPetHelpForm.defaultImage.image_hz">上传宠物头像</el-avatar>
      <input
        id="fileTop"
        name="file"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        @change="imageUpload"
      />
    </div>
    <el-form-item label="宠物昵称:" class="el-form-item" prop="petName">
      <el-input required v-model="createPetHelpForm.petName"></el-input>
    </el-form-item>
    <el-form-item label="性别：" class="el-form-item" prop="sexVal">
      <el-select style="width:150px" v-model="createPetHelpForm.sexVal">
        <el-option
          v-for="item in sex"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="品种：" class="pet-info-item" prop="raceVal">
      <el-select style="width:150px" v-model="createPetHelpForm.raceVal">
        <el-option
          v-for="item in race"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="type === 'create'" label="特征:" class="pet-info-item" prop="features">
      <el-tag
        :key="tag"
        v-for="tag in createPetHelpForm.features"
        closable
        :disable-transition="false"
        @close="handleClose(tag)"
        >{{ tag }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        ref="saveTagInput"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
        v-model="featureInputValue"
      ></el-input>
      <el-button class="button-new-tag" type="small" v-else @click="showInput">+特点</el-button>
    </el-form-item>
    <el-form-item label="出生日期:" class="pet-info-item" prop="birth">
      <el-date-picker
        v-model="createPetHelpForm.birth"
        value-format="yyyy-MM-dd"
        type="date"
        :picker-options="expireTimeOption"
        placeholder="选择日期"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="帮助详情:" class="el-form-item" prop="description">
      <el-input
        required
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6 }"
        placeholder="请输入详情"
        v-model="createPetHelpForm.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="众筹金额:" class="el-form-item" prop="amount">
      <el-input
        required
        placeholder="请输入众筹金额"
        onkeyup="value=value.replace(/[^\d]/g,'')"
        v-model="createPetHelpForm.amount"
      ></el-input>
    </el-form-item>
    <el-form-item label="众筹天数:" class="el-form-item" prop="day">
      <el-input
        required
        placeholder="请输入众筹天数"
        onkeyup="value=value.replace(/[^\d]/g,'')"
        v-model="createPetHelpForm.day"
      ></el-input>
    </el-form-item>
    <el-form-item
      v-if="type === 'create'"
      label="被帮助用户:"
      class="el-form-item"
      prop="userPhone"
    >
      <el-input
        required
        onkeyup="value=value.replace(/[^\d]/g,'')"
        placeholder="请输入手机号码"
        v-model="createPetHelpForm.userPhone"
      ></el-input>
    </el-form-item>
    <el-form-item
      v-if="type === 'create'"
      label="住院证明:"
      class="pet-info-item"
      prop="hospitalizationImage"
    >
      <el-button @click="uploadTrigger(2)" class="upload-pic">
        <span class="span" style="padding:0px 40px">上传住院证明</span>
        <input
          id="fileHospital"
          name="file"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          @change="hospitalImageUpload"
        />
      </el-button>
    </el-form-item>
    <div v-if="type === 'create'">
      <el-image
        v-if="createPetHelpForm.hospitalizationImage"
        style="width:300px; height:200px"
        :src="createPetHelpForm.hospitalizationImage.image_hz"
      ></el-image>
    </div>
    <el-form-item label="宠物图片:" class="pet-info-item">
      <el-button @click="uploadTrigger(1)" class="upload-pic">
        <span class="span" style="padding:0px 40px">上传图片</span>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          @change="imageUpload"
        />
      </el-button>
    </el-form-item>

    <ul>
      <li class="pic-list" v-for="item in createPetHelpForm.image" :key="item.id">
        <div style="width:300px; height:200px">
          <i @click="delPic(item.id)" class="iconfont del-pic" font-size="100px">&#xe622;</i>
          <img :src="item.image_hz" :alt="item.image_hz" style="width:300px; height:200px" />
        </div>
      </li>
    </ul>
    <el-form-item class="submit-item" v-if="type === 'create'">
      <el-button type="primary" @click="submitForm('createPetHelpForm')">提交宠物众筹</el-button>
    </el-form-item>
    <el-form-item class="submit-item" v-if="type === 'edit'">
      <el-button type="primary" @click="editpetHelp('createPetHelpForm')">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'
export default {
  props: ['type', 'helpId'],
  data() {
    const phonePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号（用户名）'))
      } else {
        if (!/^1[35678]\d{9}$/.test(this.createPetHelpForm.userPhone)) {
          callback(new Error('请输入正确的手机号'))
        }
        callback()
      }
    }
    return {
      // imagetype表示上传的图片是默认图片（0）还是图片列表（1）
      imageType: 1,
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() > Date.now() - 8.64e6
        }
      },
      inputVisible: false,
      featureInputValue: '',
      race: [
        { value: 0, label: '猫' },
        { value: 1, label: '狗' },
        { value: 2, label: '其他' }
      ],
      sex: [
        { value: 0, label: '公' },
        { value: 1, label: '母' }
      ],
      createPetHelpForm: {
        petName: '',
        raceVal: '',
        sexVal: '',
        birth: '',
        description: '',
        hospitalizationImage: '',
        amount: '',
        day: '',
        userPhone: '',
        defaultImage: '',
        image: [],
        features: ['可爱', '粘人']
      },
      rules: {
        petName: [{ required: true, message: '请输入', trigger: 'blur' }],
        raceVal: [{ required: true, message: '请选择种族', trigger: 'change' }],
        sexVal: [{ required: true, message: '请选择性别', trigger: 'change' }],
        birth: [{ type: 'string', required: true, message: '请选择日期', trigger: 'change' }],
        description: [{ required: true, message: '请输入', trigger: 'blur' }],
        hospitalizationImage: [{ required: true, message: '请输入', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入', trigger: 'blur' }],
        day: [{ required: true, message: '请输入', trigger: 'blur' }],
        userPhone: [{ validator: phonePass, trigger: 'blur' }],
        features: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  methods: {
    uploadTrigger(x) {
      console.log(x)
      this.imageType = x
      if (x === 0) {
        document.getElementById('fileTop').click()
      } else if (x === 2) {
        document.getElementById('fileHospital').click()
      } else {
        document.getElementById('file').click()
      }
    },
    imageUpload(e) {
      console.log(e)
      const file = e.target.files[0]
      const param = new FormData()
      param.append('image_hz', file)
      const headers = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      this.$message({
        message: '正在上传',
        type: 'info'
      })

      axios.post(this.$URL + '/v1/petHelp/image/create', param, headers).then(
        res => {
          console.log(res)

          if (res.status === 201) {
            this.$message({
              message: '上传成功',
              type: 'success'
            })
            if (this.imageType === 0) {
              this.createPetHelpForm.defaultImage = { id: res.data.id, image_hz: res.data.image_hz }
            } else {
              this.createPetHelpForm.image.push({ id: res.data.id, image_hz: res.data.image_hz })
            }
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    hospitalImageUpload(e) {
      console.log(e)
      const file = e.target.files[0]
      const param = new FormData()
      param.append('image_hz', file)
      const headers = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      this.$message({
        message: '正在上传',
        type: 'info'
      })

      axios
        .post(this.$URL + '/v1/petHelp/image/hospitalization/create', param, headers)
        .then(
          res => {
            console.log(res)

            if (res.status === 201) {
              this.$message({
                message: '上传成功',
                type: 'success'
              })

              this.createPetHelpForm.hospitalizationImage = {
                id: res.data.id,
                image_hz: res.data.image_hz
              }
            }
          },
          err => {
            console.log(err)
          }
        )
    },
    delPic(imgId) {
      this.createPetHelpForm.image = this.createPetHelpForm.image.filter(obj => obj.id !== imgId)
      console.log(this.createPetHelpForm.image)
    },
    handleClose(tag) {
      this.createPetHelpForm.features.splice(this.createPetHelpForm.features.indexOf(tag), 1)
    },
    handleInputConfirm() {
      const inputValue = this.featureInputValue
      if (inputValue) {
        this.createPetHelpForm.features.push(inputValue)
      }
      this.inputVisible = false
      this.featureInputValue = ''
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    submitForm(formName) {
      const form = this.createPetHelpForm
      this.$refs.createPetHelpForm.validate(valid => {
        const imageId = []
        for (const img of form.image) {
          imageId.push(img.id)
        }
        if (valid && form.image.length !== 0 && form.defaultImage) {
          const data = {
            name_hz: form.petName,
            race_hz: form.raceVal,
            sex_hz: form.sexVal,
            birth_hz: form.birth,
            description_hz: form.description,
            hospitalization_image_hz: form.hospitalizationImage.id,
            amount_hz: form.amount,
            day_hz: form.day,
            user_phone_hz: form.userPhone,
            default_image_hz: form.defaultImage.id === undefined ? 0 : form.defaultImage.id,
            features_hz: form.features,
            image_hz: imageId
          }
          this.$store.dispatch('petHelpEditor/createPetHelp', data).then(
            res => {
              console.log(res)

              this.$message({
                message: '提交成功，待管理员审核',
                type: 'success'
              })

              this.$router.go(-1)
            },
            err => {
              console.log(err)
              if (err.status === '404') {
                this.$message({
                  message: '提交失败，被帮助者必须为用户',
                  type: 'error'
                })
              }
            }
          )
        } else {
          this.$message({
            message: '请上传照片哦',
            type: 'warning'
          })
        }
      })
    },
    editpetHelp(formName) {
      const form = this.createPetHelpForm

      this.$refs.createPetHelpForm.validate(valid => {
        const imageId = []
        for (const img of form.image) {
          imageId.push(img.id)
        }
        if (valid && form.image.length !== 0 && form.defaultImage) {
          const data = {
            name_hz: form.petName,
            race_hz: form.raceVal,
            sex_hz: form.sexVal,
            birth_hz: form.birth,
            description_hz: form.description,
            amount_hz: form.amount,
            day_hz: form.day,
            default_image_hz: form.defaultImage.id === undefined ? 0 : form.defaultImage.id,

            image_hz: imageId
          }
          this.$store.dispatch('petHelpEditor/editPetHelp', this.helpId, data).then(
            res => {
              console.log(res.data)
              this.$message({
                message: res.data.detail,
                type: 'success'
              })
              this.$router.go(-1)
            },
            err => {
              console.log(err)
            }
          )
        } else {
          this.$message({
            message: '请上传照片哦',
            type: 'warning'
          })
        }
      })
    }
  },
  created() {
    if (this.type === 'edit') {
      const form = this.createPetHelpForm
      this.$store.dispatch('petHelpEditor/getPetHelp', this.helpId).then(
        res => {
          console.log(res)

          form.petName = res.name_hz
          form.raceVal = res.race_hz
          form.sexVal = res.sex_hz
          form.birth = res.birth_hz
          form.description = res.description_hz
          form.hospitalizationImage = res.hospitalization_image_hz
          form.amount = res.amount_hz
          form.day = res.day_hz
          form.userPhone = res.user_phone_hz
          form.defaultImage = res.default_image_hz
          form.features = res.features_value_hz
          form.image = res.image_hz
        },
        err => {
          console.log(err)
        }
      )
    }
  }
}
</script>

<style>
.el-form-item__content {
  margin-left: 40px !important;
}
.el-textarea {
  width: 300px;
}
</style>
<style scoped>
.hospital {
  padding: 20px;
}

.userinfo-bottom {
  border-top: 1px solid #f1f1f1;
  display: flex;
  margin: 10px;
  padding: 40px 10px 0px 10px;
  justify-content: center;
}
.pet-avatar {
  float: right;
  margin-top: 20px;
  margin-right: 80px;
}
.el-form-item {
  display: flex;
  justify-content: left;
  align-items: left;
}
.el-form-item__content {
  width: 100%;
}
#file,
#fileHospital,
#fileTop {
  opacity: 0;
  width: 1px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  padding: 0px;
  width: 60px;
}
.input-new-tag {
  width: 80px;
  margin-left: 10px;
}
.pic-list {
  justify-content: center;
  display: flex;
  /* display: block ruby; */
  position: relative;
}

.pic-list:hover {
  opacity: 0.6;
}
.pic-list:hover .del-pic {
  opacity: 1;
}
.del-pic {
  position: absolute;
  top: 80px;
  left: 280px;
  font-size: 40px;
  opacity: 0;
  cursor: pointer;
}
.submit-item {
  margin-top: 20px;
  display: block;
}
</style>
