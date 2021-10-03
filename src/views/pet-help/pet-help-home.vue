<template>
  <div class="container animate__animated animate__fadeIn animate__faster">
    <breadcrumb></breadcrumb>
    <div class="content">
      <div class="select">
        <span class="total-help"
          >公益费用累计<span class="total-help-num">￥{{ totalMoney }}</span>
        </span>

        <div class="select-1">
          <span @click="timeSelect()">
            发布时间
            <i class="el-icon-arrow-down" :class="{ 'time-select': isSlect }"></i>
          </span>

          <el-input
            @keyup.enter.native="selectTrigger()"
            style="width:300px;margin-left:30px"
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

        <div class="select-1">
          <div class="select-left">
            <span>性别:</span>
          </div>
          <div class="select-right">
            <a
              href="javascript:"
              v-for="item in sex"
              :key="item.value"
              v-bind:class="{ stateActive: item.value === sexValue ? true : false }"
              @click="clickSex(item.value)"
              >{{ item.label }}
            </a>
          </div>
        </div>
        <div class="select-1">
          <div class="select-left">
            <span>种族:</span>
          </div>
          <div class="select-right">
            <a
              href="javascript:"
              v-for="item in race"
              :key="item.value"
              v-bind:class="{ stateActive: item.value === raceValue ? true : false }"
              @click="clickRace(item.value)"
              >{{ item.label }}
            </a>
          </div>
        </div>
        <div class="select-1">
          <div class="select-left">
            <span>状态:</span>
          </div>
          <div class="select-right">
            <a
              href="javascript:"
              v-for="item in stateList"
              :key="item.value"
              v-bind:class="{ stateActive: item.value === state ? true : false }"
              @click="clickState(item.value)"
              >{{ item.label }}
            </a>
          </div>
        </div>
      </div>
      <div id="card-loading" style="height:100px" v-show="helpList < 1"></div>
      <div class="card-content">
        <el-row :gutter="10" type="flex" justify="start" v-for="(petHelps, i) in pages" :key="i">
          <el-col :span="6" v-for="petHelp in petHelps" :key="petHelp.value">
            <el-card :key="petHelp.id" shadow="hover" :body-style="{ padding: '0px' }">
              <div class="card-status">{{ des(petHelp.state_value_hz, 0) }}</div>
              <div class="card-inside" @click="gotoInfo(petHelp.id)">
                <el-image
                  :src="petHelp.default_image_hz.image_hz"
                  fit="cover"
                  style="width:100%;height:150px;"
                ></el-image>
                <div class="pet-info">
                  <router-link :to="{ name: 'pet-help-info', params: { id: petHelp.id } }">
                    <span style="display:block;width:100%">{{ petHelp.name_hz }}</span>
                  </router-link>
                  <p>{{ des(petHelp.description_hz, 1) }}</p>
                </div>

                <div class="help-prograss">
                  <el-progress
                    :percentage="
                      petHelp.state_hz === 23
                        ? 100
                        : GetPercent(petHelp.already_amount, petHelp.amount_hz)
                    "
                    :text-inside="true"
                    color="#2abe5c"
                    class="progress"
                    :stroke-width="17"
                  ></el-progress>
                  <span>已筹集</span>
                  <strong v-if="petHelp.state_hz !== 23">￥{{ petHelp.already_amount }}</strong>
                  <div style="float:right;">
                    <span>目标金额</span>
                    <strong>￥{{ petHelp.amount_hz }}</strong>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div style="display:flex;justify-content: center; margin:15px;">
        <div class="pagination">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="size"
            layout="total, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { showLoading, endLoading } from '@/plugins/Loading.js'
import breadcrumb from '@/components/Breadcrumb.vue'
import axios from 'axios' // 引入axios
export default {
  components: { breadcrumb },
  computed: {
    pages() {
      const pages = []
      this.helpList.forEach((item, index) => {
        const page = Math.floor(index / 4)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  data() {
    return {
      page: 1,
      size: 30,
      isSlect: false,
      ordering: 'publish_time_hz',
      isTimeSlect: false,
      sex: [
        { value: '', label: '全部' },
        { value: 0, label: '公' },
        { value: 1, label: '母' }
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
      state: '',
      stateList: [
        { value: '', label: '全部' },
        { value: 1, label: '即将发布' }, //审核通过,待发布
        { value: 2, label: '众筹中' },
        { value: 23, label: '众筹成功' } //众筹成功,打款成功
      ],
      helpList: [],
      totalCount: 1,
      totalMoney: ''
    }
  },
  mounted() {
    showLoading('#card-loading')
  },
  created() {
    this.allPetHelp()
    axios.get(this.$URL + '/v1/petHelp/moneyCount').then(res => {
      this.totalMoney = res.data.count
    })
  },
  methods: {
    gotoInfo(id) {
      this.$router.push('/pet-help/pet-help-info/' + id)
    },
    des(des, s) {
      // 0是status,1是description
      const len = s === 0 ? 4 : 13
      let str = ''
      if (des.length > len) {
        s === 0 ? (str = des.slice(0, len)) : (str = des.slice(0, len) + '...')
      } else {
        str = des
      }
      return str
    },
    GetPercent(num, total) {
      num = parseFloat(num)
      total = parseFloat(total)
      if (isNaN(num) || isNaN(total)) {
        return '-'
      }
      return total <= 0 ? '0' : Math.round((num / total) * 10000) / 100.0
    },
    allPetHelp() {
      const data = {
        ordering: this.ordering,
        sex_hz: this.sexValue,
        race_hz: this.raceValue,
        search: this.searchValue,
        state_hz: this.state,
        page: this.page
      }
      this.$store.dispatch('petHelpInfo/acquireAllPetHelp', data).then(
        res => {
          const list = []
          console.log(res)

          for (const item of res.results) {
            if (
              item.state_hz === 2 ||
              item.state_hz === 1 ||
              item.state_hz === 20 ||
              item.state_hz === 21 ||
              item.state_hz === 22 ||
              item.state_hz === 23
            ) {
              list.push(item)
            }
          }
          this.helpList = list
          this.totalCount = list.length
          endLoading()
        },
        err => {
          console.log(err)
        }
      )
    },
    handleCurrentChange(val) {
      this.page = val
      this.allPetHelp()
    },
    timeSelect() {
      this.isSlect = !this.isSlect
      this.ordering = this.ordering === 'publish_time_hz' ? '-publish_time_hz' : 'publish_time_hz'
      this.allPetHelp()
    },
    selectTrigger() {
      this.allPetHelp()
    },
    clickSex(val) {
      this.sexValue = val
      this.allPetHelp()
    },
    clickRace(val) {
      this.raceValue = val
      this.allPetHelp()
    },
    clickState(val) {
      this.state = val
      this.allPetHelp()
    }
  }
}
</script>
<style scoped>
.card-inside:hover {
  cursor: pointer;
}
.card-status {
  position: absolute;
  height: 30px;
  width: 72px;
  top: 0;
  padding-bottom: 11px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  background: #2abe5c;
  z-index: 1;
  opacity: 0.85;
}
.pet-info,
.help-prograss {
  margin: 10px;
}
.pet-info span,
.pet-info p {
  font-size: 15px;
  color: #4d4d4d;
}
.pet-info span:hover {
  color: #2abe5c;
  text-decoration: underline;
}
.help-prograss span {
  font-size: 12px;
  color: #4d4d4d;
}
.help-prograss strong {
  font-size: 14px;
  color: #424242;
}
.time-select {
  transform: rotate(180deg);
  transition: transform 0.2s ease-out;
}
</style>
<style scoped>
* {
  text-align: left;
}
.container {
  width: 1200px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.select-1 {
  display: flex;
  padding: 10px 0px;
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.select-1 span {
  padding: 0px 15px;
  font-size: 16px;
  color: #4d4d4d;
}
.select-left span {
  height: 30px;
  line-height: 30px;
  display: block;
}
.total-help {
  float: right;
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 80px;
  margin-top: 20px;
  font-size: 18px;
  color: #4d4d4d;
}

.select-right {
  margin-left: 20px;
  align-self: center;
}

.select-right a {
  padding: 7px 20px;
  font-size: 14px;
  float: left;
  color: #4d4d4d;
  border: #f1f1f1 solid 1px;
  border-radius: 5px;
  margin: 0px 5px;
}
.select-right a:hover {
  color: green;
}
.stateActive {
  background: #2abe5c;
  color: #f1f1f1 !important;
}
.total-help-num {
  padding: 0px 10px;
  font-weight: 600;
  color: #f84d2c;
}
.card-content {
  margin: 20px;
}
</style>
<style>
.el-row {
  margin: 10px;
}
</style>
