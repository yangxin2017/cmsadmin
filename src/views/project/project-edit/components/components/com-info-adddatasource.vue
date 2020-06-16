<template>
  <div>
    <el-dialog title="添加数据源" :visible.sync="dialogVisible" :before-close="reset">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- <el-form-item label="父级栏目">
          <el-select v-model="ruleForm.pcode" placeholder="请选择" clearable>
            <el-option v-for="item in cates" :key="item.id" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input :disabled="ruleForm.cid != undefined" v-model="ruleForm.code"></el-input>
        </el-form-item>
        <!-- <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>-->
        <el-form-item label="类型" prop="types">
          <el-select v-model="ruleForm.types" placeholder="请选择">
            <el-option label="图片" value="tpwj"></el-option>
            <el-option label="文件" value="nrwj,tpwj"></el-option>
            <el-option label="视频" value="spwj,tpwj"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" v-loading="loading" @click="submitForm('ruleForm')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addCategory } from "@/api/cmsuser";

export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      ruleForm: {
        title: "",
        code: "",
        desc: "",
        types: "nrwj,tpwj",
        pcode: "",
        isallow: false,
        cid: undefined
      },
      rules: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入编码", trigger: "blur" }],
        desc: [{ required: true, message: "请输入描述内容", trigger: "blur" }],
        types: [{ required: true, message: "请选择类型", trigger: "blur" }]
      },
      cates: []
    };
  },
  mounted() {
    this.initinfo();
  },
  methods: {
    reset() {
      this.dialogVisible = false;
      this.ruleForm = {
        title: "",
        code: "",
        desc: "",
        types: "nrwj,tpwj",
        pcode: "",
        isallow: false,
        cid: undefined
      };
    },
    async initinfo() {
      await this.$store.dispatch("user/getAllCates");
      this.cates = this.$store.getters.categorys;
    },
    show(pcode = "") {
      this.dialogVisible = true;
      this.ruleForm.pcode = pcode;
    },
    setDept(dept) {
      this.ruleForm.title = dept.name;
      this.ruleForm.code = dept.code;
      this.ruleForm.desc = dept.desc;
      if (dept.fileds.indexOf("nrwj") >= 0) {
        this.ruleForm.types = "nrwj,tpwj";
      } else if (dept.fileds.indexOf("spwj") >= 0) {
        this.ruleForm.types = "spwj,tpwj";
      } else if (dept.fileds.indexOf("tpwj") >= 0) {
        this.ruleForm.types = "tpwj";
      }
      this.ruleForm.cid = dept.id;
    },
    async saveInfo() {
      this.loading = true;
      let dataobj = await addCategory(this.ruleForm);
      if (dataobj.success == false) {
        this.$message.error(dataobj.msg);
      } else {
        await this.initinfo();
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.dialogVisible = false;
        this.$emit("addCateEvent");
      }
      this.$emit("addCateEvent");
      this.loading = false;
      this.reset();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.ruleForm.pcode) {
            this.ruleForm.isallow = false;
          } else {
            this.ruleForm.isallow = true;
          }
          this.saveInfo();
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
