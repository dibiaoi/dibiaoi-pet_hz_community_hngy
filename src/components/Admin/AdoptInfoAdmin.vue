<template>
  <div class="content">
    <el-scrollbar style="height:400px">
      <el-form v-model="adpotInfo" label-width="100px">
        <el-form-item label="领养id:">
          <span>{{ adpotInfo.id }}</span>
        </el-form-item>
        <el-form-item label="主人：">
          <div class="item-user">
            <el-avatar :src="adpotInfo.user_hz.head_hz"></el-avatar>
            <span>{{ adpotInfo.user_hz.nickname_hz }}</span>
          </div>
        </el-form-item>
        <el-form-item label="标题：">
          <span>{{ adpotInfo.title_hz }}</span>
        </el-form-item>
        <el-form-item label="描述：">
          <span>{{ adpotInfo.description_hz }}</span>
        </el-form-item>
        <el-form-item label="要求：">
          <span>{{ adpotInfo.requirements_hz }}</span>
        </el-form-item>
        <el-form-item label="默认图片：">
          <el-image
            :fit="cover"
            style="width:300px;height:200px"
            :src="adpotInfo.pet_hz.default_image_hz.image_hz"
          ></el-image>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
// import { showLoading, endLoading } from '@/plugins/Loading.js'
export default {
  props: ['adoptId'],
  data() {
    return {
      adpotInfo: ''
    }
  },
  created() {
    // showLoading()
    this.getAdoptById()
  },
  methods: {
    getAdoptById() {
      this.$store.dispatch('adoptPostList/getAdoptById', this.adoptId).then(
        res => {
          this.adpotInfo = res
          console.log(res)
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
