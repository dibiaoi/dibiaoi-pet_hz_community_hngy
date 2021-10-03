<template>
  <div>
    <div class="selcet">
      <span @click="timeSelect('create_time_hz')">
        创建时间
        <i class="el-icon-arrow-down" :class="{ timeselct: isCreateTimeSlect }"></i>
      </span>
      <span @click="timeSelect('edit_time_hz')">
        编辑时间
        <i class="el-icon-arrow-down" :class="{ timeselct: isEditTimeSlect }"></i>
      </span>
      <span>用户类型</span>
      <el-select style="width:150px" v-model="userType" @change="selectTrigger()">
        <el-option
          v-for="item in userTypeList"
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
    <div class="state">
      <a
        href="javascript:"
        v-for="item in labelList"
        :key="item.label"
        v-bind:class="{ stateActive: item.id === labelId ? true : false }"
        @click="clickStatus(item.id)"
        >{{ item.label }}
      </a>
    </div>
    <div style="margin:15px">
      <el-table :data="newsList" border style="width: 100%">
        <el-table-column prop="id" label="id" width="80"> </el-table-column
        ><el-table-column label="标题" width="180">
          <template slot-scope="scope">
            {{ des(newsList[scope.$index].title_hz, 20) }}
          </template>
        </el-table-column>
        <el-table-column prop="Introduction_hz" label="简介" width="200">
          <template slot-scope="scope">
            {{ des(newsList[scope.$index].Introduction_hz, 20) }}
          </template>
        </el-table-column>
        <el-table-column prop="" width="100" label="作者">
          <template slot-scope="scope">
            {{
              newsList[scope.$index].author_hz === null
                ? '管理员'
                : newsList[scope.$index].author_hz.nickname_hz
            }}
          </template>
        </el-table-column>
        <el-table-column prop="state_value_hz" label="状态" width="120"> </el-table-column>

        <el-table-column label="内容">
          <template slot-scope="scope">
            {{ des(newsList[scope.$index].content_hz, 40) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <!-- 操作 -->
          <slot slot-scope="scope" v-bind:info="{ scope, newsList }"></slot>
        </el-table-column>
      </el-table>
      <slot name="NewsDialog"></slot>
      <slot name="NewsExamine"></slot>
    </div>

    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        layout="total,  prev, pager, next, jumper"
        :total="newsCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCreateTimeSlect: false,
      isEditTimeSlect: false,
      newsList: [],
      userType: '',
      userTypeList: [
        { value: '', label: '不限' },
        { value: 0, label: '平台用户' },
        { value: 1, label: '管理员' }
      ],
      stateValue: '',
      state: [
        { value: '', label: '不限' },
        { value: -1, label: '打回' },
        { value: 0, label: '审核' },
        { value: 1, label: '审核通过' }
      ],
      searchValue: '',
      ordering: '',
      page: 1,
      size: 5,
      newsCount: 0,
      labelId: '',
      labelList: []
    }
  },
  created() {
    this.getAllLabel()
    this.getNewsList()
  },
  methods: {
    getAllLabel() {
      this.labelList.push({ id: '', label: '不限' })
      this.$store.dispatch('postNews/getAllLabel').then(
        res => {
          for (const label of res.results) {
            this.labelList.push({ id: label.id, label: label.name_hz })
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    getNewsList() {
      const data = {
        state_hz: this.stateValue,
        type_hz: this.userType,
        search: this.searchValue,
        ordering: this.ordering,
        page: this.page,
        size: this.size
      }
      if (this.labelId && this.labelId !== '') {
        data.label_hz = this.labelId
      }
      this.$store.dispatch('editNews/getNewsList', data).then(
        res => {
          console.log(res)
          this.newsList = res.results
          this.newsCount = res.count
        },
        err => {
          console.log(err)
        }
      )
    },
    des(str, length) {
      let newStr = ''
      if (str.length >= length) {
        newStr = str.slice(0, length) + '...'
      } else {
        newStr = str
      }
      return newStr
    },
    clickStatus(labelId) {
      console.log(labelId)
      this.labelId = labelId
      this.getNewsList()
    },
    timeSelect(ordering) {
      if (ordering === 'create_time_hz') {
        this.isCreateTimeSlect = !this.isCreateTimeSlect
        this.ordering = this.ordering === 'create_time_hz' ? '-create_time_hz' : 'create_time_hz'
      } else {
        this.isEditTimeSlect = !this.isEditTimeSlect
        this.ordering = this.ordering === 'edit_time_hz' ? '-edit_time_hz' : 'edit_time_hz'
      }
      this.getNewsList()
    },
    selectTrigger() {
      this.getNewsList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getNewsList()
    }
  }
}
</script>

<style scoped>
.state {
  height: 100%;
  padding-bottom: 30px;
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
