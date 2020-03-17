<template>
<div class="yy-datapanel">
    <div class="p-head">
        <span class="p-title">
            <span class="pre"></span>
            {{ title }}
        </span>
        <span class="p-more" v-if="showmore == true">
            <el-link v-if="blank == true" :href="morehref" target="_blank">更多</el-link>
            <el-link v-if="blank == false" :href="morehref">更多</el-link>
        </span>
    </div>
    <div class="p-body">
        <data-list v-if="showtype == 'list'" :count="showcount"></data-list>
        <data-image v-if="showtype == 'image'" :count="showcount"></data-image>
        <data-image-text :imgwidth="imgwidth" v-if="showtype == 'img-text'" :count="showcount"></data-image-text>
    </div>
</div>    
</template>
<script>

import datalist from './coms/data-list'
import dataimage from './coms/data-image'
import dataimagetext from './coms/data-image-text'

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
        }
    },
    components: {
        'data-list': datalist,
        'data-image': dataimage,
        'data-image-text': dataimagetext
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
