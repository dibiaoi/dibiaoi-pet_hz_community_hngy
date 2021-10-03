<template>
  <div>
    <ListPetHelp :type="'admin'">
      <template v-slot:default="data">
        <div style="margin:0px 15px 15px 15px;padding-top:0px;">
          <el-table :data="data.info.helpList" border style="width: 100%">
            <el-table-column prop="id" label="id" height="200" width="100"> </el-table-column>
            <el-table-column prop="name_hz" label="宠物名称" height="200" width="100"> </el-table-column>
            <el-table-column label="种族" height="200" width="100">
              <template slot-scope="scope">
                {{ data.info.helpList[scope.$index].race_hz === 1 ? '公' : '母' }}
              </template>
            </el-table-column>
            <el-table-column label="描述">
              <template slot-scope="scope">
                {{ des(data.info.helpList[scope.$index].description_hz) }}
              </template>
            </el-table-column>
            <el-table-column prop="state_value_hz" label="状态" width="150"> </el-table-column>
            <el-table-column prop="hospital_hz.hospital_name_hz" label="医院" width="180">
            </el-table-column>
            <el-table-column prop="create_time_hz" label="申请时间"> </el-table-column>
            <el-table-column label="操作" fixed="right" width="200">
              <!-- 操作 -->
              <slot slot-scope="scope" v-bind:helpInfo="{ scope, helpList }"></slot>
            </el-table-column>
          </el-table>
        </div>

        <slot name="petHelpDialog"></slot>
        <slot name="choosePublishDialog"></slot>
        <slot name="sendMoneyDialog"></slot>
      </template>
    </ListPetHelp>
  </div>
</template>

<script>
import ListPetHelp from '@/components/PetHelp/ListPetHelp'
export default {
  computed: {
    helpList() {
      return this.$store.state.petHelpInfo.helpList
    }
  },
  components: {
    ListPetHelp
  },
  methods: {
    des(describe) {
      let newStr = ''
      if (describe.length >= 20) {
        newStr = describe.slice(0, 20) + '...'
      }
      return newStr
    }
  }
}
</script>

<style>
.userinfo-bottom {
  border-top: 0 !important;
}
.tool-bar {
  border-top: 0 !important;
  padding: 0 !important;
}
</style>
