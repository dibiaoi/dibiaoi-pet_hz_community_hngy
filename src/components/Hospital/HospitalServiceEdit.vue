<template>
  <el-form
    :model="editServiceForm"
    ref="editServiceForm"
    :rules="rules"
    label-width="90px"
    style="width:500px"
  >
    <el-form-item label="服务名称:" class="el-form-item" prop="serviceName">
      <el-input required v-model="editServiceForm.serviceName"></el-input>
    </el-form-item>
    <el-form-item label="服务介绍:" class="el-form-item" prop="serviceIntroduce">
      <el-input
        required
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6 }"
        placeholder="请输入内容"
        v-model="editServiceForm.serviceIntroduce"
      ></el-input>
    </el-form-item>
    <el-form-item label="原价:" class="el-form-item" prop="orginalPrice">
      <el-input
        required
        onkeyup="value=value.replace(/[^\d]/g,'')"
        v-model="editServiceForm.orginalPrice"
      ></el-input>
    </el-form-item>
    <el-form-item label="现价:" class="el-form-item" prop="price">
      <el-input
        required
        onkeyup="value=value.replace(/[^\d]/g,'')"
        v-model="editServiceForm.price"
      ></el-input>
    </el-form-item>
    <el-form-item label="图片:" class="el-form-item">
      <el-button @click="uploadTrigger()" class="upload-pic"
        >上传图片
        <input
          id="file"
          v-show="false"
          name="file"
          type="file"
          text="上传"
          accept="image/png, image/gif, image/jpeg"
          @change="imageUpload"
        />
      </el-button>
    </el-form-item>
    <el-image :src="image" style="width:400px;height:250px;margin-top:20px"> </el-image>
    <el-form-item class="form-item-bottom">
      <el-button type="primary" @click="handleTrigger()" style="margin-right:20px;">提交</el-button>
      <el-button @click="resetForm('editServiceForm')">清空 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios' // 引入axios
const param = new FormData()
export default {
  props: ['type', 'serviceId'],
  computed: {
    hosptialInfo() {
      return this.$store.state.userInfo.hospitalInfo
    }
  },
  data() {
    return {
      editServiceForm: {
        serviceName: '',
        serviceIntroduce: '',
        orginalPrice: '',
        price: '',
        picture: ''
      },
      image: '',
      rules: {
        serviceName: [
          { required: true, message: '请输入服务名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度3~20字', trigger: 'blur' }
        ],
        serviceIntroduce: [
          { required: true, message: '请输入服务介绍', trigger: 'blur' },
          { min: 5, message: '长度不少于5字', trigger: 'blur' }
        ],
        orginalPrice: [{ required: true, message: '请输入原价', trigger: 'blur' }],
        price: [{ required: true, message: '请输入现价', trigger: 'blur' }]
      }
    }
  },
  methods: {
    uploadTrigger() {
      document.getElementById('file').click()
    },
    imageUpload(e) {
      const file = e.target.files[0]
      this.image = window.URL.createObjectURL(file)
      this.editServiceForm.picture = file
      param.append('image_hz', this.editServiceForm.picture)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.image = ''
      this.editServiceForm.picture = ''
    },
    handleTrigger() {
      const form = this.editServiceForm

      param.append('service_name_hz', form.serviceName)
      param.append('service_introduction_hz', form.serviceIntroduce)
      param.append('original_price_hz', form.orginalPrice)
      param.append('price_hz', form.price)
      console.log(form.picture)
      if (form.picture !== undefined) {
        const headers = {
          headers: {
            'content-type': 'multipart/form-data',
            token: this.$store.state.userInfo.userToken
          }
        }
        if (this.type === 'create') {
          this.postService(headers)
        } else {
          this.editService(headers)
        }
      } else {
        this.$message({ message: '请上传此服务图片', type: 'warning' })
      }
    },
    postService(headers) {
      axios.post(this.$URL + '/v1/hospital/service/create', param, headers).then(
        res => {
          console.log(res.data)
          this.$message({ message: '创建成功！', type: 'success' })
          this.$router.push('/hospital-center/hospital-services')
        },
        err => {
          if (this.hosptialInfo.status_hz === 0) {
            this.$message({ message: '医院审核暂未通过，请通过后再编辑哦', type: 'error' })
          }
          console.log(err)
        }
      )
    },
    editService(headers) {
      axios.patch(this.$URL + '/v1/hospital/service/update/' + this.serviceId, param, headers).then(
        res => {
          console.log(res.data)
          this.$message({ message: '修改成功！', type: 'success' })
          this.$router.push('/hospital-center/hospital-services')
        },
        err => {
          if (this.hosptialInfo.status_hz === 0) {
            this.$message({ message: '医院审核暂未通过，请通过后再编辑哦', type: 'error' })
          }
          console.log(err)
        }
      )
    }
  },
  mounted() {
    if (this.type === 'edit') {
      const form = this.editServiceForm
      this.$store.dispatch('hospitalService/serviceInfo', this.serviceId).then(
        res => {
          console.log(res)
          form.serviceName = res.service_name_hz
          form.serviceIntroduce = res.service_introduction_hz
          form.orginalPrice = res.original_price_hz
          form.price = res.price_hz
          this.image = res.image_hz
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
  margin-left: 50px !important;
}
.el-textarea {
  width: 350px;
}
</style>
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
</style>
