<template>
  <div class="app-container">

    <el-table
      :data="tableData"
      stripe
      border
      row-key="id"
      style="width: 100%"
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="parentname" label="父部门"></el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.parentid" @click="addDept(scope.row)" size="mini">添加下一级</el-button>
          <el-button v-if="scope.row.parentid" @click="editDept(scope.row)" size="mini">编辑</el-button>
          <el-button v-if="scope.row.parentid && scope.row.parentid != 14" @click="delDept(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <edit-dialog ref="ediDialog" @addDeptEvent="refresh()"></edit-dialog>
  </div>
</template>
<script>
import { getDepts, delDept } from "@/api/cmsuser";
import editDialog from "@/views/admin/dept/components/editDialog";

export default {
  components: {
    "edit-dialog": editDialog
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
      let datas = await getDepts();
      this.tableData = datas;
      this.loading = false;
    },
    refresh(){
      this.initInfo()
    },
    editDept(rw) {
      this.$refs.ediDialog.initDepts(this.tableData)
      this.$refs.ediDialog.showDialog('修改部门', rw)
    },
    addDept(rw){
      this.$refs.ediDialog.initDepts(this.tableData)
      this.$refs.ediDialog.showDialogForAdd('添加部门', rw)
    },
    delDept(rw){
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await delDept({ id: rw.id });
        this.refresh();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.op-buts {
  text-align: left;
  margin: 0 0 10px 0;
}
</style>