<template>
  <div id="main">
    <ul v-if="!noMsg && show">
      <li class="ul-li" v-for="(remark, i) in remarkList" :key="i">
        <div class="ul-li-div">
          <div class="user-pic" @click="toPersonalPage(remark.json_hz.userId)">
            <el-avatar
              v-if="show"
              style="margin:5px;"
              :size="50"
              :src="userList[i].head_hz"
            ></el-avatar>

            <el-avatar v-if="!userList[i]" style="margin:5px;" :size="50">user</el-avatar>
          </div>
          <div class="li-right">
            <span v-if="!remark.json_hz.is_reply" class="line-txt">
              <strong> {{ userList[i].nickname_hz }} </strong>
              评论了你
            </span>
            <span v-if="remark.json_hz.is_reply" class="line-txt">
              <strong> {{ userList[i].nickname_hz }} </strong>
              回复了我的评论：
              <span class="line-reason">{{ remark.json_hz.by_comment }}</span>
            </span>
            <span class="line-reason"> {{ remark.json_hz.content }}</span>
            <span class="line-time">
              {{ handleDate(remark.create_time_hz) }}
              <span class="del" @click="deleteMsg(remark.id)">
                <i class="iconfont ">&#xe648;</i>
                删除
              </span>
            </span>
          </div>

          <div class="pet-pic">
            <span
              v-if="List[i]"
              @click="toPage(remark.json_hz.model, remark.json_hz.id)"
              class="adopt-title"
              >{{ List[i].title_hz.slice(0, 7) }}..
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
import { getAdoptById, getPetHelpInfo } from '@/request/api'
import { showLoading, endLoading } from '@/plugins/Loading.js'
import { handleDate } from './n-adopt'
export default {
  data() {
    return {
      noMsg: false,
      show: false,
      userList: [],
      List: [],
      remark: this.$store.state.notification.remarkList,
      x: ''
    }
  },
  mounted() {
    showLoading('.loading')
    console.log('creatttttttttttted' + this.remarkList.length)

    if (this.remarkList.length < 1) {
      this.noMsg = true
      endLoading()
    } else {
      let clist = []
      clist = this.remarkList.map(val => {
        if (val.status_hz == 0) {
          val.status_hz = 1
          console.log(val)
        }
        return val
      })
      this.remarkList = clist
      this.$store.dispatch('notification/update', { list: clist, name: '留言' })

      this.getALlList()
      this.noMsg = false
    }
  },
  computed: {
    remarkList: {
      get() {
        return this.remark
      },
      set(v) {
        this.remark = v
      }
    }
  },
  methods: {
    handleDate(str) {
      return handleDate(str)
    },
    getALlList() {
      this.userList = []
      for (let index = 0; index < this.remarkList.length; index++) {
        const item = this.remarkList[index]

        this.$store.dispatch('notification/getUserInfo', item.json_hz.userId).then(
          res => {
            console.log(res)
            this.userList[index] = res
            this.x = index
            console.log(this.x)
          },
          err => {
            console.log(err)
          }
        )
        if (item.json_hz.model === 'adopt') {
          getAdoptById(item.json_hz.id).then(
            res => {
              this.List[index] = res.data
              console.log(this.List[index])
            },
            err => {
              console.log(err)
            }
          )
        } else if (item.json_hz.model === 'help') {
          getPetHelpInfo(item.json_hz.id).then(
            res => {
              this.List[index] = res.data
            },
            err => {
              console.log(err)
            }
          )
        }
      }
    },
    toPersonalPage(id) {
      this.$router.push('/user/personal-page/' + id)
    },
    toPage(model, id) {
      if (model === 'adopt') {
        this.$router.push('/pet-adopt/adopt-info/' + id)
      } else {
        this.$router.push('/pet-help/pet-help-info/' + id)
      }
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
      console.log(this.remarkList)
      this.remarkList.forEach(val => {
        console.log(val)
        if (val.id !== msgId) {
          list.push(val)
        }
      })
      this.remarkList = list
      this.$store.dispatch('notification/update', { list: list, name: '留言', msgId: msgId })
    }
  },
  watch: {
    remarkList(list) {
      console.log('remarkList-------------' + list.length)
      if (list.length > 0) {
        this.getALlList()
        this.noMsg = false
      }
    },
    x(val) {
      if (val + 1 === this.remarkList.length) {
        // console.log(val)
        // console.log(this.remarkList.length)
        this.show = true
        endLoading()
        this.x = 0
      }
    }
  }
}
</script>

<style scoped>
.line-txt {
  font-size: 14px;
}
</style>
