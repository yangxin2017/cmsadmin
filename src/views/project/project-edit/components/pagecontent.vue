<template>
  <div class="page-con">
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="5"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
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
            <i class="el-icon-edit" @click="clearPanel(item)"></i>
            <i class="el-icon-delete" @click="deletePanel(item.i)"></i>
          </div>
          <comrender :html="item.template" :binddata="item.data" />
        </el-card>
      </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import VueGridLayout from "vue-grid-layout";
import comrender from "@/views/dynamic-components/render";
import { uuid } from "@/utils/common";

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    comrender: comrender
  },
  props: {
    layout: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      curSelItem: {}
    };
  },
  methods: {
    reset() {
      this.curSelItem = {};
    },
    getData() {
      return this.layout;
    },
    deletePanel(inx) {
      this.layout = this.layout.filter(v => {
        return v.i != inx;
      });
    },
    clearPanel(item){
      item.template = ''
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
        data: null
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
    },
    chooseItem(item) {
      this.curSelItem = item;
      //////////////////////////////////
      let isHaveTemplate = item.template ? true : false;
      if (isHaveTemplate) {
        this.$emit("eventChooseItem", [item.data.params, item.data.binddata]);
      }
    },
    /** event */
    refreshTemplate(item) {
      let dragData = this.curSelItem.data;
      let template = this._getTemplate(dragData);
      this.curSelItem.template = template;
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

      let template = `<${dragData.component} ${paramstr} :appData="appData" ${others}></${dragData.component}>`;
      return template;
    }
  }
};
</script>
<style lang="scss" scoped>
.page-con {
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
      background: #000;
      padding: 3px 5px;
      i {
        margin: 0 0 0 10px;
        color: #fff;
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
