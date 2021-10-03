<template>
  <div class="am-payPwd" :id="`ids_${id}`">
    <input
      type="password"
      maxlength="1"
      autocomplete="new-password"
      @input="changeInput"
      @click="changePwd"
      v-model="pwdList[i]"
      @keyup="keyUp($event)"
      @keydown="oldPwdList = pwdList.length"
      class="shortInput"
      v-for="(v, i) in 6"
      :key="i"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      pwdList: [],
      oldPwdList: [],
      isDelete: false,
      ipt: ''
    }
  },
  props: {
    id: {
      type: Number,
      default: 0 // 当一个页面有多个密码输入框时，用id来区分
    }
  },
  mounted() {
    this.ipt = document.querySelectorAll(`#ids_${this.id} .shortInput`)
  },
  methods: {
    keyUp(ev) {
      let index = this.pwdList.length
      // console.log(index)
      if (!index) return
      if (ev.keyCode === 8) {
        this.isDelete = true
        if (this.oldPwdList === this.pwdList.length) {
          if (index === this.pwdList.length) {
            this.pwdList.pop()
          }
          index--
        } else {
          index > 0 && index--
        }
        this.ipt[index].focus()
      } else if (this.isDelete && index === this.pwdList.length && /^\d$/.test(ev.key)) {
        this.isDelete = false
        this.pwdList.pop()
        this.pwdList.push(ev.key)
        this.ipt[this.pwdList.length] && this.ipt[this.pwdList.length].focus()
      }
      console.log(this.pwdList.join(''))
      localStorage.setItem('getPsd', this.pwdList.join(''))
    },
    changePwd() {
      let index = this.pwdList.length
      index === 6 && index--
      this.ipt[index].focus()
    },
    changeInput() {
      let index = this.pwdList.length
      let val = this.pwdList[index - 1]
      if (!/[0-9]/.test(val)) {
        this.pwdList.pop()
        return
      }
      if (!val) {
        this.pwdList.pop()
        index--
        if (index > 0) this.ipt[index - 1].focus()
      } else {
        if (index < 6) this.ipt[index].focus()
      }
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
.am-payPwd {
  display: inline-block;
  border-radius: 5px;
  padding: 10px;
  position: relative;
  margin-left: 2px;
  .shortInput {
    margin: 1px;
    text-align: center;
    font-size: 20px;
    float: left;
    width: 40px;
    height: 40px !important;
    color: #333;
    outline: #ff0067;
    border-radius: 3px;
    border: 1px solid #dcdfe6;
  }
}
</style>
