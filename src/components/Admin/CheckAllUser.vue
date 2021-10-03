<template>
  <div style="width: 100%;">
    <div class="selcet">
      <span @click="timeSelect()">
        时间
        <i class="el-icon-arrow-down" :class="{ timeselct: isTimeSlect }"></i>
      </span>
      <span>性别</span>
      <el-select style="width:150px" v-model="sexValue" @change="selectTrigger()">
        <el-option
          v-for="item in sex"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
      <div v-if="identityShown">
        <span>身份</span>
        <el-select style="width:200px" v-model="identityValue" @change="selectTrigger()">
          <el-option
            v-for="item in identity"
            :label="item.label"
            :key="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div v-if="!identityShown">
        <span>身份</span>
        <el-select style="width:200px" v-model="identityValue" @change="selectTrigger()">
          <el-option
            v-for="item in identity2"
            :label="item.label"
            :key="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <span></span>
      <el-input
        style="width:150px"
        @keyup.enter.native="selectTrigger()"
        v-model="searchValue"
        placeholder="搜索"
      >
      </el-input>
      <el-button
        style="margin-left:5px"
        type="primary"
        icon="el-icon-search"
        plain
        @click="selectTrigger()"
      ></el-button>
    </div>
    <div style="margin:15px">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column height="200" prop="id" label="id" width="100"> </el-table-column>
        <el-table-column prop="identityValue" label="身份" width="180"> </el-table-column>
        <el-table-column prop="sexValue" label="性别" width="150"> </el-table-column>
        <el-table-column prop="nickname" label="昵称" width=""> </el-table-column>
        <el-table-column prop="createTime" label="注册时间" width="200"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <slot slot-scope="scope" v-bind:info="{ scope, userList }"></slot>
        </el-table-column>
      </el-table>
    </div>
    <slot name="dialog"></slot>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        layout="total,  prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dignity', 'identityShown'],
  data() {
    return {
      sex: [
        { value: 0, label: '保密' },
        { value: 1, label: '男' },
        { value: 2, label: '女' },
        { value: '', label: '不限' }
      ],
      isTimeSlect: false,
      sexValue: '',
      identityValue: '',
      searchValue: '',
      ordering: 'create_time_hz',
      count: 0,
      page: 1,
      size: 6,
      identity: [
        { value: 0, label: '普通用户' },
        { value: 1, label: '志愿者（待审核）' },
        { value: 2, label: '志愿者' },
        { value: '', label: '不限' }
      ],
      identity2: [
        { value: 1, label: '志愿者（待审核）' },
        { value: 2, label: '志愿者' }
      ],
      userList: []
    }
  },
  created() {
    if (this.dignity) {
      this.identityValue = 1
    }
    this.getAllUser()
  },
  methods: {
    selectTrigger() {
      this.getAllUser()
    },
    timeSelect() {
      this.isTimeSlect = !this.isTimeSlect
      this.ordering = this.ordering === 'create_time_hz' ? '-create_time_hz' : 'create_time_hz'
      this.getAllUser()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getAllUser()
    },
    getAllUser() {
      const data = {
        sex_hz: this.sexValue,
        identity_hz: this.identityValue,
        search: this.searchValue,
        ordering: this.ordering,
        page: this.page,
        size: this.size
      }
      this.$store.dispatch('adminUser/getAllUser', data).then(
        res => {
          this.userList = []
          console.log(res)
          for (const item of res.results) {
            if (this.dignity) {
              console.log(item.identity_hz)
              this.userList.push({
                id: item.id,
                sexValue: item.sex_value_hz,
                identityValue: item.identity_value_hz,
                identity: item.identity_hz,
                nickname: item.nickname_hz,
                createTime: item.create_time_hz.slice(0, 10)
              })
            } else {
              this.userList.push({
                id: item.id,
                sexValue: item.sex_value_hz,
                identityValue: item.identity_value_hz,
                identity: item.identity_hz,
                nickname: item.nickname_hz,
                createTime: item.create_time_hz.slice(0, 10)
              })
            }
          }
          if (this.dignity) {
            this.count = this.userList.length
          } else {
            this.count = res.count
          }
        },
        err => {
          this.$message({
            message: err.data.detail,
            type: 'error'
          })
          setTimeout(() => {
            this.$router.replace('/admin-login')
          }, 1000)
        }
      )
    }
  },
  mounted() {}
}
</script>

<style scoped>
.timeselct {
  transform: rotate(180deg);
}
.selcet {
  display: flex;
  align-items: center;
  width: 100%;
}
.selcet span {
  padding: 0px 10px;
  color: #606266;
  font-size: 14px;
  cursor: pointer;
}
.admin-content,
.selcet {
  margin: 20px;
}
</style>
