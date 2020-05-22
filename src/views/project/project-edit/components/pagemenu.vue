<template>
    <div class="page-menu">
        <el-card shadow="never" v-if="curMenu">
            <h3 class="title">页面列表</h3>
            <div @click="selPageMenu(item)" class="page-mod" :class="{'sel': curMenu.id == item.id}" v-for="item in menus" :key="item.id">
                <span>{{ item.name }}</span>
                <i class="btn el-icon-star-on show" v-if="item.home"></i>
                <!-- <el-tooltip class="item" effect="dark" content="设为首页" placement="top" v-if="!item.home">
                    <i @click="setHomePage(item)" class="btn el-icon-s-home"></i>
                </el-tooltip> -->
                <!-- <i class="btn el-icon-delete"></i>
                <i class="btn el-icon-edit"></i> -->
            </div>
            <div class="btn-addpage">
                <el-button type="primary" size="medium" @click="prevProject()">预览</el-button>
                <el-button type="primary" size="medium" @click="saveProject()">保存</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    props: {
        menus: {
            type: Array,
            default: []
        }
    },
    data(){
        return {
            curMenu: null
        }
    },
    methods: {
        selPageMenu(item){
            this.curMenu = item
            this.$emit('eventSelectMenu', item)
        },
        saveProject(){
            this.$emit('eventSaving', '')
        },
        setHomePage(item){
            let tmps = this.menus
            for(let m of tmps){
                if(m.id != item.id){
                    m.home = false
                }else{
                    m.home = true
                }
            }
            this.menus = tmps
        },
        prevProject(){
            this.$router.push(`prev?pid=1`)
        }
    },
    mounted(){
        this.curMenu = this.menus[0]
    }
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
            &.show{
                display:inline-block;
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
