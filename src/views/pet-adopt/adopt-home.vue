<template>
  <div class="container animate__animated animate__fadeIn animate__faster">
    <div style="display:flex;">
      <div class="adopt-home-left">
        <breadcrumb></breadcrumb>
        <div class="adopt-select">
          <div class="tool-bar">
            <span @click="timeSelect()">
              时间
              <i class="el-icon-arrow-down" :class="{ timeselct: isTimeSlect }"></i>
            </span>
            <span>性别</span>
            <el-select
              size="small"
              style="width:100px"
              v-model="sexValue"
              @change="selectTrigger()"
            >
              <el-option
                v-for="item in sex"
                :label="item.label"
                :key="item.value"
                :value="item.value"
                style="width:150px"
              ></el-option>
            </el-select>
            <span>地区</span>
            <el-cascader
              size="small"
              clearable
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
            ></el-cascader>
            <span>|</span>
            <el-input
              @keyup.enter.native="selectTrigger()"
              size="small"
              style="width:200px"
              v-model="searchValue"
              placeholder="搜索"
            >
              <el-button
                slot="append"
                :span="10"
                icon="el-icon-search"
                @click="selectTrigger()"
              ></el-button>
            </el-input>
          </div>
          <div class="area">
            <a
              href="javascript:"
              v-for="item in areaList"
              v-bind:class="{ areaActive: item.id === area ? true : false }"
              @click="clickArea(item.id)"
              :key="item.id"
              >{{ item.area }}</a
            >
          </div>
        </div>
        <div id="adopt-loading" style="height:100px" v-show="adoptPosts < 1"></div>
        <div class="adopt-list">
          <ul>
            <li class="adopt-li" v-for="adopt in adoptPosts" :key="adopt.id">
              <div class="li-content">
                <el-image
                  style="width: 70px; height: 70px;padding:5px;"
                  fit="cover"
                  :src="adopt.pet_hz.default_image_hz.image_hz"
                ></el-image>

                <div class="top-right">
                  <div class="top-right-title">
                    <a @click="clickTopic(adopt.id)">
                      <span class="pet-adopt-title">{{ adopt.title_hz }}</span>
                    </a>
                  </div>
                  <div class="li-status-name">
                    <span>
                      <svg
                        t="1600239392782"
                        class="icon"
                        viewBox="0 0 1123 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="12529"
                        width="16"
                        height="16"
                      >
                        <path
                          d="M58.235871 98.568258C26.095484 98.568258 0 124.729806 0 157.068387v798.620903c0 32.206452 26.095484 58.500129 58.235871 58.500129h1006.625032c32.140387 0 58.235871-26.161548 58.235871-58.500129V157.068387a58.467097 58.467097 0 0 0-58.235871-58.500129h-212.859871l38.746839 38.978065V40.002065c0-21.537032-17.341935-38.978065-38.746839-38.978065-21.371871 0-38.713806 17.441032-38.713806 38.978065v136.456258h251.573677a19.257806 19.257806 0 0 1-19.224774-19.422968v798.620903c0-10.768516 8.654452-19.422968 19.224774-19.422968H58.235871c10.669419 0 19.224774 8.621419 19.224774 19.422968V157.068387a19.323871 19.323871 0 0 1-19.224774 19.422968h212.859871c21.371871 0 38.713806-17.441032 38.713806-38.978065 0-21.504-17.341935-38.978065-38.713806-38.978064H58.235871z m174.113032 38.978065c0 21.470968 17.341935 38.945032 38.746839 38.945032 21.371871 0 38.713806-17.441032 38.713806-38.978065V40.035097c0-21.537032-17.341935-38.978065-38.713806-38.978065-21.404903 0-38.746839 17.441032-38.746839 38.978065v97.478193zM1123.096774 332.304516v-38.978064H0v136.390193c0 21.504 17.341935 38.978065 38.713806 38.978065 21.404903 0 38.746839-17.474065 38.746839-38.978065V332.304516l-38.746839 38.978065h1045.669162l-38.746839-38.978065v97.412129c0 21.504 17.341935 38.978065 38.746839 38.978065 21.371871 0 38.713806-17.474065 38.713806-38.978065V332.304516z m-270.963613 253.159226c21.371871 0 38.713806-17.441032 38.713807-38.978065 0-21.470968-17.341935-38.945032-38.713807-38.945032H271.095742c-21.404903 0-38.746839 17.441032-38.746839 38.978065 0 21.504 17.341935 38.978065 38.746839 38.978064h581.037419z m-581.037419 116.934193c-21.404903 0-38.746839 17.408-38.746839 38.945033 0 21.504 17.341935 38.978065 38.746839 38.978064h387.402323c21.371871 0 38.713806-17.474065 38.713806-38.978064 0-21.537032-17.341935-38.978065-38.713806-38.978065H271.095742zM852.001032 176.458323l-38.713806-38.978065v78.022194c0 21.504 17.341935 38.978065 38.713806 38.978064 21.404903 0 38.746839-17.474065 38.746839-38.978064V98.535226H271.095742c-21.404903 0-38.746839 17.474065-38.746839 38.978064 0 21.537032 17.341935 38.978065 38.746839 38.978065h580.90529zM309.842581 137.51329c0-21.504-17.341935-38.978065-38.713807-38.978064-21.404903 0-38.746839 17.474065-38.746839 38.978064v78.022194c0 21.504 17.341935 38.978065 38.746839 38.978064 21.371871 0 38.713806-17.474065 38.713807-38.978064V137.51329z"
                          p-id="12530"
                          fill="#8a8a8a"
                        ></path>
                      </svg>
                      {{ adopt.create_time_hz.slice(0, 10) }}
                    </span>
                  </div>
                  <div class="li-status-name">
                    <span class="span-content">描述：{{ adopt.description_hz }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20]"
            :page-size="size"
            layout=" prev, pager, next, jumper"
            :total="adoptCount"
          ></el-pagination>
        </div>
      </div>
      <div style="height:100%;width:20%;">
        <div class="adopt-home-right">
          <router-link class="post-adopt" to="/pet-adopt/sponsor-adopt" v-if="sponsorAdoptHopspital"
            >发布领养</router-link
          >
          <ul class="race-select">
            <li
              class="race-item"
              v-for="item in race"
              :key="item.value"
              @click="cilckRace(item.value)"
              v-bind:class="{ active: item.value === raceValue }"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>

        <div class="adopt-home-right" style="height:200px;margin-top:10px;padding: 15px">
          广告位1
        </div>
        <div class="adopt-home-right" style="height:200px;margin-top:10px;padding: 15px">
          广告位2
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { showLoading, endLoading } from '@/plugins/Loading.js'
import { provinceAndCityData } from 'element-china-area-data'
import { getArea } from '@/request/api.js'
import breadcrumb from '@/components/Breadcrumb.vue'
export default {
  computed: {
    userInformation() {
      return this.$store.state.userInfo.userInformation
    },
    sponsorAdoptHopspital() {
      return !(localStorage.getItem('role') === 'hospital')
    }
  },
  data() {
    return {
      isTimeSlect: false,
      isRaceActive: false,
      adoptPosts: [],
      adoptCount: 0,
      sex: [
        { value: 0, label: '公' },
        { value: 1, label: '母' },
        { value: '', label: '不限' }
      ],
      sexValue: '',
      race: [
        { value: '', label: '全部' },
        { value: 0, label: '猫' },
        { value: 1, label: '狗' },
        { value: 2, label: '其他' }
      ],
      raceValue: '',
      searchValue: '',
      ordering: 'create_time_hz',
      page: 1,
      size: 10,
      options: provinceAndCityData,
      selectedOptions: [],
      areaList: [],
      area: ''
    }
  },
  mounted() {
    showLoading('#adopt-loading')
    if (this.userInformation !== null && this.userInformation.area_hz !== undefined) {
      const province = this.userInformation.area_hz.belong_city.belong_province.id.toString()
      const city = this.userInformation.area_hz.belong_city.id.toString()
      this.selectedOptions = [province, city]
    }

    this.getMyAdopt()
    this.getArea()
  },
  methods: {
    getMyAdopt() {
      const data = {
        page: this.page,
        size: this.size,
        ordering: this.ordering,
        sex_hz: this.sexValue,
        race_hz: this.raceValue,
        search: this.searchValue,
        city: this.selectedOptions[1],
        area: this.area,
        state_hz: 1
      }
      this.$store.dispatch('adoptPostList/getMyAdoptPosts', data).then(
        res => {
          console.log(res)
          this.adoptCount = res.count
          this.adoptPosts = res.results
          console.log(this.adoptPosts)
          endLoading()
        },
        err => {
          console.log(err)
        }
      )
    },
    handleChange(value) {
      console.log(value)
      this.getMyAdopt()
      this.getArea()
    },
    getArea() {
      getArea({ params: { city_id: this.selectedOptions[1] } }).then(res => {
        console.log(res.data)
        this.areaList = res.data
      })
    },
    selectTrigger() {
      this.getMyAdopt()
    },
    timeSelect() {
      this.isTimeSlect = !this.isTimeSlect
      this.ordering = this.ordering === 'create_time_hz' ? '-create_time_hz' : 'create_time_hz'
      this.getMyAdopt()
    },

    clickArea(area) {
      this.area = area
      this.getMyAdopt()
    },
    cilckRace(value) {
      this.raceValue = value
      this.getMyAdopt()
    },
    clickTopic(adoptId) {
      this.$router.push('/pet-adopt/adopt-info/' + adoptId)
    },
    handleSizeChange(val) {
      this.size = val
      this.getMyAdopt()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getMyAdopt()
    }
  },
  components: { breadcrumb }
}
</script>
<style scoped>
/* 右边的样式 */
.post-adopt {
  background-color: #cfb7b7;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4d4d4d;
  opacity: 0.8;
}
.post-adopt:hover {
  opacity: 1;
}
.pagination {
  margin: 10px 0px;
}
.pet-adopt-title:hover {
  color: #2abe5c;
  text-decoration: underline;
}
.race-select {
  padding-top: 20px;
}
.race-item {
  display: flex;
  opacity: 0.6;
  justify-content: center;
  padding: 10px;
}
.race-item:hover {
  border-left: 5px solid #2abe5c;
  opacity: 1;
  cursor: pointer;
}
.active {
  border-left: 5px solid #2abe5c;
  opacity: 1;
}

.span-content {
  overflow: hidden;
  font-size: 16px;
  opacity: 0.8;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 500px;
  display: block;
}
</style>
<style scoped>
.areaActive {
  color: #000;
  font-weight: bold;
}
.container {
  width: 1200px;
  height: 100%;
}
.adopt-home-left {
  height: 100%;
  width: 75%;
  margin: 0px 10px 0px 0px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.adopt-home-right {
  height: 300px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.tool-bar {
  width: 100%;
  padding: 10px 0px;
  display: flex;
  margin-left: 20px;
  text-align: center;
  align-items: center;
}
.adopt-list {
  border-top: 0.5px solid #e0e0e073;
}
.adopt-li {
  border-bottom: 0.5px solid #e0e0e073;
  padding: 10px 25px;
}
.li-content {
  display: flex;
  align-items: center;
}
.tool-bar span,
.pets-top-right span {
  padding: 0px 15px;
  font-size: 13px;
  color: #4d4d4d;
}
.area {
  padding: 0px 0px 0px 25px;
  height: 40px;
  margin-bottom: 10px;
}
.area a {
  padding: 5px 10px;
  font-size: 12px;
  float: left;
  color: #4d4d4d;
}
.area a:hover {
  color: green;
}
.top-right {
  margin: 10px 0px 0px 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}

.top-right-title {
  margin-bottom: 10px;
  font-size: 18px;
  color: #4d4d4d;
}
.top-right-title a {
  color: #4d4d4d;
  cursor: pointer;
}
.timeselct {
  transform: rotate(180deg);
}
.li-status-name {
  font-size: 14px;
  min-height: 25px;
  color: #999;
}
</style>
