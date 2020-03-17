<template>
    <div>
        <label style="margin-bottom:5px;display:block;">{{ title }}：</label>
        <el-upload class="upload-demo myupload" drag :on-success="uploadSuccess"
            action="https://jsonplaceholder.typicode.com/posts/">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: '上传图片'
        }
    },
    methods: {
        uploadSuccess(response, file, fileList){
            this.$emit('eventValueChange', ['https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1035415831,1465727770&fm=26&gp=0.jpg'])
        }
    }
}
</script>
<style lang="scss">
.myupload{
    .el-upload-dragger{
        width:auto;
        height:100px;
        .el-icon-upload{
            margin: 0px 0 8px;
            font-size:53px;
        }
    }
}
</style>
