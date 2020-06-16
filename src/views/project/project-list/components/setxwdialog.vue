<template>
  <el-dialog title="设置席位可见性" :visible.sync="dialogVisible" width="50%">
    <span>这是一段信息</span>
    <el-input size="small" :clearable="true" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
      ref="pxwtree"
      class="mytree"
      :data="xws"
      show-checkbox
      node-key="xh"
      :filter-node-method="filterNode"
      :default-checked-keys="chkxwkey"
      :props="props2"
    ></el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmOk()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import { getAllBM } from "@/api/content";
import { updateProConf } from "@/api/cms";
export default {
  watch: {
    filterText(val) {
      this.$refs.pxwtree.filter(val);
    }
  },
  data() {
    return {
      dialogVisible: false,
      filterText: "",
      props2: {
        children: "children",
        label: "mc"
      },
      xws: [],
      chkxwkey: [],
      curproject: null,
      loading: false
    };
  },
  computed: {
    ...mapGetters(["webtype"])
  },
  mounted() {},
  methods: {
    async confirmOk() {
      let selxw = this.$refs.pxwtree.getCheckedNodes();
      let t1 = [];
      for (let xw of selxw) {
        t1.push(xw.xh);
      }
      let seatids = t1.join(",");
      this.loading = true;
      await updateProConf({ id: this.curproject.id, seatids: seatids });
      this.loading = false;
      this.$message({
        message: "操作成功！",
        type: "success"
      });
      this.dialogVisible = false;
      this.$emit("refresh");
    },
    async show(project) {
      this.curproject = project;
      this.chkxwkey = [];
      this.chkxwkey = project.seatids ? project.seatids.split(",") : [];
      this.dialogVisible = true;
      await this.initInfo();
    //   console.log(this.chkxwkey)
    //   this.$refs.pxwtree.setCheckedNodes(this.chkxwkey);
    },
    async initInfo() {
      this.xws = await getAllBM({ webtype: this.webtype });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.mc.indexOf(value) !== -1;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>