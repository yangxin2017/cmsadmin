<template>
  <div class="bf-container" v-if="comitem">
    <label class="lbl">{{comitem.name}}：</label>
    <el-radio-group v-model="comitem.val">
      <el-radio v-for="item in comitem.predatas" :key="item.id" :label="item.val">{{item.name}}</el-radio>
    </el-radio-group>
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