<template>
  <div>
    <div class="hd-content" v-if="params">
      <div class="lf-button">
        <el-button
          v-if="(!category || !category.content) && rolebuts.indexOf('muluploadContent') >= 0"
          @click="showDialog"
          size="small"
          type="primary"
          icon="el-icon-upload2"
        >批量上传</el-button>
        <el-button
          v-if="category && category.content && rolebuts.indexOf('addContent') >= 0"
          @click="addContent"
          size="small"
          type="primary"
          icon="el-icon-plus"
        >添加内容</el-button>

        <el-button v-if="rolebuts.indexOf('deleteContent') >= 0" @click="pldel" size="small" type="danger" icon="el-icon-delete">批量删除</el-button>
        <el-button
          @click="plsh"
          size="small"
          type="primary"
          icon="el-icon-check"
          v-if="rolebuts.indexOf('checkContent') >= 0"
        >批量审核</el-button>
      </div>

      <div class="rg-content">
        <el-radio-group
          v-model="params.status"
          style="display:inline-block;"
          @change="changeStatus()"
        >
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="2">待审核</el-radio>
          <el-radio :label="1">已发布</el-radio>
          <el-radio :label="99">已拒绝</el-radio>
          <el-radio :label="10" v-if="webtype=='gw'">待上报主站</el-radio>
        </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-cascader
          v-model="deptId"
          :options="alldepts"
          :props="{ label: 'name', value: 'id' }"
          @change="changeDept"
          :clearable="true"
        ></el-cascader>

        <el-input
          placeholder="请输入内容"
          v-model="params.title"
          style="width:200px;margin-left:20px;"
          :clearable="true"
          @clear="searchContent()"
        >
          <template slot="append">
            <el-button slot="append" icon="el-icon-search" @click="searchContent()"></el-button>
          </template>
        </el-input>
      </div>
    </div>
    <upload-dialog ref="upDialog" @fileUploaded="refreshData()"></upload-dialog>
  </div>
</template>
<script>
import uploadDialog from "@/views/admin/content/components/upload-dialog";

import { getDepts } from "@/api/cmsuser";
import { mapGetters } from "vuex";

export default {
  components: {
    "upload-dialog": uploadDialog
  },
  props: {
    params: {
      type: Object,
      default: null
    },
    category: {
      type: Object,
      default: null
    },
    rolebuts: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      conStatus: 1,
      searchKey: "",
      deptId: [],
      alldepts: []
    };
  },
  computed: {
    ...mapGetters(["webtype"])
  },
  mounted() {
    this.initInfo();
  },
  methods: {
    addContent() {
      this.$router.push(`add?cid=${this.category.id}`);
    },
    showDialog() {
      this.$refs.upDialog.showDialog();
    },
    async initInfo() {
      let datas = await getDepts();
      this.alldepts = datas;
    },
    changeDept(ev) {
      if (this.deptId.length > 1) {
        this.params.lydw = this.deptId[1];
      } else {
        this.params.lydw = undefined;
      }

      this.$emit("refresh");
    },
    changeStatus() {
      this.$emit("refresh");
    },
    searchContent() {
      this.$emit("refresh");
    },
    pldel() {
      this.$emit("pldelevent");
    },
    plsh() {
      this.$emit("plshevent");
    },
    refreshData() {
      this.$emit("refresh");
    }
  }
};
</script>
<style lang="scss" scoped>
.hd-content {
  display: flex;
  justify-content: space-between;
  .rg-content {
    display: inline-block;
  }
}
</style>