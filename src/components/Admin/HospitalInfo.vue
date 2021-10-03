<template>
  <div class="content">
    <el-scrollbar style="height:400px">
      <el-form v-model="hospitalInfo" label-width="100px">
        <el-form-item label="id">
          <span>{{ hospitalInfo.id }}</span>
        </el-form-item>
        <el-form-item label="头像">
          <el-avatar :src="hospitalInfo.head_hz"></el-avatar>
        </el-form-item>
        <el-form-item label="名称">
          <span>{{ hospitalInfo.hospital_name_hz }}</span>
        </el-form-item>
        <el-form-item label="联系电话">
          <span>{{ hospitalInfo.contact_phone_hz }}</span>
        </el-form-item>
        <el-form-item label="建立时间">
          <span>{{ hospitalInfo.build_time_hz }}</span>
        </el-form-item>
        <el-form-item label="营业时间">
          <span>{{ hospitalInfo.business_hours_hz }}</span>
        </el-form-item>
        <el-form-item label="注册时间">
          <span>{{ hospitalInfo.create_time_hz.slice(0, 10) }}</span>
        </el-form-item>

        <el-form-item label="邮箱">
          <span>{{ hospitalInfo.email }}</span>
        </el-form-item>
        <el-form-item label="真实姓名">
          <span>{{ hospitalInfo.real_name_hz }}</span>
        </el-form-item>
        <el-form-item label="状态">
          <span>{{ hospitalInfo.status_value_hz }}</span>
        </el-form-item>
        <el-form-item label="地区">
          <span> {{ hospitalInfo.area_hz.belong_city.belong_province.province }}</span>
          <span> {{ hospitalInfo.area_hz.belong_city.city }}</span>
          <span> {{ hospitalInfo.area_hz.area }}</span>
        </el-form-item>
        <el-form-item label="默认图片：">
          <span v-if="!hospitalInfo.default_image_hz">暂未上传</span>
          <el-image
            v-if="hospitalInfo.default_image_hz"
            style="width:300px;height:200px"
            :src="hospitalInfo.default_image_hz.image_hz"
            :preview-src-list="images"
          ></el-image>
        </el-form-item>
        <el-form-item label="营业执照">
          <span v-if="!hospitalInfo.business_license_hz">暂未上传</span>
          <el-image
            v-if="hospitalInfo.business_license_hz"
            style="width:300px;height:200px"
            :src="hospitalInfo.business_license_hz"
            :preview-src-list="[hospitalInfo.business_license_hz]"
          ></el-image>
        </el-form-item>
        <el-form-item label="许可证">
          <span v-if="!hospitalInfo.license_hz">暂未上传</span>
          <el-image
            v-if="hospitalInfo.license_hz"
            style="width:300px;height:200px"
            :src="hospitalInfo.license_hz"
            :preview-src-list="[hospitalInfo.license_hz]"
          ></el-image>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
// import { showLoading, endLoading } from '@/plugins/Loading.js'
export default {
  props: ['hospitalInfo'],
  computed: {
    images() {
      const imgs = []
      for (const img of this.hospitalInfo.images_hz) {
        imgs.push(img.image_hz)
      }

      return imgs
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
  watch: {}
}
</script>

<style scoped>
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
