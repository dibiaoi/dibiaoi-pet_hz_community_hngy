<template>
  <div>
    <NewsTemplate :value="newsInfo" v-if="isShow"></NewsTemplate>
  </div>
</template>

<script>
import NewsTemplate from '@/components/News/NewsTemplate.vue'
export default {
  props: ['newsId'],
  data() {
    return {
      newsInfo: '',
      isShow: false
    }
  },
  created() {
    this.getNewsById()
  },
  methods: {
    getNewsById() {
      this.$store.dispatch('editNews/getNewsById', this.newsId).then(
        res => {
          this.newsInfo = res
          this.isShow = true
        },
        err => {
          console.log(err)
        }
      )
    }
  },
  components: {
    NewsTemplate
  }
}
</script>

<style scoped></style>
