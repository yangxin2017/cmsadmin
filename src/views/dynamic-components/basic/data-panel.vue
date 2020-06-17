<template>
  <div class="yy-datapanel">
    <div class="p-head">
      <span class="p-title">
        <span class="pre"></span>
        {{ title }}
      </span>
      <ul class="p-menu" v-if="titlemenus && titlemenus.length > 0">
        <li
          v-for="item in titlemenus"
          :key="item.id"
          :class="{'sel': item.id == curVal}"
          @click="changeMenuTab(item)"
        >{{item.name}}</li>
      </ul>
      <span class="p-more" v-if="showmore == true">
        <el-link v-if="blank == true" :href="morehref" target="_blank">更多</el-link>
        <el-link v-if="blank == false" :href="morehref">更多</el-link>
      </span>
    </div>
    <div class="p-body" v-loading="loading" v-if="curMenu">
      <data-list :datalist="datalists" v-if="curMenu.type == 'list'" :appData="appData"></data-list>
      <data-image v-if="curMenu.type == 'image'" :datalist="datalists" :appData="appData"></data-image>
      <data-image-text
        :imgwidth="imgwidth"
        v-if="curMenu.type == 'img-text'"
        :datalist="datalists"
        :appData="appData"
      ></data-image-text>
      <data-timeline v-if="curMenu.type == 'timeline'" :datalist="datalists" :appData="appData"></data-timeline>
      <data-image-list v-if="curMenu.type == 'img-list'" :datalist="datalists" :appData="appData"></data-image-list>
      <data-video v-if="curMenu.type == 'video'" :datalist="datalists" :appData="appData"></data-video>
    </div>
  </div>
</template>
<script>
import datalist from "./coms/data-list";
import dataimage from "./coms/data-image";
import dataimagetext from "./coms/data-image-text";
import datatimeline from "./coms/data-timeline";
import dataimagelist from "./coms/data-image-list";
import datavideo from "./coms/data-video";

import { getContent } from "@/api/cms";

export default {
  props: {
    title: {
      type: String,
      default: "面板标题"
    },
    showmore: {
      type: Boolean,
      default: true
    },
    blank: {
      type: Boolean,
      default: false
    },
    morehref: {
      type: String,
      default: "#"
    },
    showtype: {
      type: String,
      default: "image"
    },
    showcount: {
      type: Number,
      default: 5
    },
    imgwidth: {
      type: Number,
      default: 30
    },
    appData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      datalists: [],
      oldParam: { id: -1, count: 5 },
      titlemenus: [],
      curVal: -1,
      curMenu: null,
      loading: false
    };
  },
  components: {
    "data-list": datalist,
    "data-image": dataimage,
    "data-image-text": dataimagetext,
    "data-timeline": datatimeline,
    "data-image-list": dataimagelist,
    "data-video": datavideo
  },
  methods: {
    changeMenuTab(item) {
      this.curMenu = item;
      let val = item.id;
      this.curVal = val;
      this.setContent(val);
      this.$emit('eventChangeTab', item)
      /// xuyao chuan caidan
    },
    async setContent(val) {
      if (this.oldParam.id != val || this.oldParam.count != this.showcount) {
        this.oldParam.id = val;
        this.oldParam.count = this.showcount;

        let lkmod = this.appData.binddata.linkmod[0];

        this.loading = true;
        let contents = await getContent({
          cid: val,
          pagenum: 1,
          pagesize: this.showcount,
          linkmod: lkmod
        });
        this.datalists = contents.data;
        this.loading = false;
      }
    },
    refreshContents() {
      if (this.appData.binddata) {
        if (
          this.appData.binddata.datasource != -1 &&
          this.appData.binddata.datasource.length > 0
        ) {
          let firstDataSource = this.appData.binddata.datasource[0][1];

          this.titlemenus = this.appData.binddata.objs;

          this.curVal = firstDataSource;

          this.curMenu = this.appData.binddata.objs[0]
          //this.curMenu.type = this.showtype;

          this.setContent(firstDataSource);
        }
      }
    }
  },
  mounted() {
    // 刷新数据
    this.refreshContents();
  }
};
</script>
<style lang="scss" scoped>
.yy-datapanel {
  height: 100%;
  .p-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .p-title {
      vertical-align: middle;
      padding-right: 10px;
      white-space: nowrap;
      .pre {
        display: inline-block;
        width: 5px;
        background: #000;
        height: 20px;
        vertical-align: middle;
      }
    }
    .p-more {
      text-align: right;
      display: none;
    }
    .p-menu {
      display: inline-block;
      white-space: nowrap;
      margin: 0;
      padding: 0;
      overflow: auto;
      flex: 1;
      li {
        display: inline-block;
        font-size: 12px;
        margin: 0 8px;
        cursor: pointer;
        white-space: nowrap;
        &.sel {
          color: #f90;
        }
      }
    }
  }
  .p-body {
    margin-top: 5px;
    height: calc(100% - 41px);
    overflow: auto;
  }
}
</style>
