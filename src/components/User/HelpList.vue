<template>
  <div class="card-content">
    <el-row :gutter="3" type="flex" justify="start" v-for="(petHelps, i) in pages" :key="i">
      <el-col :span="8" v-for="petHelp in petHelps" :key="petHelp.value">
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
</template>

<script>
// import { showLoading, endLoading } from '@/plugins/Loading.js'
export default {
  computed: {
    pages() {
      const pages = []
      this.helpList.forEach((item, index) => {
        console.log(item)
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
      helpList: []
    }
  },
  created() {
    this.allPetHelp()
  },
  mounted() {
    // showLoading('.card-content')
  },
  methods: {
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
    gotoInfo(id) {
      this.$router.push('/pet-help/pet-help-info/' + id)
    },
    allPetHelp() {
      const data = {
        ordering: '-publish_time_hz ',
        state_hz: 2,
        page: 1,
        size: 4
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

            // endLoading()
          }
          this.helpList = list
        },
        err => {
          console.log(err)
        }
      )
    }
  }
}
</script>

<style scoped>
.card-content {
  margin: 20px;
  text-align: left;
}
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
</style>
