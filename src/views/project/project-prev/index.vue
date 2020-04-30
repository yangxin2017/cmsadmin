<template>
  <div class="pro-container">
    <div class="page-con" v-if="projectInfo">
      <grid-layout
        :layout.sync="curRoute.layout"
        :col-num="12"
        :row-height="5"
        :is-draggable="false"
        :is-resizable="false"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="false"
      >
        <grid-item
          v-for="item in curRoute.layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
        >
          <div class="pro-card">
            <comrender :html="item.template" :binddata="item.data" />
          </div>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>
<script>
import VueGridLayout from "vue-grid-layout";
import comrender from "@/views/dynamic-components/render";
import { getProjectById } from "@/api/cms";

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    comrender: comrender
  },
  data() {
    return {
      curRoute: {},
      projectInfo: null,
      menus: []
    };
  },
  methods: {
    async setPage(path, projectId, contentId) {
      if (!this.projectInfo) {
        this.projectInfo = await getProjectById({ id: projectId });
        this.menus = this.projectInfo.json.menus;
      }
      if (!path) {
        for (let m of this.menus) {
          if (m.home) {
            this.curRoute = m;
            break;
          }
        }
      } else {
        for (let m of this.menus) {
          if (m.ename == path) {
            this.curRoute = m;
            break;
          }
        }
      }
    }
  },
  mounted() {
    let pid = this.$route.query.pid;
    let path = this.$route.query.path;
    let cid = this.$route.query.id;
    this.setPage(path, pid, cid);
    this.$store.dispatch("user/setProjectId", pid);
  },
  watch: {
    $route(to) {
      console.log("change path");
      let pid = to.query.pid;
      let path = to.query.path;
      let cid = to.query.id;
      this.setPage(path, pid, cid);
    }
  }
};
</script>
<style lang="scss" scoped>
.pro-container {
  height: 100%;
}
.page-con {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .vue-grid-layout {
    margin: -10px;
    position: absolute;
    width: calc(100% + 20px);
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
