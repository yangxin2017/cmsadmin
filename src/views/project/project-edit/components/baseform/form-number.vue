<template>
    <div>
        <label style="margin-bottom:5px;display:block;">{{ title }}：</label>
        <el-input-number style="width:100%;" v-model="data" size="small" @change="valueChange" :min="1" :max="900"></el-input-number>
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
            type: Number,
            default: 1
        }
    },
    data(){
        return {
            data: ''
        }
    },
    methods: {
        valueChange(){
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
