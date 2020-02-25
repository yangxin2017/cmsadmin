<template>
    <div>
        <el-dialog title="批量上传" :visible.sync="dialogVisible" width="60%">
            <div class="upload-container">
                <file-upload v-model="files" post-action="/" directory>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将文件拖到此处，或点击上传<br/>
                        只能上传jpg/png文件，且不超过500kb
                    </div>
                </file-upload>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

import VueUploadComponent from 'vue-upload-component'

export default {
    components: {
        'file-upload': VueUploadComponent
    },
    data(){
        return {
            dialogVisible: false,
            files: []
        }
    },
    methods: {
        showDialog(){
            this.dialogVisible = true
        },
        hideDialog(){
            this.dialogVisible = false
        },
        beforeUpload(file){
            console.log(file)
        }
    }
}
</script>
<style lang="scss" scoped>
.upload-container{
    width:100%;
    border:dotted 1px #ddd;
    padding:15px 20px;text-align:center;
    .el-icon-upload{
        font-size:80px;opacity:0.6;
    }
}
</style>


