<template>
  <div class="my-pets">
    <h3 class="title">我的宠物</h3>

    <div class="content">
      <div class="tool-bar">
        <span></span>
        <span @click="timeSelect()">
          时间
          <i class="el-icon-arrow-down" :class="{timeselct:isTimeSlect}"></i>
        </span>
        <span></span>
        <span>性别</span>
        <el-select style="width:150px" v-model="sexValue" @change="selectTrigger()">
          <el-option v-for="item in sex" :label="item.label" :key="item.value" :value="item.value"></el-option>
        </el-select>
        <span>种族</span>
        <el-select style="width:150px" v-model="raceValue" @change="selectTrigger()">
          <el-option v-for="item in race" :label="item.label" :key="item.value" :value="item.value"></el-option>
        </el-select>
        <span>|</span>
        <el-input style="width:200px" @keyup.enter.native="selectTrigger()" v-model="searchValue" placeholder="根据昵称搜索">
          <el-button slot="append" icon="el-icon-search" @click="selectTrigger()"></el-button>
        </el-input>
      </div>
      <div class="list-null content" v-bind:class="{show:isListNotNull}">
        <h3 class="title" style="color:#999;">没有搜索到哦(╥╯^╰╥)</h3>
      </div>
      <div class="list">
        <ul>
          <li class="pets-li" v-for="pet in petList" :key="pet.id">
            <div class="li-content">
              <div>
                <el-avatar :size="70" :src="pet.default_image_hz.image_hz"></el-avatar>
              </div>
              <div class="pets-top-right">
                <div class="top-right-title">
                  <span style="font-size:20px">
                    <strong>{{pet.name_hz}}</strong>
                  </span>
                  <div class="pets-focus-btn">
                    <button class="empty_hz" @click="toPetIfo(pet.id)">宠物详情</button>
                  </div>
                </div>
                <div>
                  <span>{{pet.sex_value_hz}}</span>
                  <span>{{pet.race_value_hz}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[ 2, 5, 10]"
          :page-size="size"
          layout="total,sizes,  prev, pager, next, jumper"
          :total="petCount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTimeSlect: false,
      sex: [
        { value: 0, label: '公' },
        { value: 1, label: '母' },
        { value: '', label: '不限' }
      ],
      sexValue: '',
      race: [
        { value: 0, label: '猫' },
        { value: 1, label: '狗' },
        { value: 2, label: '其他' },
        { value: '', label: '不限' }
      ],
      raceValue: '',
      searchValue: '',
      ordering: 'create_time_hz',
      page: 1,
      size: 5,
      isListNotNull: true
    }
  },
  computed: {
    userInformation() {
      return this.$store.state.userInfo.userInformation
    },
    petList() {
      return this.$store.state.PetList.petList
    },
    petCount() {
      return this.$store.state.PetList.petCount
    }
  },
  methods: {
    toPetIfo(id) {
      this.$router.push('/user-center/pet-info/' + id)
    },
    getpetList() {
      const data = {
        sex_hz: this.sexValue,
        race_hz: this.raceValue,
        search: this.searchValue,
        ordering: this.ordering,
        page: this.page,
        size: this.size
      }
      this.$store.dispatch('PetList/getPetList', data)
    },
    timeSelect() {
      this.isTimeSlect = !this.isTimeSlect
      this.ordering = this.ordering === 'create_time_hz' ? '-create_time_hz' : 'create_time_hz'
      this.getpetList()
    },
    selectTrigger() {
      this.getpetList()
    },
    handleSizeChange(val) {
      this.size = val
      this.getpetList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getpetList()
    }
  },
  created() {
    this.getpetList()
  },
  watch: {
    petList(newVal) {
      console.log(newVal)
      if (newVal.length === 0) {
        this.isListNotNull = false
      } else {
        this.isListNotNull = true
      }
    }
  }
}
</script>

<style scoped>
.timeselct {
  transform: rotate(180deg);
  transition: transform 0.4s ease-out;
}
.tool-bar span,
.pets-top-right span {
  padding: 0px 15px;
  font-size: 15px;
  color: #4d4d4d;
}
.my-pets {
  height: 100%;
}
.content {
  border-top: 1px solid #f1f1f1;
  margin: 20px;
}

.tool-bar {
  height: 60px;
  width: 100%;
  padding: 10px 0px;
  display: flex;
  text-align: center;
  align-items: center;
}
.list {
  border-top: 1px solid #f1f1f1;
}
.li-content {
  display: flex;
}
.pets-li {
  border-bottom: 0.5px solid #e0e0e073;
  padding: 10px 15px 10px 20px;
}
.pets-top-right {
  margin-top: 10px;
  margin-bottom: 10px;

  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}
.top-right-title {
  font-size: 20px;
  color: #4d4d4d;
  min-height: 40px;
}
.pets-focus-btn {
  float: right;
  margin-right: 20px;
}
.list-null {
  height: 300px;
  width: 100%;

  display: flex;
  justify-content: center;
  text-align: center;
}
.show {
  display: none;
}
</style>