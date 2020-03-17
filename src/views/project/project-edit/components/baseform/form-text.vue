<template>
    <div>
        <label style="margin-bottom:5px;display:block;">{{ title }}：</label>
        <el-input @blur="blurText" v-model="data" placeholder="请输入内容"></el-input>
    </div>    
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: '输入内容'
        },
        defValue: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            data: ''
        }
    },
    methods: {
        blurText(){
            this.$emit('eventValueChange', [this.data])
        }
    },
    mounted(){
        this.data = this.defValue
    }
}
</script>
<style lang="scss" scoped>

</style>
