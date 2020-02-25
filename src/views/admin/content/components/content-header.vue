<template>
<div class="hd-content">
    <div class="lf-button">
        <el-button type="primary" icon="el-icon-upload2">批量上传</el-button>
        <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
        <el-button type="primary" icon="el-icon-check">批量审核</el-button>
    </div>

    <div class="rg-content">
        <el-checkbox-group v-model="checkList" style="display:inline-block;">
            <el-checkbox label="草稿"></el-checkbox>
            <el-checkbox label="待审核"></el-checkbox>
            <el-checkbox label="已发布"></el-checkbox>
        </el-checkbox-group>

        <el-input placeholder="请输入内容" v-model="searchKey" style="width:200px;margin-left:20px;">
            <template slot="append"><el-button slot="append" icon="el-icon-search"></el-button></template>
        </el-input>
    </div>
</div>    
</template>
<script>
export default {
    data(){
        return {
            checkList: [],
            searchKey: ''
        }
    }
}
</script>
<style lang="scss" scoped>
.hd-content{
    display:flex;
    justify-content:space-between;
    .rg-content{
        display:inline-block;
    }
}
</style>