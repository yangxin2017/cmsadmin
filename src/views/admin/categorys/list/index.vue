<template>
  <div class="cms-container">
    <div class="btn-adds">
      <el-button @click="addDept(null)" type="primary">添加栏目</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      row-key="id"
      style="width: 100%"
      :tree-props="{children: 'children'}"
      v-loading="loading"
    >
      <el-table-column prop="name" label="栏目名称" width="180"></el-table-column>
      <el-table-column prop="code" label="栏目编码"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.content" @click="addDept(scope.row)" size="mini">添加子栏目</el-button>
          <el-button @click="editDept(scope.row)" size="mini" type="primary">编辑</el-button>
          <el-button @click="delDept(scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <com-info-adddatasource ref="edDialog" @addCateEvent="addCateEvent"></com-info-adddatasource>
  </div>
</template>
<script>
import { getAllCategorys } from "@/api/cms";
import { delCategory } from "@/api/cmsuser";
import cominfoadddatasource from "@/views/project/project-edit/components/components/com-info-adddatasource";

export default {
  components: {
    "com-info-adddatasource": cominfoadddatasource
  },
  data() {
    return {
      tableData: [],
      loading: false
    };
  },
  mounted() {
    this.initInfo();
  },
  methods: {
    async initInfo() {
      this.loading = true;
      let cates = await getAllCategorys({});
      this.tableData = cates;
      this.loading = false;
    },
    addDept(dept) {
      if (!dept) {
        this.$refs.edDialog.show();
      } else {
        this.$refs.edDialog.show(dept.code);
      }
    },
    addCateEvent() {
      this.initInfo();
    },
    editDept(dept) {
      this.$refs.edDialog.setDept(dept)  
      this.$refs.edDialog.show(dept.code);
    },
    delDept(dept) {
      this.$confirm("您确定要删除吗？该栏目下面的内容将会被删除！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await delCategory({ cid: dept.id });
        this.initInfo();
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.cms-container {
  padding: 15px;
  height: 100%;
  .btn-adds {
    margin: 10px 0;
  }
}
</style>