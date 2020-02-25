<template>
    <div class="cms-container">
        <el-card class="box-card">
            <content-header></content-header>
        </el-card>
    </div>    
</template>
<script>

import contentHeader from '@/views/admin/content/components/content-header'

export default {
    components: {
        'content-header': contentHeader
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
}
</style>