<template>
  <div class="post-comment-tool">
    <el-avatar :size="50" :src="userInformations.head_hz">user</el-avatar>
    <div class="post-comment-body">
      <el-input
        v-model="comment"
        type="textarea"
        resize="none"
        autosize
        min="3"
        class="comment-txt"
        placeholder="评论些什么吧..."
      ></el-input>
      <div class="d-flex">
        <button @click="postComment()" class="post-btn">发表评论</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'model', 'childCommentId'],
  data() {
    return {
      comment: ''
    }
  },
  computed: {
    userInformations() {
      return this.$store.state.userInfo.userInformation
    }
  },
  methods: {
    postComment() {
      const data = {
        commentId: this.id,
        model: this.model,
        content_hz: this.comment,
        by_comment_hz: this.childCommentId
      }
      this.$store.dispatch('comment/postComment', data).then(
        res => {
          console.log(res)
          this.$emit('updateCommentList')
          this.comment = ''
          this.$message({
            message: '评论成功',
            type: 'success'
          })
        },
        err => {
          console.log(err)
          if (err.status === 401) {
            this.$message({
              message: '登录过期，评论失败，请重新登录',
              type: 'error'
            })
            localStorage.setItem('bannerlogin', 0)
            localStorage.setItem('userToken', '')
            localStorage.setItem('userState', false)
            localStorage.setItem('userInformation', JSON.stringify({ data: '无' }))
            localStorage.setItem('role', '')
            this.$router.go('/home')
          }
          this.$message({
            message: '评论失败',
            type: 'error'
          })
        }
      )
    }
  }
}
</script>

<style scoped>
.post-comment-tool {
  padding: 15px 35px;
  display: flex;
  align-items: flex-start;
}
.post-comment-body {
  margin-left: 20px;
  flex: 1;
}
.comment-txt {
  margin-bottom: 15px;
}
.post-comment-body > .d-flex {
  justify-content: flex-end;
  display: flex;
}
.post-btn {
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 3px;
  color: #fff;
  text-transform: none;
  font-size: 15px;
  font-weight: 400;
  background-color: #2abe5c;
  border-color: #2abe5c;
  border: 0;
}
</style>
