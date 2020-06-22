<template>
  <div class="bf-container" v-if="comitem">
    <label class="lbl">{{comitem.name}}：</label>
    <el-input style="flex:1;" v-model="comitem.val" placeholder="请输入内容"></el-input>
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