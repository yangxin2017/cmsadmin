<template>
  <div id="default-skin">
    <div class="pro-container" v-if="projectInfo">
      <el-row :gutter="12">
        <el-col v-if="showMenu" class="pro-left" :span="4">
          <page-menu
            :menus="projectInfo.json.menus"
            @eventSaving="saveProject($event)"
            @eventSelectMenu="menuChange($event)"
          ></page-menu>
        </el-col>
        <el-col class="pro-wrapper" :span="showMenu ? 16 : 20" v-if="menuInfo">
          <div :style="{'width': projectInfo.width + 'px', 'height': projectInfo.height + 'px'}">
            <page-content
              :layout="menuInfo.layout"
              :projectInfo="projectInfo"
              @eventChooseItem="infoTabItem($event)"
              @eventChangeTab="changeDataTab($event)"
              ref="refPage"
            ></page-content>
          </div>
        </el-col>
        <el-col :span="4">
          <el-tabs type="border-card">
            <el-tab-pane label="页面">
              <page-info
                :projectInfo="projectInfo"
                ref="refpInfo"
                @eventAddBlock="pageAddBlock"
                @eventSavePage="savePage"
              ></page-info>
            </el-tab-pane>
            <el-tab-pane label="组件">
              <component-info
                :categorys="categorys"
                :curMenu="menuInfo"
                :menus="projectInfo.json.menus"
                :curTab="curDataTab"
                ref="refcInfo"
                @eventValueChanged="_refreshTemplate($event)"
                @addCateEvent="addCateEvent"
              ></component-info>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import pagemenu from "@/views/project/project-edit/components/pagemenu";
import pageinfo from "@/views/project/project-edit/components/pageinfo";
import pagecontent from "@/views/project/project-edit/components/pagecontent";
import componentinfo from "@/views/project/project-edit/components/componentinfo";

import { getProjectById, getAllCategorys, saveProject } from "@/api/cms";
import { Base64 } from "js-base64";

export default {
  components: {
    "page-menu": pagemenu,
    "page-info": pageinfo,
    "page-content": pagecontent,
    "component-info": componentinfo
  },
  data() {
    return {
      showMenu: true,
      projectInfo: null,
      menuInfo: null,
      categorys: [],
      curDataTab: null
    };
  },
  methods: {
    addCateEvent() {
      this.categorys = this.$store.getters.categorys;
    },
    pageAddBlock() {
      this.$refs.refPage.addBlock();
    },
    infoTabItem(pas) {
      let param = pas[0];
      let binddata = pas[1];
      let curdatatab = pas[2];
      this.$refs.refcInfo.tabItem(param, binddata, curdatatab);
    },
    /** event */
    _refreshTemplate(param) {
      this.$refs.refPage.refreshTemplate(param);
    },
    changeDataTab(ev) {
      this.curDataTab = ev;
    },
    savePage() {
      let data = this.$refs.refPage.getData();
      console.log("save page data...");
      console.log(data);
    },
    async saveProject() {
      for (let m of this.projectInfo.json.menus) {
        m.layout = m.layout.filter(v => {
          return !v.del;
        });
      }
      let json = this.projectInfo.json;
      const loading = this.$loading();
      //////
      let jsonstr = JSON.stringify(json);
      jsonstr = Base64.encode(jsonstr);

      let names = Base64.encode(this.projectInfo.name);

      await saveProject({
        id: this.projectInfo.id,
        name: names,
        json: jsonstr
      });
      loading.close();
      this.$message({
        message: "保存成功！",
        type: "success"
      });
    },
    //////
    async initInfo(id) {
      this.projectInfo = await getProjectById({ id: id });
      /// 分类
      this.categorys = this.$store.getters.categorys;
      /// 选中第一个
      if (this.projectInfo.json.menus.length > 0) {
        let m = this.projectInfo.json.menus[0];
        this.menuChange(m);
      }
    },
    /////////output
    menuChange(menu) {
      this.menuInfo = menu;
      //
      if (this.$refs.refPage) {
        this.$refs.refPage.reset();
      }
      if (this.$refs.refcInfo) {
        this.$refs.refcInfo.reset();
      }
    }
  },
  mounted() {
    let id = this.$route.query.id;
    this.$store.dispatch("user/setProjectId", id);
    this.initInfo(id);
  }
};
</script>
<style lang="scss" scoped>
.pro-container {
  padding: 20px 20px;

  .pro-wrapper {
    overflow: auto;
  }
}
</style>
