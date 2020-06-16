<template>
  <div>
    <el-dialog title="角色权限" :visible.sync="dialogVisible" width="60%">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="角色名称：">
          <el-input readonly="readonly" v-model="form.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="拥有所有权限：">
          <el-switch v-model="form.allright"></el-switch>
        </el-form-item>
        <el-form-item label="显示所有模块：">
          <el-switch v-model="form.allmodel"></el-switch>
        </el-form-item>-->
        <el-form-item label="功能模块：">
          <el-checkbox-group v-model="form.buts">
            <table class="tbl-table" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="lbl">内容管理</td>
                <td>
                  <el-checkbox label="addContent">添加内容</el-checkbox>
                  <el-checkbox label="modifyContent">修改所有内容</el-checkbox>
                  <el-checkbox label="deleteContent">删除所有内容</el-checkbox>
                  <el-checkbox label="checkContent">审核内容</el-checkbox>
                  <el-checkbox label="uncheckContent">撤销内容</el-checkbox>
                  <el-checkbox label="topContent">置顶</el-checkbox>
                  <el-checkbox label="untopContent">取消置顶</el-checkbox>
                  <el-checkbox label="muluploadContent">批量上传</el-checkbox>
                  <el-checkbox label="reportContent">上报首页</el-checkbox>
                </td>
              </tr>
            </table>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="页面模块：">
          <el-checkbox-group v-model="form.rolems">
            <table class="tbl-table" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="lbl">页面管理</td>
                <td>
                  <el-checkbox label="contentManage">内容管理</el-checkbox>
                  <el-checkbox label="tagManage">标签管理</el-checkbox>
                  <el-checkbox label="categoryManage">栏目管理</el-checkbox>
                  <el-checkbox label="userManage">用户管理</el-checkbox>
                  <el-checkbox label="roleManage">角色管理</el-checkbox>
                  <el-checkbox label="deptManage">部门管理</el-checkbox>
                  <!-- <el-checkbox label="logManage">日志查看</el-checkbox> -->
                  <el-checkbox label="projectManage">页面查看</el-checkbox>
                  <el-checkbox label="mesManage">消息管理</el-checkbox>
                  <el-checkbox label="seatManage">席位管理</el-checkbox>
                </td>
              </tr>
            </table>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-loading="loading" type="primary" @click="saveRole()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { saveRole, getRoleById } from "@/api/cmsuser";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        id: "",
        name: "",
        rolems: [],
        buts: []
      },
      loading: false
    };
  },
  methods: {
    async saveRole() {
      ///
      this.loading = true;
      await saveRole({
        id: this.form.id,
        rolems: this.form.rolems.join("|"),
        buts: this.form.buts.join("|")
      });
      this.loading = false;
      this.$message({
        type: "success",
        message: "保存成功!"
      });
      this.dialogVisible = false;
    },
    async showDialog(r) {
      // let role = await getRoleById({id: r.id})
      this.form.id = r.id;
      this.form.name = r.rolename;
      this.form.buts = r.buttonstr ? r.buttonstr.split("|") : [];
      this.form.rolems = r.menustr ? r.menustr.split("|") : [];

      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.tbl-table {
  width: 100%;
  border-collapse: collapse;
  td {
    border: solid 1px #ccc;
    text-align: center;
    vertical-align: middle;
    &.lbl {
      font-size: 14px;
      font-weight: bold;
      color: #999;
    }
  }
}
</style>