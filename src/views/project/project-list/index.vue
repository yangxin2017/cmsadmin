<template>
  <div class="pro-container">
    <h2 class="pro-title">项目列表</h2>
    <el-row :gutter="12" v-loading="loading">
      <el-col class="col-panel" :span="6" v-for="item in datas" :key="item.id">
        <el-card shadow="hover">
          <b class="name">{{ item.name }}</b>
          <p>{{item.desc}}</p>
          <div class="buttons">
            <el-button class="f-btn" type="text" @click.native="goEdit(item)">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <i class="el-icon-edit"></i>
              </el-tooltip>
            </el-button>
            <el-button class="f-btn" type="text" @click.native="goPrev(item)">
              <el-tooltip class="item" effect="dark" content="预览" placement="top">
                <i class="el-icon-view"></i>
              </el-tooltip>
            </el-button>
            <el-button class="f-btn" type="text" @click.native="editConf(item)">
              <el-tooltip class="item" effect="dark" content="设置" placement="top">
                <i class="el-icon-setting"></i>
              </el-tooltip>
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <add-project @eventAddProject="addProjectEvent($event)" ref="project_dialog"></add-project>
    <conf-project @refresh="refreshData()" ref="ref_confpro"></conf-project>
  </div>
</template>
<script>
var addproject = () => import("./components/addproject");
var confproject = () => import("./components/setxwdialog");
import { getProjects } from "@/api/cms";
import { CmsProject } from "../../../model/project";

export default {
  components: {
    "add-project": addproject,
    "conf-project": confproject
  },
  data() {
    return {
      datas: [],
      loading: false
    };
  },
  methods: {
    refreshData() {
      this.initProject();
    },
    addProject() {
      this.$refs.project_dialog.showDialog();
    },
    addProjectEvent(ev) {
      this.datas.push(ev);
    },
    ////
    async initProject() {
      this.loading = true;
      let projects = await getProjects({ pagenum: 1, pagesize: 10 });
      this.datas = projects;
      this.loading = false;
    },
    goEdit(item) {
      this.$router.push({ path: "/edit", query: { id: item.id } });
    },
    goPrev(item) {
      this.$router.push({ path: "/prev", query: { pid: item.id } });
    },
    editConf(item) {
      this.$refs.ref_confpro.show(item);
    }
  },
  mounted() {
    this.initProject();
  }
};
</script>
<style lang="scss" scoped>
.pro-container {
  padding: 20px 40px;
  .name {
    display: block;
    padding: 0px 0 10px 0;
    text-align: center;
  }
  .pro-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .col-panel {
    margin-bottom: 20px;
  }
}
.buttons {
  display: flex;
  .f-btn {
    flex: 1;
    font-size: 20px;
    padding-bottom: 0;
    &:first-child {
      text-align: left;
    }
    &:last-child {
      text-align: right;
    }
  }
}
</style>
