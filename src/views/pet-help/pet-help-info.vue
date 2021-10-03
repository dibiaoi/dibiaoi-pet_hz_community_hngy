<template>
  <div>
    <div class="site-content">
      <div class="container">
        <div class="content-body">
          <div class="content-left ">
            <div class="left-detail-b-p border-style">
              <breadcrumb></breadcrumb>
              <div class="left-detail-pet ">
                <el-image
                  class="defalut-image"
                  :src="petHelp.default_image_hz.image_hz"
                  fit="cover"
                ></el-image>
                <div style="padding:30px 15px;">
                  <p>
                    名字：<span>{{ petHelp.name_hz }}</span>
                  </p>
                  <p>
                    种族：<span>{{
                      petHelp.race_hz === 0 ? '猫' : petHelp.race_hz === 1 ? '狗' : '其他'
                    }}</span>
                  </p>
                  <p>
                    性别：<span>{{ petHelp.sex_hz === 0 ? '公' : '母' }}</span>
                  </p>
                  <p>
                    特点：<el-tag
                      style="margin:0px 2px;"
                      type="success"
                      v-for="feature in petHelp.features_value_hz"
                      :key="feature"
                      >{{ feature }}</el-tag
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="left-detail-introduction border-style">
              <h3 class="help-detail-tit">帮助详情</h3>
              <span style="line-height:30px;">{{ petHelp.description_hz }}</span>
              <el-image
                v-for="img in petHelp.image_hz"
                :key="img.id"
                :src="img.image_hz"
                style="padding:20px"
              ></el-image>
            </div>
            <div class="left-detail-hosital-evidence border-style"></div>
          </div>
          <div class="content-right">
            <HelpInfoRight></HelpInfoRight>
          </div>
        </div>
        <div class="comment-body">
          <Remark :model="'help'" :id="id"></Remark>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Remark from '@/components/Comment/Remark.vue'
import breadcrumb from '@/components/Breadcrumb.vue'
import HelpInfoRight from '@/components/PetHelp/HelpInfoRight.vue'
export default {
  props: ['id'],
  data() {
    return {
      petHelp: ''
    }
  },
  components: {
    breadcrumb,
    HelpInfoRight,
    Remark
  },
  created() {
    this.getPetHelpInfo()
  },
  methods: {
    getPetHelpInfo() {
      this.$store.dispatch('petHelpInfo/getPetHelpInfo', this.id).then(
        res => {
          console.log(res)
          this.petHelp = res
        },
        err => {
          console.log(err)
        }
      )
    }
  }
}
</script>
<style>
.help-detail-tit {
  font-size: 20px;
  line-height: 62px;
  padding: 5px 0px;
  border-bottom: 1px solid #dee0e1;
  margin: 10px 0px;
}
.left-detail-introduction {
  padding: 0px 20px;
}
.defalut-image {
  width: 300px;
  height: 200px;
  border-radius: 10px;
}
.left-detail-pet {
  display: flex;
  padding: 20px;
}
.border-style {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
<style scoped>
.breadcrumb {
  padding: 25px 25px 25px 20px;
  margin: 0;
}
.site-content {
  display: flex;
  justify-content: center;
}
* {
  text-align: left;
}
.container {
  width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content-body {
  margin: 0px 20px 20px 20px;
}

.content-left {
  width: 700px;
  margin-right: 10px;
  height: 100%;
  float: left;
}
.content-right {
  width: 450px;
  height: 100%;
  float: right;
}
.comment-body {
  background-color: #fff;
  margin: 0 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
