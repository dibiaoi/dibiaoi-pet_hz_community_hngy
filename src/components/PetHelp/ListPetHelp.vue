<template>
  <div class="userinfo-bottom">
    <div class="tool-bar">
      <span @click="timeSelect()">
        创建时间
        <i class="el-icon-arrow-down" :class="{ select: isSlect }"></i>
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
      <span></span>
      <span>种族</span>
      <el-select style="width:150px" v-model="raceValue" @change="selectTrigger()">
        <el-option
          v-for="item in race"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
      <span></span>
      <el-input
        style="width:200px"
        @keyup.enter.native="selectTrigger()"
        v-model="searchValue"
        placeholder="搜索"
        clearable
      >
        <el-button
          slot="append"
          type="primary"
          icon="el-icon-search"
          @click="selectTrigger()"
        ></el-button>
      </el-input>
    </div>
    <div class="state">
      <a
        href="javascript:"
        v-for="item in stateList"
        :key="item.value"
        v-bind:class="{ stateActive: item.value === state ? true : false }"
        @click="clickStatus(item.value)"
        >{{ item.label }}
      </a>
    </div>
    <slot v-bind:info="{ helpList }"></slot>
    <ul v-if="type === 'petHelp'" style="width:100%">
      <li class="hospital-li" v-for="ph in helpList" :key="ph.id">
        <div class="li-status">{{ ph.state_value_hz }}</div>
        <div class="li-content">
          <div class="top-right">
            <div class="top-right-title" style="line-height: 50px;">
              <span class="avatar-name">
                <el-avatar :src="ph.default_image_hz.image_hz"></el-avatar>
                <strong style="margin-left:10px;">{{ ph.name_hz }}</strong>
              </span>
            </div>

            <div class="top-right-title" style="margin-top:10px">
              <div class="edit-btn" v-if="ph.state_hz < 10 || ph.state_hz > 15">
                <el-button size="mini" class="empty_hz" @click="editHelp(ph.id)">编辑</el-button>
              </div>
              <div class="del-btn">
                <el-button size="mini" type="danger" @click="delHelp(ph.id)">删除</el-button>
              </div>
              <span class="span-content">{{ ph.description_hz }}</span>
            </div>

            <div class="top-right-title div-progress">
              <span>已筹金额</span><strong>￥{{ ph.already_amount }}</strong>
              <el-progress
                :percentage="GetPercent(ph.already_amount, ph.amount_hz)"
                :text-inside="true"
                color="#2abe5c"
                class="progress"
                :stroke-width="20"
              ></el-progress>
              <span>目标金额</span><strong>￥{{ ph.amount_hz }}</strong>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5]"
        :page-size="size"
        layout="total,sizes,  prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type'],
  computed: {
    hospitalInfo() {
      return this.$store.state.userInfo.hospitalInfo
    }
  },
  data() {
    return {
      isSlect: false,
      helpList: [],
      ordering: 'create_time_hz',
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
      page: 1,
      size: 5,
      count: 0,
      state: '',
      stateList: [
        { value: '', label: '全部' },
        { value: -1, label: '打回' },
        { value: 0, label: '待审核' },
        { value: 1, label: '审核通过,待发布' },
        { value: 2, label: '众筹中' },
        { value: 10, label: '众筹失败' },
        { value: 11, label: '众筹失败,等待返款' },
        { value: 12, label: '众筹失败,返款中' },
        { value: 13, label: '众筹失败,反款成功' },
        { value: 20, label: '众筹成功' },
        { value: 21, label: '众筹成功,等待打款' },
        { value: 22, label: '众筹成功,打款中' },
        { value: 23, label: '众筹成功,打款成功' },
        { value: 30, label: '管理员紧急撤销,等待返款' },
        { value: 31, label: '管理员紧急撤销,返款中' },
        { value: 32, label: '管理员紧急撤销,反款成功' }
      ]
    }
  },
  created() {
    this.petHelpList()
  },
  methods: {
    delHelp(id) {
      this.$confirm('确定删除此众筹吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('petHelpEditor/deletePetHelp', id).then(
          res => {
            console.log(res)
            if (res.code === 1601) {
              this.$message({
                message: res.detail,
                type: 'error'
              })
            }
          },
          err => {
            console.log(err)
            if (err.status === 204) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.$router.go(0)
            }
          }
        )
      })
    },
    editHelp(id) {
      this.$router.push('/hospital-center/edit-pet-help/' + id)
    },
    petHelpList() {
      const data = {
        ordering: this.ordering,
        sex_hz: this.sexValue,
        race_hz: this.raceValue,
        search: this.searchValue,
        state_hz: this.state,
        page: this.page,
        size: this.size
      }
      this.$store.dispatch('petHelpInfo/acquireAllPetHelp', data).then(
        res => {
          console.log(res)
          this.helpList = res.results
          this.count = res.count
        },
        err => {
          console.log(err)
        }
      )
    },
    timeSelect() {
      this.isSlect = !this.isSlect
      this.ordering = this.ordering === 'create_time_hz' ? '-create_time_hz' : 'create_time_hz'
      this.petHelpList()
    },
    handleSizeChange(val) {
      this.size = val
      this.petHelpList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.petHelpList()
    },
    selectTrigger() {
      this.petHelpList()
    },
    clickStatus(state) {
      console.log(state)
      this.state = state
      this.petHelpList()
    },
    GetPercent(num, total) {
      num = parseFloat(num)
      total = parseFloat(total)
      if (isNaN(num) || isNaN(total)) {
        return '-'
      }
      return total <= 0 ? '0' : Math.round((num / total) * 10000) / 100.0
    }
  }
}
</script>
<style>
.el-button--small {
  border-radius: 5px;
}
</style>
<style scoped>
.hospital {
  padding: 20px;
}

.userinfo-bottom {
  border-top: 1px solid #f1f1f1;
  margin: 10px;
}
.li-content {
  display: flex;
}
.hospital-li {
  opacity: 0.95;
  position: relative;
  border-bottom: 0.5px solid #e0e0e073;
  padding: 10px 15px;
}
.li-status-name {
  font-size: 14px;
  min-height: 25px;
}
.edit-service-btn {
  float: right;
  margin-right: 20px;
}
.top-right {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}
.top-right-title {
  font-size: 15px;
  color: #4d4d4d;
  line-height: 35px;
}
.avatar-name {
  height: 100%;
  display: flex;
  align-items: center;
  width: max-content;
}
.hospital-li :hover {
  opacity: 1;
  cursor: pointer;
}
.progress {
  width: 250px;
  margin: 0px 10px;
}
.div-progress {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.div-progress strong {
  padding: 10px;
  width: 60px;
}
.span-content {
  opacity: 1;
  width: 500px;
}
.li-status {
  position: absolute;
  height: 30px;
  width: 72px;
  right: 60px;
  top: 0;
  padding-bottom: 11px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  background: #2abe5c;
}
.tool-bar span {
  padding-right: 15px;
  font-size: 15px;
  color: #4d4d4d;
}
.tool-bar {
  height: 60px;
  width: 100%;
  padding: 40px 0px;
  display: flex;
  text-align: center;
  align-items: center;
  margin: 0px 15px;
  border-top: 0.5px solid #e0e0e073;
}
.select {
  transform: rotate(180deg);
  transition: transform 0.4s ease-out;
}
.state {
  height: 80px;
  margin-bottom: 10px;
  margin-left: 10px;
}
.state a {
  padding: 5px 10px;
  font-size: 12px;
  float: left;
  color: #4d4d4d;
  border: #f1f1f1 solid 1px;
  border-radius: 5px;
  margin: 3px;
}
.state a:hover {
  color: green;
}
.stateActive {
  background: #2abe5c;
}
.pagination {
  margin-top: 20px;
  width: 100%;
  padding-bottom: 10px;
}
.edit-btn {
  position: absolute;
  right: 60px;
  top: 80px;
}
.del-btn {
  position: absolute;
  right: 60px;
  top: 40px;
}
</style>
