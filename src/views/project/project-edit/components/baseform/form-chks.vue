<template>
  <div class="lists">
    <label style="margin-bottom:5px;display:block;">{{ title }}：</label>
    <el-checkbox-group v-model="checkList" @change="changeValue">
      <el-checkbox v-for="item in binddata.chooses" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "选择显示列"
    },
    defValue: {
      type: String,
      default: ""
    },
    chooseValues: {
      type: Array,
      default: []
    },
    binddata: {
      type: Object,
      default: null
    }
  },
  mounted(){
      this.checkList = this.defValue.split(",")
  },
  data() {
    return {
      checkList: []
    };
  },
  methods: {
    changeValue() {
      let str = this.checkList.join(",");
      this.$emit("valueChanged", str);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>