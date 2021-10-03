<template>
  <div>
    <div class="selcet">
      <span @click="timeSelect()">
        时间
        <i class="el-icon-arrow-down" :class="{ timeselct: isTimeSlect }"></i>
      </span>
      <span>地区</span>
      <el-cascader
        clearable
        :options="options"
        v-model="selectedOptions"
        @change="handleChange"
      ></el-cascader>

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
        placeholder="根据名称搜索"
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
      <el-table :data="hospitalList" border style="width: 100%">
        <el-table-column prop="id" height="200" label="id" width="100"> </el-table-column>
        <el-table-column prop="hospital_name_hz" label="医院"> </el-table-column>
        <el-table-column prop="status_value_hz" label="状态" width="150"> </el-table-column>
        <el-table-column prop="build_time_hz" label="建立时间" width="200"> </el-table-column>
        <el-table-column label="地区" width="200">
          <template slot-scope="scope">
            {{ hospitalList[scope.$index].area_hz.belong_city.belong_province.province }}
            {{ hospitalList[scope.$index].area_hz.belong_city.city }}
            {{ hospitalList[scope.$index].area_hz.area }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <!-- 操作 -->
          <slot slot-scope="scope" v-bind:info="{ scope, hospitalList }"></slot>
        </el-table-column>
      </el-table>
    </div>

    <slot name="hospitaldialog"></slot>
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
import { provinceAndCityData } from 'element-china-area-data'
export default {
  data() {
    return {
      hospitalList: [],
      isTimeSlect: false,
      ordering: 'build_time_hz',
      options: provinceAndCityData,
      selectedOptions: [],
      stateValue: '',
      searchValue: '',
      state: [
        { value: '', label: '不限' },
        { value: '-1', label: '打回' },
        { value: '0', label: '待审核' },
        { value: '1', label: '审核通过' }
      ],
      page: 1,
      size: 6,
      count: 0
    }
  },
  created() {
    this.getHospitalList()
  },
  methods: {
    getHospitalList() {
      const data = {
        status_hz: this.stateValue,
        search: this.searchValue,
        ordering: this.ordering,
        city_hz: this.selectedOptions[1],
        page: this.page,
        size: this.size
      }
      this.$store.dispatch('hospitalOperation/getAllHospital', data).then(
        res => {
          console.log(res)
          this.count = res.count
          this.hospitalList = res.results
        },
        err => {
          console.log(err)
        }
      )
    },
    timeSelect() {
      this.isTimeSlect = !this.isTimeSlect
      this.ordering = this.ordering === 'build_time_hz' ? '-build_time_hz' : 'build_time_hz'
      this.getHospitalList()
    },
    handleChange(value) {
      console.log(value)
      this.getHospitalList()
    },
    selectTrigger() {
      this.getHospitalList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getHospitalList()
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
