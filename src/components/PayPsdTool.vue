<template>
  <div>
    <div class="pay-psd" :id="`id_${id}`">
      <el-input
        v-for="(v, i) in 6"
        :key="i"
        type="password"
        maxlength="1"
        @input="changeInput"
        @click="changePsd"
        v-model="psdList[i]"
        @keyup.native="keyUp($event)"
        @keydown="oldPsdList = psdList.length"
        class="shortInput"
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { psdList: [], oldPsdList: [], isDelete: false, sInput: '' }
  },
  props: ['id'],
  mounted() {
    this.sInput = document.querySelectorAll(`#id_${this.id} .shortInput`)
  },
  methods: {
    keyUp(e) {
      let index = this.psdList.length
      // console.log(index)
      // console.log(this.psdList)
      if (e.keyCode === 8) {
        this.isDelete = true
        if (this.oldPsdList === this.psdList.length) {
          if (index === this.psdList.length) {
            this.psdList.pop()
          }
          index--
        } else {
          index > 0 && index--
        }
        this.sInput[index].focus()
      } else if (this.isDelete && index === this.psdList.length && /^\d$/.test(e.key)) {
        this.isDelete = false
        this.psdList.pop()
        this.psdList.push(e.key)
        this.sInput[this.psdList.length] && this.sInput[this.psdList.length].focus()
      }
      localStorage.setItem('getPsd', this.psdList.join(''))
    },
    changePsd() {
      let index = this.psdList.length
      index === 6 && index--
      this.sInput[index].focus()
    },
    changeInput() {
      let index = this.psdList.length
      const val = this.psdList[index - 1]

      if (!/[0-9]/.test(val)) {
        this.psdList.pop()
        return
      }
      if (!val) {
        this.psdList.pop()
        index--
        if (index > 0) this.sInput[index - 1].focus()
      } else {
        if (index < 6) this.sInput[index].focus()
      }
    }
  }
}
</script>

<style scoped>
.pay-psd {
  display: inline-block;
  /* border-radius: 5px;
  padding: 5px 0;
  border: 1px solid #cccccc; */
  position: relative;
  margin-left: 1px;
}
.shortInput {
  text-align: center;
  font-size: 15px;
  float: left;
  width: 40px;
  height: 30px !important;
  color: #333;
  outline: #ff0067;
  border-right: 1px solid #eee;
}
</style>
