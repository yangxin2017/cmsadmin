<template>
    <div class="cms-container">
        <el-card class="box-card">
            <content-header></content-header>

            <div class="table-content">
                <content-list></content-list>
            </div>
        </el-card>
    </div>    
</template>
<script>

import contentHeader from '@/views/admin/content/components/content-header'
import contentList from '@/views/admin/content/components/content-list'

export default {
    components: {
        'content-header': contentHeader,
        'content-list': contentList
    },
    data(){
        return {
            content: ''
        }
    },
    mounted(){
        this.content = "Content"
    }
}
</script>
<style lang="scss" scoped>
.cms-container{
    padding:15px;
    .table-content{
        margin-top:20px;
    }
}
</style>