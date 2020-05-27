<template>
  <div class="yy-datarank">
    <div class="p-head">
      <span class="p-title">
        <span class="pre"></span>
        {{ title }}
      </span>
    </div>
    <div class="rank-content">
      <div class="rank-rcb">
        <div class="rcb-dv">
          <span class="jb-black-txt zz-zt">热词榜</span>
        </div>
        <a v-for="item in words" :key="item.id">
          <i class="el-icon-caret-right"></i>
          <span>{{ item.name }}</span>
        </a>
      </div>
      <div class="rank-rcb">
        <div class="rcb-dv">
          <span class="jb-black-txt zz-zt">被搜次数榜</span>
        </div>
        <a v-for="item in contents" :key="item.id" :href="item.href">
          <i class="el-icon-caret-right"></i>
          <span>{{ item.title }}</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { getHotWords, getContent } from "@/api/cms";
export default {
  props: {
    showcount: {
      type: Number,
      default: 5
    },
    title: {
      type: String,
      default: "面板标题"
    },
    appData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      lkmod: null,
      words: [],
      contents: []
    };
  },
  mounted() {
    ///
    if (this.appData.binddata) {
      this.lkmod = this.appData.binddata.linkmod[0];
      this.initContent();
    }
  },
  methods: {
    async initContent() {
      let words = await getHotWords({pagesize: 5});
      let dataobj = await getContent({
        cid: undefined,
        pagenum: this.pagenum,
        pagesize: this.showcount,
        linkmod: this.lkmod,
        orderField: 'clicks'
      });
      this.words = words;
      this.contents = dataobj.data;
    }
  }
};
</script>
<style lang="scss" scoped>
.yy-datarank {
  .p-head {
    display: flex;
    justify-content: space-between;
    height: 35px;
    align-items: center;
    .p-title {
      vertical-align: middle;
      padding-right: 20px;
      white-space: nowrap;
      .pre {
        display: inline-block;
        width: 5px;
        background: #000;
        height: 20px;
        vertical-align: middle;
      }
    }
  }
  .rank-content {
    padding:5px 10px;
    display: flex;
    justify-content: space-between;
    .rank-rcb {
      width:49%;
      a {
        display: block;
        line-height: 30px;
        color: #333;
        font-size: 14px;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>