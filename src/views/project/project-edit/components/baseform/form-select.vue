<template>
    <div>
        <label style="margin-bottom:5px;display:block;">{{ title }}：</label>
        <el-select v-model="data" placeholder="请选择" @change="valueChange">
            <el-option
                v-for="item in predatas"
                :key="item.value"
                :label="item[defField]"
                :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: '输入内容'
        },
        predatas: {
            type: Array,
            default: []
        },
        defValue: {
            type: String,
            default: ''
        },
        defField: {
            type: String,
            default: 'name'
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
