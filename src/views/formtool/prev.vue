<template>
  <div class="app-container" v-if="ddata">
    <el-card class="box-card prev-design">
      <h3>{{ddata.name}}</h3>
      <div class="coms">
        <com-container :prev="true" v-for="item in coms" :key="item.id" :comitem="item"></com-container>
      </div>

      <div class="btns">
        <el-button type="primary" @click="saveData()">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getDesignById, addFormVal, getFormVals } from "@/api/form";
import { uuid } from "@/utils/common";
import comcontainer from "@/views/formtool/components/addcoms/comcontainer";
export default {
  components: {
    "com-container": comcontainer
  },
  data() {
    return {
      coms: [],
      ddata: null,
      loading: false,
      form: {
        rowid: uuid(),
        formid: undefined,
        datas: []
      }
    };
  },
  mounted() {
    let formid = this.$route.query.id;
    let rowid = this.$route.query.rid;
    this.initInfo(formid, rowid);
    if (!rowid) {
      rowid = uuid();
    }
    this.form.formid = formid;
    this.form.rowid = rowid;
    /////////
  },
  methods: {
    _getValById(id, datas) {
      let val = null;
      for (let d of datas) {
        if (d.formItemId == id) {
          val = d.formItemVal;
          break;
        }
      }
      return val;
    },
    async initInfo(id, rid) {
      let design = await getDesignById({ id: id });
      if (design && design.confs) {
        let str = Base64.decode(design.confs);
        let json = JSON.parse(str);
        this.coms = json;
        this.ddata = design;
        //设置数值
        let datas = await getFormVals({ formid: id, rowid: rid });
        if (datas) {
          for (let c of this.coms) {
            let v = this._getValById(c.id, datas);
            if (v) {
              if (c.com.ctype == "checkbox") {
                v = JSON.parse(v);
              }
              c.val = v;
            }
          }
        }
      }
    },
    reset() {
      this.form = {
        rowid: uuid(),
        formid: undefined,
        datas: []
      };
    },
    async saveData() {
      let tmps = [];
      for (let d of this.coms) {
        tmps.push({ form_item_id: d.id, form_item_val: d.val });
      }
      this.form.datas = tmps;

      this.loading = true;
      await addFormVal(this.form);
      this.loading = false;
      this.$message({
        message: "操作成功！",
        type: "success"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.prev-design {
  h3 {
    margin: 0 0 10px 0;
    text-align: center;
  }
  .btns {
    margin: 10px 0;
    text-align: center;
  }
  .coms {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>