<template>
  <div class="myfollow">
    <!-- 筛选框 -->
    <div class="tool-bar">
      <span></span>
      <span @click="timeSelect()">
        时间
        <i class="el-icon-arrow-down" :class="{timeselct:isTimeSlect}"></i>
      </span>
      <span></span>
      <span>性别</span>
      <el-select style="width:150px" v-model="sexValue" @change="selectTrigger()">
        <el-option v-for="item in sex" :label="item.label" :key="item.value" :value="item.value"></el-option>
      </el-select>
      <span>种族</span>
      <el-select style="width:150px" v-model="raceValue" @change="selectTrigger()">
        <el-option v-for="item in race" :label="item.label" :key="item.value" :value="item.value"></el-option>
      </el-select>
      <span>|</span>
      <el-input style="width:200px" @keyup.enter.native="selectTrigger()" v-model="searchValue" placeholder="搜索">
        <el-button slot="append" icon="el-icon-search" @click="selectTrigger()"></el-button>
      </el-input>
    </div>

    <div>
      <ul>
        <li class="adopt-li" v-for="order in orderList" :key="order.id">
          <div class="li-content">
            <div class="adopt-avatar">
              <el-avatar :size="80" :src="order.default_image_hz.image_hz"></el-avatar>
            </div>
            <div class="top-right">
              <div class="top-right-title">
                <span>
                  <strong>{{order.title_hz}}</strong>
                </span>
                <div class="myf-focus-btn">
                  <button @click="goOrderInfo(order.id)" class="empty_hz">详情</button>
                </div>
              </div>
              <div class="li-status-name">
                <span class="span-content">描述：{{order.description_hz}}</span>
              </div>
              <div class="li-status-name">
                <span style="float:right;">{{(order.finish_time_hz.slice(0,10))}}成功领养</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="list-null content" v-bind:class="{show:isListNotNull}">
      <h3 class="title" style="color:#999;">没有搜索到哦(╥╯^╰╥)</h3>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[ 1,2, 5, 10]"
        :page-size="size"
        layout="total,sizes,  prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderList: [],
      count: 0,
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
      ordering: 'finish_time_hz',
      page: 1,
      size: 5,
      isListNotNull: true
    }
  },
  created() {
    this.getMyOrder()
  },

  methods: {
    getMyOrder() {
      const data = {
        page: this.page,
        size: this.size,
        ordering: this.ordering,
        sex_hz: this.sexValue,
        race_hz: this.raceValue,
        search: this.searchValue
      }
      this.$store.dispatch('order/getMyOrderList', data).then(
        res => {
          console.log(res)
          this.count = res.count
          this.orderList = res.results
          console.log(this.orderList)
        },
        err => {
          console.log(err)
        }
      )
    },
    selectTrigger() {
      this.getMyOrder()
    },
    handleSizeChange(val) {
      this.size = val
      this.getMyOrder()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getMyOrder()
    },
    timeSelect() {
      this.isTimeSlect = !this.isTimeSlect
      this.ordering = this.ordering === 'finish_time_hz' ? '-finish_time_hz' : 'finish_time_hz'
      this.getMyOrder()
    },
    goOrderInfo(id) {
      this.$router.push('/user-center/order-info/' + id)
    }
  },
  watch: {
    orderList(newVal) {
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
  color: #409eff;
  border: 1px solid #409eff;
}
.delete {
  color: #e7bb68;
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
.top-right {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}
.adopt-li {
  border-bottom: 0.5px solid #e0e0e073;
  padding: 10px 15px;
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
</style>