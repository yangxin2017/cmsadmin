<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card class="box-card">
          <com-sj ref="refSj" @chooseItem="chooseItem($event)"></com-sj>
          <div class="btns">
            <el-button type="primary" @click="saveInfo()" v-loading="loading">保存</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <com-lists :datas="basecoms" @chooseCom="chooseCom($event)"></com-lists>
          <com-set ref="refSet"></com-set>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import comlists from "@/views/formtool/components/addcoms/comlist";
import comsj from "@/views/formtool/components/addcoms/comsj";
import comset from "@/views/formtool/components/addcoms/comset";
import { getFormComs, saveDesignConf } from "@/api/form";
import { Base64 } from "js-base64";
export default {
  components: {
    "com-lists": comlists,
    "com-sj": comsj,
    "com-set": comset
  },
  data() {
    return {
      basecoms: [],
      loading: false
    };
  },
  mounted() {
    this.initInfo();
  },
  methods: {
    async initInfo() {
      this.basecoms = await getFormComs();
    },
    chooseCom(com) {
      this.$refs.refSj.addCom(com);
    },
    chooseItem(item) {
      this.$refs.refSet.setCurItem(item);
    },
    async saveInfo() {
      let id = this.$route.query.id;
      let datas = this.$refs.refSj.coms;
      this.loading = true;
      let str = Base64.encode(JSON.stringify(datas));
      await saveDesignConf({ id: id, confs: str });
      this.loading = false;
      this.$message({
        message: "操作成功！",
        type: "success"
      });
      setTimeout(() => {
        this.$router.push("list");
      }, 1500);
    }
  }
};
</script>
<style lang="scss" scoped>
.btns {
  margin: 15px 0;
}
</style>