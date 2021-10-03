<template>
  <div class="myfollow">
    <!-- 筛选框 -->
    <div class="tool-bar">
      <span></span>
      <span @click="timeSelect()">
        时间
        <i class="el-icon-arrow-down" :class="{ timeselct: isTimeSlect }"></i>
      </span>
      <span></span>
      <span>性别</span>
      <el-select style="width:150px" v-model="sexValue" @change="selectTrigger()">
        <el-option
          v-for="item in sex"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>种族</span>
      <el-select style="width:150px" v-model="raceValue" @change="selectTrigger()">
        <el-option
          v-for="item in race"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>|</span>
      <el-input
        style="width:200px"
        @keyup.enter.native="selectTrigger()"
        v-model="searchValue"
        placeholder="搜索"
      >
        <el-button slot="append" icon="el-icon-search" @click="selectTrigger()"></el-button>
      </el-input>
    </div>

    <div>
      <ul>
        <li class="adopt-li" v-for="adopt in adoptPosts" :key="adopt.id">
          <div class="li-content">
            <div class="adopt-avatar">
              <el-avatar :size="80" :src="adopt.pet_hz.default_image_hz.image_hz"></el-avatar>
            </div>
            <div class="top-right">
              <div class="top-right-title">
                <span>
                  <strong>{{ adopt.title_hz }}</strong>
                </span>
                <div class="myf-focus-btn">
                  <button @click="deleteAdopt(adopt.id)" class="empty_hz delete">删除</button>
                  <button @click="editAdoptInfo(adopt.id)" class="empty_hz edit-btn">编辑</button>
                  <button @click="goAdoptInfo(adopt.id)" class="empty_hz">详情</button>
                </div>
              </div>

              <div class="li-status-name">
                <span class="span-content">描述：{{ adopt.description_hz }}</span>
              </div>

              <div class="li-status-name">
                <span>状态：{{ adopt.state_value_hz }}</span>

                <div v-show="adopt.state_hz === 2" class="myf-focus-btn" style="margin-right:30px">
                  <button class="solid_hz" @click="getAdoptUser(adopt.adopt_user_hz, adopt.id)">
                    有用户领养，点击查看
                  </button>
                </div>
                <el-dialog :visible.sync="dialogVisible" title="领养确定" width="30%" center>
                  <p>想要领养的用户：</p>
                  <p style="display:flex; align-items: center;justify-content: center;">
                    <el-avatar :src="adoptUser.head_hz"></el-avatar>
                    <router-link :to="{ name: 'personal-page', params: { id: adoptUser.id } }">
                      <span>{{ adoptUser.nickname_hz }}</span>
                    </router-link>
                  </p>
                  <p style="width:100%; text-align: center;">
                    <el-button @click="adoptDefine(true)" type="primary">同意领养</el-button>
                    <el-button @click="adoptDefine(false)">不同意</el-button>
                  </p>
                </el-dialog>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="list-null content" v-bind:class="{ show: isListNotNull }">
      <h3 class="title" style="color:#999;">没有搜索到哦(╥╯^╰╥)</h3>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="size"
        layout="total,sizes,  prev, pager, next, jumper"
        :total="adoptCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getUserPage } from '@/request/api.js'
export default {
  data() {
    return {
      adoptPosts: [],
      adoptCount: 0,
      isTimeSlect: false,
      sex: [
        { value: 0, label: '公' },
        { value: 1, label: '母' },
        { value: '', label: '不限' }
      ],
      sexValue: '',
      race: [
        { value: 0, label: '猫' },
        { value: 1, label: '狗' },
        { value: 2, label: '其他' },
        { value: '', label: '不限' }
      ],
      raceValue: '',
      searchValue: '',
      ordering: 'create_time_hz',
      page: 1,
      size: 5,
      isListNotNull: true,
      dialogVisible: false,
      adoptUser: {},
      agreeId: ''
    }
  },
  created() {
    this.getMyAdopt()
  },
  computed: {
    userInformation() {
      return this.$store.state.userInfo.userInformation
    }
  },
  methods: {
    getAdoptUser(adoptUserId, adoptId) {
      this.dialogVisible = true
      getUserPage(adoptUserId).then(res => {
        this.adoptUser = res.data
      })
      this.agreeId = adoptId
    },
    getMyAdopt() {
      const data = {
        user_hz: this.userInformation.id,
        page: this.page,
        size: this.size,
        ordering: this.ordering,
        sex_hz: this.sexValue,
        race_hz: this.raceValue,
        search: this.searchValue
      }
      this.$store.dispatch('adoptPostList/getMyAdoptPosts', data).then(
        res => {
          console.log(res)
          this.adoptCount = res.count
          this.adoptPosts = res.results
          console.log(this.adoptPosts)
        },
        err => {
          console.log(err)
        }
      )
    },
    deleteAdopt(adoptId) {
      this.$confirm('确定要删除此领养贴吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('adoptOperation/deleteAdopt', adoptId).then(
          res => {
            console.log(res)
            if (res.status === 204) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getMyAdopt()
            }
          },
          err => {
            console.log(err)
            if (err.status === 204) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getMyAdopt()
            }
          }
        )
      })
    },
    selectTrigger() {
      this.getMyAdopt()
    },
    handleSizeChange(val) {
      this.size = val
      this.getMyAdopt()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getMyAdopt()
    },
    timeSelect() {
      this.isTimeSlect = !this.isTimeSlect
      this.ordering = this.ordering === 'create_time_hz' ? '-create_time_hz' : 'create_time_hz'
      this.getMyAdopt()
    },
    goAdoptInfo(adoptId) {
      this.$router.push('/pet-adopt/adopt-info/' + adoptId)
    },
    editAdoptInfo(adoptId) {
      this.$router.push('/pet-adopt/edit-adopt/' + adoptId)
    },
    adoptDefine(state) {
      const str = state ? '已同意领养' : '已拒绝ta领养'
      this.$store.dispatch('createAdopt/adoptDefine', { state, id: this.agreeId }).then(
        res => {
          console.log(res)
          if (res.code === 200) {
            this.$message({ message: str, type: 'success' })
            this.$router.go(0)
          } else if (res.code === 1304) {
            this.$message({ message: res.detail, type: 'warning' })
          }
        },
        err => {
          console.log(err)
        }
      )
    }
  },
  watch: {
    adoptPosts(newVal) {
      if (newVal.length === 0) {
        this.isListNotNull = false
      } else {
        this.isListNotNull = true
      }
    }
  }
}
</script>
<style scoped>
.edit-btn {
  color: #409eff !important;
  border: 1px solid #409eff;
}
.delete {
  color: #e7bb68 !important;
  border: 1px solid #e7bb68;
}
</style>
<style scoped>
.myfollow {
  height: 100%;
}
.pagination {
  margin-top: 20px;
  width: 100%;
  padding-bottom: 10px;
}
.tool-bar span,
.pets-top-right span {
  padding: 0px 15px;
  font-size: 15px;
  color: #4d4d4d;
}
.li-content {
  display: flex;
}
.adopt-avatar {
  padding: 10px;
}

.adopt-li {
  border-bottom: 0.5px solid #e0e0e073;
  padding: 10px 15px;
}
.top-right {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}
.top-right-title {
  font-size: 18px;
  color: #4d4d4d;
}
.myf-focus-btn {
  float: right;
  margin-right: 20px;
}
.tool-bar {
  height: 60px;
  width: 100%;
  padding: 10px 0px;
  display: flex;
  text-align: center;
  align-items: center;
}
.timeselct {
  transform: rotate(180deg);
  transition: transform 0.4s ease-out;
}
.list-null {
  height: 300px;
  width: 100%;

  display: flex;
  justify-content: center;
  text-align: center;
}
.show {
  display: none;
}
.li-status-name {
  font-size: 14px;
  min-height: 25px;
}
.span-content {
  overflow: hidden;
  font-size: 16px;
  opacity: 0.8;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 300px;
  display: block;
}
div.v-modal {
  z-index: 2000 !important;
}
</style>
