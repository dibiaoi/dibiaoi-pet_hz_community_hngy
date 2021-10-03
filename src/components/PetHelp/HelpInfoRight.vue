<template>
  <div>
    <div class="border-style hospital-area">
      <el-avatar :size="80" :src="petHelp.hospital_hz.head_hz"></el-avatar>

      <div class="hospital-area-1">
        <span class="hosiptal-tit">{{ petHelp.hospital_hz.hospital_name_hz }}</span
        ><span class="verfied">已认证</span>
        <p class="hospital-area-1-tip">发起了这个项目</p>
        <p>
          <svg
            t="1600239688744"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9814"
            width="16"
            height="16"
          >
            <path
              d="M511.630013 1023.598015c-264.052459 0-475.242828-59.039867-475.242828-156.39135 0-62.621737 77.5012-104.224234 202.416686-130.325291 19.485296-5.227811 38.823597 6.872752 40.358542 25.955063a33.266798 33.266798 0 0 1-26.430045 41.748491c-91.538692 19.229305-146.082722 48.767238-146.082722 62.621737 0 3.436876 5.300808 8.663687 21.167236 19.083311 19.302303 12.209559 47.451285 24.309122 84.446948 34.728745 77.464201 22.519186 186.696254 34.765744 301.047123 34.765744 114.459864 0 221.864983-12.246557 301.084121-34.765744 36.848669-10.419624 65.070649-22.519186 84.40995-34.728745 14.037493-10.419624 19.339301-15.646435 19.339301-19.083311 0-15.646435-59.77184-46.975303-160.120215-66.057613a33.961773 33.961773 0 0 1-28.112984-39.958556 34.363758 34.363758 0 0 1 40.505537-27.745997c133.689169 25.956062 216.454179 69.495489 216.454179 133.762166 0 97.351482-211.190369 156.391349-475.241829 156.39135z m83.31299-193.313016c-17.43837 15.682433-33.011807 28.148983-46.574317 37.068661-18.424334 12.209559-32.462827 17.656362-45.513356 17.656362-12.867535 0-26.942027-5.446803-45.476356-17.657362a410.97515 410.97515 0 0 1-46.574318-37.06866c-36.373686-32.681819-76.075251-75.453274-111.900956-120.637642-55.822983-70.372457-149.591595-206.693532-149.591595-328.100144 0-103.566258 33.778779-198.906813 95.048566-268.365304A328.392134 328.392134 0 0 1 356.517618 30.305905C401.3 10.199631 450.506222 0 502.85533 0s101.628328 10.199631 146.337713 30.305905a329.05011 329.05011 0 0 1 112.193946 82.875005c61.342784 69.45849 95.011567 164.799045 95.011567 268.365304 0 121.405613-93.732613 257.617692-149.554596 328.100144-35.862704 45.184367-75.56327 88.065818-111.900957 120.637642z m-92.086673-766.748295c-170.21085 0-289.20355 130.691278-289.20355 317.899514 0 72.164392 46.829308 174.08471 128.571354 279.479901 32.206836 41.491501 68.470526 81.814044 102.213307 113.362904 31.072877 29.025951 50.192186 41.638495 58.271895 45.842344 8.151705-4.203848 27.235016-16.816392 58.307893-45.842344a995.522029 995.522029 0 0 0 102.250305-113.363904c81.742046-105.394192 128.535356-207.314509 128.535356-279.478901 0.254991-187.208236-118.627714-317.899513-288.94756-317.899514z m0 455.463543a172.475768 172.475768 0 0 1-121.845597-49.753202 168.052928 168.052928 0 0 1-50.412178-120.272654c0-45.440358 17.949351-88.176814 50.412178-120.235656a172.329773 172.329773 0 0 1 121.845597-49.791201c46.061336 0 89.344772 17.693361 121.843598 49.790201a167.796937 167.796937 0 0 1 50.412178 120.235656c0 45.441358-17.912353 88.212813-50.412178 120.273654a172.183779 172.183779 0 0 1-121.844598 49.754202z m0-276.553007c-59.442852 0-107.771106 47.743275-107.771106 106.417155s48.328254 106.381156 107.770106 106.381156 107.806105-47.707276 107.806105-106.381156-48.218258-106.417155-107.806105-106.417155z"
              p-id="9815"
              fill="#707070"
            ></path>
          </svg>

          {{ petHelp.hospital_hz.area_hz.belong_city.belong_province.province }}
          {{ petHelp.hospital_hz.area_hz.belong_city.city }}
          {{ petHelp.hospital_hz.area_hz.area }}
        </p>
        <p>
          <svg
            t="1600239775309"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="12945"
            width="16"
            height="16"
          >
            <path
              d="M418.45 367.881c30.34-30.34 32.869-78.38 5.056-111.249l-85.965-108.72c-27.813-36.663-80.909-41.72-116.306-13.907-2.529 2.528-5.057 2.528-5.057 5.057l-75.852 75.852c-72.06 72.059 30.34 266.745 217.442 453.846 185.837 185.838 376.73 285.71 450.054 216.178l74.588-74.587c32.869-32.87 32.869-85.966 0-116.307l-5.057-5.056-108.72-85.966c-32.87-27.812-80.91-25.284-111.25 5.057l-46.776 46.775c-50.567-30.34-94.814-64.474-134.005-102.4-39.19-39.19-72.059-83.437-102.4-134.005l44.247-50.568z m-39.19-74.587c8.849 11.378 8.849 27.812-2.53 36.662l-60.68 64.474c-8.85 8.849-11.378 22.755-5.057 32.869C343.862 487.98 385.58 542.34 433.62 591.644c48.04 48.04 103.664 89.758 164.345 122.628 11.378 5.056 24.02 2.528 32.87-5.057l64.474-64.474c11.377-11.378 25.284-11.378 36.661-2.529l108.721 88.494s2.529 0 2.529 2.529c11.378 10.113 11.378 27.812 1.264 37.925 0 0 0 1.265-1.264 1.265l-77.116 74.587c-36.662 36.662-208.593-55.624-372.939-217.442-164.345-161.817-252.84-336.276-217.442-372.938l78.38-78.38c11.378-8.85 30.341-8.85 39.19 5.057l85.966 109.985z"
              p-id="12946"
              fill="#707070"
            ></path>
          </svg>
          {{ petHelp.hospital_hz.contact_phone_hz }}
        </p>
      </div>
    </div>
    <div class="border-style help-area">
      <div class="area-status">{{ des(petHelp.state_value_hz) }}</div>
      <div class="help-area-avatar">
        <el-avatar :size="30" :src="petHelp.user_hz.head_hz"></el-avatar>
        <span style="padding:10px">{{ petHelp.user_hz.nickname_hz }}</span>
      </div>

      <div class="help-area-goal">
        <h3 style="  color: #2abe5c;">
          已筹<span class="already-amount">¥{{ petHelp.already_amount }}</span>
        </h3>

        <p class="progress">
          <el-progress
            :percentage="GetPercent(petHelp.already_amount, petHelp.amount_hz)"
            :text-inside="true"
            color="#2abe5c"
            class="progress"
            :stroke-width="20"
          ></el-progress>
        </p>

        <p class="">
          <span>
            目标金额
            <span class="goal-money">￥{{ petHelp.amount_hz }}</span>
          </span>
          <span style="float:right;">
            <span>{{ handleDays(petHelp.publish_time_hz) }}</span>
          </span>
        </p>
      </div>
      <div class="help-area-txt">
        已有<strong>{{ supportCount }}</strong
        >人帮助了此宝贝
      </div>

      <div class="help-area-support" v-if="role !== 'hospital'">
        <a href="javascript:;" class="support-btn" @click="support()">立即帮助</a>
      </div>
      <div class="help-area-share"></div>
    </div>
    <div class="border-style support-user-area">
      <div class="scroll-div">
        <ul id="scroll-list">
          <li v-for="(sUser, i) in supportUserList" :key="i" v-bind:class="{ anim: animate }">
            用户 <span style="color:#2abe5c">{{ sUser.user_hz.nickname_hz }}</span>
            捐助了
            <span style="color:#f18d00"> {{ sUser.donation_hz }} </span>元
          </li>
        </ul>
      </div>
    </div>
    <div class="border-style hospital-evidence-area">
      <h5 class="help-detail-tit" style="line-height:50px;">住院证明</h5>
      <el-image :src="petHelp.hospitalization_image_hz.image_hz"></el-image>
    </div>
    <el-dialog title="捐助宝贝" :visible.sync="supportDialog" center width="40%">
      <div class="choose-money">
        <el-radio v-model="supportMoney" :label="100">100元</el-radio>
        <el-radio v-model="supportMoney" :label="1000">1000元</el-radio>
        <el-input size="small" style="width:100px;" v-model.number="supportMoney"></el-input>元
      </div>

      <p style="text-align:center;">
        <el-button type="primary" @click="payPsdDialog()">捐助￥{{ supportMoney }}</el-button>
      </p>
    </el-dialog>
    <el-dialog title="支付" :visible.sync="payDialog" center width="40%">
      <div class="pay-dialog">
        <PayInputBox :id="1" ref="PayInputBox"></PayInputBox>
      </div>

      <p style="text-align:center; margin-top:30px">
        <el-button type="primary" @click="postSupportMoney()"
          >确定支付￥{{ supportMoney }}</el-button
        >
      </p>
      <router-link class="forget-psd" to="/user-center/change-pay-psd">忘记密码？</router-link>
    </el-dialog>
  </div>
</template>

<script>
import PayInputBox from '@/components/PayInputBox.vue'
export default {
  components: {
    PayInputBox
  },
  computed: {
    role() {
      return localStorage.getItem('role')
    },
    petHelp() {
      return this.$store.state.petHelpInfo.helpInfo
    }
  },
  data() {
    return {
      animate: false,
      timer: null,
      supportCount: 0,
      supportUserList: [],
      supportMoney: '',
      payPsd: '000000',
      supportDialog: false,
      payDialog: false
    }
  },
  mounted() {
    this.timer = setInterval(this.scrollAnimate, 2000)
    this.getSupportUserList()
  },
  methods: {
    support() {
      this.supportDialog = true
    },
    postSupportMoney() {
      this.payPsd = localStorage.getItem('getPsd')
      console.log(this.payPsd)
      console.log(this.payPsd.length)
      if (this.payPsd.length < 6) {
        this.$message({ message: '请输入6位支付密码', type: 'warning' })
      } else {
        const data = {
          pet_help_id: this.petHelp.id,
          donation_hz: this.supportMoney,
          pay_password: this.payPsd
        }
        this.$store.dispatch('petHelpUserHelper/userDonatePetHelp', data).then(
          res => {
            console.log(res)
            if (res.status === 201) {
              this.$message({ message: '支付成功', type: 'success' })
              this.$refs.PayInputBox.pwdList = []
              this.$store.dispatch('petHelpInfo/getPetHelpInfo', this.petHelp.id)
              this.supportDialog = false
              this.payDialog = false
            } else if (res.status === 200) {
              this.$message({ message: res.data.detail, type: 'warning' })
            }
          },
          err => {
            console.log(err)
            this.$message({ message: '支付失败,请检查', type: 'error' })
          }
        )
      }
    },
    payPsdDialog() {
      if (this.supportMoney) {
        this.payDialog = true
      } else {
        this.$message({ message: '请输入捐助金额哦', type: 'warning' })
      }
    },
    getSupportUserList() {
      const query = {
        pet_help_hz: this.petHelp.id
      }
      this.$store.dispatch('petHelpUserHelper/supportUserList', query).then(
        res => {
          this.supportUserList = res.results
          this.supportCount = res.count
        },
        err => {
          console.log(err)
        }
      )
    },
    scrollAnimate() {
      this.animate = true
      setTimeout(() => {
        this.supportUserList.push(this.supportUserList[0])
        this.supportUserList.shift()
        this.animate = false
      }, 1000)
    },
    handleDays(publishTime) {
      const bDate = new Date()
      const publishDate = publishTime.slice(0, 10)
      const nowDate = bDate.getFullYear() + '-' + (bDate.getMonth() + 1) + '-' + bDate.getDate()
      const restDays = this.getDays(publishDate, nowDate) - this.petHelp.day_hz
      if (restDays < 0) {
        return '剩余  ' + Math.abs(restDays) + '  天'
      } else {
        return '超过  ' + Math.abs(restDays) + '  天'
      }
    },
    getDays(date1, date2) {
      var date1Str = date1.split('-')
      //将日期字符串分隔为数组,数组元素分别为年.月.日
      //根据年 . 月 . 日的值创建Date对象
      const date1Obj = new Date(date1Str[0], date1Str[1] - 1, date1Str[2])
      const date2Str = date2.split('-')
      const date2Obj = new Date(date2Str[0], date2Str[1] - 1, date2Str[2])
      const t1 = date1Obj.getTime()
      const t2 = date2Obj.getTime()
      const dateTime = 1000 * 60 * 60 * 24
      //每一天的毫秒数
      const minusDays = Math.floor((t2 - t1) / dateTime)
      //计算出两个日期的天数差
      const days = minusDays
      //取绝对值
      return days
    },
    des(des) {
      const len = 4
      let str = ''
      if (des.length > len) {
        str = des.slice(0, len)
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
    collectHelp() {
      // 众筹收藏
    }
  },
  watch: {
    supportMoney(val) {
      if (val < 1) {
        this.supportMoney = 1
      } else if (/^[0-9]*$/.test(val)) {
        val--
      }
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>
<style>
.pay-dialog {
  display: flex;
  justify-content: center;
}
</style>
<style scoped>
.forget-psd {
  color: #2abe5c;
  float: right;
}
/* 支持用户list样式 */
.scroll-div {
  height: 20px;
  border-radius: 20px;
  margin: 0;
  overflow: hidden;
}
#scroll-list li {
  width: 100%;
  height: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0 20px;
  list-style: 40px;
  text-align: center;
  color: #4d4d4d;
  font-size: 20px;
  font-weight: 400;
}
.anim {
  -webkit-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  transform: translateY(-20px);
}
</style>
<style scoped>
.choose-money {
  display: flex;
  justify-content: center;
  align-items: center;
}
.hospital-evidence-area {
  padding: 0 20px 20px 20px;
}
.hospital-area-1-tip {
  margin: 5px 0;
  font-size: 14px;
  line-height: 14px;
  color: #999 !important;
}
.hospital-area-1 {
  padding: 0px 10px;
}
.hospital-area-1 p {
  color: #4d4d4d;
  margin: 10px 0;
}
.hosiptal-tit {
  font-size: 24px;
  height: 30px;
  line-height: 30px;
  font-weight: 600;
  color: #4d4d4d;
  cursor: pointer;
}
.verfied {
  padding: 2px 5px;
  margin-left: 10px;
  font-size: 14px;
  color: #fff;
  background: #31cc65;
  border-radius: 3px;
}
.help-area-share {
  height: 30px;
}
.hospital-area {
  height: 150px;
  display: flex;
  align-items: center;
  padding: 20px 30px;
}
.support-user-area {
  margin-top: 10px;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 20px 30px;
}
.help-area {
  margin-top: 10px;
  padding-top: 30px;
  padding: 20px 30px;
  overflow: hidden;
  position: relative;
  color: #4d4d4d;
}
.area-status {
  position: absolute;
  height: 40px;
  width: 100px;
  right: 60px;
  top: 0;
  padding-bottom: 11px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  background: #2abe5c;
  opacity: 0.85;
}
.help-area-goal p {
  height: 16px;
  font-size: 16px;
  line-height: 16px;
  margin-top: 18px;
}
.help-area-avatar {
  display: flex;
  align-items: center;
  margin-top: 40px;
}
.already-amount {
  font-size: 30px;
  padding: 0px 15px;
}
.goal-money {
  font-weight: 600;
  font-size: 16px;
}
.help-area-txt {
  font-size: 14px;
  padding: 5px 0px;
  opacity: 0.7;
}
.support-btn {
  display: inline-block;
  height: 52px;
  width: 310px;
  background-color: #2abe5c;
  font-size: 18px;
  font-weight: 700;
  color: #fff !important;
  text-decoration: none;
  text-align: center;
  line-height: 52px;
}
.support-btn:hover {
  opacity: 0.9;
}
.collect {
  color: #f18d00;
  font-size: 20px;
  padding-left: 10px;
  cursor: pointer;
}
.help-area-support {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
</style>
