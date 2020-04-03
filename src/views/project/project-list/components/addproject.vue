<template>
<div>
    <el-dialog title="添加项目" :visible.sync="dialogVisible" width="40%">
        <div class="forms">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="项目名称" prop="cname">
                    <el-input v-model="ruleForm.cname"></el-input>
                </el-form-item>
                <el-form-item label="英文名称" prop="ename">
                    <el-input v-model="ruleForm.ename"></el-input>
                </el-form-item>
                <el-form-item label="项目描述" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="项目缩略图">
                    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" style="margin-top:0;" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</div>
</template>
<script>
export default {
    data(){
        return {
            dialogVisible: false,
            ruleForm: {
                cname: '',
                ename: '',
                desc: '',
                pic: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3435142851,1686079016&fm=26&gp=0.jpg'
            },
            rules: {
                cname: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' }
                ],
                ename: [
                    { required: true, message: '请输入英文名称', trigger: 'blur' }
                ],
                desc: [
                    { required: true, message: '请输入描述文字', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        showDialog(){
            this.dialogVisible = true
        },
        hideDialog(){
            this.dialogVisible = false
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.dialogVisible = false
                    this.$emit('eventAddProject', this.ruleForm)
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
