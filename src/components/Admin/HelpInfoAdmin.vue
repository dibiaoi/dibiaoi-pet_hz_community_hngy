<template>
  <div class="content" v-if="helpInfo">
    <el-scrollbar style="height:400px">
      <el-form v-model="helpInfo" label-width="100px">
        <el-form-item label="众筹id:">
          <span>{{ helpInfo.id }}</span>
        </el-form-item>
        <el-form-item label="医院：">
          <div class="item-user">
            <el-avatar :src="helpInfo.hospital_hz.head_hz"></el-avatar>
            <span style="margin-left:10px;"> {{ helpInfo.hospital_hz.hospital_name_hz }}</span>
          </div>
        </el-form-item>
        <el-form-item label="宠物名称：">
          <span>{{ helpInfo.name_hz }}</span>
        </el-form-item>
        <el-form-item label="描述：">
          <span>{{ helpInfo.description_hz }}</span>
        </el-form-item>
        <el-form-item label="众筹金额：">
          <span>{{ helpInfo.amount_hz }}元</span>
        </el-form-item>
        <el-form-item label="已筹金额：">
          <span>{{ helpInfo.already_amount }}元</span>
        </el-form-item>

        <el-form-item label="默认图片：">
          <el-image
            style="width:300px;height:200px"
            :src="helpInfo.default_image_hz.image_hz"
          ></el-image>
        </el-form-item>
        <el-form-item label="住院证明：">
          <el-image
            style="width:300px;height:200px"
            :src="helpInfo.hospitalization_image_hz.image_hz"
          ></el-image>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
// import { showLoading, endLoading } from '@/plugins/Loading.js'
export default {
  props: ['helpId'],
  data() {
    return {
      helpInfo: ''
    }
  },
  created() {
    // showLoading()
    this.getHelpById()
  },
  methods: {
    getHelpById() {
      this.$store.dispatch('petHelpInfo/getPetHelpInfo', this.helpId).then(
        res => {
          this.helpInfo = res
          console.log(res)
          console.log('-------------')
        },
        err => {
          console.log(err)
        }
      )
    }
  },
  watch: {
    adoptId() {
      this.getAdoptById()
    }
  }
}
</script>

<style scoped>
.item-user {
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.el-form {
  margin: 20px;
}
.content {
  margin: 20px;
  height: 100%;
}
.el-form-item {
  border-bottom: 1px solid #efefef;
}
</style>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
