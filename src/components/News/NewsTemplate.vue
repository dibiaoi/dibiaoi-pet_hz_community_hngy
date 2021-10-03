<template>
  <div class="container">
    <div class="news-edit-header">
      <input placeholder="输入文章标题..." v-model="title" maxlength="50" class="left-box" />

      <div class="right-box">
        <el-popover
          placement="bottom"
          width="400"
          trigger="manual"
          v-model="visible"
          class="popover"
        >
          <div class="popover-div">
            <span class="title">发布资讯</span>
            <div class="tag">
              <span class="tag-title"
                >选择标签
                <span class="del-btn" v-if="role === 'admin'" @click="isDelTag = !isDelTag">
                  删除标签
                </span>
              </span>
              <div class="tag-box">
                <el-tag
                  @click="selectedTag(tag.id)"
                  :class="activeTag(tag.id)"
                  class="tag-item"
                  :key="tag.id"
                  v-for="tag in tagList"
                  :disable-transitions="false"
                  >{{ tag.name_hz }}
                  <svg
                    @click="delTag(tag)"
                    v-if="role === 'admin'"
                    v-show="isDelTag"
                    t="1601280653727"
                    class="icon del-tag"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="7254"
                    width="15"
                    height="15"
                  >
                    <path
                      d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m273.066667 730.453333L730.453333 785.066667 512 566.613333 293.546667 785.066667 238.933333 730.453333l218.453334-218.453333L238.933333 293.546667 293.546667 238.933333l218.453333 218.453334L730.453333 238.933333 785.066667 293.546667 566.613333 512z"
                      p-id="7255"
                      fill="#808080"
                    ></path>
                  </svg>
                </el-tag>
                <el-input
                  size="medium"
                  v-if="tagInputVal"
                  v-show="role === 'admin'"
                  v-model="addTagVal"
                  ref="tagInput"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handlebulr"
                >
                </el-input>
                <el-button
                  v-else
                  class="tag-item"
                  v-show="role === 'admin'"
                  size="small"
                  @click="showInput"
                  >+添加新标签</el-button
                >
                <div style="width:100%;text-align: center;">
                  <el-button class="publish-btn" @click="publishNews()">发布</el-button>
                </div>
              </div>
            </div>
          </div>
          <div slot="reference">
            <el-button @click="visible = !visible" class="publish"
              >发布 <i class="el-icon-caret-bottom"></i
            ></el-button>
          </div>
        </el-popover>
      </div>
    </div>
    <div class="news-edit-header" style="height:50px">
      <input
        placeholder="输入文章简介...（不超过80字）"
        v-model="introduction"
        maxlength="80"
        class="introduction"
      />
    </div>
    <Markdown @markdown="getMarkdown" :value="value" class="markdown"></Markdown>
  </div>
</template>

<script>
import Markdown from '@/components/News/Markdown.vue'
export default {
  props: ['value'],
  data() {
    return {
      role: localStorage.getItem('role'),
      title: '',
      introduction: '',
      markdown: '',
      visible: false,
      isDelTag: false,
      tagList: [],
      addTagVal: '',
      tagInputVal: false,
      selectedTagList: []
    }
  },
  components: {
    Markdown
  },
  created() {
    this.getAllLabel()
    if (this.value) {
      this.markdown = this.value.content_hz
      this.introduction = this.value.Introduction_hz
      this.title = this.value.title_hz
      for (const item of this.value.label_hz) {
        this.selectedTagList.push(item.id)
      }
    }
  },
  methods: {
    getAllLabel() {
      this.$store.dispatch('postNews/getAllLabel').then(
        res => {
          console.log(res)
          this.tagList = res.results
        },
        err => {
          console.log(err)
        }
      )
    },
    handleClose(tag) {
      this.tagList.splice(this.tagList.indexOf(tag), 1)
    },
    showInput() {
      this.tagInputVal = true
      this.$nextTick(_ => {
        this.$refs.tagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const addTagVal = this.addTagVal
      if (addTagVal === '' || addTagVal === null || addTagVal.length > 10) {
        this.$message({
          message: '这个标签不太合适哦，换一个吧~',
          type: 'warning'
        })
      }
      // 添加标签
      this.$confirm('添加标签‘' + addTagVal + '’?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          name_hz: addTagVal
        }
        // 添加标签接口
        this.$store.dispatch('postNews/addTag', data).then(
          res => {
            console.log(res.data)
            this.tagList.push({ name_hz: addTagVal, id: res.data.id })
            this.tagInputVal = false
            this.addTagVal = ''
          },
          err => {
            console.log(err)
          }
        )
      })
    },
    handlebulr() {
      this.tagInputVal = false
      this.addTagVal = ''
    },
    delTag(tag) {
      this.$confirm('删除标签‘' + tag.name_hz + '’?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('postNews/delTag', { id: tag.id }).then(
          res => {
            console.log(res)
          },
          err => {
            console.log(err)
            this.getAllLabel()
          }
        )
      })
    },
    selectedTag(tagId) {
      if (
        this.selectedTagList.find(item => {
          return item === tagId
        })
      ) {
        this.selectedTagList.splice(
          this.selectedTagList.findIndex(item => item === tagId),
          1
        )
      } else {
        this.selectedTagList.push(tagId)
      }
    },
    activeTag(id) {
      if (
        this.selectedTagList.find(item => {
          return item === id
        })
      ) {
        return 'tag-active'
      }
    },
    // 发布资讯
    publishNews() {
      if (this.title && this.introduction && this.markdown && this.selectedTag) {
        const data = {
          title_hz: this.title,
          Introduction_hz: this.introduction,
          content_hz: this.markdown,
          label_hz: this.selectedTagList
        }
        if (this.value) {
          console.log('调用了修改接口++++++++++++')
          this.$store.dispatch('postNews/editNews', { data, newsId: this.value.id }).then(
            res => {
              if (res.status === 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.$router.go(-1)
              }
            },
            err => {
              console.log(err)
            }
          )
        } else {
          this.$store.dispatch('postNews/publishNew', data).then(
            res => {
              console.log(res)
              if (res.status === 201) {
                this.$message({
                  message: '发布成功',
                  type: 'success'
                })
                this.$router.go(-1)
              }
            },
            err => {
              console.log(err)
            }
          )
        }
      } else {
        this.$message({
          message: '还有内容没有输入哦',
          type: 'warning'
        })
      }
    },
    getMarkdown(data) {
      this.markdown = data
    }
  }
}
</script>
<style>
/* .el-input {
  width: 150px;
}
.el-tag {
  margin-right: 10px;
} */
</style>

<style scoped>
.el-input {
  width: 150px;
}
.el-tag {
  margin-right: 10px;
}
.introduction {
  flex: 1 1 auto;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 15px;
  font-weight: 500;
  color: #000;
  border: none;
  outline: none;
}
.tag-active {
  color: #007fff !important;
  border: 1px solid #007fff !important;
}
.publish-btn {
  padding: 10px 30px;
  border-radius: 2px;
  margin-top: 30px;
}
.publish-btn,
.tag-item:hover,
.del-btn:hover {
  color: #007fff;
  border: 1px solid #007fff;
}
.del-btn {
  margin-left: 20px;
  border-radius: 10px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  padding: 2px 5px;
}
.del-tag {
  position: absolute;
  right: -5px;
  top: -5px;
}
.tag-item {
  position: relative;
  border: 1px solid #f1f1f1;
  border-radius: 2px;
  cursor: pointer;
  color: #606060;
  white-space: nowrap;
  background-color: #fff;
  margin: 5px 3px;
}
.tag-title {
  margin-bottom: 15px;
  font-size: 16px;
}
.tag-box {
  white-space: normal;
}
.tag {
  padding: 10px 0;
  display: flex;
  flex-direction: column;
}
.title {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 20px;
}
.popover-div {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  top: 100%;
  right: 0;
  font-size: 1.2rem;
  white-space: nowrap;
  color: #909090;
  background-color: #fff;
  border-radius: 2px;
  cursor: default;
}
.publish {
  font-size: 16px;
}
.right-box {
  -webkit-box-pack: end;
  justify-content: flex-end;
  width: 400px;
  height: 100%;
}
.right-box {
  display: flex;
  align-items: center;
}
.left-box {
  flex: 1 1 auto;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  border: none;
  outline: none;
}
.container {
  width: 100%;
  height: 100%;
  position: fixed;
}
.news-edit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.4rem;
  height: 4.5rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.markdown {
  flex-grow: 1;
  height: 100%;
}
.popover {
  padding: 0;
}
</style>
