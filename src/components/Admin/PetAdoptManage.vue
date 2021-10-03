<template>
  <div>
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

      <span>种族</span>
      <el-select style="width:150px" v-model="raceValue" @change="selectTrigger()">
        <el-option
          v-for="item in race"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        ></el-option>
      </el-select>

      <span>状态</span>
      <el-select style="width:150px" v-model="stateValue" @change="selectTrigger()">
        <el-option
          v-for="item in state"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
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
      <el-table :data="adoptList" border style="width: 100%">
        <el-table-column height="200" prop="id" label="id" width="100"> </el-table-column>
        <el-table-column height="200" prop="pet.race_value_hz" label="种族" width="100">
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="state" label="状态" width="150"> </el-table-column>
        <el-table-column prop="master" label="主人" width="180"> </el-table-column>
        <el-table-column prop="createTime" label="发布时间"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <!-- 操作 -->
          <slot slot-scope="scope" v-bind:info="{ scope, adoptList }"></slot>
        </el-table-column>
      </el-table>
    </div>
    <slot name="adopDdialog"></slot>
    <slot name="adoptExamine"></slot>
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
  data() {
    return {
      adoptList: [],
      adoptFullList: [],
      isTimeSlect: false,
      searchValue: '',
      sex: [
        { value: 0, label: '公' },
        { value: 1, label: '母' },
        { value: '', label: '不限' }
      ],
      sexValue: '',
      page: 1,
      size: 6,
      race: [
        { value: 0, label: '猫' },
        { value: 1, label: '狗' },
        { value: 2, label: '其他' },
        { value: '', label: '不限' }
      ],
      raceValue: '',
      state: [
        { value: -1, label: '已打回' },
        { value: 0, label: '待审核' },
        { value: 1, label: '待领养' },
        { value: 2, label: '领养待确定' },
        { value: 3, label: '待平台确定' },
        { value: '', label: '不限' }
      ],
      stateValue: '',
      ordering: 'create_time_hz',
      count: 0
    }
  },
  created() {
    this.getAdoptList()
  },
  methods: {
    getAdoptList() {
      const data = {
        state_hz: this.stateValue,
        sex_hz: this.sexValue,
        race_hz: this.raceValue,
        search: this.searchValue,
        ordering: this.ordering,
        page: this.page,
        size: this.size
      }
      this.$store.dispatch('adoptPostList/getMyAdoptPosts', data).then(
        res => {
          console.log(res)
          this.adoptList = []
          this.count = res.count
          for (const item of res.results) {
            this.adoptList.push({
              id: item.id,
              title: item.title_hz,
              state: item.state_value_hz,
              stateStatus: item.state_hz,
              master: item.user_hz.nickname_hz,
              masterHead: item.user_hz.head_hz,
              createTime: item.create_time_hz.slice(0, 10),
              pet: item.pet_hz,
              user: item.user_hz,
              adoptUserId: item.adopt_user_hz,
              adoptTime: item.adopt_time_hz
            })
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    selectTrigger() {
      this.getAdoptList()
    },
    timeSelect() {
      this.isTimeSlect = !this.isTimeSlect
      this.ordering = this.ordering === 'create_time_hz' ? '-create_time_hz' : 'create_time_hz'
      this.getAdoptList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getAdoptList()
    }
  }
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

.selcet {
  margin: 20px;
}
</style>
