<template>
  <div class="app-container">
    <el-table :data="tableData" height="720" border style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="content" label="标题"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editItem(scope.row)">查看内容</el-button>
          <el-button type="text" size="small" @click="delItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin:15px 0;text-align:center;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="changePage($event)"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { ContentMessage, getContentById, DelMessage } from "@/api/content";
import moment from "moment";
export default {
  data() {
    return {
      tableData: [],
      loading: false,
      pageindex: 1,
      pagesize: 10,
      total: 0
    };
  },
  mounted() {
    this.initInfo();
  },
  methods: {
    async editItem(rw) {
      let content = await getContentById({ id: rw.rel_cid });
      if (content) {
        this.$router.push(
          "/content/add?id=" + rw.rel_cid + "&cid=" + content.categoryId
        );
      } else {
        this.$message({
          message: "内容已被删除！",
          type: "warning"
        });
      }
    },
    async initInfo() {
      this.loading = true;
      let dataobj = await ContentMessage({
        pageindex: this.pageindex,
        pagesize: this.pagesize
      });
      this.total = dataobj.total;
      for (let d of dataobj.data) {
        d.time = moment(d.time).format("YYYY-MM-DD HH:mm:ss");
      }
      this.tableData = dataobj.data;
      this.loading = false;
    },
    changePage(ev) {
      this.pageindex = ev;
      this.initInfo();
    },
    delItem(item) {
      let id = item.id;
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await DelMessage({ id: id });
        this.initInfo();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>