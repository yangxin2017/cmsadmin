<template>
  <div class="app-container">
    <div class="op-buts">
      <!-- <el-button type="primary" @click="addRole()">添加用户</el-button> -->
      <div class="rg-sea">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" @change="refreshpage(1)"></el-input>
      </div>
    </div>

    <el-table :data="tableData" stripe border style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="账号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="名称"></el-table-column>
      <el-table-column prop="deptname" label="部门名称"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
      <el-table-column prop="seatname" label="席位名称"></el-table-column>
      <el-table-column prop="lastloginip" label="上次登录IP"></el-table-column>
      <el-table-column prop="lastlogindate" label="上次登录日期"></el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div class="op-pages">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="refreshpage($event)"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getUsers } from "@/api/cmsuser";

export default {
  data() {
    return {
      tableData: [],
      pageindex: 1,
      pagesize: 10,
      total: 1,
      deptId: undefined,
      loading: false,
      keyword: ""
    };
  },
  mounted() {
    this.initInfo();
  },
  methods: {
    async initInfo() {
      this.loading = true;
      let datas = await getUsers({
        pageindex: this.pageindex,
        pagesize: this.pagesize,
        deptid: this.deptId,
        keyword: this.keyword
      });
      this.loading = false;
      this.tableData = datas.data;
      this.total = datas.total;
    },
    async refreshpage(ev) {
      this.pageindex = ev;
      this.initInfo();
    }
  }
};
</script>
<style lang="scss" scoped>
.op-buts {
  text-align: right;
  margin: 0 0 10px 0;
  .rg-sea {
    width: 200px;
    display:inline-block;
  }
}
.op-pages {
  text-align: left;
  margin: 10px 0 10px 0;
}
</style>