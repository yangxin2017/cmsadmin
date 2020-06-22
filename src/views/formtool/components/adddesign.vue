<template>
  <el-dialog title="编辑信息" :visible.sync="dialogVisible" width="60%">
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="mdesc">
          <el-input type="textarea" v-model="ruleForm.mdesc"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmAdd()" v-loading="loading">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { saveDesign } from "@/api/form";
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        id: undefined,
        name: "",
        mdesc: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      loading: false
    };
  },
  methods: {
    reset() {
      this.ruleForm = {
        id: undefined,
        name: "",
        mdesc: ""
      };
    },
    show(item = null) {
      if (!item) {
        this.reset();
      } else {
        this.ruleForm.id = item.id;
        this.ruleForm.name = item.name;
        this.ruleForm.mdesc = item.mdesc;
      }
      this.dialogVisible = true;
    },
    confirmAdd() {
      this.$refs["ruleForm"].validate(async valid => {
        if (valid) {
          this.loading = true;
          await saveDesign(this.ruleForm);
          this.$emit("refreshDisign");
          this.loading = false;
          this.dialogVisible = false;
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>