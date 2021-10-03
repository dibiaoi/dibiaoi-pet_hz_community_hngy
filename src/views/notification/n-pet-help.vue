<template>
  <div id="main">
    <ul v-if="!noMsg && show">
      <li class="ul-li" v-for="(phelp, i) in petHelpList" :key="i">
        <div class="ul-li-div">
          <div class="user-pic" @click="toPetHelpPage(phelp.json_hz.petHelpId)">
            <el-avatar
              v-if="helpList[i]"
              style="margin:5px;"
              :size="50"
              :src="helpList[i].default_image_hz.image_hz"
            ></el-avatar>
            <el-avatar v-if="!helpList[i]" style="margin:5px;" :size="50">user</el-avatar>
          </div>
          <div class="li-right">
            <span class="line-txt"> {{ phelp.json_hz.content }}</span>
            <span class="line-reason"> {{ phelp.json_hz.subject }}</span>
            <span class="line-time">
              {{ handleDate(phelp.create_time_hz) }}
              <span class="del" @click="deleteMsg(phelp.id)">
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
import { getPetHelp } from '@/request/api.js'
export default {
  data() {
    return {
      noMsg: false,
      show: false,
      helpList: [],
      petHelp: this.$store.state.notification.petHelpList,
      x: ''
    }
  },
  mounted() {
    console.log('creatttttttttttted' + this.petHelpList.length)

    showLoading('.loading')
    if (this.petHelpList.length < 1) {
      this.noMsg = true
      endLoading()
    } else {
      this.getALlList()
      this.noMsg = false
    }
  },
  computed: {
    petHelpList: {
      get() {
        return this.petHelp
      },
      set(v) {
        this.petHelp = v
      }
    }
  },
  methods: {
    handleDate(str) {
      return handleDate(str)
    },
    getALlList() {
      this.userList = []
      for (let index = 0; index < this.petHelpList.length; index++) {
        const item = this.petHelpList[index]
        console.log('petHelpId-----------------------')
        console.log(item.json_hz)
        if (item.level_hz) {
          getPetHelp(item.json_hz.petHelpId).then(
            res => {
              console.log(res)
              this.helpList[index] = res.data
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
      this.$confirm('确定删除此消息吗?' + msgId, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$webSocketSend(JSON.stringify({ type: 'delete', id: msgId, msgId: msgId }))
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })

      let list = []
      console.log(this.petHelpList)
      this.petHelpList.forEach(val => {
        console.log(val)
        if (val.id !== msgId) {
          list.push(val)
        }
      })
      this.petHelpList = list
      this.$store.dispatch('notification/update', { list: list, name: '众筹' })
    },
    toPetHelpPage(id) {
      this.$router.push('/pet-help/pet-help-info/' + id)
    }
  },
  watch: {
    petHelpList(list) {
      console.log('petHelpList变化了-------------' + list.length)
      if (list.length > 0) {
        this.getALlList()
        this.noMsg = false
      }
    },
    x(val) {
      console.log(val)
      if (val + 1 === this.petHelpList.length) {
        this.show = true
        endLoading()
        this.x = 0
      }
    }
  }
}
</script>

<style scoped></style>
