<template>
  <div>
    <div class="profile-content">
      <h3 class="title">订单详情</h3>
      <div class="orderinfo">
        <div class="order-info-item">
          <span>
           <svg t="1600239879388" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13269" width="18" height="18"><path d="M511.8 950c-54.8 0-104.5-4.4-147.7-13.1-48.8-9.8-91-25.4-125.5-46.4-38.7-23.6-68.6-54.4-88.8-91.6-21.4-39.4-32.3-86.5-32.3-140 0-57 12.5-113.7 36.4-165.4-12.6-18.9-18.1-46.5-16.9-83.5 1.2-34.8 8.5-79.3 21.6-132.3 22-88.4 52.6-169.9 53.9-173.3l9.3-24.5 25.6 5.9c81.1 18.7 118.9 96.9 146.4 153.9 6.3 13.1 13.2 27.3 19.3 37.4 32.2-8.3 65.3-12.5 98.7-12.5 32.8 0 65.3 4.1 97 12.1 6.8-9.7 14.8-23.2 22.7-36.4 34.1-57.4 80.8-136 161.3-154.6l27-6.2 8.3 26.4c1.1 3.4 26.3 83.6 43.3 171.1 10.2 52.4 15.3 96.5 15.1 131.2-0.1 36.3-6.1 63.7-18.1 82.6 24.6 52.3 37.5 109.9 37.5 167.9 0 53.5-10.9 100.6-32.3 140-20.2 37.2-50.1 68.1-88.8 91.6-34.4 21-76.7 36.6-125.5 46.4-43 8.9-92.7 13.3-147.5 13.3zM258.6 154.1c-10.8 31.2-28.2 84.1-41.7 138.6-12.1 48.8-18.8 89-19.8 119.6-1.2 35.7 6 48.2 8.6 49.7l24.6 14.6-13.5 25.3c-25.7 48.1-39.2 102.4-39.2 157 0 83.6 30.2 142.6 92.3 180.4 55.3 33.7 136.7 50.7 242 50.7s186.7-17.1 242-50.7c62.1-37.8 92.3-96.8 92.3-180.4 0-55.3-13.8-110-39.9-158.4l-12.8-23.7 22.2-15.3c0.3-0.2 26.7-20.3-3-173-10.2-52.5-23.7-103.1-32.6-134-41.5 23.2-71.8 74.1-96.9 116.5-16.3 27.4-29.2 49.1-44.3 62.3l-12.6 11-16-4.9c-31.9-9.8-65-14.8-98.4-14.8-34.2 0-68.1 5.2-100.7 15.5l-16.1 5.1-12.8-11.2c-16.5-14.6-28.5-39.4-42.5-68.2-19.6-40.6-43.2-89.5-81.2-111.7z" p-id="13270" fill="#707070"></path></svg>
            宠物：
          </span>
          <div class="prior-user">
            <el-avatar style="margin:0;padding:0;" :src="pet.default_image_hz.image_hz"></el-avatar>
            <span>{{pet.name_hz}}</span>
            <router-link :to="{name:'宠物详情',params:{id:pet.id}}" class="verified">宠物详情</router-link>
          </div>
        </div>
        <div class="order-info-item">
          <span>
            <svg t="1600240115541" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13551" width="18" height="18"><path d="M847.36 819.665455a363.054545 363.054545 0 0 0-78.010182-115.665455 363.054545 363.054545 0 0 0-160.814545-93.696 299.52 299.52 0 0 0 115.991272-72.238545 298.589091 298.589091 0 0 0 88.017455-212.38691c0-80.197818-31.185455-155.694545-88.017455-212.386909A298.589091 298.589091 0 0 0 512.093091 25.227636c-80.151273 0-155.648 31.185455-212.386909 88.064a298.589091 298.589091 0 0 0-88.017455 212.386909c0 80.197818 31.185455 155.648 88.017455 212.38691a299.52 299.52 0 0 0 115.944727 72.238545 363.054545 363.054545 0 0 0-160.814545 93.696 363.054545 363.054545 0 0 0-106.589091 257.349818 39.237818 39.237818 0 1 0 78.568727 0c0-76.241455 29.696-147.921455 83.595636-201.821091a283.508364 283.508364 0 0 1 201.821091-83.549091c76.241455 0 147.921455 29.649455 201.821091 83.549091a283.508364 283.508364 0 0 1 83.549091 201.821091 39.237818 39.237818 0 1 0 78.522182 0 365.986909 365.986909 0 0 0-28.765091-141.730909zM290.117818 325.632c0-122.414545 99.607273-221.882182 221.882182-221.882182a222.161455 222.161455 0 0 1 221.882182 221.882182A222.068364 222.068364 0 0 1 512 547.560727a222.161455 222.161455 0 0 1-221.882182-221.882182z" p-id="13552" fill="#707070"></path></svg>
            前主人：
          </span>
          <div class="prior-user">
            <el-avatar style="margin:0;padding:0;" :src="priorUser.head_hz"></el-avatar>
            <span>{{priorUser.nickname_hz}}</span>
            <router-link
              :to="{name:'personal-page',params:{id:priorUser.id}}"
              class="verified"
            >ta的主页</router-link>
          </div>
        </div>
        <div class="order-info-item">
          <span>
            <svg t="1600240199086" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11325" width="16" height="16"><path d="M138.45723 847.876a26.84 26.84 0 0 1-20.83-9.843 508.778 508.778 0 0 1-42.567-59.69 27.057 27.057 0 0 1 46.229-28.132 446.709 446.709 0 0 0 38.102 53.405 27.16 27.16 0 0 1-3.548 38.09 28.179 28.179 0 0 1-17.386 6.17z m0 0" p-id="11326" fill="#707070"></path><path d="M512.14323 1023.989a508.87 508.87 0 0 1-295.204-93.545 27.04 27.04 0 0 1 31.19-44.18A455.533 455.533 0 0 0 512.20023 969.817c252.637 0 458.257-205.505 458.257-458.017S764.78023 53.863 512.14323 53.863 54.01223 259.483 54.01223 511.994a456.071 456.071 0 0 0 18.416 128.774 27.06 27.06 0 0 1-51.94 15.211A512.761 512.761 0 0 1 0.00023 511.994C0.00023 229.632 229.81623 0 512.25823 0s512.257 229.632 512.257 511.994-229.86 511.995-512.372 511.995z m0 0" p-id="11327" fill="#707070"></path><path d="M433.41023 557.948l16.344-6.615-28.397-28.374-9.008 22.227c-31.91-17.637-72.038-32.825-121.185-39.338 0 0-30.903 32.803-36.557 50.635 0 0 181.984 20.465 256.53 167.506v-91.92s-24.231-38.914-77.74-74.12z m0 0" p-id="11328" fill="#707070"></path><path d="M500.20623 714.89S377.97823 556.94 239.43023 587.203c0 0-15.406 39.384-14.273 57.228 0 0 162.184-38.915 275.049 70.402z m0 0" p-id="11329" fill="#707070"></path><path d="M205.30023 671.35s-4.808 43.883 1.212 61.612c0 0 152.856-83.323 296.372-3.742 0 0-166.155-126.027-297.585-57.87z m562.457-114.832c-5.723-17.844-36.626-50.636-36.626-50.636C576.82223 526.324 511.14823 632.07 511.14823 632.07v91.953c74.625-147.04 256.609-167.505 256.609-167.505z m0 0" p-id="11330" fill="#707070"></path><path d="M524.08123 714.89c112.876-109.363 275.06-70.402 275.06-70.402 1.144-17.9-14.284-57.228-14.284-57.228C646.36523 556.987 524.08023 714.947 524.08023 714.947z m0 0" p-id="11331" fill="#707070"></path><path d="M818.98723 671.35c-131.406-68.157-297.584 57.87-297.584 57.87 143.504-79.581 296.44 3.742 296.44 3.742 5.997-17.729 1.144-61.611 1.144-61.611z m-191.14-272.026l-54.355-54.332-120.488 120.442 54.367 54.332z m41.478-41.753c0.595-0.55 1.202-1.076 1.809-1.683a38.411 38.411 0 0 0-53.795-54.847l-0.114-0.103-34.886 34.932 54.366 54.32z m-171.58 171.683l-54.367-54.32-12.807 38.834 28.396 28.374z m0 0" p-id="11332" fill="#707070"></path></svg>
            领养标题：
          </span>
          <span>{{title_hz}}</span>
        </div>
        <div class="order-info-item">
          <span>
            <svg t="1600240307988" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12823" width="18" height="18"><path d="M128 320h768v64H128V320z m0 192h768v64H128V512z m0 192h768v64H128v-64z" p-id="12824" fill="#707070"></path></svg>
            贴子内容：
          </span>
        </div>
        <div class="posts-content">
          <span class="content-txt">领养描述：</span>
          <p v-for="des in description_hz" :key="des" class="content-txt">{{des}}</p>
          <span style="padding:15px 30px;" class="content-txt">领养要求：</span>
          <p v-for="req in requirements_hz" :key="req" class="content-txt">{{req}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pet: {},
      priorUser: {},
      title_hz: '',
      description_hz: [],
      requirements_hz: []
    }
  },
  props: ['id'],
  created() {
    this.getOrder()
  },
  methods: {
    getOrder() {
      this.$store.dispatch('order/getOrder', this.id).then(
        res => {
          console.log(res)
          this.pet = res.pet_hz
          this.priorUser = res.user_hz
          this.title_hz = res.title_hz
          let p = ''
          let r = ''

          for (const des of res.description_hz) {
            if (des !== '\n') {
              p += des
            } else if (des === '\n') {
              this.description_hz.push(p)
              p = ''
            }
          }

          for (const req of res.requirements_hz) {
            if (req !== '\n') {
              r += req
            } else {
              this.requirements_hz.push(r)
              r = ''
            }
          }
          if (!this.requirements_hz.length) {
            this.requirements_hz = [res.requirements_hz]
          }
          if (!this.description_hz.length) {
            this.description_hz.push(res.description_hz)
          }
        },
        err => {
          console.log(err)
          this.$message({
            message: err.data.detail,
            type: 'error'
          })
          this.$router.go(-1)
        }
      )
    }
  }
}
</script>

<style scoped>
.profile-content {
  padding: 10px;
}
.orderinfo {
  border-top: 1px solid #f1f1f1;
  margin: 10px;
  padding: 10px 10px 0px 10px;
}
.order-info-item span {
  padding: 0px 15px;
  font-size: 17px;
  color: #4d4d4d;
}
.order-info-item {
  padding: 15px;
  display: flex;
  justify-content: left;
}
.prior-user {
  display: flex;
  align-items: center;
}
.verified {
  padding: 5px;
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  background-color: #fff;
  margin-left: 30px;
  color: #000;
  opacity: 0.6;
}
.verified:hover {
  opacity: 1;
}
.posts-content {
  display: grid;
  justify-content: left;
}
.content-txt {
  padding: 15px 30px;
  text-align: left;
}
</style>