<template>
<div class="yy-images" v-if="datalist && datalist.length > 0">
    <el-carousel indicator-position="none">
        <el-carousel-item v-for="item in datalist" :key="item.id">
            <img :src="item.tpwj" alt="" />
        </el-carousel-item>
    </el-carousel> 
</div>
</template>
<script>
export default {
    props: {
        datalist: {
            type: Array,
            default: []
        }
    },
    data(){
        return {
        }
    }
}
</script>
<style lang="scss">
.yy-images{
    height:100%;
    .el-carousel{
        height:100%;
    }
    .el-carousel__container{
        height:100%;
    }
    .el-carousel__item{
        height:100%;
        img{
            width:100%;height:100%;
        }
    }
}
</style>
