<template>
  <div class="silder">
    <el-carousel :interval="5000" arrow="never" height="270px">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <router-link :to="item.url">
          <el-image :src="item.image"></el-image>
        </router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Silder',
  data() {
    return {
      imgList: []
    }
  },
  created() {
    const vm = this
    const list = [
      {
        id: 0,
        image: vm.$URL + '/statics/shuffling/img1.jpg',
        url: 'pet-adopt/adopt-home'
      },
      {
        id: 1,
        image: vm.$URL + '/statics/shuffling/img2.jpg',
        url: 'pet-adopt/adopt-home'
      },
      {
        id: 2,
        image: vm.$URL + '/statics/shuffling/img3.jpg',
        url: 'pet-help/pet-help-home'
      },
      {
        id: 3,
        image: vm.$URL + '/statics/shuffling/img4.jpg',
        url: 'pet-help/pet-help-home'
      }
    ]
    vm.imgList = list
  }
}
</script>

<style scoped>
.silder {
  width: 1100px;
}
</style>
