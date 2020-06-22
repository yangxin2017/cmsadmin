<template>
  <div class="bf-container" v-if="comitem">
    <label class="lbl">{{comitem.name}}：</label>
    <el-select v-model="comitem.val" placeholder="请选择">
      <el-option v-for="item in comitem.predatas" :key="item.id" :label="item.name" :value="item.val"></el-option>
    </el-select>
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