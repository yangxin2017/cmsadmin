<template>
    <div class="component-info">
        <el-divider content-position="left">绑定数据源</el-divider>
        <cominfo-datasource></cominfo-datasource>

        <el-divider content-position="left">输入信息</el-divider>
        <div class="com-line" v-for="(item, index) in params" :key="index">
            <form-upload @eventValueChange="setImage($event, item)" v-if="item.type == 'image'" :title="item.title"></form-upload>
            <form-text :defValue="item.value" @eventValueChange="setText($event, item)" v-if="item.type == 'text'" :title="item.title"></form-text>
            <form-checkbox :defValue="item.value" @eventValueChange="setCheckBox($event, item)" v-if="item.type == 'checkbox'" :title="item.title"></form-checkbox>
            
            <form-select @eventValueChange="setSelect($event, item)" :defValue="item.value" v-if="item.type == 'select'" :predatas="item.predata" :title="item.title"></form-select>
            <form-number @eventValueChange="setText($event, item)" :defValue="item.value" v-if="item.type == 'number'" :title="item.title"></form-number>
            
            <div v-if="item.children" style="padding:5px 5px 5px 25px;background:#fbfbfb;border-left:solid 1px #409EFF;">
                <div v-for="inItem in item.children" :key="inItem.id">
                    <form-text :defValue="inItem.value" @eventValueChange="setText($event, inItem)" v-if="inItem.type == 'text' && inItem.showvalue == item.value" :title="inItem.title"></form-text>
                    <form-checkbox :defValue="inItem.value" @eventValueChange="setCheckBox($event, inItem)" v-if="inItem.type == 'checkbox' && inItem.showvalue == item.value" :title="inItem.title"></form-checkbox>
                    <form-number @eventValueChange="setText($event, inItem)" :defValue="inItem.value" v-if="inItem.type == 'number' && inItem.showvalue == item.value" :title="inItem.title"></form-number>
                </div>
            </div>
        </div>
        
        <el-divider content-position="left">页面跳转设置</el-divider>
        <cominfo-page></cominfo-page>

    </div>
</template>
<script>

import formupload from '@/views/project/project-edit/components/baseform/form-upload'
import formtext from '@/views/project/project-edit/components/baseform/form-text'
import formcheckbox from '@/views/project/project-edit/components/baseform/form-checkbox'
import formselect from '@/views/project/project-edit/components/baseform/form-select'
import formnumber from '@/views/project/project-edit/components/baseform/form-number'

import cominfodatasource from './components/com-info-datasource';
import cominfopage from './components/com-info-page';

export default {
    components: {
        'form-upload': formupload,
        'form-text': formtext,
        'form-checkbox': formcheckbox,
        'form-select': formselect,
        'form-number': formnumber,
        'cominfo-datasource': cominfodatasource,
        'cominfo-page': cominfopage
    },
    data(){
        return {
            params: []
        }
    },
    methods: {
        /////////////
        tabItem(datas){
            this.params = datas
        },
        /** event */
        setText(text, param){
            param.value = text[0]
            this.$emit('eventValueChanged', [param])
        },
        setImage(src, param){
            param.value = src[0]
            this.$emit('eventValueChanged', [param])
        },
        setCheckBox(checked, param){
            param.value = checked[0]
            this.$emit('eventValueChanged', [param])
        },
        setSelect(selValue, param){
            param.value = selValue[0]
            this.$emit('eventValueChanged', [param])
        }
    }
}
</script>
<style lang="scss" scoped>
.component-info{
    .title{
        padding-top:0px;
        margin-top:0;
    }
    .com-line{
        &>div{
            margin:0 0 10px 0;
        }
    }
}
</style>
