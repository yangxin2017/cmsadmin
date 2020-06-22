<template>
  <div class="bf-container" v-if="comitem">
    <label class="lbl">{{comitem.name}}：</label>
    <el-date-picker
      style="flex:1;width:auto;"
      v-model="comitem.val"
      type="datetime"
      placeholder="选择日期时间"
    ></el-date-picker>
  </div>
</template>
<script>
export default {
  props: {
    comitem: {
      type: Object,
      default: null
    }
  }
};
</script>
<style lang="scss" scoped>
.bf-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .lbl {
    width: 100px;
    text-align: right;
  }
}
</style>