<template>
  <div class="admin-content">
    志愿者审核
    <CheckAllUser :dignity="true" :identityShown="false">
      <template v-slot:default="data">
        <el-button
          @click.native.prevent="exmineVolunteers(data.info.scope.$index, data.info.userList)"
          size="small"
          type="primary"
          v-if="data.info.userList[data.info.scope.$index].identity === 1"
        >
          审核
        </el-button>
        <el-button
          @click.native.prevent="rejectVolunteer(data.info.scope.$index, data.info.userList)"
          size="small"
          type="danger"
          v-if="data.info.userList[data.info.scope.$index].identity === 2"
        >
          打回
        </el-button>
      </template>

      <template v-slot:dialog>
        <el-dialog title="用户详情" :visible.sync="dialogFormVisible">
          <UserInfoAdmin :id="checkInfoUserId" />
          <el-button @click="examine(true)" type="primary" size="medium">
            通过
          </el-button>
          <el-button @click="examine(false)" size="medium">
            不通过
          </el-button>
        </el-dialog>
      </template>
    </CheckAllUser>
  </div>
</template>

<script>
import UserInfoAdmin from '@/components/Admin/UserInfoAdmin.vue'
import CheckAllUser from '@/components/Admin/CheckAllUser.vue'
export default {
  components: {
    UserInfoAdmin,
    CheckAllUser
  },
  data() {
    return {
      checkInfoUserId: '',
      dialogFormVisible: false
    }
  },
  methods: {
    exmineVolunteers(scope, userList) {
      this.dialogFormVisible = true
      console.log(userList[scope].id)
      this.checkInfoUserId = userList[scope].id
    },
    examine(pass) {
      console.log(pass)
      const info = {
        pass,
        id: this.checkInfoUserId,
        model: 'volunteer'
      }
      this.$store.dispatch('adminOperation/examine', info).then(
        res => {
          console.log(res)
          this.$message({
            message: res.data,
            type: 'success'
          })
          setTimeout(() => {
            this.$router.go(0)
          }, 1000)
        },
        err => {
          console.log(err)
        }
      )
    },
    prompt() {
      return this.$prompt('请输入打回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^([\u4e00-\u9fa5]|[0-9_a-zA-Z]){1,15}$/,
        inputErrorMessage: '请勿输入空格且15字内'
      })
    },
    rejectVolunteer(scope, userList) {
      console.log(userList[scope].id)
      this.checkInfoUserId = userList[scope].id

      this.$confirm('确定取消此用户的志愿者身份吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.prompt().then(value => {
          console.log(value)
          const info = {
            content: value.value,
            id: this.checkInfoUserId,
            model: 'volunteer'
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
    }
  }
}
</script>

<style scoped>
.disabled {
  display: none;
}
</style>
