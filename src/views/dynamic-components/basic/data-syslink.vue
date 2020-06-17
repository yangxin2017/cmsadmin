<template>
  <div class="yy-syslink">
    <div class="p-head">
      <span class="p-title">
        <span class="pre"></span>
        {{ title }}
      </span>
    </div>
    <div class="sys-content">
      <el-carousel>
        <el-carousel-item v-for="(item, inx) in this.contents" :key="inx">
          <div class="lkmods">
            <div class="lkmod" v-for="(initem, inx2) in item" :key="inx2">
              <div class="bor">
                <img :src="'/cms/webfile/' + initem.tpwj"
                />
              </div>
              <br />
              <a target="_blank" :href="initem.url" class="txt">{{ initem.title }}</a>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
import { getContent } from "@/api/cms";
export default {
  props: {
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
      curMenu: null,
      lkmod: null,
      contents: []
    };
  },
  mounted() {
    if (this.appData.binddata) {
      this.menus = this.appData.binddata.objs;
      if (this.menus && this.menus.length > 0) {
        this.curMenu = this.menus[0];
        this.lkmod = this.appData.binddata.linkmod[0];
        this.initContent();
      }
    }
  },
  methods: {
    async initContent() {
      let dataobj = await getContent({
        cid: this.curMenu.id,
        pagenum: 1,
        pagesize: 100,
        linkmod: this.lkmod
      });
      let percount = 6;
      let datas = dataobj.data;
      let pages = Math.ceil(datas.length / percount);
      for (let i = 0; i < pages; i++) {
        let tmp = [];
        for (let j = 0; j < percount; j++) {
          let inx = i * percount + j;
          if (inx < datas.length) {
            tmp.push(datas[inx]);
          }
        }
        this.contents.push(tmp);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.yy-syslink {
  height: calc(100% - 35px);
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
  .sys-content {
    height: 100%;
    .lkmods {
      margin-top: 20px;
      .lkmod {
        float: left;
        width: 33.33%;
        text-align: center;
        margin: 0 0 25px 0;
        .bor {
          border: solid 1px #076A78;
          background: rgba(0, 0, 0, 0.22);
          width: 45px;
          height: 45px;
          display: inline-block;
          text-align: center;
          vertical-align: middle;
          img {
            width: 90%;
            height: 90%;
            vertical-align: middle;
            margin-top: 5%;
          }
        }
        .txt {
          font-size: 14px;
          color: #333;
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          width: 90%;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>