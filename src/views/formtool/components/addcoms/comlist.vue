<template>
  <div class="coms-container">
    <h3 class="title">组件列表</h3>
    <div class="list-coms">
      <div v-for="item in datas" :key="item.id" class="lc" @click="chooseItem(item)">{{item.cname}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    datas: {
      type: Array,
      default: []
    }
  },
  methods: {
    chooseItem(item) {
      this.$emit("chooseCom", item);
    }
  }
};
</script>
<style lang="scss" scoped>
.coms-container {
  .title {
    margin: 0 0 10px 0;
  }
}
.list-coms {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .lc {
    width: 31%;
    margin: 0 0 10px 0;
    border: solid 1px #eee;
    text-align: center;
    line-height: 40px;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>