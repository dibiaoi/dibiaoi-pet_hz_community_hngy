<template>
  <div style="position: relative; width:min-content;">
    <el-autocomplete
      placeholder="搜索"
      class="inline-input"
      v-model.trim="searchVal"
      :fetch-suggestions="querySearch"
      @select="searchInfo"
      @keyup.enter.native="searchInfo"
      clearable
      @blur="loseFocus()"
    >
      <button class="clean-all" slot="append" @click="cleanHistory()" v-show="isShow">
        清空全部记录
      </button>
      <el-button
        class="search-btn"
        slot="append"
        icon="el-input__icon el-icon-search"
        @click.native="search()"
      >
      </el-button>
    </el-autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchHistory: [],
      searchVal: '',
      results: '',
      isShow: false
    }
  },
  mounted() {
    if (localStorage.getItem('searchHistory')) {
      const sh = JSON.parse(localStorage.getItem('searchHistory'))
      console.log(sh)
      this.searchHistory = sh
    }
  },
  methods: {
    querySearch(queryString, cb) {
      // const history = this.searchHistory
      this.results = queryString
        ? this.searchHistory.filter(this.createFilter(queryString))
        : this.searchHistory
      this.isShow = true
      cb(this.results)
    },
    createFilter(queryString) {
      return history => {
        return history.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    handleSelect(item) {
      console.log(item)
    },
    search() {
       this.$router.push({ name: 'search-content', query: { searchVal: this.searchVal } })
    },
    cleanHistory() {
      console.log('cleanHistory')
      this.cleanHistory = []
      this.results = []
      localStorage.setItem('searchHistory', '')
    },
    loseFocus() {
      setTimeout(() => {
        this.isShow = false
      }, 500)
    },
    searchInfo() {
      console.log('searchInfo')
      this.searchVal = this.searchVal.trim()
      this.isShow = false
      if (
        !this.searchHistory.find(item => {
          return item.value === this.searchVal
        }) &&
        this.searchVal !== 'undefined' &&
        this.searchVal !== null &&
        this.searchVal !== ' ' &&
        this.searchVal.replace(/(^s*)|(s*$)/g, '').length != 0
      ) {
        this.searchHistory.push({ value: this.searchVal })
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory.reverse()))
      }
    }
  }
}
</script>

<style scoped>
.inline-input {
  width: 200px;
}
.clean-all {
  position: absolute;
  top: -13px;
  left: 0px;
  font-size: 12px;
  opacity: 0.6;
  color: #1989fa;
  background: none;
  border: none;
}
.clean-all:hover {
  opacity: 1;
  cursor: pointer;
}
.el-input-group {
  line-height: normal;
  display: inline-table;
  width: 200px;
  border-collapse: separate;
  border-spacing: 0;
}
.el-input-group__append,
.el-input-group__prepend {
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  padding: 5px;
  width: 10px;
  white-space: nowrap;
}
.el-input-group__append .el-button {
  display: inline-block;
  margin: -30px -30px;
}
</style>
