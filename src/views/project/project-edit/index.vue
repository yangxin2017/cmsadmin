<template>
    <div class="pro-container">
        <el-row :gutter="12">
            <el-col v-if="showMenu" class="pro-left" :span="4">
                <page-menu></page-menu>
            </el-col>
            <el-col :span="showMenu ? 16 : 20">
                <page-content @eventChooseItem="infoTabItem($event)" ref="refPage"></page-content>
            </el-col>
            <el-col :span="4">
                <el-tabs type="border-card">
                    <el-tab-pane label="页面">
                        <page-info ref="refpInfo" @eventAddBlock="pageAddBlock" @eventSavePage="savePage"></page-info>
                    </el-tab-pane>
                    <el-tab-pane label="组件">
                        <component-info ref="refcInfo" @eventValueChanged="_refreshTemplate($event)"></component-info>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>    
</template>
<script>
import pagemenu from '@/views/project/project-edit/components/pagemenu';
import pageinfo from '@/views/project/project-edit/components/pageinfo';
import pagecontent from '@/views/project/project-edit/components/pagecontent';
import componentinfo from '@/views/project/project-edit/components/componentinfo'

export default {
    components: {
        'page-menu': pagemenu,
        'page-info': pageinfo,
        'page-content': pagecontent,
        'component-info': componentinfo
    },
    data(){
        return {
            showMenu: false
        }
    },
    methods: {
        pageAddBlock(){
            this.$refs.refPage.addBlock()
        },
        infoTabItem(pas){
            let param = pas[0]
            let binddata = pas[1]
            this.$refs.refcInfo.tabItem(param, binddata)
        },
        /** event */
        _refreshTemplate(param){
            this.$refs.refPage.refreshTemplate(param)
        },
        savePage(){
            let data = this.$refs.refPage.getData()
            console.log('save page data...')
            console.log(data)
        }
    }
};
</script>
<style lang="scss" scoped>
.pro-container{
    padding:20px 20px;
}
</style>
