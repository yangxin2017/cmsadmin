<template>
  <div class="yy-image-list" v-if="datalist && datalist.length > 0">
    <div class="img-list">
      <ul v-if="datalist && datalist.length > 0">
        <li v-for="item in datalist" :key="item.id" :style="{width: 'calc(' + (100 / lieshu) + '% - 10px)'}">
          <div class="img">
            <a :href="item.href" target="_blank"><img :src="'/cms/webfile/' + item.tpwj" alt />
            </a>
          </div>
          <p class="titles">
            <i class="el-icon-caret-right"></i>
            <a class="link" :href="item.href" target="_blank">
              <span class="symbol"></span>
              {{ item.title }}
            </a>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    datalist: {
      type: Array,
      default: []
    },
    imgwidth: {
      type: Number,
      default: 30
    },
    lieshu: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      fone: {}
    };
  },
  mounted(){
    console.log(this.lieshu)
  }
};
</script>
<style lang="scss">
.yy-image-list {
  height: 100%;
  padding: 0 10px;
  .img-list {
    ul {
      display: flex;
      margin: 0;
      padding: 0;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        .img {
          border: solid 1px #687c83;
          width: 100%;
          height: calc(100% - 40px);
          padding:6px;
          img{
              width:100%;height:100%;
          }
        }
        .titles{
            margin:5px 0;white-space:nowrap;
            height: 33px;overflow: hidden;
        }

        height: 121px;
        width: 30%;
        margin-bottom:10px;
      }
    }
  }
}
</style>
