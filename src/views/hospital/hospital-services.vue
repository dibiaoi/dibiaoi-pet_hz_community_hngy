<template>
  <div class="hospital-service">
    <h3 class="title">医院服务</h3>
    <!-- 筛选框 -->
    <div class="tool-bar">
      <span></span>
      <span @click="priceSelect()">
        价格
        <i class="el-icon-arrow-down" :class="{ 'price-select': isPriceSlect }"></i>
      </span>
      <span></span>
      <el-input
        style="width:200px"
        @keyup.enter.native="selectTrigger()"
        v-model="searchValue"
        placeholder="搜索"
        clearable
      >
      </el-input>
      <el-button
        plain
        style="margin-left:10px"
        type="primary"
        icon="el-icon-search"
        @click="selectTrigger()"
      ></el-button>
    </div>

    <div>
      <ul>
        <li class="hospital-li" v-for="service in serviceList" :key="service.id">
          <div class="li-content">
            <div style="padding:10px;">
              <el-image style="width:200px;height:120px;" :src="service.image_hz"></el-image>
            </div>
            <div class="top-right">
              <div class="top-right-title">
                <span>
                  <strong>{{ service.service_name_hz }}</strong>
                </span>
                <div class="edit-service-btn">
                  <router-link
                    :to="{ name: '服务详情', query: { serviceId: service.id } }"
                    class="empty_hz"
                    >编辑
                  </router-link>
                </div>
              </div>

              <div class="li-status-name">
                <span class="span-content">介绍：{{ service.service_introduction_hz }}</span>
              </div>

              <div class="li-status-name price">
                <span
                  >原价：
                  <span class="orginal-price"> {{ service.original_price_hz }}</span>
                </span>
                <span
                  >现价：
                  <span>{{ service.price_hz }}</span>
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10]"
        :page-size="size"
        layout="total,sizes,  prev, pager, next, jumper"
        :total="serviceCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    hospitalInfo() {
      return this.$store.state.userInfo.hospitalInfo
    }
  },
  data() {
    return {
      isPriceSlect: false,
      serviceList: [],
      ordering: 'price_hz',
      searchValue: '',
      page: 1,
      size: 5,
      serviceCount: 0
    }
  },
  created() {
    this.getServiceList()
  },
  methods: {
    handleSizeChange(val) {
      this.size = val
      this.getServiceList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getServiceList()
    },
    priceSelect() {
      this.isPriceSlect = !this.isPriceSlect
      this.ordering = this.ordering === 'price_hz' ? '-price_hz' : 'price_hz'
      this.getServiceList()
    },
    selectTrigger() {
      this.getServiceList()
    },
    getServiceList() {
      const data = {
        hospital_hz: this.hospitalInfo.id,
        ordering: this.ordering,
        page: this.page,
        size: this.size,
        search: this.searchValue
      }
      this.$store.dispatch('hospitalService/getServiceList', data).then(
        res => {
          console.log(res)
          this.serviceCount = res.count
          this.serviceList = res.results
        },
        err => {
          console.log(err)
        }
      )
    }
  }
}
</script>

<style scoped>
.span-content {
  overflow: hidden;
  font-size: 16px;
  opacity: 0.8;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 300px;
  display: block;
}
.price {
  height: 40px;
  display: contents;
}
.price span {
  margin: 5px 5px 5px 0px;
}
.orginal-price {
  text-decoration: line-through;
  color: #4d4d4d;
  margin: 0px 10px;
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
  font-size: 18px;
  color: #4d4d4d;
  line-height: 40px;
}
.li-content {
  display: flex;
}
.hospital-li {
  border-bottom: 0.5px solid #e0e0e073;
  padding: 10px 15px;
}
.hospital-service {
  height: 100%;
}
.pagination {
  margin-top: 20px;
  width: 100%;
  padding-bottom: 10px;
}
.tool-bar span {
  padding: 0px 15px;
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
  margin: 0px 20px;
  border-top: 0.5px solid #e0e0e073;
}
.price-select {
  transform: rotate(180deg);
  transition: transform 0.4s ease-out;
}
.hospital-service {
  padding: 20px;
}

.userinfo-bottom {
  border-top: 1px solid #f1f1f1;
  display: flex;
  margin: 10px;
  padding: 40px 10px 0px 10px;
  justify-content: center;
}
</style>
