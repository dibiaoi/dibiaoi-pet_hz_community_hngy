<template>
  <div id="main">
    <ul v-if="!noMsg && show">
      <!-- <li class="ul-li" v-for="(adoptMsg, i) in adoptList" :key="i">{{ adoptMsg }}</li> -->
      <li class="ul-li" v-for="(adoptMsg, i) in adoptList" :key="i">
        <div class="ul-li-div" v-if="adoptMsg.level_hz === 6">
          <div class="user-pic" @click="toPersonalPage(adoptMsg.json_hz.userId)">
            <el-avatar style="margin:5px;" :size="50" :src="userList[i].head_hz"></el-avatar>
          </div>
          <div class="li-right">
            <span class="line-txt"> {{ adoptMsg.json_hz.subject }}</span>
            <span class="line-time">
              {{ handleDate(adoptMsg.create_time_hz) }}
              <span class="del" @click="deleteMsg(adoptMsg.id)">
                <i class="iconfont ">&#xe648;</i>
                删除
              </span>
            </span>
          </div>
          <div class="pet-pic">
            <!-- v-if="adoptPicList[i] !== undefined" -->
            <span
              v-if="adoptPicList[i] !== undefined"
              @click="toAdoptPage(adoptMsg.json_hz.petAdoptId)"
              class="adopt-title"
            >
              {{ adoptPicList[i].title_hz.slice(0, 10) }}..
            </span>
          </div>
        </div>

        <div class="ul-li-div" v-if="adoptMsg.level_hz > 1300 && adoptMsg.level_hz < 1310">
          <div class="user-pic">
            <el-avatar style="margin:5px;" :size="50">管理员</el-avatar>
          </div>
          <div class="li-right">
            <span class="line-txt"> {{ adoptMsg.json_hz.subject }} </span>
            <span class="line-reason"> 原因：{{ adoptMsg.json_hz.content }} </span>
            <span class="line-time">
              {{ handleDate(adoptMsg.create_time_hz) }}
              <span class="del" @click="deleteMsg(adoptMsg.id)">
                <i class="iconfont ">&#xe648;</i>
                删除
              </span>
            </span>
          </div>
          <div class="pet-pic">
            <span
              v-if="adoptPicList[i] !== undefined"
              @click="toAdoptPage(adoptMsg.json_hz.petAdoptId)"
              class="adopt-title"
              >{{ adoptPicList[i].title_hz.slice(0, 10) }}..
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
import { getAdoptById } from '@/request/api'
import { showLoading, endLoading } from '@/plugins/Loading.js'

export function handleDate(str) {
  const year = str.slice(0, 4)
  const month = str.slice(5, 7)
  const day = str.slice(8, 10)
  const time = str.slice(11, 19)
  return year + '年' + month + '月' + day + '日  ' + time
}

export default {
  data() {
    return {
      noMsg: false,
      show: false,
      userList: [],
      adoptPicList: [],
      adopt: [],
      x: ''
    }
  },
  mounted() {
    showLoading('.loading')
    console.log('creatttttttttttted' + this.adoptList.length)
    if (this.adoptList.length < 1) {
      this.noMsg = true
      endLoading()
    } else {
      let list = []
      list = this.adoptList.map(val => {
        if (val.status_hz == 0) {
          val.status_hz = 1
          console.log(val)
        }
        return val
      })
      this.adoptList = list
      this.$store.dispatch('notification/update', { list: list, name: '领养' })

      this.getALlList()
      this.noMsg = false
    }
  },
  computed: {
    adoptList: {
      get() {
        return this.adopt
      },
      set(v) {
        this.adopt = v
      }
    }
  },
  methods: {
    getALlList() {
      this.userList = []
      for (let index = 0; index < this.adoptList.length; index++) {
        const item = this.adoptList[index]
        if (item.level_hz === 6) {
          this.$store.dispatch('notification/getUserInfo', item.json_hz.userId).then(
            res => {
              this.userList[index] = res
            },
            err => {
              console.log(err)
            }
          )
        }
        getAdoptById(item.json_hz.petAdoptId).then(
          res => {
            this.adoptPicList[index] = res.data
            this.x = index
          },
          err => {
            console.log(err)
          }
        )
      }
    },
    handleDate(str) {
      return handleDate(str)
    },
    toPersonalPage(id) {
      this.$router.push('/user/personal-page/' + id)
    },
    toAdoptPage(id) {
      this.$router.push('/pet-adopt/adopt-info/' + id)
    },
    deleteMsg(msgId) {
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
      })

      let list = []
      console.log(this.adoptList)
      this.adoptList.forEach(val => {
        console.log(val)
        if (val.id !== msgId) {
          list.push(val)
        }
      })
      this.adoptList = list
      this.$store.dispatch('notification/update', { list: list, name: '领养', msgId: msgId })
    }
  },
  watch: {
    adoptList(list) {
      console.log('adoptList')
      console.log(list)
      this.getALlList()
    },
    show(val) {
      if (val === true) {
        endLoading()
      }
    },
    x(val) {
      if (val + 1 === this.adoptList.length) {
        this.show = true
        this.x = 0
      }
    }
  }
}
</script>

<style>
.loading {
  height: 100px;
  background: #fff;
}
.title {
  font-size: 20px;
  color: #999;
  line-height: 30px;
}
.line-reason {
  font-size: 14px;
  opacity: 0.8;
  margin: 5px 0;
}
.adopt-title {
  font-size: 14px;
  opacity: 0.5;
}
.adopt-title:hover {
  cursor: pointer;
}
.ul-li-div {
  display: flex;
}
.pet-pic {
  padding: 5px;
  float: right;
  background: #ededed;
  height: 60px;
  width: 70px;
}
.pet-pic:hover,
.user-pic:hover {
  cursor: pointer;
}
.li-right:hover .del {
  display: initial;
  cursor: pointer;
}
.del {
  display: none;
  font-size: 13px;
  margin-left: 20px;
}
.ul-li {
  margin: 0px 20px;
  border-bottom: 0.5px solid #e0e0e073;
  padding: 15px 0;
}
.li-right {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-direction: column;
}
.line-txt {
  font-size: 15px;
  line-height: 30px;
}
.line-time {
  font-size: 13px;
  color: #999;
  line-height: 22px;
}
</style>
