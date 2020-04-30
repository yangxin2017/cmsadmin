<template>
<div>
    <div class="choose-pages" v-for="(itemp,index) in binddata.linkmod" :key="index">
        <label style="margin-bottom:5px;display:block;">{{itemp.name}}跳转至：</label>
        <el-select v-model="itemp.value" placeholder="请选择" @change="changePage(itemp)">
            <el-option
                v-for="item in menus"
                :key="item.id"
                :label="item.name"
                :value="item.ename">
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
        },
        menus: {
            type: Array,
            default: []
        }
    },
    data(){
        return {
            fields: []
        }
    },
    mounted(){
        if(this.binddata.linkmod.length > 0) {
            for(let lk of this.binddata.linkmod){
                this.changePage(lk)
            }            
        }
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
            for(let d of this.menus){
                if(d.ename == val){
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
