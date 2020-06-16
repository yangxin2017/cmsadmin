<template>
  <div>
    <el-table :data="tableData" height="250" border style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editItem(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="delItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin:10px 0 0 0">
      <el-button type="primary" @click="addSeatConf()">添加</el-button>
    </div>
  </div>
</template>
<script>
import { getSeatConfByCid, delSeatConfById } from "@/api/content";
export default {
  data() {
    return {
      tableData: [],
      loading: false,
      curid: -1
    };
  },
  methods: {
    async setLists(cid) {
      this.curid = cid;
      this.refresh();
    },
    async refresh() {
      this.loading = true;
      this.tableData = await getSeatConfByCid({cid: this.curid});
      this.loading = false;
    },
    editItem(item) {
      this.$emit("editCurConfEvent", item);
    },
    delItem(item) {
      let id = item.id;
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await delSeatConfById({ id: id });
        this.refresh();
      });
    },
    addSeatConf(){
        this.$emit("addCurConfEvent");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>