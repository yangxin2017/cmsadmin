<template>
  <div class="cms-tags">
    <h3>{{ title }}</h3>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标签名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="是否审核" prop="issh" v-if="ruleForm.webtype == 'gw'">
        <el-switch v-model="ruleForm.issh"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addTag, addSelfTag } from "@/api/content";

export default {
  data() {
    return {
      title: "添加标签",
      ruleForm: {
        name: "",
        parentId: undefined,
        id: undefined,
        status: 1,
        lydw: undefined,
        webtype: "main"
      },
      rules: {
        name: [{ required: true, message: "请输入标签名称", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.ruleForm.webtype = this.$store.getters.webtype;
  },
  methods: {
    reset() {
      this.title = "添加标签";
      this.ruleForm = {
        name: "",
        parentId: undefined,
        id: undefined,
        status: 1,
        lydw: undefined,
        issh: false
      };
    },
    setParentId(pdata) {
      this.reset();
      this.ruleForm.parentId = pdata.id;
      this.title = "添加【" + pdata.name + "】下级标签";
    },
    setEditInfo(pdata) {
      this.ruleForm = pdata;
      this.title = "编辑【" + pdata.name + "】标签";
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.ruleForm.webtype = this.$store.getters.webtype;
          await addTag(this.ruleForm);
          // 分站需要添加自己数据库的tag
          if (this.ruleForm.webtype == 'gw') {
            await addSelfTag(this.ruleForm);
          }

          this.$message({
            message: "操作成功！",
            type: "success"
          });
          this.reset();
          this.$emit("addTagEvent");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.cms-tags {
  h3 {
    margin: 0 0 10px 0;
  }
}
</style>