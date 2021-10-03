<template>
  <div>
    领养管理
    <PetAdoptManager>
      <template v-slot:default="data">
        <el-button
          @click.native.prevent="checkInfo(data.info.scope.$index, data.info.adoptList)"
          type="primary"
          size="small"
        >
          详情
        </el-button>
        <el-button
          @click.native.prevent="rejectAdopt(data.info.scope.$index, data.info.adoptList)"
          type="danger"
          size="small"
          v-if="
            data.info.adoptList[data.info.scope.$index].stateStatus === 1 ||
              data.info.adoptList[data.info.scope.$index].stateStatus === 2
          "
        >
          打回
        </el-button>
        <el-button
          @click.native.prevent="ensureAdopt(data.info.scope.$index, data.info.adoptList)"
          type="success"
          size="small"
          v-if="data.info.adoptList[data.info.scope.$index].stateStatus === 3"
        >
          平台确定
        </el-button>
        <el-button
          @click.native.prevent="adoptExamine(data.info.scope.$index, data.info.adoptList)"
          type="success"
          size="small"
          v-if="data.info.adoptList[data.info.scope.$index].stateStatus === 0"
        >
          审核
        </el-button>
      </template>
      <template v-slot:adopDdialog>
        <el-dialog title="领养详情" :visible.sync="dialogAdoptVisible">
          <AdoptInfoAdmin :adoptId="checkInfoAdoptId"></AdoptInfoAdmin>
        </el-dialog>
      </template>
      <template v-slot:adoptExamine>
        <el-dialog width="40%" title="领养平台确定" :visible.sync="dialogEnsureVisible">
          <el-form label-width="120px">
            <el-form-item label="领养用户：">
              <div class="item-user">
                <el-avatar :src="adoptUserInfo.head_hz"></el-avatar>
                <span>{{ adoptUserInfo.nickname_hz }}</span>
              </div>
            </el-form-item>
            <el-form-item label="发起领养时间：">
              <span>{{ adoptTime }}</span>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="adoptDetermine(true)">同意</el-button>
          <el-button @click="adoptDetermine(false)">不同意</el-button>
        </el-dialog>
      </template>
    </PetAdoptManager>
  </div>
</template>

<script>
import PetAdoptManager from '@/components/Admin/PetAdoptManage.vue'
import AdoptInfoAdmin from '@/components/Admin/AdoptInfoAdmin.vue'
export default {
  components: {
    PetAdoptManager,
    AdoptInfoAdmin
  },
  data() {
    return {
      dialogAdoptVisible: false,
      dialogEnsureVisible: false,
      checkInfoAdoptId: '',
      adoptUserId: '',
      adoptTime: '',
      adoptUserInfo: ''
    }
  },
  methods: {
    checkInfo(scope, adoptList) {
      this.dialogAdoptVisible = true
      this.checkInfoAdoptId = adoptList[scope].id
    },
    prompt() {
      return this.$prompt('请输入打回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^([\u4e00-\u9fa5]|[0-9_a-zA-Z]){1,15}$/,
        inputErrorMessage: '请勿输入空格且15字内'
      })
    },
    rejectAdopt(scope, adoptList) {
      this.checkInfoAdoptId = adoptList[scope].id
      this.$confirm('确定要打回这个领养吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.prompt().then(value => {
          const info = {
            content: value.value,
            id: this.checkInfoAdoptId,
            model: 'petAdopt'
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
    ensureAdopt(scope, adoptList) {
      this.dialogEnsureVisible = true
      this.checkInfoAdoptId = adoptList[scope].id
      this.adoptUserId = adoptList[scope].adoptUserId
      this.adoptTime = adoptList[scope].adoptTime.slice(0, 10)
      this.$store.dispatch('adminLogin/getUserInfoAdmin', this.adoptUserId).then(
        res => {
          console.log(res)
          this.adoptUserInfo = res
        },
        err => {
          console.log(err)
        }
      )
    },
    adoptExamine(scope, adoptList) {
      this.checkInfoAdoptId = adoptList[scope].id
      this.$confirm('要通过这个领养吗？', '提示', {
        confirmButtonText: '通过',
        cancelButtonText: '不通过',
        distinguishCancelAndClose: true,
        type: 'warning'
      })
        .then(() => {
          this.postAdoptExamine(true)
        })
        .catch(action => {
          if (action === 'cancel') {
            this.postAdoptExamine(false)
          }
        })
    },
    adoptDetermine(isPass) {
      const info = { id: this.checkInfoAdoptId, is_pass: isPass }
      const str = isPass ? '同意' : '不同意'
      this.$store.dispatch('adminOperation/petAdoptDetermine', info).then(
        res => {
          this.$message({
            message: str + res.detail,
            type: 'success'
          })
          this.$router.go(0)
        },
        err => {
          console.log(err)
        }
      )
    },
    postAdoptExamine(isPass) {
      const info = { id: this.checkInfoAdoptId, model: 'petAdopt', pass: isPass }
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
