<template>
  <el-dialog title="添加信息" :visible.sync="dialogVisible" width="60%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="descript">
        <el-input type="textarea" v-model="ruleForm.descript"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmOk">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addTableData } from "@/api/ext";
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        title: "",
        descript: "",
        id: undefined
      },
      rules: {
        title: [{ required: true, message: "请输入标题名称", trigger: "blur" }]
      },
      loading: false
    };
  },
  methods: {
    reset() {
      this.ruleForm = {
        title: "",
        desc: "",
        id: undefined
      };
    },
    show(rw) {
      if (rw) {
        this.ruleForm = rw;
      } else {
          this.reset();
      }
      this.dialogVisible = true;
    },
    confirmOk() {
      this.$refs["ruleForm"].validate(async valid => {
        if (valid) {
          this.loading = true;
          await addTableData(this.ruleForm);
          this.loading = false;
          this.$emit("refresh");
        } else {
          return false;
        }
      });
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>