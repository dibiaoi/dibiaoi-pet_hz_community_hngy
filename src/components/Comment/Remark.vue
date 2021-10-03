<template>
  <div style="width:900px;margin:0 auto;margin-top:50px;">
    <h3 class="comment-count">{{ commentList.length }}条评论</h3>
    <ul class="message-group">
      <PostComment
        :id="id"
        :model="model"
        v-on:updateCommentList="updateCommentList()"
      ></PostComment>
      <li v-for="(item, index) in commentList" :key="index">
        <CommentItem
          :item="item"
          :model="model"
          :isChild="false"
          :id="id"
          v-on:updateCommentList="updateCommentList()"
        ></CommentItem>
      </li>
    </ul>
  </div>
</template>
<script>
import { getCommentList } from '@/request/api.js'
import PostComment from '@/components/Comment/PostComment.vue'
import CommentItem from '@/components/Comment/CommentItem.vue'
export function handleDate(str) {
  const year = str.slice(0, 4)
  const month = str.slice(5, 7)
  const day = str.slice(8, 10)
  const time = str.slice(11, 19)
  return year + '年' + month + '月' + day + '日  ' + time
}

export default {
  components: { CommentItem, PostComment },
  name: 'MessageGroup',
  data() {
    return {
      commentList: []
    }
  },
  props: {
    model: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  mounted() {
    console.log(this.id);
    this.getCommentsList()
  },
  methods: {
    getCommentsList() {
      getCommentList(this.id, this.model).then(
        res => {
          console.log(res.data)
          this.commentList = res.data.results
        },
        err => {
          console.log(err)
        }
      )
    },
    handleDate(str) {
      return handleDate(str)
    },
    updateCommentList() {
      console.log('接受到了孙组件的信息')
      this.getCommentsList()
    }
  }
}
</script>

<style>
.comment-count {
  text-align: left;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.message-group {
  background: #fff;
}
</style>
