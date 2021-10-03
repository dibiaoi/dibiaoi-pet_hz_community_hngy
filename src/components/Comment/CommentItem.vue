<template>
  <div>
    <div class="li-content">
      <div class="content-left" @click="toPersonalPage(item.user_hz.id)">
        <el-avatar :size="avatarSize" :src="item.user_hz.head_hz"></el-avatar>
      </div>
      <div class="content-right">
        <div class="user" @click="toPersonalPage(item.user_hz.id)">
          <a target="_blank">{{ item.user_hz.nickname_hz }}</a>
        </div>
        <p class="text">{{ item.content_hz }}</p>
        <div class="info">
          <span class="time">{{ handleDate(item.comment_time_hz) }}</span>
          <span @click="commentLike(true, item.id)" class="like" v-if="!handleIsLike(item.is_like)">
            <i
              ><svg
                t="1600650404077"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4502"
                width="16"
                height="16"
              >
                <path
                  d="M857.28 344.992H592.448c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96A102.72 102.72 0 0 0 857.28 344.992zM128 872V483.04a3.36 3.36 0 0 1 3.36-3.36H208v395.68h-76.64A3.36 3.36 0 0 1 128 872z m767.328-417.088L821.6 843.872a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088v-59.264c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496H857.28a38.72 38.72 0 0 1 38.048 45.888z"
                  p-id="4503"
                  fill="#616263"
                ></path></svg
            ></i>
            {{ likeCount }}</span
          >
          <span
            @click="commentLike(false, item.id)"
            class="liked"
            v-if="handleIsLike(item.is_like)"
          >
            <i>
              <svg
                t="1600650697052"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4784"
                width="16"
                height="16"
              >
                <path
                  d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04z m793.28-138.048l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96A102.72 102.72 0 0 0 857.28 344.992z"
                  p-id="4785"
                  fill="#2abe5c"
                ></path>
              </svg>
            </i>
            {{ likeCount }}</span
          >
          <span class="reply" v-if="!isChild" @click="isfoled = !isfoled">回复</span>
          <span class="reply" @click="delComment()" v-if="userInformations.id === item.user_hz.id"
            >删除</span
          >
        </div>
        <!--：id应该传最大的领养 item.id是评论id  -->
        <PostComment
          v-if="isfoled"
          style="width:100%"
          :user="item.user_hz"
          :id="id"
          :childCommentId="item.id"
          :model="model"
          v-on="$listeners"
        ></PostComment>
      </div>
    </div>
    <div v-if="item.comment" class="comment-child">
      <li v-for="cm in item.comment" :key="cm.id">
        <CommentItem :item="cm" :model="model" :avatar="30" :isChild="true"></CommentItem>
      </li>
    </div>
  </div>
</template>

<script>
import PostComment from '@/components/Comment/PostComment.vue'
import handleDate from '@/plugins/TimeHandler.js'

export default {
  props: ['item', 'avatar', 'model', 'isChild', 'id'],
  name: 'CommentItem',
  computed: {
    userInformations() {
      return this.$store.state.userInfo.userInformation
    }
  },
  components: { PostComment },
  mounted() {},
  data() {
    return {
      isfoled: false,
      islike: false,
      avatarSize: this.avatar || 50,
      likeCount: this.item.like_count || ''
    }
  },
  methods: {
    handleIsLike(like) {
      if (like || this.islike) {
        return true
      } else {
        return false
      }
    },
    handleDate(str) {
      return handleDate(str)
    },
    commentLike(like, commentId) {
      const data = {
        commentId,
        model: this.model,
        cancel: !like
      }
      this.$store.dispatch('commentLike/commentLike', data).then(
        res => {
          console.log(res)
          this.$message({
            message: res.detail,
            type: 'success'
          })

          this.islike = !this.islike
          if (res.code === 2002) {
            this.likeCount--
          } else {
            this.likeCount++
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    toPersonalPage(id) {
      this.$router.push({ name: 'personal-page', params: { id: id } })
    },
    delComment() {
      const info = {
        id: this.item.id,
        model: this.model
      }
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('comment/delComment', info).then(
          res => {
            console.log(res)
          },
          err => {
            console.log(err)
            if (err.status === 204) {
              this.$emit('updateCommentList')
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          }
        )
      })
    }
  }
}
</script>

<style scoped>
.li-content {
  display: flex;
  padding: 0px 30px;
}
.content-left:hover,
.user:hover {
  opacity: 0.85;
}
.content-left {
  cursor: pointer;
  margin-top: 15px;
  margin-left: 10px;
  float: left;
  position: relative;
}
.content-right {
  float: right;
  position: relative;
  border-top: 1px solid #e5e9ef;
  display: flex;
  width: 100%;
  align-items: baseline;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
}
.content-right > .user {
  color: #2abe5c;
  font-size: 16px;
  font-weight: 600;
}
.content-right a {
  outline: none;
  text-decoration: none;
  cursor: pointer;
}
.content-right > .info {
  display: flex;
  align-items: center;
  color: #99a2aa;

  line-height: 23px;
  font-size: 14px;
}
.content-right > .info > span {
  margin-right: 20px;
}
.like {
  color: #616263;
  opacity: 0.6;
}
.like,
.liked {
  display: flex;
  justify-content: center;
  align-items: center;
}
.like:hover,
.liked:hover {
  cursor: pointer;
  opacity: 1;
}
.reply {
  padding: 5px 7px;
  border-radius: 4px;
  margin-right: 15px;
  cursor: pointer;
  display: inline-block;
}
.reply:hover {
  background-color: #ededed;
  color: #2abe5c;
}
.comment-child {
  margin-left: 80px;
}
</style>
