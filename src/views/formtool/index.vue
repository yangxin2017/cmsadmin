<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="op-buts">
        <el-button type="primary" @click="showAdd">添加</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="mdesc" label="描述"></el-table-column>
        <el-table-column label="操作" width="500px">
          <template slot-scope="scope">
            <el-button @click="editRow(scope.row)" size="mini">编辑信息</el-button>
            <el-button @click="editFormRow(scope.row)" size="mini">编辑表单</el-button>
            <el-button @click="prevRow(scope.row)" size="mini">预览表单</el-button>
            <el-button @click="viewData(scope.row)" size="mini">查看数据</el-button>
            <el-button @click="delRow(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <add-design ref="refAddDesign" @refreshDisign="initInfo"></add-design>
  </div>
</template>
<script>
import { getDesigns, delDesign } from "@/api/form";
import adddesign from "@/views/formtool/components/adddesign";
export default {
  components: {
    "add-design": adddesign
  },
  data() {
    return {
      tableData: [],
      loading: false
    };
  },
  methods: {
    async initInfo() {
      this.loading = true;
      this.tableData = await getDesigns();
      this.loading = false;
    },
    showAdd() {
      this.$refs.refAddDesign.show();
    },
    editRow(rw) {
      this.$refs.refAddDesign.show(rw);
    },
    delRow(rw) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await delDesign({ id: rw.id });
        this.initInfo();
      });
    },
    editFormRow(rw) {
      this.$router.push("add?id=" + rw.id);
    },
    prevRow(rw){
      this.$router.push("prev?id=" + rw.id);
    },
    viewData(rw){
      this.$router.push("viewdata?id=" + rw.id);
    }
  },
  mounted() {
    this.initInfo();
  }
};
</script>
<style lang="scss" scoped>
.op-buts {
  margin: 10px 0;
  text-align: right;
}
</style>