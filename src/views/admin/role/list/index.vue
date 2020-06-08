<template>
  <div class="app-container">
    <div class="op-buts">
      <el-button type="primary" @click="addRole()">添加角色</el-button>
    </div>

    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="rolename" label="名称" width="180"></el-table-column>
      <el-table-column prop="allright" label="拥有所有功能权限"></el-table-column>
      <el-table-column prop="allmodel" label="显示所有模块"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <add-role ref="refAddRole"></add-role>
  </div>
</template>
<script>
import { getRoles } from "@/api/cmsuser";

import addRole from "@/views/admin/role/add";

export default {
  components: {
    "add-role": addRole
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
      let roles = await getRoles();
      this.tableData = roles;
    },
    handleClick(rw) {
      console.log(rw);
    },
    addRole(){
        this.$refs.refAddRole.showDialog()
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