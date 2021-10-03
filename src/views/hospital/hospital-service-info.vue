<template>
  <div class="hospital-service">
    <div class="title">
      <h3>
        服务详情
      </h3>
      <a class="iconfont back-icon" @click="back()" v-if="isEdit">
        &#xe632;
        <span style="font-size:15px; ">返回</span>
      </a>
    </div>

    <div class="userinfo-bottom" v-if="!isEdit">
      <el-form label-width="90px" style="width:500px">
        <div style="float:right; margin-top:10px;margin-right:30px">
          <span class="edit-info" @click="editService()">编辑</span>
          <span class="edit-info" @click="deleteService()">删除</span>
        </div>
        <el-form-item label="服务名称:" class="el-form-item">
          <span>{{ serviceInfo.service_name_hz }}</span>
        </el-form-item>
        <el-form-item label="服务介绍:" class="el-form-item">
          <p style="width:350px;text-align: left;">{{ serviceInfo.service_introduction_hz }}</p>
        </el-form-item>
        <el-form-item label="原价:" class="el-form-item">
          <span>{{ serviceInfo.original_price_hz }}</span>
        </el-form-item>
        <el-form-item label="现价:" class="el-form-item">
          <span>{{ serviceInfo.price_hz }}</span>
        </el-form-item>
        <el-form-item label="图片:" class="el-form-item">
          <el-image
            style="width:300px;height:200px"
            :src="serviceInfo.image_hz"
            :preview-src-list="[serviceInfo.image_hz]"
          ></el-image>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="isEdit" class="userinfo-bottom">
      <HospitalServiceEdit :type="'edit'" :serviceId="serviceId"></HospitalServiceEdit>
    </div>
  </div>
</template>

<script>
import HospitalServiceEdit from '@/components/Hospital/HospitalServiceEdit'
export default {
  props: ['serviceId'],
  components: {
    HospitalServiceEdit
  },
  data() {
    return {
      serviceInfo: '',
      isEdit: false
    }
  },
  created() {
    this.isEdit = false
    this.$store.dispatch('hospitalService/serviceInfo', this.serviceId).then(
      res => {
        console.log(res)
        this.serviceInfo = res
      },
      err => {
        console.log(err)
      }
    )
  },
  methods: {
    editService() {
      this.isEdit = true
    },
    back() {
      this.isEdit = false
    },
    deleteService() {
        this.$confirm('确定删除此服务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        this.$store.dispatch('hospitalService/deleteService', this.serviceId).then(
          res => {
            console.log(res)
          },
          err => {
            console.log(err)
            if (err.status === 204) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.$router.go(-1)
            }
          }
        )
      })
    }
  }
}
</script>

<style>
.is-edit {
  display: none;
}
.el-form-item__content {
  margin-left: 30px !important;
}
.el-textarea {
  width: 350px;
}
</style>
<style scoped>
.edit-info:hover {
  cursor: pointer;
}
.edit-info {
  padding: 7px;
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  background-color: #fff;
  color: #3183c7;
  margin-right: 15px;
}
.el-form-item {
  display: flex;
  justify-content: left;
  align-items: left;
}
.hospital-service {
  padding: 20px;
}

.userinfo-bottom {
  border-top: 1px solid #f1f1f1;
  display: flex;
  margin: 10px;
  padding: 40px 10px 0px 10px;
  justify-content: center;
}
.form-item-bottom {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.back-icon {
  float: left;
  top: -35px;
  position: relative;
}
.back-icon:hover {
  cursor: pointer;
}
</style>
