<template>
  <div>
    查看所有用户
    <CheckAllUser :identityShown="true">
      <template v-slot:default="data">
        <el-button
          @click.native.prevent="checkInfo(data.info.scope.$index, data.info.userList)"
          type="text"
          size="medium"
        >
          详情
        </el-button>
      </template>
      <template v-slot:dialog>
        <el-dialog title="用户详情" :visible.sync="dialogFormVisible">
          <UserInfoAdmin :id="checkInfoUserId" />
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
    checkInfo(scope, userList) {
      this.dialogFormVisible = true
      console.log(userList[scope].id)
      this.checkInfoUserId = userList[scope].id
    }
  }
}
</script>

<style scoped>
.selcet {
  margin: 20px;
}
</style>
