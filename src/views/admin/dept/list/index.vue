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
          <el-button @click="editDept(scope.row)" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <edit-dialog ref="ediDialog"></edit-dialog>
  </div>
</template>
<script>
import { getDepts } from "@/api/cmsuser";
import editDialog from "@/views/admin/dept/components/editDialog";

export default {
  components: {
    "edit-dialog": editDialog
  },
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.initInfo();
  },
  methods: {
    async initInfo() {
      let datas = await getDepts();
      this.tableData = datas;
    },
    editDept(rw) {
      this.$refs.ediDialog.initDepts(this.tableData)
      this.$refs.ediDialog.showDialog('修改部门', rw)
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