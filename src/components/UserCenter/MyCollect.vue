<template>
  <div>
    <div>
      <ul>
        <li class="adopt-li" v-for="adopt in adoptCollectList" :key="adopt.id">
          <div class="li-content">
            <div class="adopt-avatar">
              <el-avatar :size="80" :src="adopt.pet_hz.default_image_hz.image_hz"></el-avatar>
            </div>
            <div class="top-right">
              <div class="top-right-title">
                <span>
                  <strong>{{adopt.title_hz}}</strong>
                </span>
                <div class="myf-focus-btn">
                  <button @click="cancelCollect(adopt.id)" class="empty_hz">取消收藏</button>
                  <button @click="goAdoptInfo(adopt.id)" class="empty_hz">详情</button>
                </div>
              </div>
              <div class="li-status-name">
                <span class="span-content">描述：{{adopt.description_hz}}</span>
              </div>
              <div class="li-status-name">
                <span>状态：{{adopt.state_value_hz}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- <div class="list-null content" v-bind:class="{show:isListNotNull}">
      <h3 class="title" style="color:#999;">没有搜索到哦(╥╯^╰╥)</h3>
    </div>-->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[ 1,2, 5, 10]"
        :page-size="size"
        layout="total,sizes,  prev, pager, next, jumper"
        :total="adoptCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adoptCollectList: [],
      adoptCount: 0,
      isListNotNull: true,
      page: 1,
      size: 5
    }
  },
  created() {
    this.getAdoptCollectList()
  },
  methods: {
    getAdoptCollectList() {
      this.$store
        .dispatch('collect/getCollectList', {
          page: this.page,
          size: this.size,
          model: 'adopt'
        })
        .then(
          res => {
            console.log(res.data)
            this.adoptCollectList = res.data.results
            this.adoptCount = res.data.count
          },
          err => {
            console.log(err)
          }
        )
    },
    handleSizeChange(val) {
      this.size = val
      this.getAdoptCollectList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getAdoptCollectList()
    },
    goAdoptInfo(adoptId) {
      this.$router.push('/pet-adopt/adopt-info/' + adoptId)
    },
    cancelCollect(adoptId) {
      const cancel = true
      this.$store
        .dispatch('collect/postCollect', {
          model: 'adopt',
          cancel,
          id: adoptId
        })
        .then(
          res => {
            this.$message({
              message: res.data.detail,
              type: 'success'
            })
            console.log(res.status)
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
.adopt-li {
  border-bottom: 0.5px solid #e0e0e073;
  padding: 10px 15px;
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
.top-right-title {
  font-size: 18px;
  color: #4d4d4d;
}
.li-status-name {
  font-size: 14px;
  min-height: 25px;
}
.myf-focus-btn {
  float: right;
  margin-right: 20px;
}
.pagination {
  margin-top: 20px;
  width: 100%;
  padding-bottom: 10px;
}
</style>