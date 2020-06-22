<template>
  <div class="yy-images" v-if="datalist && datalist.length > 0">
    <el-carousel indicator-position="none">
      <el-carousel-item v-for="item in datalist" :key="item.id">
        <div class="img-container">
          <a :href="item.href" target="_blank">
            <img :src="'/cms/webfile/' + item.tpwj" alt />
          </a>
          <a class="title" :href="item.href" target="_blank">{{item.title}}</a>
        </div>
      </el-carousel-item>
    </el-carousel>
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
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.yy-images {
  height: 100%;
  .el-carousel {
    height: 100%;
  }
  .el-carousel__container {
    height: 100%;
  }
  .el-carousel__item {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .img-container {
    height: 100%;
    position: relative;
    .title {
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      font-size: 14px;
      color: #fff;
      z-index: 9;
      padding: 0 5px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
