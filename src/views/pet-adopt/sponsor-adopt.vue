<template>
  <div class="container">
    <breadcrumb></breadcrumb>
    <div class="mention">请发布真实的领养信息，如果发现行骗行为，立即送当地公安机关！</div>
    <div class="content">
      <el-form :model="sponsorForm" ref="sponsorForm" :rules="rules">
        <el-form-item prop="petId" style=" display: flex;justify-content: left;">
          <div>
            <label style="margin-right: 10px">选择宠物：</label>
            <el-select v-model="sponsorForm.petId" placeholder="请选择宠物">
              <el-option
                style="display:flex;"
                v-for="item in petAllList"
                :key="item.id"
                :label="item.name_hz"
                :value="item.id"
              >
                <span style="display:flex; align-items: center;">
                  <el-avatar
                    style="margin-right:10px;"
                    :size="20"
                    :src="item.default_image_hz.image_hz"
                  ></el-avatar>
                  {{item.name_hz}}
                </span>
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item prop="title">
          <div>
            <label>标题:</label>
            <el-input
              maxlength="20"
              show-word-limit
              type="textarea"
              :autosize="{minRows: 1,maxRows:1}"
              v-model.trim="sponsorForm.title"
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
              onkeyup="this.value=this.value.replace(/[, ]/g,'')"
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
              onkeyup="this.value=this.value.replace(/[, ]/g,'')"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAdopt('sponsorForm')">发布</el-button>
          <el-button @click="resetForm('sponsorForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import breadcrumb from '@/components/Breadcrumb.vue'
export default {
  computed: {},
  data() {
    return {
      sponsorForm: {
        petId: '',
        title: '',
        description: '',
        requirements: ''
      },
      petAllList: [],
      rules: {
        petId: [{ required: true, message: '请选择宠物', trigger: 'blur' }],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 20, message: '标题在5-20字间' }
        ],
        description: [
          { required: true, message: '请输入内容且不少于10字', trigger: 'blur' },
          { min: 10, max: 500, message: '内容不少于10字' }
        ],
        requirements: [
          { required: true, message: '请输入内容且不少于10字', trigger: 'blur' },
          { min: 10, max: 500, message: '内容不少于10字' }
        ]
      }
    }
  },
  components: {
    breadcrumb
  },
  created() {
    this.$store.dispatch('PetList/getPetAll').then(
      res => {
        console.log(res)
        this.petAllList = res
      },
      err => {
        console.log(err)
      }
    )
  },
  methods: {
    submitAdopt(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = {
            title_hz: this.sponsorForm.title,
            description_hz: this.sponsorForm.description,
            requirements_hz: this.sponsorForm.requirements,
            pet_hz: this.sponsorForm.petId
          }
          this.$store.dispatch('createAdopt/createPetAdopt', data).then(
            res => {
              console.log(res)
              if (res.status === 201) {
                this.$message({
                  message: '发布成功，待管理员审核',
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.go(-1)
                }, 1500)
              } else if (res.status === 200) {
                this.$message({
                  message: '该宠物已经发布了领养了哦，请勿重复发布',
                  type: 'warning'
                })
              } else {
                this.$message({
                  message: '发布失败',
                  type: 'error'
                })
              }
            },
            err => {
              console.log(err)
              this.$message({
                message: '发布失败',
                type: 'error'
              })
            }
          )
        } else {
          this.$message({
            message: '格式错误',
            type: 'error'
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.el-textarea__inner {
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
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