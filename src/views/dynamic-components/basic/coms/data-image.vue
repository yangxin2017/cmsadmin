<template>
<div class="yy-images">
    <el-carousel indicator-position="none">
        <el-carousel-item v-for="item in datas" :key="item.id">
            <img :src="item.src" alt="" />
        </el-carousel-item>
    </el-carousel> 
</div>
</template>
<script>
export default {
    props: {
        count: {
            type: Number,
            default: 3
        }
    },
    data(){
        return {
            datalist: [
                { id: 1, title: '', src: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1926836966,2010107208&fm=26&gp=0.jpg' },
                { id: 2, title: '', src: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3983180779,3687921405&fm=26&gp=0.jpg' },
                { id: 3, title: '', src: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3067578540,523644780&fm=26&gp=0.jpg' },
                { id: 4, title: '', src: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3872143789,3688106214&fm=26&gp=0.jpg' },
                { id: 5, title: '', src: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3093759163,2088249490&fm=26&gp=0.jpg' },
            ]
        }
    },
    computed: {
        datas: function(){
            let res = []
            for(let i=0;i<this.count;i++){
                res.push(this.datalist[i])
            }
            return res
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
