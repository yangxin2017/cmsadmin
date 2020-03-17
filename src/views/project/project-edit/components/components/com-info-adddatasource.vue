<template>
<div>
    <el-dialog title="添加数据源"
        :visible.sync="dialogVisible">
        
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="编码" prop="code">
                <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="ruleForm.type" placeholder="请选择数据源类型">
                    <el-option label="文档" value="word"></el-option>
                    <el-option label="图片" value="picture"></el-option>
                    <el-option label="视频" value="video"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</div>    
</template>
<script>
export default {
  data() {
    return {
        dialogVisible: false,
        ruleForm: {
            title: '',
            code: '',
            desc: '',
            type: 'word'
        },
        rules: {
            title: [
                { required: true, message: '请输入名称', trigger: 'blur' }
            ],
            code: [
                { required: true, message: '请输入编码', trigger: 'blur' }
            ],
            desc: [
                { required: true, message: '请输入描述内容', trigger: 'blur' }
            ]
        }
    }
  },
  methods: {
    show() {
      this.dialogVisible = true;
    }, 
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    },
  }
};
</script>
<style lang="scss" scoped>
</style>
