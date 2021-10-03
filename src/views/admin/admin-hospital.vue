<template>
  <div>
    医院管理
    <HospitalManage>
      <template v-slot:default="data">
        <el-button
          @click.native.prevent="checkInfo(data.info.scope.$index, data.info.hospitalList)"
          type="primary"
          size="small"
        >
          详情
        </el-button>
        <el-button
          @click.native.prevent="rejectHospital(data.info.scope.$index, data.info.hospitalList)"
          type="danger"
          size="small"
          v-if="data.info.hospitalList[data.info.scope.$index].status_hz === 1"
        >
          打回
        </el-button>
        <el-button
          @click.native.prevent="hospitalExamine(data.info.scope.$index, data.info.hospitalList)"
          type="success"
          size="small"
          v-if="data.info.hospitalList[data.info.scope.$index].status_hz === 0"
        >
          审核
        </el-button>
      </template>
      <template v-slot:hospitaldialog>
        <el-dialog title="医院详情" :visible.sync="dialogHospitalVisible">
          <HospitalInfo :hospitalInfo="hospitalInfo"></HospitalInfo>
        </el-dialog>
      </template>
    </HospitalManage>
  </div>
</template>

<script>
import HospitalManage from '@/components/Admin/HospitalManage.vue'
import HospitalInfo from '@/components/Admin/HospitalInfo.vue'
export default {
  components: {
    HospitalManage,
    HospitalInfo
  },
  data() {
    return {
      dialogHospitalVisible: false,
      hospitalInfo: '',
      checkInfoHospitalId: ''
    }
  },
  methods: {
    checkInfo(scope, hospitalList) {
      this.dialogHospitalVisible = true
      this.checkInfoHospitalId = hospitalList[scope].id
      this.hospitalInfo = hospitalList[scope]
    },
    hospitalExamine(scope, hospitalList) {
      console.log('hospitalExamine')
      this.checkInfoHospitalId = hospitalList[scope].id
      this.$confirm('要通过这家医院的审核吗？', '提示', {
        confirmButtonText: '通过',
        cancelButtonText: '不通过',
        type: 'warning'
      })
        .then(() => {
          this.postHospitalExamine(true)
        })
        .catch(() => {
          this.postHospitalExamine(false)
        })
    },
    postHospitalExamine(isPass) {
      const info = { id: this.checkInfoHospitalId, model: 'hospital', pass: isPass }
      this.$store.dispatch('adminOperation/examine', info).then(
        res => {
          console.log(res)
          this.$message({
            message: res.data,
            type: 'success'
          })
          // this.$router.go(0)
        },
        err => {
          console.log(err)
        }
      )
    },
    rejectHospital(scope, hospitalList) {
      this.$confirm('确定要打回这家医院吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.prompt().then(value => {
          const info = {
            content: value.value,
            id: hospitalList[scope].id,
            model: 'hospital'
          }
          this.$store.dispatch('adminOperation/rejectIdentity', info).then(
            res => {
              this.$message({
                message: res.data,
                type: 'success'
              })
              // this.$router.go(0)
            },
            err => {
              console.log(err)
            }
          )
        })
      })
    },
    prompt() {
      return this.$prompt('请输入打回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^([\u4e00-\u9fa5]|[0-9_a-zA-Z]){1,15}$/,
        inputErrorMessage: '请勿输入空格且15字内'
      })
    }
  }
}
</script>

<style scoped></style>
