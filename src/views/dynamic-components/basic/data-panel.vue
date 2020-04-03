<template>
<div class="yy-datapanel">
    <div class="p-head">
        <span class="p-title">
            <span class="pre"></span>
            {{ title }}
            <ul class="p-menu" v-if="titlemenus && titlemenus.length > 0">
                <li v-for="item in titlemenus" :key="item.value" :class="{'sel': item.value == curVal}" @click="changeMenuTab(item.value)">{{item.label}}</li>
            </ul>
        </span>
        <span class="p-more" v-if="showmore == true">
            <el-link v-if="blank == true" :href="morehref" target="_blank">更多</el-link>
            <el-link v-if="blank == false" :href="morehref">更多</el-link>
        </span>
    </div>
    <div class="p-body" v-loading="loading">
        <data-list :datalist="datalists" v-if="showtype == 'list'" :appData="appData"></data-list>
        <data-image v-if="showtype == 'image'" :count="showcount"></data-image>
        <data-image-text :imgwidth="imgwidth" v-if="showtype == 'img-text'" :count="showcount"></data-image-text>
    </div>
</div>    
</template>
<script>

import datalist from './coms/data-list'
import dataimage from './coms/data-image'
import dataimagetext from './coms/data-image-text'

import { getContent } from '@/api/cms';

export default {
    props: {
        title: {
            type: String,
            default: '面板标题'
        },
        showmore: {
            type: Boolean,
            default: 'true'
        },
        blank: {
            type: Boolean,
            default: "false"
        },
        morehref: {
            type: String,
            default: "#"
        },
        showtype: {
            type: String,
            default: 'image'
        },
        showcount: {
            type: Number,
            default: 5
        },
        imgwidth: {
            type: Number,
            default: 30
        },
        appData: {
            type: Object,
            default: {}
        }
    },
    data(){
        return {
            datalists: [],
            oldParam: { id: -1, count: 5 },
            titlemenus: [],
            curVal: -1,
            loading: false
        }
    },
    components: {
        'data-list': datalist,
        'data-image': dataimage,
        'data-image-text': dataimagetext
    },
    methods: {
        _getUrl(md){
            let lkmod = this.appData.binddata.linkmod[0]
            let url = lkmod.value + '?'
            let arr = []
            for(let p of lkmod.params){
                arr.push(`${p.field}=${md[p.value]}`)
            }
            url += arr.join('&')
            return url
        },
        changeMenuTab(val) {
            this.curVal = val
            this.setContent(val)
        },
        setContent(val){
            if(this.oldParam.id != val || this.oldParam.count != this.showcount){
                this.oldParam.id = val
                this.oldParam.count = this.showcount

                this.loading = true
                getContent({type: val, count: this.showcount}).then(res => {
                    this.datalists = res.data

                    for(let d of this.datalists){
                        d.href = this._getUrl(d)
                    }
                    
                    this.loading = false

                })
            }
        },
        refreshContents(){
            if(this.appData.binddata){
                if(this.appData.binddata.datasource != -1 && this.appData.binddata.datasource.length > 0){
                    
                    let firstDataSource = this.appData.binddata.datasource[0][1]

                    this.titlemenus = this.appData.binddata.objs
                    this.curVal = firstDataSource
                    
                    this.setContent(firstDataSource)
                }
            }
        }
    },
    mounted(){
        // 刷新数据
        console.log(this.appData)
        this.refreshContents()
    }
}
</script>
<style lang="scss" scoped>
.yy-datapanel{
    height:100%;
    .p-head{
        display:flex;
        justify-content:space-between;
        height:35px;background:#eee;
        align-items:center;
        .p-title{
            vertical-align:middle;
            .pre{
                display:inline-block;
                width:5px;background:#000;
                height:20px;
                vertical-align:middle;
            }
            .p-menu{
                display:inline-block;
                margin:0;padding:0;
                li{
                    display:inline-block;
                    font-size:12px;margin-left:10px;
                    cursor:pointer;
                    &.sel{
                        color:#f90;
                    }
                }
            }
        }
        .p-more{
            text-align:right;
        }
    }
    .p-body{
        margin-top:5px;
        height:calc(100% - 41px);
        overflow:auto;
    }
}
</style>
