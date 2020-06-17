<template>
  <div class="app-container">
    <div class="buts">
      <el-button type="primary" @click="addTable()">添加</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        v-for="(item,index) in columns"
        :key="index"
        :prop="item.field"
        :label="item.label"
        :width="item.width"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="mybut" size="mini" @click="editRow(scope.row)">编辑</el-button>
          <el-button class="mybut" size="mini" type="danger" @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <add-table ref="refAdd" @refresh="refreshData"></add-table>
  </div>
</template>
<script>
import { getTableData, delTableData } from "@/api/ext";
import addtable from "@/views/admin/exts/add";

export default {
  components: {
    "add-table": addtable
  },
  mounted() {
    this.initInfo();
  },
  data() {
    return {
      columns: [
        { field: "id", label: "ID", width: "180" },
        { field: "title", label: "名称", width: false },
        { field: "descript", label: "描述", width: false },
        { field: "createTime", label: "时间", width: "200" }
      ],
      tableData: [],
      pageindex: 1,
      pagesize: 10,
      total: 10
    };
  },
  methods: {
    editRow(rw) {
      this.$refs.refAdd.show(rw);
    },
    deleteRow(rw) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await delTableData({ id: rw.id });
        this.initInfo();
      });
    },
    refreshData() {
      this.pageindex = 1;
      this.initInfo();
    },
    async initInfo() {
      let dataobj = await getTableData({
        pageindex: this.pageindex,
        pagesize: this.pagesize
      });
      this.total = dataobj.total;
      this.tableData = dataobj.data;
    },
    addTable() {
      this.$refs.refAdd.show();
    }
  }
};
</script>
<style lang="scss" scoped>
.buts {
  margin: 0 0 10px 0;
}
</style>