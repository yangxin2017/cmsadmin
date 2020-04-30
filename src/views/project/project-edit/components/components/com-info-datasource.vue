<template>
  <div>
    <label style="margin-bottom:5px;display:block;">已有数据源：</label>
    <el-cascader
      collapse-tags
      :props="props"
      :options="categorys"
      v-model="binddata.datasource"
      @change="changeDataSource"
    ></el-cascader>
    <div class="new-add">
      <el-button type="primary" size="small" round plain @click="showAddSource">添加数据源</el-button>
    </div>

    <cominfo-adddatasource ref="refAddDatasource"></cominfo-adddatasource>
  </div>
</template>
<script>
import cominfoadddatasource from "./com-info-adddatasource";

export default {
  props: {
    binddata: {
      type: Object,
      default: {}
    },
    categorys: {
      type: Array,
      default: []
    }
  },
  components: {
    "cominfo-adddatasource": cominfoadddatasource
  },
  mounted() {},
  data() {
    return {
      props: { multiple: true, value: "id", label: "name" },
      dataval: 12
      // datas: [
      //     {
      //         value: 1,
      //         label: '综合研究',
      //         children: [
      //             { label: '综合一', value: 11 },
      //             { label: '综合二', value: 12 }
      //         ]

      //     },
      //     {
      //         value: 2,
      //         label: '开源信息',
      //         children: [
      //             { label: '开源一', value: 21 },
      //             { label: '开源二', value: 22 }
      //         ]
      //     },
      // ]
    };
  },
  methods: {
    getDataSourceObj(ids) {
      let arr = [];
      for (let ki of this.categorys) {
        if (ki.children) {
          for (let d of ki.children) {
            if (ids.indexOf(d.id) >= 0) {
              arr.push(d);
            }
          }
        }
      }
      return arr;
    },
    getParentDataSource(ids, cids) {
      let arr = [];
      for (let ki of this.categorys) {
        if (ids.indexOf(ki.id) >= 0) {
          for (let d of ki.children) {
            if (cids.indexOf(d.id) >= 0) {
              d.select = true;
            } else {
              d.select = false;
            }
          }
          arr.push(ki);
        }
      }
      return arr;
    },
    showAddSource() {
      this.$refs.refAddDatasource.show();
    },
    changeDataSource() {
      let ids = "";
      let pids = "";
      for (let d of this.binddata.datasource) {
        ids += d[1] + ",";
        if (pids.indexOf(d[0] + ",") < 0) {
          pids += d[0] + ",";
        }
      }
      let objs = this.getDataSourceObj(ids);
      let pobjs = this.getParentDataSource(pids, ids);

      this.binddata.objs = objs;
      this.binddata.pobjs = pobjs;
      this.$emit("eventChangeDataSource", [this.dataval]);
    }
  }
};
</script>
<style lang="scss" scoped>
.new-add {
  background: #fbfbfb;
  margin: 3px 0;
  border-top: solid 1px #eee;
  border-bottom: solid 1px #eee;
  padding: 4px 0;
  text-align: center;
}
</style>
