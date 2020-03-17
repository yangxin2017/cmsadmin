<template>
<div class="choose-pages">
    <label style="margin-bottom:5px;display:block;">内容跳转至：</label>
    <el-select v-model="value" placeholder="请选择">
        <el-option
            v-for="item in datas"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>
    <div class="page-params">
        <label style="margin-bottom:5px;display:block;">传递参数：</label>
        <div style="margin-left:15px;" v-for="(itemParam, index) in params" :key="index">
            <span style="margin-bottom:5px;display:block;">{{ itemParam.label }}：</span>
            <el-select v-model="itemParam.value" placeholder="请选择">
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
</template>
<script>
export default {
    data(){
        return {
            datas: [
                { label: '详细页', value: 'detail' },
                { label: '搜索页', value: 'search' },
                { label: '内容页', value: 'content' },
                { label: '登录页', value: 'login' }
            ],
            fields: [
                { label: '字段一', value: 'id' },
                { label: '字段二', value: 'keyword' },
            ],
            params: [
                { value: '', label: '数据ID' },
                { value: '', label: '关键词' }
            ],
            value: 'detail'
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
