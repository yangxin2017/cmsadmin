<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-if="ddata"
      @sort-change="sortDatas"
      @filter-change="filterDatas"
    >
      <el-table-column
        v-for="item in coms"
        :key="item.id"
        :prop="item.id"
        :label="item.name"
        :sortable="item.type == 'sort'"
        :filters="item.filters"
        :column-key="item.id"
      ></el-table-column>
      <el-table-column label="操作" width="500px">
        <template slot-scope="scope">
          <el-button @click="editRow(scope.row)" size="mini">编辑</el-button>
          <el-button @click="delRow(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getFormDatas, getDesignById } from "@/api/form";
import moment from "moment";
export default {
  data() {
    return {
      tableData: [],
      loading: false,
      coms: [],
      ddata: null,
      filter: {
        pageindex: 1,
        pagesize: 10,
        formid: "",
        itemid: "",
        type: "px",
        datainfo: "desc",
        filters: []
      }
    };
  },
  mounted() {
    let formid = this.$route.query.id;
    this.filter.formid = formid;
    ////////////////////////////
    this.initAll();
  },
  methods: {
    async initAll() {
      this.loading = true;
      let design = await getDesignById({ id: this.filter.formid });
      if (design && design.confs) {
        this.ddata = design;
        let str = Base64.decode(design.confs);
        let json = JSON.parse(str);
        this.coms = json;
        this._setColumnInfo();
        ////
        if (json.length > 0) {
          this.filter.itemid = json[0].id;
          /////获取数据
          this.initData();
        }
      }
      this.loading = false;
    },
    async initData() {
      let datas = await getFormDatas(this.filter);
      let tmpdatas = [];
      for (let r of datas) {
        let vs = r.vals;
        let tmp = {};
        for (let c of this.coms) {
          let cv = this._getValById(c.id, vs);
          tmp[c.id] = this._gerRealVal(cv, c);
        }
        tmpdatas.push(tmp);
      }
      this.tableData = tmpdatas;
    },
    sortDatas(column) {
      console.log(column);
    },
    filterDatas(fs) {
      for (let k in fs) {
        let hdom = this._getFilterDom(k);
        if (hdom) {
          hdom.datas = fs[k].join(",");
        } else {
          hdom = { itemId: k, datas: fs[k].join(",") };
          this.filter.filters.push(hdom);
        }
      }
      console.log(this.filter.filters);
    },
    _getFilterDom(key) {
      let dom = null;
      for (let f of this.filter.filters) {
        if (f.itemId == key) {
          dom = f;
          break;
        }
      }
      return dom;
    },
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
    _setColumnInfo() {
      console.log(this.coms);
      for (let c of this.coms) {
        if (
          c.com.ctype == "input" ||
          c.com.ctype == "datetime" ||
          c.com.ctype == "number"
        ) {
          c.type = "sort";
        } else if (
          c.com.ctype == "radio" ||
          c.com.ctype == "checkbox" ||
          c.com.ctype == "select"
        ) {
          c.type = "filter";
          c.filters = [];
          for (let d of c.predatas) {
            c.filters.push({ text: d.name, value: d.val });
          }
        }
      }
    },
    _gerRealVal(oldv, com) {
      if (com.com.ctype == "radio" || com.com.ctype == "select") {
        let realval = "";
        for (let rv of com.predatas) {
          if (rv.val == oldv) {
            realval = rv.name;
            break;
          }
        }
        return realval;
      } else if (com.com.ctype == "checkbox") {
        let realVal = [];
        if (oldv) {
          let arr = JSON.parse(oldv);
          for (let a of arr) {
            for (let rv of com.predatas) {
              if (rv.val == a) {
                realVal.push(rv.name);
                break;
              }
            }
          }
        }
        return realVal.join("，");
      } else if (com.com.ctype == "datetime") {
        if (oldv) {
          return moment(oldv).format("YYYY-MM-DD HH:mm:ss");
        }
      }
      return oldv;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>