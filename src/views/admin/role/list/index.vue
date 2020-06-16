<template>
  <div class="app-container">
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="rolename" label="名称" width="180"></el-table-column>
      <el-table-column prop="name" label="介绍" width="180"></el-table-column>
      <!-- <el-table-column prop="allright" label="拥有所有功能权限"></el-table-column>
      <el-table-column prop="allmodel" label="显示所有模块"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="addRole(scope.row)" type="text" size="small">编辑权限</el-button>
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
      for(let r of roles){
        r.name = this._getName(r)
      }
      this.tableData = roles;
    },
    addRole(rw) {
      this.$refs.refAddRole.showDialog(rw);
    },
    _getName(r){
      if(r.rolename == "mainsh"){
        r.name = "首页审核"
      }else if(r.rolename == "syupload"){
        r.name = "首页上传人"
      }else if(r.rolename == "uploadsh"){
        r.name = "单位审核"
      }else if(r.rolename == "upload"){
        r.name = "单位上传"
      }else if(r.rolename == "admin"){
        r.name = "单位管理员"
      }else if(r.rolename == "superuser"){
        r.name = "超级管理员"
      }
      return r.name
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