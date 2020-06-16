<template>
  <div class="cms-tags" v-if="title!= ''">
    <h3>{{ title }}</h3>
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="tr-dv">
          <b>选择栏目-配置信息</b>
          <el-tree
            :highlight-current="true"
            :expand-on-click-node="false"
            :data="data"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="16" v-loading="loading">
        <div class="cg-gp" v-if="form.cid">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="required">必选</el-checkbox>
            <el-checkbox label="hidden">隐藏</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-col>
    </el-row>
    <div class="buts">
      <el-button type="primary" @click="saveInfo()" v-if="form.cid && form.tid">保存</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { addTagConf, getTagConf } from "@/api/content";
export default {
  computed: {
    ...mapGetters(["categorys"])
  },
  data() {
    return {
      title: "",
      data: [],
      defaultProps: {
        label: "name"
      },
      checkList: [],
      form: {
        cid: undefined,
        tid: undefined,
        str: ""
      },
      loading: false
    };
  },
  mounted() {
    this.data = this.categorys;
  },
  methods: {
    reset() {
      this.title = ""
      this.form = {
        cid: undefined,
        tid: undefined,
        str: ""
      };
      this.checkList = [];
    },
    setCid(cid) {
      this.form.cid = cid;
    },
    setTid(tag) {
      this.checkList = [];
      this.title = `编辑【${tag.name}】配置信息`;
      this.form.tid = tag.id;
    },
    async handleNodeClick(node) {
      this.checkList = [];
      this.setCid(node.id);
      this.loading = true;
      let res = await getTagConf({ cid: this.form.cid, tid: this.form.tid });
      this.loading = false;
      if (res) {
        this.checkList = res.conf.split(",");
      } else {
        this.checkList = [];
      }
    },
    async saveInfo() {
      this.form.str = this.checkList.join(",");
      await addTagConf(this.form);
      this.$message({
        message: "操作成功！",
        type: "success"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.cms-tags {
  h3 {
    margin: 0 0 10px 0;
  }
  .tr-dv {
    border: solid 1px #ddd;
    padding: 10px;
    background: #fefefe;
    b {
      display: block;
      border-bottom: solid 1px #eee;
      padding: 0 0 5px 0;
      color: #999;
      font-size: 14px;
    }
  }
  .buts {
    margin: 15px 0 0 0;
    text-align: right;
  }
}
</style>