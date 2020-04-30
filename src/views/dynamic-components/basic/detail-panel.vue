<template>
  <div class="yy-detail-panel">
    <div class="d-head"></div>
    <div class="d-body" @mousemove="draging($event)" @mouseup="dragEnd($event)">
      <div class="d-left" ref="leftpanel" :style="{width: lfwidth + 'px'}">
        <detail-left :showcount="showcount" :binddata="appData.binddata" :contentId="contentId" @eventSelectList="selectList($event)"></detail-left>
        <div class="drag-con" @mousedown="startDrag($event)">
          <i class="el-icon-more"></i>
        </div>
      </div>
      <div class="d-right">
        <detail-right :content="curData"></detail-right>
      </div>
    </div>
  </div>
</template>
<script>
var detailleft = () => import("@/views/dynamic-components/basic/detail/dleft");
var detailright = () =>
  import("@/views/dynamic-components/basic/detail/dright");

export default {
  props: {
    appData: {
      type: Object,
      default: {}
    },
    contentId: {
      type: String,
      default: ""
    },
    showcount: {
      type: Number,
      default: 10
    }
  },
  mounted(){
  },
  components: {
    "detail-left": detailleft,
    "detail-right": detailright
  },
  data() {
    return {
      isdraging: false,
      lfwidth: 580,
      curData: null
    };
  },
  methods: {
    startDrag(ev) {
      this.isdraging = true;
    },
    draging(ev) {
      if (this.isdraging) {
        this.lfwidth += ev.movementX;
        if (this.lfwidth < 400) {
          this.lfwidth = 400;
        }
      }
    },
    dragEnd(ev) {
      this.isdraging = false;
    },
    ////////////////////
    selectList(item){
      this.curData = item
    }
  }
};
</script>
<style lang="scss" scoped>
.yy-detail-panel {
  height: 100%;
  .d-body {
    border: solid 1px #b9d717;
    width: 100%;
    height: 100%;
    display: flex;

    .d-left {
      width: 580px;
      height: 100%;
      border: solid 1px #b9d717;
      position: relative;
      .drag-con {
        width: 5px;
        background: #556108;
        height: 100%;
        position: absolute;
        right: 0px;
        top: 0px;
        border-left: solid 1px #b9d717;
        cursor: col-resize;
        i {
          color: #fff;
          transform: rotate(90deg);
          position: absolute;
          left: -6px;
          top: 50%;
          margin-top: -5px;
        }
      }
    }
    .d-right {
      flex: 1;
      height: 100%;
    }
  }
}
</style>