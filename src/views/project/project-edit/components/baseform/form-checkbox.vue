<template>
    <div>
        <el-checkbox v-model="checked" @change="changeValue">{{ title }}</el-checkbox>
    </div>     
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: '显示'
        },
        defValue: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            checked: true
        }
    },
    methods: {
        changeValue(){
            this.$emit('eventValueChange', [this.checked])
        }
    },
    mounted(){
        this.checked = this.defValue
    }
}
</script>
<style lang="scss" scoped>

</style>
