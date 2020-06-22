<template>
  <div class="yy-zqb yy-datapanel">
    <div class="p-head">
      <div class="p-title">
        <span class="pre"></span>
        {{ title }}
      </div>
    </div>
    <div class="yy-zqb-table" style="height:calc(100% - 23px);">
      <el-carousel indicator-position="none" style="height:100%;width:100%;">
        <el-carousel-item v-for="(item, index) in zqbs" :key="index" style="display:flex;justify-content:space-between;">
          <table class="table-wrap" v-for="(itemi, indexi) in item" :key="indexi">
            <thead>
              <tr>
                <th>席位</th>
                <th>姓名</th>
                <th>职务</th>
                <th>电话</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(initem,index2) in itemi" :key="index2">
                <td>{{initem.xw}}</td>
                <td>{{initem.xm}}</td>
                <td>{{initem.zw}}</td>
                <td>{{initem.dh}}</td>
              </tr>
            </tbody>
          </table>
        </el-carousel-item>
      </el-carousel>
      <!-- <div class="table-wrap" v-for="(item, index) in zqbs" :key="index">
        <table width="100%">
          <thead>
            <tr>
              <th>席位</th>
              <th>姓名</th>
              <th>职务</th>
              <th>电话</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(initem,index2) in item" :key="index2">
              <td>{{initem.xw}}</td>
              <td>{{initem.xm}}</td>
              <td>{{initem.zw}}</td>
              <td>{{initem.dh}}</td>
            </tr>
          </tbody>
        </table>
      </div>-->
    </div>
  </div>
</template>
<script>
import { getContent } from "@/api/cms";
export default {
  props: {
    showcount: {
      type: Number,
      default: 4
    },
    title: {
      type: String,
      default: "标题名称"
    },
    appData: {
      type: Object,
      default: {}
    },
    liecount: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      curMenu: null,
      zqbs: []
    };
  },
  mounted() {
    if (this.appData.binddata) {
      this.menus = this.appData.binddata.objs;
      if (this.menus && this.menus.length > 0) {
        this.curMenu = this.menus[0];
        this.initContent();
      }
    }
  },
  methods: {
    async initContent() {
      let dataobj = await getContent({
        cid: this.curMenu.id,
        pagenum: 1,
        pagesize: 1,
        linkmod: null
      });
      let content = dataobj.data.length > 0 ? dataobj.data[0] : null;
      // let arr1 = [];
      // let arr2 = [];
      let resarr = [];
      let finarr = [];
      if (content && content.zqbjson) {
        let json = content.zqbjson;
        let numpages = Math.ceil(json.length / this.showcount);
        for (let i = 0; i < numpages; i++) {
          let tmp = [];
          for (let j = 0; j < this.showcount; j++) {
            let inx = i * this.showcount + j;
            if (inx < json.length) {
              tmp.push(json[inx]);
            }
          }
          resarr.push(tmp);
        }
        // lieshu
        let fcount = Math.ceil(resarr.length / this.liecount);
        for (let i = 0; i < fcount; i++) {
          let tmp = [];
          for (let j = 0; j < this.liecount; j++) {
            let inx = i * this.liecount + j;
            tmp.push(resarr[inx]);
          }
          finarr.push(tmp);
        }
      }
      ////////
      this.zqbs = finarr;
    }
  }
};
</script>
<style lang="scss" scoped>
.yy-zqb {
  width: 100%;
  height: 100%;

  .yy-lbt {
    flex: 1;
    height: 100%;
    margin-right: 20px;
    .lbt-bor {
      height: 100%;
      width: 100%;
      border: solid 1px #333;
      padding: 10px;
    }
  }

  .yy-zqb-table {
    display: flex;
    justify-content: space-between;
    padding: 10px;
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
    .table-wrap {
      width: 100%;
      flex:1;margin:0 10px 0 0;
      th {
        background: rgba(255, 255, 255, 0.15);
        color: #fff;
        text-align: center;
        vertical-align: middle;
        font-size: 14px;
        line-height: 30px;
      }
      td {
        color: #fff;
        text-align: center;
        vertical-align: middle;
        font-size: 14px;
        line-height: 30px;
      }
      tr:nth-child(even) {
        td {
          background: rgba(255, 255, 255, 0.15);
        }
      }
    }
  }
}
</style>