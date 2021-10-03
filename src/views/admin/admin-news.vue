<template>
  <div>
    <NewsManage ref="newsManage">
      <template v-slot:default="data">
        <el-button
          @click.native.prevent="checkInfo(data.info.scope.$index, data.info.newsList)"
          type="primary"
          size="small"
        >
          详情
        </el-button>
        <el-button
          @click.native.prevent="NewsExamine(data.info.scope.$index, data.info.newsList)"
          type="success"
          size="small"
          v-if="data.info.newsList[data.info.scope.$index].state_hz === 0"
        >
          审核
        </el-button>
        <el-button
          @click.native.prevent="rejectNews(data.info.scope.$index, data.info.newsList)"
          type="danger"
          size="small"
          v-if="
            data.info.newsList[data.info.scope.$index].type_hz === 0 &&
              data.info.newsList[data.info.scope.$index].state_hz !== -1
          "
        >
          打回
        </el-button>
        <el-button
          @click.native.prevent="delNews(data.info.newsList[data.info.scope.$index].id)"
          type="danger"
          size="small"
          v-if="data.info.newsList[data.info.scope.$index].type_hz === 1"
        >
          删除
        </el-button>
        <el-button
          @click.native.prevent="reEditNews(data.info.newsList[data.info.scope.$index].id)"
          type="warning"
          size="small"
          v-if="data.info.newsList[data.info.scope.$index].type_hz === 1"
        >
          修改
        </el-button>
      </template>

      <template v-slot:NewsDialog>
        <el-dialog title="资讯详情" :visible.sync="dialogNewsVisible">
          <div v-html="NewsContent"></div>
        </el-dialog>
      </template>
    </NewsManage>
  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import NewsManage from '@/components/Admin/NewsManage.vue'
export default {
  components: {
    NewsManage
  },
  data() {
    return {
      dialogNewsVisible: false,
      dialogEnsureVisible: false,
      checkInfoNewsId: '',
      NewsUserId: '',
      NewsTime: '',
      NewsInfo: '',
      NewsContent: ''
    }
  },
  methods: {
    checkInfo(scope, newsList) {
      this.dialogNewsVisible = true
      this.checkInfoNewsId = newsList[scope].id
      this.NewsInfo = newsList[scope]
      this.NewsContent = this.converter.makeHtml(newsList[scope].content_hz)
    },
    NewsExamine(scope, newsList) {
      this.checkInfoNewsId = newsList[scope].id
      this.$confirm('要通过这条资讯的审核吗？', '提示', {
        confirmButtonText: '通过',
        cancelButtonText: '不通过',
        distinguishCancelAndClose: true,
        type: 'warning'
      })
        .then(() => {
          this.postNewsExamine(true)
        })
        .catch(action => {
          if (action === 'cancel') {
            this.postNewsExamine(false)
          }
        })
    },
    postNewsExamine(isPass) {
      const info = { id: this.checkInfoNewsId, model: 'information', pass: isPass }
      this.$store.dispatch('adminOperation/examine', info).then(
        res => {
          console.log(res)
          this.$message({
            message: res.data,
            type: 'success'
          })
          this.$router.go(0)
        },
        err => {
          console.log(err)
        }
      )
    },
    delNews(newsId) {
      this.$confirm('确定要删除这篇资讯吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        distinguishCancelAndClose: true,
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('editNews/delNews', newsId).then(
            res => {
              console.log(res)
            },
            err => {
              console.log(err)
              if (err.status === 204) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.$refs.newsManage.getNewsList()
              }
            }
          )
        })
        .catch(action => {
          if (action === 'cancel') {
          }
        })
    },
    reEditNews(newsId) {
       this.$router.push({ name: 'news-edit-page', params: { newsId: newsId } })
    },
    rejectNews(scope, newsList) {
      this.$confirm('确定要打回这篇资讯吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.prompt().then(value => {
          const info = {
            content: value.value,
            id: newsList[scope].id,
            model: 'information'
          }
          this.$store.dispatch('adminOperation/rejectIdentity', info).then(
            res => {
              this.$message({
                message: res.data,
                type: 'success'
              })
              // this.$router.go(0)
            },
            err => {
              console.log(err)
            }
          )
        })
      })
    },
    prompt() {
      return this.$prompt('请输入打回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^([\u4e00-\u9fa5]|[0-9_a-zA-Z]){1,15}$/,
        inputErrorMessage: '请勿输入空格且15字内'
      })
    }
  }
}
</script>

<style scoped></style>
