<template>
    <el-dialog title="上报主站" :visible.sync="dialogVisible" width="60%">
      <div class="tr-dv">
        <b>选择要上报的栏目</b>
        <el-tree
            :highlight-current="true"
            :expand-on-click-node="false"
            :data="data"
            :props="defaultProps"
            @node-click="handleNodeClick"
        ></el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-loading="reportloading" type="primary" @click="confirm">上报</el-button>
      </span>
    </el-dialog>
</template>
<script>
import { getAllZZCategorys } from '@/api/cms';
import { sbdata } from '@/api/content';
export default {
    data(){
        return {
            data: [],
            defaultProps: {
                label: "name"
            },
            dialogVisible: false,
            param: null,
            reportloading: false
        }
    },
    methods: {
        async initZZCates(){
            this.data = await getAllZZCategorys({});
            console.log(this.data)
        },
        show(param){
            this.dialogVisible = true;
            this.param = param;
            this.param.cid = null;
        },
        async handleNodeClick(node) {
            let cid = node.id;
            this.param.cid = cid;
        },
        async confirm(){
            if(!this.param.cid){
                this.$message({
                  message: "请选择主站栏目！",
                  type: "error"
                });
            }else{
                this.reportloading = true;
                await sbdata(this.param);
                this.reportloading = false;
                this.$message({
                  message: "上报成功！",
                  type: "success"
                });
                this.dialogVisible = false;
                this.$emit("refresh")
            }
        }
    },
    mounted(){
        this.initZZCates();
    }
}
</script>
<style lang="scss" scoped>
.tr-dv{
    width:100%;padding:20px;
    background:#efefef;
    border:solid 1px #ccc;
    b{
        font-size: 16px;
        display: block;
        margin:0 0 10px 0;
    }
}
</style>