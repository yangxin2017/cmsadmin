<template>
  <div class="yy-video">
    <video
      v-for="(item) in datas"
      :src="item.spwj"
      :key="item.id"
      controls="controls"
    ></video>
  </div>
</template>
<script>
export default {
  props: {
    datalist: {
      type: Array,
      default: []
    }
  },
  computed: {
    datas: function() {
      let res = [];
      if(this.datalist.length > 0){
        res = [this.datalist[0]]
      }
      return res;
    }
  }
};
</script>
<style lang="scss" scoped>
.yy-video {
  height: 100%;
  padding: 10px;
  video {
    object-fit: fill;
    width: 100%;
    height: 100%;
  }
}
</style>
