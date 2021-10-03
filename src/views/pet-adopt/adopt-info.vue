<template>
  <div class="container">
    <div style="margin-left:20px;">
      <breadcrumb></breadcrumb>
    </div>
    <div class="content" v-show="isShow">
      <div class="content-top">
        <strong class="topic">{{ adoptInfo.title_hz }}</strong>
        <div class="under-topic" v-if="sponsorAdoptHopspital">
          <span class="under-topic-collect" @click="collect()" style="margin:0px 10px">
            <i v-show="!collectStats" class="el-icon-star-off"> {{ adoptInfo.collect_count }}</i>
            <i v-show="collectStats" class="el-icon-star-on"> <span>已收藏</span> </i>
          </span>
          <span style="margin:0px 10px">
            <svg
              style="margin-right:5px;"
              t="1600241514118"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="14118"
              width="16"
              height="16"
            >
              <path
                d="M288.01 489.07h447.98c17.672 0 31.998 14.327 31.998 32s-14.326 31.998-31.999 31.998H288.011c-17.673 0-32-14.326-32-31.998s14.327-32 32-32z m0-191.99h447.98c17.672 0 31.998 14.326 31.998 31.999s-14.326 31.999-31.999 31.999H288.011c-17.673 0-32-14.327-32-32s14.327-31.998 32-31.998z m16 573.116l184.699-143.655a63.998 63.998 0 0 1 39.29-13.48h351.983c17.672 0 31.999-14.327 31.999-32V169.087c0-17.672-14.327-31.999-32-31.999H144.018c-17.672 0-31.999 14.327-31.999 31.999v511.975c0 17.673 14.327 32 31.999 32h95.995c35.345 0 63.997 28.652 63.997 63.996v93.138zM528 777.058L317.478 940.796c-20.925 16.275-51.08 12.505-67.355-8.42a47.994 47.994 0 0 1-10.11-29.468v-125.85h-95.996c-53.016 0-95.995-42.98-95.995-95.996V169.087c0-53.016 42.979-95.995 95.995-95.995h735.965c53.016 0 95.995 42.979 95.995 95.995v511.975c0 53.017-42.979 95.996-95.995 95.996H527.999z"
                p-id="14119"
                fill="#515151"
              ></path>
            </svg>
            {{ adoptInfo.comment_count }}
          </span>
        </div>
        <div class="top-info">
          <div style="display: inherit;align-items: center;" @click="toUserPage()">
            <el-avatar :size="40" :src="user.head_hz"></el-avatar>
            <span style="margin-left:5px;">{{ user.nickname_hz }}</span>
          </div>
          <span class="adopt-create-time">
            <svg
              t="1600242832524"
              class="icon"
              viewBox="0 0 1123 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="14534"
              width="18"
              height="18"
            >
              <path
                d="M58.235871 98.568258C26.095484 98.568258 0 124.729806 0 157.068387v798.620903c0 32.206452 26.095484 58.500129 58.235871 58.500129h1006.625032c32.140387 0 58.235871-26.161548 58.235871-58.500129V157.068387a58.467097 58.467097 0 0 0-58.235871-58.500129h-212.859871l38.746839 38.978065V40.002065c0-21.537032-17.341935-38.978065-38.746839-38.978065-21.371871 0-38.713806 17.441032-38.713806 38.978065v136.456258h251.573677a19.257806 19.257806 0 0 1-19.224774-19.422968v798.620903c0-10.768516 8.654452-19.422968 19.224774-19.422968H58.235871c10.669419 0 19.224774 8.621419 19.224774 19.422968V157.068387a19.323871 19.323871 0 0 1-19.224774 19.422968h212.859871c21.371871 0 38.713806-17.441032 38.713806-38.978065 0-21.504-17.341935-38.978065-38.713806-38.978064H58.235871z m174.113032 38.978065c0 21.470968 17.341935 38.945032 38.746839 38.945032 21.371871 0 38.713806-17.441032 38.713806-38.978065V40.035097c0-21.537032-17.341935-38.978065-38.713806-38.978065-21.404903 0-38.746839 17.441032-38.746839 38.978065v97.478193zM1123.096774 332.304516v-38.978064H0v136.390193c0 21.504 17.341935 38.978065 38.713806 38.978065 21.404903 0 38.746839-17.474065 38.746839-38.978065V332.304516l-38.746839 38.978065h1045.669162l-38.746839-38.978065v97.412129c0 21.504 17.341935 38.978065 38.746839 38.978065 21.371871 0 38.713806-17.474065 38.713806-38.978065V332.304516z m-270.963613 253.159226c21.371871 0 38.713806-17.441032 38.713807-38.978065 0-21.470968-17.341935-38.945032-38.713807-38.945032H271.095742c-21.404903 0-38.746839 17.441032-38.746839 38.978065 0 21.504 17.341935 38.978065 38.746839 38.978064h581.037419z m-581.037419 116.934193c-21.404903 0-38.746839 17.408-38.746839 38.945033 0 21.504 17.341935 38.978065 38.746839 38.978064h387.402323c21.371871 0 38.713806-17.474065 38.713806-38.978064 0-21.537032-17.341935-38.978065-38.713806-38.978065H271.095742zM852.001032 176.458323l-38.713806-38.978065v78.022194c0 21.504 17.341935 38.978065 38.713806 38.978064 21.404903 0 38.746839-17.474065 38.746839-38.978064V98.535226H271.095742c-21.404903 0-38.746839 17.474065-38.746839 38.978064 0 21.537032 17.341935 38.978065 38.746839 38.978065h580.90529zM309.842581 137.51329c0-21.504-17.341935-38.978065-38.713807-38.978064-21.404903 0-38.746839 17.474065-38.746839 38.978064v78.022194c0 21.504 17.341935 38.978065 38.746839 38.978064 21.371871 0 38.713806-17.474065 38.713807-38.978064V137.51329z"
                p-id="14535"
                fill="#9d9d9d"
              ></path>
            </svg>
            发布于 {{ creatTime }}
          </span>
        </div>
      </div>
      <div class="content-major">
        <div class="pet-info">
          <p>宠物资料：</p>
          <div class="pet-info-card">
            <div class="pet-image">
              <el-carousel :interval="5000" arrow="always" indicator-position="none">
                <el-carousel-item v-for="item in pet.image_hz" :key="item.id">
                  <a :href="item.image_hz">
                    <el-image :src="item.image_hz" />
                  </a>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div style="float:right;">
              <div class="pet-info-item">
                <span>
                  <svg
                    t="1600238992483"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="11965"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M512 18.4832C239.445333 18.4832 18.4832 239.445333 18.4832 512 18.4832 784.554667 239.445333 1005.5168 512 1005.5168c272.554667 0 493.5168-220.945067 493.5168-493.5168C1005.5168 239.445333 784.554667 18.4832 512 18.4832zM512 974.216533C256.7168 974.216533 49.783467 767.2832 49.783467 512S256.7168 49.783467 512 49.783467 974.216533 256.7168 974.216533 512 767.2832 974.216533 512 974.216533z"
                      p-id="11966"
                      fill="#000"
                    ></path>
                    <path
                      d="M362.5472 583.8336c1.536 5.461333 2.628267 11.1104 2.628267 17.066667 0 34.952533-28.330667 63.2832-63.2832 63.2832-34.952533 0-63.2832-28.330667-63.2832-63.2832 0-19.694933 9.284267-36.9664 23.3984-48.571733 0.512 0.290133 0.9728 0.648533 1.4848 0.9216L263.492267 550.912l0-20.258133 0-2.3552c-0.512 0.273067-0.9728 0.631467-1.4848 0.9216-14.114133-11.588267-23.3984-28.859733-23.3984-48.571733 0-34.952533 28.330667-63.2832 63.2832-63.2832 34.952533 0 63.2832 28.330667 63.2832 63.2832 0 5.956267-1.092267 11.605333-2.628267 17.066667l20.002133 0c1.160533-5.512533 1.809067-11.2128 1.809067-17.066667 0-45.550933-36.932267-82.4832-82.4832-82.4832s-82.4832 36.932267-82.4832 82.4832c0 23.8592 10.257067 45.141333 26.5216 60.125867-16.247467 14.967467-26.5216 36.266667-26.5216 60.125867 0 45.550933 36.932267 82.4832 82.4832 82.4832s82.4832-36.932267 82.4832-82.4832c0-5.853867-0.648533-11.554133-1.809067-17.066667L362.5472 583.8336z"
                      p-id="11967"
                      fill="#000"
                    ></path>
                    <path
                      d="M647.253333 583.8336c-1.536 5.461333-2.628267 11.1104-2.628267 17.066667 0 34.952533 28.330667 63.2832 63.2832 63.2832 34.952533 0 63.2832-28.330667 63.2832-63.2832 0-19.694933-9.284267-36.9664-23.3984-48.571733-0.512 0.290133-0.9728 0.648533-1.4848 0.9216L746.308267 550.912l0-20.258133 0-2.3552c0.512 0.273067 0.9728 0.631467 1.4848 0.9216 14.114133-11.588267 23.3984-28.859733 23.3984-48.571733 0-34.952533-28.330667-63.2832-63.2832-63.2832-34.952533 0-63.2832 28.330667-63.2832 63.2832 0 5.956267 1.092267 11.605333 2.628267 17.066667l-20.002133 0c-1.160533-5.512533-1.809067-11.2128-1.809067-17.066667 0-45.550933 36.932267-82.4832 82.4832-82.4832s82.4832 36.932267 82.4832 82.4832c0 23.8592-10.257067 45.141333-26.5216 60.125867 16.247467 14.967467 26.5216 36.266667 26.5216 60.125867 0 45.550933-36.932267 82.4832-82.4832 82.4832-45.550933 0-82.4832-36.932267-82.4832-82.4832 0-5.853867 0.648533-11.554133 1.809067-17.066667L647.253333 583.8336z"
                      p-id="11968"
                      fill="#000"
                    ></path>
                    <path
                      d="M649.6768 503.415467 360.226133 503.415467 364.9024 485.034667 644.6592 485.034667Z"
                      p-id="11969"
                      fill="#000"
                    ></path>
                    <path
                      d="M646.6048 586.257067 363.195733 586.257067 358.144 567.876267 651.963733 567.876267Z"
                      p-id="11970"
                      fill="#000"
                    ></path>
                  </svg>
                  品种：
                </span>
                <span class="font-color">{{ pet.race_value_hz }}</span>
              </div>
              <div class="pet-info-item">
                <span>
                  <svg
                    t="1600239043553"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="5094"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M306.623 619.695c125.358-17.375 221.908-124.92 221.908-255.05 0-142.289-115.312-257.6-257.607-257.6-142.238-0.001-257.6 115.311-257.6 257.6 0 130.13 96.544 237.675 221.961 255.05V743.72H68.45v71.228h166.835v166.886h71.286V815.002h166.828v-71.23H306.623V619.695zM84.72 364.645c0-102.93 83.334-186.262 186.204-186.262 102.93 0 186.262 83.389 186.262 186.262 0 102.875-83.333 186.262-186.262 186.262-102.87 0-186.204-83.387-186.204-186.262z m0 0M504.103 757.32c0.05 142.295 115.42 257.605 257.768 257.548 142.29-0.058 257.543-115.422 257.49-257.71-0.057-130.138-96.66-237.617-222.018-254.993l-0.11-261.378 68.123 68.175 50.411-50.411-118.644-118.532-35.698-35.642-154.064 154.226 50.41 50.359 68.176-68.235 0.116 261.38c-125.475 17.486-222.019 125.078-221.96 255.212z m443.862-0.162c0.11 102.929-83.275 186.313-186.211 186.371-102.928 0.052-186.262-83.332-186.314-186.21 0-102.87 83.276-186.26 186.204-186.313 102.878-0.11 186.263 83.277 186.32 186.152z m0 0"
                      p-id="5095"
                      fill="#000"
                    ></path>
                  </svg>
                  性别：
                </span>
                <span class="font-color">{{ pet.sex_value_hz }}</span>
              </div>
              <div class="pet-info-item">
                <span>
                  <svg
                    t="1600239112690"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="6694"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M906.24 256L527.36 35.84c-10.24-5.12-15.36-5.12-25.6 0L117.76 256c-5.12 5.12-10.24 15.36-10.24 25.6V716.8c0 10.24 5.12 15.36 15.36 20.48l378.88 220.16c5.12 0 10.24 5.12 10.24 5.12 5.12 0 10.24 0 15.36-5.12l378.88-220.16c10.24-5.12 15.36-15.36 15.36-20.48V281.6c-5.12-10.24-10.24-20.48-15.36-25.6z m-40.96 450.56l-353.28 204.8-353.28-204.8v-409.6l353.28-204.8 353.28 204.8v409.6z"
                      p-id="6695"
                      fill="#000"
                    ></path>
                    <path
                      d="M317.44 389.12c-5.12 10.24 0 25.6 10.24 30.72L486.4 512v209.92c0 15.36 10.24 25.6 25.6 25.6s25.6-10.24 25.6-25.6v-204.8l163.84-92.16c10.24-5.12 15.36-20.48 10.24-35.84-5.12-10.24-20.48-15.36-35.84-10.24L512 471.04 353.28 378.88c-10.24-10.24-30.72-5.12-35.84 10.24z"
                      p-id="6696"
                      fill="#000"
                    ></path>
                  </svg>
                  特点：
                </span>
                <span class="font-color" v-for="(item, i) in pet.features_value_hz" :key="i">{{
                  item
                }}</span>
              </div>

              <div class="pet-info-item">
                <span>
                  <svg
                    t="1600239181674"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="12247"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M866.1 604.6c-58.6-58.6-136.5-90.9-219.4-90.9h-61.5V379.2c0-34.7-28.3-63-63-63h-23.7c-34.7 0-63 28.3-63 63v134.6h-54.8c-82.9 0-160.8 32.3-219.4 90.9-58.6 58.5-90.9 136.4-90.9 219.3v132.8h886.5V824c0-82.9-32.2-160.8-90.8-219.4zM481.9 379.2c0-9.1 7.4-16.5 16.5-16.5h23.7c9.1 0 16.5 7.4 16.5 16.5v134.6h-56.7V379.2z m405.3 507.9H140.1v-63c0-132.6 107.9-240.5 240.5-240.5h266.1c132.6 0 240.5 107.9 240.5 240.5v63zM503.8 289.2c37.6 0 58-15.7 68.6-28.9 14.1-17.6 19.3-42.1 14-65.5-2.1-9.2-8.1-25.9-36-64.9-14.5-20.2-28-36.8-28.5-37.5l-19.7-24.2L484.6 94c-0.5 0.8-13.2 19.6-26.5 40.8-25.4 40.7-29.9 53.8-31.1 61.9-1 6.8-4.7 42.1 18 68.3 9.6 11 27.6 24.2 58.8 24.2z m-30.9-85.5c2.2-7.6 16.4-31.7 32.4-56.8 17.8 24 33.5 48.3 35.7 58.1 1.7 7.5 1.3 18.3-5 26.2-6.1 7.6-16.9 11.5-32.2 11.5-16.5 0-21.9-6.2-23.6-8.2-7.2-8.3-8.3-22.7-7.3-30.8z"
                      p-id="12248"
                      fill="#000"
                    ></path>
                  </svg>
                  生日：
                </span>
                <span class="font-color">{{ pet.birth_hz }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="describe">
          <p>描述：</p>
          <p class="font-color" v-for="des in description_hz" :key="des">{{ des }}</p>
          <p>领养要求：</p>
          <span class="font-color" v-for="req in requirements_hz" :key="req">{{ req }}</span>
        </div>
      </div>
      <div
        class="content-bottom"
        v-show="adoptInfo.state_hz === 1 ? true : adoptInfo.state_hz === 2 ? true : false"
      >
        <el-button
          @click="adoptThisPet()"
          class="want-adopt"
          type="primary"
          v-if="sponsorAdoptHopspital"
          >{{ adoptStatus ? '取消领养' : '我想领养它' }}</el-button
        >
      </div>
    </div>
    <div class="loading" style="height:300px;" v-if="!isShow"></div>
    <Remark :model="'adopt'" :id="id"></Remark>
  </div>
</template>

<script>
import Remark from '@/components/Comment/Remark.vue'
import breadcrumb from '@/components/Breadcrumb.vue'
import { showLoading, endLoading } from '@/plugins/Loading.js'
export default {
  components: { breadcrumb, Remark },
  props: ['id'],
  computed: {
    sponsorAdoptHopspital() {
      return !(localStorage.getItem('role') === 'hospital')
    }
  },
  data() {
    return {
      pet: {},
      user: {},
      adoptInfo: {},
      collectStats: false,
      isShow: false,
      creatTime: '',
      adoptStatus: false,
      description_hz: [],
      requirements_hz: []
    }
  },

  mounted() {
    showLoading('.loading')
    this.getAdoptInfoById()
    this.checkIsCollect()
  },
  methods: {
    toUserPage() {
      console.log(this.user)
      this.$router.push({ name: 'personal-page', params: { id: this.user.id } })
    },
    getAdoptInfoById() {
      this.$store.dispatch('adoptPostList/getAdoptById', this.id).then(
        res => {
          console.log(res)
          this.adoptInfo = res

          this.description_hz = []
          this.requirements_hz = []
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

          this.pet = res.pet_hz
          this.user = res.user_hz
          this.isShow = true
          this.creatTime = res.create_time_hz.slice(0, 10)
          if (res.adopt_user_hz === null) {
            this.adoptStatus = false
          } else {
            this.adoptStatus = true
          }
          endLoading()
        },
        err => {
          console.log(err)
        }
      )
    },
    collect() {
      const cancel = this.collectStats
      this.$store
        .dispatch('collect/postCollect', {
          model: 'adopt',
          cancel,
          id: this.id
        })
        .then(
          res => {
            this.$message({
              message: res.data.detail,
              type: 'success'
            })
            this.checkIsCollect()
            this.collectStats === true
              ? this.adoptInfo.collect_count--
              : this.adoptInfo.collect_count++
          },
          err => {
            console.log(err)
          }
        )
    },
    checkIsCollect() {
      this.$store
        .dispatch('collect/checkIsCollect', {
          id: this.id,
          model: 'adopt'
        })
        .then(
          res => {
            this.collectStats = res.data.is_collect
          },
          err => {
            console.log(err)
          }
        )
    },
    adoptThisPet() {
      const is_pass = !this.adoptStatus
      console.log(is_pass)
      this.$store.dispatch('adoptOperation/userAdopt', { id: this.id, is_pass }).then(
        res => {
          console.log(res.data.code)
          if (res.data.code === 2001) {
            this.$message({
              message: '领养成功',
              type: 'success'
            })
          } else if (res.data.code === 2002) {
            this.$message({
              message: '取消' + res.data.detail,
              type: 'success'
            })
          } else {
            this.$message({
              message: '领养处于' + this.adoptInfo.state_value_hz + '状态，无法取消',
              type: 'warning'
            })
          }
          this.getAdoptInfoById()
        },
        err => console.log(err)
      )
    }
  }
}
</script>

<style scoped>
.under-topic > span {
  display: flex;
  align-items: center;
}
.under-topic-collect:hover {
  cursor: pointer;
}
span {
  font-size: 15px;
}
.container {
  width: 1100px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.post-adopt {
  background-color: #cfb7b7;
  float: right;
  color: #4d4d4d;
  opacity: 0.8;
}
.content {
  text-align: left;
  margin: 20px;
}
.content-top {
  margin: 20px 30px;
}
.topic {
  font-size: 24px;
  width: 100%;
  display: block;
  padding: 10px 0px;
  border-bottom: 1px solid #efefef;
  padding-left: 5px;
}
.top-info {
  margin: 20px 0px;
  align-items: center;
  display: flex;
  color: #4d4d4d;
}
.top-info:hover div {
  opacity: 0.8;
  cursor: pointer;
}
.adopt-create-time {
  margin-left: 30px;
  color: #999;
}
.under-topic {
  float: right;
  margin-top: 30px;
  display: flex;
}
.content-major,
.content-bottom {
  margin: 20px 30px;
}
.content-bottom {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.pet-info-item {
  margin-left: 20px;
  padding: 20px 10px;
  display: flex;
  justify-content: left;
  align-items: center;
}
.pet-info-item span {
  display: flex;
}
.pet-info-item > span > svg {
  margin-right: 5px;
}
.pet-info-card {
  display: flex;
}
.pet-image {
  width: 600px;
  height: 350px;
  border: 1px solid #efefef;
  border-radius: 10px;
  padding: 20px;
}
.describe {
  margin-top: 40px;
}
.pet-info {
  margin-left: 20px;
}
.font-color {
  color: #4d4d4d;
}
.want-adopt {
  width: 300px;
}
.to-right {
  color: #999;
  float: right;
  font-size: 15px;
  padding: 20px 30px;
  display: flex;
  align-items: center;
}
</style>
