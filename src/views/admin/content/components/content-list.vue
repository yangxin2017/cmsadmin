<template>
    <div class="list-container">
        <el-table :data="tableData" border style="width:100%" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column prop="index" label="编号" width="60"></el-table-column>
            <el-table-column prop="title" label="标题" sortable></el-table-column>
            <el-table-column prop="level" label="秘密等级" width="100" :filters="levelList" :filter-method="filterHandler"></el-table-column>
            <el-table-column prop="category" label="所属类目" width="150"></el-table-column>
            <el-table-column prop="publishTime" label="发布时间" width="150" sortable></el-table-column>

            <el-table-column label="来源单位" width="120" :filters="deptList" :filter-method="filterHandler">
                <template slot-scope="scope">
                    {{scope.row.dept}}
                </template>
            </el-table-column>
            <el-table-column prop="user" label="发布人" width="100"></el-table-column>

            <el-table-column label="状态" width="80" :filters="statusList" :filter-method="filterHandler">
                <template slot-scope="scope">
                    <el-tag size="small">{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="shuser" label="审核人" width="100"></el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-tooltip content="置顶"><el-button size="mini" type="primary" icon="el-icon-top"></el-button></el-tooltip>
                        <el-tooltip content="取消置顶"><el-button size="mini" icon="el-icon-bottom"></el-button></el-tooltip>
                        <el-tooltip content="审核"><el-button size="mini" type="success" icon="el-icon-user-solid"></el-button></el-tooltip>
                        <el-tooltip content="撤销审核"><el-button size="mini" type="warning" icon="el-icon-user"></el-button></el-tooltip>
                        <el-tooltip content="编辑"><el-button size="mini" type="info" icon="el-icon-edit"></el-button></el-tooltip>
                        <el-tooltip content="删除"><el-button size="mini" type="danger" icon="el-icon-delete"></el-button></el-tooltip>
                    </el-button-group>
                </template>
            </el-table-column>
            
        </el-table>

        <div class="pages">
            <el-pagination background layout="prev, pager, next" :total="1000">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            levelList: [
                {text: '一级', value: 1},
                {text: '二级', value: 2},
                {text: '三级', value: 3},
                {text: '四级', value: 4}
            ],
            deptList: [
                {text: '东部', value: 1},
                {text: '西部', value: 2},
                {text: '南部', value: 3},
                {text: '北部', value: 4}
            ],
            statusList: [
                {text: '草稿', value: 1},
                {text: '待审核', value: 2},
                {text: '已发布', value: 3}
            ],
            tableData: [
                {
                    index: 1,
                    title: '',
                    level: '一级',
                    category: '综合研究',
                    publishTime: '2019-10-10',
                    dept: '东部',
                    user: '上传人',
                    status: '已发布',
                    shuser: '审核人'
                }
            ]
        }
    },
    methods: {
        handleSelectionChange(val){
            console.log(val)
        },
        filterHandler(value, row, column){
            console.log(value, row, column)
        }
    }
}
</script>
<style lang="scss" scoped>
.pages{
    margin:20px 0 0 0;
    text-align:center;
}
</style>
