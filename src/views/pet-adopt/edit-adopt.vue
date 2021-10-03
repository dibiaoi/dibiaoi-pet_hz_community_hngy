<template>
  <div class="container">
    <breadcrumb></breadcrumb>
    <div class="mention">请发布真实的领养信息，如果发现行骗行为，立即送当地公安机关！</div>
    <div class="content">
      <el-form :model="sponsorForm" ref="sponsorForm" :rules="rules">
        <el-form-item prop="petId" style=" display: flex;justify-content: left;"></el-form-item>
        <el-form-item prop="title">
          <div>
            <label>标题:</label>
            <el-input
              maxlength="20"
              show-word-limit
              type="textarea"
              :autosize="{minRows: 1,maxRows:1}"
              v-model="sponsorForm.title"
            />
          </div>
        </el-form-item>
        <el-form-item prop="description">
          <div>
            <label>内容描述：</label>
            <el-input
              maxlength="500"
              show-word-limit
              type="textarea"
              :autosize="{minRows: 6,maxRows:12}"
              v-model="sponsorForm.description"
            />
          </div>
        </el-form-item>
        <el-form-item prop="requirements">
          <div>
            <label>领养要求：</label>
            <el-input
              maxlength="500"
              show-word-limit
              type="textarea"
              :autosize="{minRows: 6,maxRows:12}"
              v-model="sponsorForm.requirements"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEdit('sponsorForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import breadcrumb from '@/components/Breadcrumb.vue'
export default {
  props: ['id'],
  data() {
    return {
      sponsorForm: {
        title: '',
        description: '',
        requirements: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 20, message: '标题在5-20字间' }
        ],
        description: [
          { required: true, message: '请输入内容且不少于30字', trigger: 'blur' },
          { min: 30, max: 500, message: '内容不少于30字' }
        ],
        requirements: [
          { required: true, message: '请输入内容且不少于30字', trigger: 'blur' },
          { min: 30, max: 500, message: '内容不少于30字' }
        ]
      }
    }
  },
  components: {
    breadcrumb
  },
  created() {
    this.$store.dispatch('adoptPostList/getAdoptById', this.id).then(
      res => {
        console.log(res)
        this.sponsorForm.title = res.title_hz

        this.sponsorForm.description = res.description_hz
        this.sponsorForm.requirements = res.requirements_hz
      },
      err => {
        console.log(err)
      }
    )
  },
  methods: {
    submitEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = {
            title_hz: this.sponsorForm.title,
            description_hz: this.sponsorForm.description,
            requirements_hz: this.sponsorForm.requirements,
            id: this.id
          }
          this.patchEditAdopt(data)
        } else {
          this.$message({
            message: '格式错误',
            type: 'error'
          })
        }
      })
    },
    patchEditAdopt(data) {
      this.$store.dispatch('adoptOperation/editAdopt', data).then(
        res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.$router.push('/user-center/my-adopts-posts')
          } else {
            this.$message({
              message: res.data.detail,
              type: 'error'
            })
            this.$router.go(-1)
          }
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
.container {
  width: 1100px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.mention {
  color: #8a6d3b;
  background-color: #fcf8e3;
  border: 1px solid #faebcc;
  padding: 15px;
  margin-bottom: 20px;
  /* text-align: left; */
}
.content {
  margin: 20px;
  display: flex;
  justify-content: center;
}
.el-form {
  width: 800px;
}
.el-form-item__content {
  width: 100%;
}

label {
  text-align: center;
  vertical-align: middle;
  float: left;
  font-size: 18px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
}
</style>