<template>
<div>
    <div class="choose-pages" v-for="(itemp,index) in binddata.linkmod" :key="index">
        <label style="margin-bottom:5px;display:block;">{{itemp.name}}跳转至：</label>
        <el-select v-model="itemp.value" placeholder="请选择" @change="changePage(itemp)">
            <el-option
                v-for="item in datas"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <div class="page-params" v-if="itemp.params && itemp.params.length > 0">
            <label style="margin-bottom:5px;display:block;">传递参数：</label>
            <div style="margin-left:15px;" v-for="(itemParam, index) in itemp.params" :key="index">
                <span style="margin-bottom:5px;display:block;">{{ itemParam.label }}：</span>
                <el-select v-model="itemParam.value" placeholder="请选择" @change="changeField(itemParam)">
                    <el-option
                        v-for="item in fields"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { contentFields } from '@/model/content'

export default {
    props: {
        binddata: {
            type: Object,
            default: {}
        }
    },
    data(){
        return {
            datas: [
                { label: '详细页', value: 'detail', params: [ { value: '', label: '数据ID', field: 'id' }, { value: '', label: '关键词', field: 'keyword' } ] },
                { label: '搜索页', value: 'search', params: [ { value: '', label: '关键词', field: 'keyword' } ] },
                { label: '内容页', value: 'content' },
                { label: '登录页', value: 'login' }
            ],
            fields: []
        }
    },
    mounted(){
        // this.changePage(this.binddata.linkmod[0])
        this.fields = contentFields
    },
    methods: {
        changePage(itemp){
            let pg = this._getValParam(itemp.value)
            itemp.params = pg.params
            this.$emit('eventChangePage', [])
        },
        changeField(itemParam){
            this.$emit('eventChangePage', [])
        },

        _getValParam(val){
            let obj = null
            for(let d of this.datas){
                if(d.value == val){
                    obj = d
                    break
                }
            }
            return obj
        }
    }
}
</script>
<style lang="scss" scoped>
.page-params{
    background:#fbfbfb;
    padding:4px 4px 4px 15px;
    border:solid 1px #eee;
}
</style>
