<template>
<div id="default-skin">
  <div class="pro-container">
    <div class="page-head">
      <comrender :html="headtemplate" />
    </div>
    <div class="page-con" v-if="projectInfo">
      <grid-layout
        :layout.sync="curRoute.layout"
        :col-num="24"
        :row-height="3"
        :is-draggable="false"
        :is-resizable="false"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[5, 5]"
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
            <span class="sj l1"></span>
            <span class="sj l2"></span>
            <span class="sj l3"></span>
            <span class="sj l4"></span>
            <comrender :html="item.template" :binddata="item.data" />
          </div>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</div>
</template>
<script>
import VueGridLayout from "vue-grid-layout";
import comrender from "@/views/dynamic-components/render";
import { getProjects, getProjectById } from "@/api/cms";

import { getAllBM } from "@/api/content";

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
      menus: [],
      headtemplate: ``
    };
  },
  methods: {
    async setPage(path, projectId, contentId) {
      if (!this.projectInfo) {
        this.projectInfo = await getProjectById({ id: projectId });
        this.menus = this.projectInfo.json.menus;

        this.headtemplate = `<head-n1 title="${this.projectInfo.name}" ></head-n1>`;
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
    },
    async judge() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let webtype = this.$store.getters.webtype;
      let seatids = this.$store.getters.user.seatId;

      let pros = await getProjects({ pagenum: 1, pagesize: 10 });
      let id = 1;
      for (let p of pros) {
        let ss = "," + p.seatids + ",";
        if (ss.indexOf(seatids) >= 0) {
          id = p.id;
        }
      }
      loading.close();
      this.$router.push("/prev?pid=" + id);
    }
  },
  mounted() {
    let pid = this.$route.query.pid;

    if (!pid) {
      this.judge();
    } else {
      let path = this.$route.query.path;
      let cid = this.$route.query.id;
      this.setPage(path, pid, cid);
      this.$store.dispatch("user/setProjectId", pid);
    }
  },
  watch: {
    $route(to) {
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
  height: calc(100% - 61px);
  position: relative;
  .vue-grid-layout {
    position: absolute;
    width: 100%;
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
