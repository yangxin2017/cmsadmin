<template>
    <div>
        <label style="margin-bottom:5px;display:block;">已有数据源：</label>
        <el-cascader :options="datas"></el-cascader>
        <div class="new-add">
            <el-button type="primary" size="small" round plain @click="showAddSource">添加数据源</el-button>
        </div>

        <cominfo-adddatasource ref="refAddDatasource"></cominfo-adddatasource>

    </div>
</template>
<script>

import cominfoadddatasource from './com-info-adddatasource';

export default {
    components: {
        'cominfo-adddatasource': cominfoadddatasource
    },
    data(){
        return {
            datas: [
                {
                    value: 1,
                    label: '综合研究',
                    children: [
                        { label: '综合一', value: 11 },
                        { label: '综合二', value: 12 }
                    ]

                },
                {
                    value: 2,
                    label: '开源信息',
                    children: [
                        { label: '开源一', value: 21 },
                        { label: '开源二', value: 22 }
                    ]
                },
            ]
        }
    },
    methods: {
        showAddSource(){
            this.$refs.refAddDatasource.show();
        }
    }
}
</script>
<style lang="scss" scoped>
.new-add{
    background:#fbfbfb;margin:3px 0;
    border-top:solid 1px #eee;
    border-bottom:solid 1px #eee;
    padding:4px 0;text-align:center;
}
</style>
