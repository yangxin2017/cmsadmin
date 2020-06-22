<template>
  <div class="bf-container" v-if="comitem">
    <label class="lbl">{{comitem.name}}：</label>
    <el-input-number style="flex:1;width:auto;" v-model="comitem.val"></el-input-number>
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