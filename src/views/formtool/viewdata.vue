<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-if="ddata"
      @sort-change="sortDatas"
      @filter-change="filterDatas"
      v-loading="loading"
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
    <div class="pages">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changepage"
        :page-size="filter.pagesize"
        :total="total">
      </el-pagination>

    </div>
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
        pagesize: 2,
        formid: "",
        itemid: "",
        type: "px",
        datainfo: "desc",
        filters: []
      },
      total: 0
    };
  },
  mounted() {
    let formid = this.$route.query.id;
    this.filter.formid = formid;
    ////////////////////////////
    this.initAll();
  },
  methods: {
    changepage(ev){
      this.filter.pageindex = ev;
      this.initData();
    },
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
      this.loading = true;
      let dataobj = await getFormDatas(this.filter);
      let datas = dataobj.data;
      this.total = dataobj.total;
      let tmpdatas = [];
      for (let r of datas) {
        let tmp = {};
        for(let kid in r){
          let vs = r[kid];
          for (let c of this.coms) {
            if(c.id == kid){
              tmp[c.id] = this._gerRealVal(vs, c);
            }
          }
        }

        tmpdatas.push(tmp);
        
      }
      this.tableData = tmpdatas;
      this.loading = false;
      console.log(tmpdatas)
    },
    sortDatas(column) {
      this.filter.datainfo = "desc";
      if(column.order == "ascending"){
        this.filter.datainfo = "asc";
      }
      this.filter.itemid = column.prop;
      this.initData();
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
      this.initData();
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
.pages{
  margin: 20px 0;
  text-align: center;
}
</style>