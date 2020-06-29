<template>
  <div class="yy-datapanel">
    <div class="p-head">
      <span class="p-title">
        <span class="pre"></span>
        {{ title }}
      </span>
      <ul class="p-menu" v-if="titlemenus && titlemenus.length > 0">
        <li
          v-for="(item, index) in titlemenus"
          :key="item.id"
          :class="{'sel': item.id == curVal}"
          @click="changeMenuTab(item, index)"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="p-body nbtables" v-loading="loading" v-if="curMenu">
      <el-table
        :data="tableData"
        border
        style="width: 100%;background:transparent;height:calc(100% - 44px)"
        v-loading="loading"
      >
        <el-table-column
          v-for="item in realcoms"
          :key="item.id"
          :prop="item.id"
          :label="item.name"
          :column-key="item.id"
        ></el-table-column>
      </el-table>
      <div class="nbpages">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="changepage"
          :page-size="filter.pagesize"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getFormDatas, getDesignById, delvals } from "@/api/form";
import moment from "moment";
export default {
  props: {
    title: {
      type: String,
      default: "面板标题"
    },
    showcount: {
      type: Number,
      default: 5
    },
    appData: {
      type: Object,
      default: {}
    },
    showFields: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      curVal: -1,
      loading: false,
      titlemenus: [],
      curMenu: null,
      tableData: [],
      coms: [],
      realcoms: [],
      filter: {
        pageindex: 1,
        pagesize: 5,
        formid: -1,
        itemid: "",
        type: "px",
        datainfo: "desc",
        filters: []
      },
      total: 0
    };
  },
  mounted() {
    if (this.appData.binddata) {
      if (
        this.appData.binddata.datasource != -1 &&
        this.appData.binddata.datasource.length > 0
      ) {
        let inx = this.appData.binddata.selIndex;
        console.log(inx)

        let firstDataSource = this.appData.binddata.datasource[inx][1];

        this.titlemenus = this.appData.binddata.objs;

        this.curVal = firstDataSource;

        this.curMenu = this.appData.binddata.objs[inx];

        this.setContent();
      }
    }
  },
  methods: {
    changeMenuTab(item, inx) {
      this.curMenu = item;
      let val = item.id;
      this.curVal = val;
      this.setContent();
      this.appData.binddata.selIndex = inx;
    },
    setContent() {
      let fields = this.curMenu.fileds;
      let arrstrt = fields.split("table_");
      if (arrstrt.length > 1) {
        this.initBaseInfo(arrstrt[1]);
      }
    },
    changepage(ev) {
      this.filter.pageindex = ev;
      this.initData();
    },
    async initBaseInfo(fid) {
      this.filter.formid = fid;
      let design = await getDesignById({ id: fid });
      if (design && design.confs) {
        this.ddata = design;
        let str = Base64.decode(design.confs);
        let json = JSON.parse(str);
        this.coms = json;
        this.appData.binddata.chooses = this.coms;
        this.initData();
      }
    },
    async initData() {
      this.loading = true;
      this.filter.pagesize = this.showcount;

      let realcomids = this.showFields.split(",");
      let realcoms = [];
      for (let id of realcomids) {
        for (let c of this.coms) {
          if (c.id == id) {
            realcoms.push(c);
          }
        }
      }
      this.realcoms = realcoms;

      let dataobj = await getFormDatas(this.filter);
      let datas = dataobj.data;
      this.total = dataobj.total;
      let tmpdatas = [];
      for (let r of datas) {
        let tmp = {};
        tmp["rowid"] = r.rowid;
        for (let kid in r) {
          let vs = r[kid];
          for (let c of realcoms) {
            if (c.id == kid) {
              tmp[c.id] = this._gerRealVal(vs, c);
            }
          }
        }
        tmpdatas.push(tmp);
      }
      this.tableData = tmpdatas;
      this.loading = false;
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
.yy-datapanel {
  height: 100%;
  .p-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .p-title {
      vertical-align: middle;
      padding-right: 10px;
      white-space: nowrap;
      .pre {
        display: inline-block;
        width: 5px;
        background: #000;
        height: 20px;
        vertical-align: middle;
      }
    }
    .p-more {
      text-align: right;
      display: none;
    }
    .p-menu {
      display: inline-block;
      white-space: nowrap;
      margin: 0;
      padding: 0;
      overflow: auto;
      flex: 1;
      li {
        display: inline-block;
        font-size: 12px;
        margin: 0 8px;
        cursor: pointer;
        white-space: nowrap;
        &.sel {
          color: #f90;
        }
      }
    }
  }
  .p-body {
    margin: 5px 10px;
    height: calc(100% - 41px);
    overflow: auto;
  }
}
</style>
<style lang="scss">
.nbtables {
  table {
    border-spacing: 2px;
  }
  .el-table--border,
  .el-table--group {
    border: none;
  }
  .el-table th,
  .el-table tr {
    background: #264047 !important;
    border: none;
    color: #fff;
  }
  .el-table tr:nth-child(odd) {
    background: transparent !important;
  }
  .el-table--border th.gutter:last-of-type {
    border: none;
  }
  .el-table--border td,
  .el-table--border th,
  .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    border: none;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background: transparent;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background: transparent;
  }
  .el-table td,
  .el-table th {
    padding: 5px 0;
  }
}
.nbpages {
  margin: 5px 0;
  text-align: center;
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    background: transparent;
    color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #26c9ff;
  }
}
</style>