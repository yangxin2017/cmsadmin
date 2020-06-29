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
          <!-- <el-select v-model="ruleForm.types" placeholder="请选择">
            <el-option label="图片" value="tpwj"></el-option>
            <el-option label="文件" value="nrwj,tpwj"></el-option>
            <el-option label="视频" value="spwj,tpwj"></el-option>
            <el-option label="外链" value="wldz,tpwj"></el-option>
          </el-select> -->
          <el-checkbox-group v-model="ruleForm.types">
            <el-checkbox label="tpwj">图片</el-checkbox>
            <el-checkbox label="nrwj">文件</el-checkbox>
            <el-checkbox label="spwj">视频</el-checkbox>
            <el-checkbox label="gjlb">国家列表（美国，拉美，欧洲，非洲，俄罗斯，中东）</el-checkbox>
            <el-checkbox label="zbgj">周边国家（渤海方向，中印边境，朝鲜半岛，东海方向，南海方向，黄海方向）</el-checkbox>
            <el-checkbox label="wldz">外链地址</el-checkbox>
            <el-checkbox label="sftt">值勤表</el-checkbox>
            <el-checkbox label="mmdj">秘密等级</el-checkbox>
            <el-checkbox label="tag">标签</el-checkbox>
          </el-checkbox-group>
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
        types: ["nrwj", "tpwj", "mmdj", "tag"],
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
        types: ["nrwj", "tpwj", "mmdj", "tag"],
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

      //
      let types = [];
      if (dept.fileds.indexOf("nrwj") >= 0) {
        types.push("nrwj");
      } 
      if (dept.fileds.indexOf("spwj") >= 0) {
        types.push("spwj");
      }
      if (dept.fileds.indexOf("tpwj") >= 0) {
        types.push("tpwj");
      } 
      if (dept.fileds.indexOf("wldz") >= 0) {
        types.push("wldz");
      }
      if (dept.fileds.indexOf("zbgj") >= 0) {
        types.push("zbgj");
      }
      if (dept.fileds.indexOf("gjlb") >= 0) {
        types.push("gjlb");
      }
      if (dept.fileds.indexOf("sftt") >= 0) {
        types.push("sftt");
      }
      if (dept.fileds.indexOf("mmdj") >= 0) {
        types.push("mmdj");
      }
      if (dept.fileds.indexOf("tag") >= 0) {
        types.push("tag");
      }
      this.ruleForm.types = types;
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
