<template>
  <div class="page-con">
    <div class="page-head">
      <!-- <comrender :html="headtemplate" /> -->
      <head-n1 :title="projectInfo.name" :appData="null"></head-n1>
    </div>
    <grid-layout
      :layout.sync="layout"
      :col-num="24"
      :row-height="3"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[5, 5]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        :class="{'hide-mod': item.del}"
      >
        <el-card
          shadow="never"
          @click.native="chooseItem(item)"
          @drop.native="dropHandle($event, item)"
          @dragover.native="allowDrop($event)"
          class="pro-card"
          :class="{sel: curSelItem.i==item.i}"
          :body-style="{padding:'5px'}"
        >
          <div class="btns">
            <span class="el-icon-delete" @click="clearPanel(item)">重置</span>
            <!-- <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deletePanel(item)"> -->
            <span slot="reference" @click="deletePanel(item)" class="el-icon-close">删除</span>
            <!-- </el-popconfirm> -->
          </div>
          <comrender
            @eventChangeTab="changeDataTab($event, item)"
            :html="item.template"
            :binddata="item.data"
          />
        </el-card>
      </grid-item>
    </grid-layout>
    <div class="lines">
      <div class="line-728">
        <span>高度线：728px</span>
      </div>
      <div class="line-908">
        <span>高度线：908px</span>
      </div>
      <div class="line-1268">
        <span>高度线：1268px</span>
      </div>
    </div>
  </div>
</template>
<script>
import VueGridLayout from "vue-grid-layout";
import comrender from "@/views/dynamic-components/render";
import { uuid } from "@/utils/common";
var headn1 = () => import("@/views/dynamic-components/basic/header-n1");

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    comrender: comrender,
    "head-n1": headn1
  },
  props: {
    layout: {
      type: Array,
      default: []
    },
    projectInfo: {
      type: Object,
      default: null
    }
  },
  mounted() {},
  data() {
    return {
      curSelItem: {},
      headtemplate: ``
    };
  },
  methods: {
    reset() {
      this.curSelItem = {};
    },
    getData() {
      let ds = this.layout.filter(v => {
        return !v.del;
      });
      return ds;
    },
    deletePanel(v) {
      v.del = true;
    },
    clearPanel(item) {
      item.template = "";
    },
    ////
    addBlock() {
      let id = uuid();
      let x = this._getMax("x");
      let y = this._getMax("y");
      this.layout.push({
        x: x,
        y: x,
        w: 2,
        h: 10,
        i: id,
        template: "",
        data: null,
        del: false
      });
    },
    allowDrop(event) {
      event.preventDefault();
    },
    dropHandle(event, item) {
      const dragDataStr = event.dataTransfer.getData("data");
      const dragData = JSON.parse(dragDataStr);
      let template = this._getTemplate(dragData);
      item.template = template;
      item.data = dragData;
      ////////////////////////
      if (item.template) {
        let curDataTab = null;
        if (
          item.data &&
          item.data.binddata &&
          item.data.binddata.objs &&
          item.data.binddata.objs.length > 0
        ) {
          curDataTab = item.data.binddata.objs[0];
        }
        this.$emit("eventChooseItem", [
          item.data.params,
          item.data.binddata,
          curDataTab
        ]);
      }
    },
    chooseItem(item) {
      if (this.curSelItem.i != item.i) {
        this.curSelItem = item;
        //////////////////////////////////
        let isHaveTemplate = item.template ? true : false;
        if (isHaveTemplate) {
          let curDataTab = null;
          if (
            item.data &&
            item.data.binddata &&
            item.data.binddata.objs &&
            item.data.binddata.objs.length > 0
          ) {
            curDataTab = item.data.binddata.objs[0];
          }
          this.$emit("eventChooseItem", [
            item.data.params,
            item.data.binddata,
            curDataTab
          ]);
        }
      }
    },
    setCardType(type) {},
    /** event */
    refreshTemplate(item) {
      let dragData = this.curSelItem.data;
      let template = this._getTemplate(dragData);
      this.curSelItem.template = template;
    },
    changeDataTab(ev, item) {
      this.$emit("eventChangeTab", ev);
      this.$emit("eventChooseItem", [item.data.params, item.data.binddata, ev]);
    },
    /** 私有方法 */
    _getMax(key) {
      let mx = 0;
      this.layout.forEach(v => {
        if (v[key] > mx) {
          mx = v[key];
        }
      });
      return mx;
    },
    _getTemplate(dragData) {
      let paramstr = "";
      for (let p of dragData.params) {
        if (p.type == "number" || p.type == "checkbox") {
          paramstr += ` :${p.name}="${p.value}" `;
        } else {
          paramstr += ` ${p.name}="${p.value}" `;
        }
        if (p.children) {
          for (let pi of p.children) {
            if (pi.type == "number" || pi.type == "checkbox") {
              paramstr += ` :${pi.name}="${pi.value}" `;
            } else {
              paramstr += ` ${pi.name}="${pi.value}" `;
            }
          }
        }
      }
      let others = ` data-time="${new Date().getTime()}" `;

      let template = `<${dragData.component} ${paramstr} :appData="appData" @eventChangeTab="eventInfo($event)" ${others}></${dragData.component}>`;
      return template;
    }
  }
};
</script>
<style lang="scss" scoped>
.page-con {
  position: relative;
  .line-728 {
    position: absolute;
    top: 728px;
    left: 0;
    width: 100%;
    height: 3px;
    border-top: dashed 3px #f60;
    text-align: right;
    span {
      font-size: 14px;
      font-weight: bold;
      white-space: nowrap;
      color: #f60;
      position: absolute;
      top: -22px;
      right: 0;
    }
  }
  .line-908 {
    position: absolute;
    top: 908px;
    left: 0;
    width: 100%;
    height: 3px;
    border-top: dashed 3px #f60;
    text-align: right;
    span {
      font-size: 14px;
      font-weight: bold;
      white-space: nowrap;
      color: #f60;
      position: absolute;
      top: -22px;
      right: 0;
    }
  }
  .line-1268 {
    position: absolute;
    top: 1268px;
    left: 0;
    width: 100%;
    height: 3px;
    border-top: dashed 3px #f60;
    text-align: right;
    span {
      font-size: 14px;
      font-weight: bold;
      white-space: nowrap;
      color: #f60;
      position: absolute;
      top: -22px;
      right: 0;
    }
  }
  .hide-mod {
    display: none;
  }
  .pro-card {
    height: 100%;
    position: relative;
    &.sel {
      border: solid 1px #f60;
    }
    .btns {
      position: absolute;
      right: 0px;
      top: 0px;
      background: rgba(0, 0, 0, 0.33);
      padding: 3px 5px;
      span {
        margin: 0 0 0 10px;
        color: #fff;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          color: #f60;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.pro-card .el-card__body {
  height: 100%;
}
</style>
