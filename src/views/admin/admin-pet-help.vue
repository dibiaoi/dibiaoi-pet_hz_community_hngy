<template>
  <div>
    众筹管理
    <petHelpManage>
      <template v-slot:default="data">
        <el-button
          @click.native.prevent="checkInfo(data.helpInfo.helpList[data.helpInfo.scope.$index])"
          type="primary"
          size="small"
          >详情
        </el-button>

        <el-button
          @click.native.prevent="rejectAdopt(data.helpInfo.helpList[data.helpInfo.scope.$index])"
          type="danger"
          size="small"
          v-if="
            data.helpInfo.helpList[data.helpInfo.scope.$index].state_hz !== -1 &&
              data.helpInfo.helpList[data.helpInfo.scope.$index].state_hz !== 20 &&
              data.helpInfo.helpList[data.helpInfo.scope.$index].state_hz !== 21 &&
              data.helpInfo.helpList[data.helpInfo.scope.$index].state_hz !== 22 &&
              data.helpInfo.helpList[data.helpInfo.scope.$index].state_hz !== 23 &&
              data.helpInfo.helpList[data.helpInfo.scope.$index].state_hz !== 0
          "
        >
          打回
        </el-button>
        <el-button
          @click.native.prevent="sendMoney(data.helpInfo.helpList[data.helpInfo.scope.$index])"
          type="success"
          size="small"
          v-if="data.helpInfo.helpList[data.helpInfo.scope.$index].state_hz === 20"
        >
          打款
        </el-button>
        <el-button
          @click.native.prevent="adoptExamine(data.helpInfo.helpList[data.helpInfo.scope.$index])"
          type="success"
          size="small"
          v-if="data.helpInfo.helpList[data.helpInfo.scope.$index].state_hz === 0"
        >
          审核
        </el-button>
      </template>
      <template v-slot:petHelpDialog>
        <el-dialog title="众筹详情" :visible.sync="dialogHelpVisible">
          <HelpInfoAdmin :helpId="checkInfoId"></HelpInfoAdmin>
           </el-dialog>
      </template>
      <template v-slot:choosePublishDialog>
        <el-dialog width="30%" title="选择发布时间" :visible.sync="choosePublishDialog">
          <el-radio-group v-model="publishTimeVal">
            <el-radio-button :label="0">现在</el-radio-button>
            <el-radio-button :label="1">一小时后</el-radio-button>
            <el-radio-button :label="2">明天</el-radio-button>
          </el-radio-group>
          <p><el-button type="primary" @click="EnsurePublishTime(true)">确定</el-button></p>
        </el-dialog>
      </template>
      <template v-slot:sendMoneyDialog>
        <el-dialog width="30%" title="选择打款时间" :visible.sync="sendMoneyDialog">
          <el-radio-group v-model="sendMoneyTimeVal">
            <el-radio-button :label="0">现在</el-radio-button>
            <el-radio-button :label="1">一小时后</el-radio-button>
            <el-radio-button :label="2">明天</el-radio-button>
          </el-radio-group>
          <p><el-button type="primary" @click="EnsureSendMoneyTime()">确定</el-button></p>
        </el-dialog>
      </template>
    </petHelpManage>
  </div>
</template>

<script>
import petHelpManage from '@/components/Admin/petHelpManage'
import HelpInfoAdmin from '@/components/Admin/HelpInfoAdmin.vue'

export default {
  data() {
    return {
      dialogHelpVisible: false,
      dialogEnsureVisible: false,
      choosePublishDialog: false,
      sendMoneyDialog: false,
      checkInfoId: '',
      publishTime: '',
      publishTimeVal: 0,
      sendMoneyTime: '',
      sendMoneyTimeVal: 0
    }
  },
  components: {
    petHelpManage,
    HelpInfoAdmin
  },
  methods: {
    checkInfo(petHelp) {
      this.dialogHelpVisible = true
      this.checkInfoId = petHelp.id
    },
    adoptExamine(petHelp) {
      this.checkInfoId = petHelp.id
      this.$confirm('要通过这个众筹吗？', '提示', {
        confirmButtonText: '通过',
        cancelButtonText: '不通过',
        distinguishCancelAndClose: true,
        type: 'warning'
      })
        .then(() => {
          this.choosePublishDialog = true
        })
        .catch(action => {
          if (action === 'cancel') {
            this.postHelpExamine(false)
          }
        })
    },
    EnsurePublishTime(isPass) {
      // 0现在1一小时后2明天
      const date = new Date()

      if (this.publishTimeVal === 0) {
        this.publishTime = date
      } else if (this.publishTimeVal === 1) {
        date.setTime(date.getTime() + 3600 * 1000 * 1)
        this.publishTime = date
      } else {
        date.setTime(date.getTime() + 3600 * 1000 * 24)
        this.publishTime = date
      }
      this.postHelpExamine(isPass)
    },
    prompt() {
      return this.$prompt('请输入打回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^([\u4e00-\u9fa5]|[0-9_a-zA-Z]){1,15}$/,
        inputErrorMessage: '请勿输入空格且15字内'
      })
    },
    rejectAdopt(petHelp) {
      this.checkInfoId = petHelp.id
      this.$confirm('确定要打回这个众筹吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        distinguishCancelAndClose: true,
        type: 'warning'
      }).then(() => {
        this.prompt().then(value => {
          const info = {
            content: value.value,
            id: this.checkInfoId,
            model: 'petHelp'
          }
          this.$store.dispatch('adminOperation/rejectIdentity', info).then(
            res => {
              this.$message({
                message: res.data,
                type: 'success'
              })
              this.$router.go(0)
            },
            err => {
              console.log(err)
            }
          )
        })
      })
    },
    postHelpExamine(isPass) {
      const info = {
        id: this.checkInfoId,
        model: 'petHelp',
        pass: isPass,
        publish_time_hz: this.publishTime
      }
      this.$store.dispatch('adminOperation/examine', info).then(
        res => {
          console.log(res)
          this.$message({
            message: res.data,
            type: 'success'
          })
          this.$router.go(0)
        },
        err => {
          console.log(err)
        }
      )
    },
    sendMoney(petHelp) {
      this.checkInfoId = petHelp.id
      this.$confirm('众筹成功，是否打款', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消打款',
        distinguishCancelAndClose: true,
        type: 'success'
      })
        .then(() => {
          this.sendMoneyDialog = true
        })
        .catch(action => {
          if (action === 'cancel') {
            this.prompt().then(value => {
              const info = {
                is_pass: false,
                content: value.value,
                id: this.checkInfoId
              }
              this.postSendMoney(info)
            })
          }
        })
    },
    EnsureSendMoneyTime() {
      const date = new Date()

      if (this.sendMoneyTimeVal === 0) {
        this.sendMoneyTime = date
      } else if (this.sendMoneyTimeVal === 1) {
        date.setTime(date.getTime() + 3600 * 1000 * 1)
        this.sendMoneyTime = date
      } else {
        date.setTime(date.getTime() + 3600 * 1000 * 24)
        this.sendMoneyTime = date
      }
      const info = { is_pass: true, id: this.checkInfoId, time_hz: this.sendMoneyTime }
      this.postSendMoney(info)
    },
    postSendMoney(info) {
      console.log(info)
      this.$store.dispatch('adminOperation/petHelpSendMoney', info).then(
        res => {
          console.log(res)
          this.$message({ message: res.detail, type: 'success' })
        },
        err => {
          console.log(err)
        }
      )
    }
  }
}
</script>

<style>
.el-dialog__body {
  padding: 20px;
}
</style>
<style scoped>
.item-user {
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
