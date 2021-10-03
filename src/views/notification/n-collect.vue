<template>
  <div id="main">
    <ul v-if="!noMsg && show">
      <li class="ul-li" v-for="(collection, i) in collectList" :key="i">
        <div class="ul-li-div">
          <div class="user-pic" @click="toPersonalPage(collection.json_hz.userId)">
            <el-avatar
              v-if="userList[i]"
              style="margin:5px;"
              :size="50"
              :src="userList[i].head_hz"
            ></el-avatar>

            <el-avatar v-if="!userList[i]" style="margin:5px;" :size="50">user</el-avatar>
          </div>
          <div class="li-right">
            <span class="line-txt"> {{ collection.json_hz.subject }}</span>
            <span class="line-time">
              {{ handleDate(collection.create_time_hz) }}
              <span class="del" @click="deleteMsg(collection.id)">
                <i class="iconfont ">&#xe648;</i>
                删除
              </span>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <div class="loading" v-if="!show"></div>
    <div v-show="noMsg">
      <h3 class="title" style="color:#999;">暂时还没有消息哦✧*｡٩(^㉨^*)و✧*｡</h3>
    </div>
  </div>
</template>

<script>
import { showLoading, endLoading } from '@/plugins/Loading.js'
import { handleDate } from './n-adopt'
export default {
  data() {
    return {
      noMsg: false,
      show: false,
      userList: [],
      collect: this.$store.state.notification.collectList,
      x: ''
    }
  },
  mounted() {
    console.log('creatttttttttttted' + this.collectList.length)

    showLoading('.loading')

    if (this.collectList.length < 1) {
      this.noMsg = true
      endLoading()
    } else {
      let clist = []
      clist = this.collectList.map(val => {
        if (val.status_hz == 0) {
          val.status_hz = 1
          console.log(val)
        }
        return val
      })
      this.collectList = clist
      this.$store.dispatch('notification/update', { list: clist, name: '收藏' })

      this.getALlList()
      this.noMsg = false
    }
  },
  computed: {
    collectList: {
      get() {
        return this.collect
      },
      set(v) {
        this.collect = v
      }
    }
  },
  methods: {
    handleDate(str) {
      return handleDate(str)
    },
    getALlList() {
      this.userList = []
      for (let index = 0; index < this.collectList.length; index++) {
        const item = this.collectList[index]
        console.log(this.collectList.length)
        if (item.level_hz) {
          this.$store.dispatch('notification/getUserInfo', item.json_hz.userId).then(
            res => {
              this.userList[index] = res
              this.x = index
            },
            err => {
              console.log(err)
            }
          )
        }
      }
    },
    deleteMsg(msgId) {
      const _this = this
      this.$confirm('确定删除此消息吗?' + msgId, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$webSocketSend(JSON.stringify({ type: 'delete', id: msgId }))
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        const clist = []
        _this.collectList.map(val => {
          if (val.id !== msgId) {
            clist.push(val)
          }
        })
        this.collectList = clist
        this.$store.dispatch('notification/update', { list: clist, name: '收藏', msgId: msgId })
      })
    }
  },
  watch: {
    collectList(list) {
      console.log('collectList变化了-------------' + list.length)
      if (list.length > 0) {
        this.getALlList()
        this.noMsg = false
      }
    },
    x(val) {
      console.log(val)
      if (val + 1 === this.collectList.length) {
        this.show = true
        endLoading()
        this.x = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
