<template>
  <div>
    <el-dialog title="添加角色" :visible.sync="dialogVisible" width="60%">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="角色名称：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="拥有所有权限：">
          <el-switch v-model="form.allright"></el-switch>
        </el-form-item>
        <el-form-item label="显示所有模块：">
          <el-switch v-model="form.allmodel"></el-switch>
        </el-form-item>
        <el-form-item label="显示模块：">
          <el-checkbox-group v-model="form.type">
            <table class="tbl-table" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="lbl">用户管理</td>
                <td>
                  <el-checkbox label="添加用户" name="type"></el-checkbox>
                  <el-checkbox label="查看用户" name="type"></el-checkbox>
                  <el-checkbox label="删除用户" name="type"></el-checkbox>
                </td>
              </tr>
              <tr>
                <td class="lbl">角色管理</td>
                <td>
                  <el-checkbox label="添加角色" name="type"></el-checkbox>
                  <el-checkbox label="删除角色" name="type"></el-checkbox>
                  <el-checkbox label="查看角色" name="type"></el-checkbox>
                </td>
              </tr>
              <tr>
                <td class="lbl">内容管理</td>
                <td>
                  <el-checkbox label="添加内容" name="type"></el-checkbox>
                  <el-checkbox label="修改内容" name="type"></el-checkbox>
                  <el-checkbox label="置顶" name="type"></el-checkbox>
                  <el-checkbox label="批量上传" name="type"></el-checkbox>
                </td>
              </tr>
              <tr>
                <td class="lbl">日志管理</td>
                <td>
                  <el-checkbox label="日志查看" name="type"></el-checkbox>
                  <el-checkbox label="删除日志" name="type"></el-checkbox>
                </td>
              </tr>
            </table>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRole()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        type: [],
        allmodel: false,
        allright: false
      }
    };
  },
  methods: {
    saveRole() {
      ///
      this.dialogVisible = false;
    },
    showDialog() {
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.tbl-table{
    width:100%;border-collapse:collapse;
    td{
        border:solid 1px #ccc;text-align:center;vertical-align:middle;
        &.lbl{
            font-size:14px;font-weight:bold;color:#999;
        }
    }
}
</style>