<template>
    <div class="page-menu">
        <el-card shadow="never">
            <h3 class="title">页面列表</h3>
            <div class="page-mod sel">
                <span>主页面</span>
                <i class="btn el-icon-delete"></i>
                <i class="btn el-icon-edit"></i>
            </div>
            <div class="page-mod">
                <span>详细页面</span>
                <i class="btn el-icon-delete"></i>
                <i class="btn el-icon-edit"></i>
            </div>
            <div class="page-mod">
                <span>搜索页面</span>
                <i class="btn el-icon-delete"></i>
                <i class="btn el-icon-edit"></i>
            </div>
            <div class="page-mod">
                <span>列表页面</span>
                <i class="btn el-icon-delete"></i>
                <i class="btn el-icon-edit"></i>
            </div>
            <div class="btn-addpage">
                <el-button type="primary" size="medium">添加页面</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.page-menu{
    .title{
        padding-top:0px;
        margin-top:0;
    }
    .page-mod{
        line-height:45px;
        border-bottom:solid 1px #eee;
        cursor:pointer;
        &.sel{
            border-left:solid 4px #66b1ff;
            padding:0 0 0 15px;
        }
        .btn{
            float:right;font-size:16px;margin:15px 0 0 0;
            display:none;margin-left:10px;
            &:hover{
                color:#66b1ff;
            }
        }
        &:hover{
            .btn{
                display:block;
            }
        }
    }
    .btn-addpage{
        text-align:center;
        margin:10px 0 0 0;
    }
}
</style>
