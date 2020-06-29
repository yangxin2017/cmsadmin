<template>
  <div class="list-container">
    <content-header
      :params="params"
      :category="category"
      :rolebuts="rolebuts"
      @refresh="initContent"
      @pldelevent="pldel"
      @plshevent="plsh"
    ></content-header>

    <el-table
      :data="tableData"
      border
      style="width:100%;margin-top:20px;"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      @sort-change="sortChange"
    >
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <span>
            <el-link type="primary" @click="prevInfoPage(scope.row)">{{scope.row.title}}</el-link>
            <em style="color:#f90;" v-if="scope.row.sort != 0">[置顶]</em>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="文件类型">
        <template slot-scope="scope">
          <span>{{scope.row.olden.filetype}}</span>
        </template>
      </el-table-column>
      <el-table-column label="来源IP">
        <template slot-scope="scope">
          <span>{{scope.row.olden.ip}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="level"
        label="秘密等级"
        width="100"
      ></el-table-column>-->
      <el-table-column prop="categoryName" label="所属类目" width="150"></el-table-column>
      <el-table-column prop="publishTime" label="发布时间" width="150" sortable></el-table-column>

      <el-table-column prop="lydwmc" label="来源单位" width="120"></el-table-column>

      <el-table-column label="状态" width="130">
        <template slot-scope="scope">
          <el-tag size="small">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="shuser" label="审核人" width="100"></el-table-column> -->

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip content="置顶" v-if="rolebuts.indexOf('topContent') >= 0">
              <el-button class="mybut" size="mini" type="primary" icon="el-icon-top" @click="topcon(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip
              content="取消置顶"
              v-if="rolebuts.indexOf('untopContent') >= 0 && scope.row.sort != 0"
            >
              <el-button class="mybut" size="mini" icon="el-icon-bottom" @click="cancletop(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip
              content="审核"
              v-if="rolebuts.indexOf('checkContent') >= 0 && scope.row.olden.status==2"
            >
              <el-button class="mybut"
                size="mini"
                type="success"
                icon="el-icon-user-solid"
                @click="check(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              content="撤销审核"
              v-if="rolebuts.indexOf('uncheckContent') >= 0 && (scope.row.olden.status==1||scope.row.olden.status==3)"
            >
              <el-button class="mybut" size="mini" type="warning" icon="el-icon-user" @click="uncheck(scope.row)"></el-button>
            </el-tooltip>

            <el-tooltip
              content="上报主站"
              v-if="rolebuts.indexOf('reportContent') >= 0 && scope.row.olden.status==1 && webtype=='gw'"
            >
              <el-button class="mybut"
                v-loading="reportloading"
                size="mini"
                type="warning"
                icon="el-icon-upload"
                @click="report(scope.row)"
              ></el-button>
            </el-tooltip>

            <el-tooltip
              content="编辑"
              v-if="rolebuts.indexOf('modifyContent') >= 0 || userId == scope.row.olden.userId"
            >
              <el-button class="mybut" size="mini" type="info" icon="el-icon-edit" @click="goedit(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip
              content="删除"
              v-if="rolebuts.indexOf('deleteContent') >= 0 || userId == scope.row.olden.userId"
            >
              <el-button class="mybut" size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
            </el-tooltip>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <div class="pages">
      <el-pagination
        @current-change="pagechange($event)"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog title="提示" :visible.sync="checkModel.checkdialogVisible" width="30%">
      <div>
        <p>
          <el-radio v-model="checkModel.status" label="1">审核通过</el-radio>
          <el-radio v-model="checkModel.status" label="0">拒绝审核</el-radio>
        </p>
        <p v-if="checkModel.status=='0'">
          <label>请输入拒绝原因：</label>
          <br />
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="checkModel.text"></el-input>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkModel.checkdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmCheck()">确 定</el-button>
      </span>
    </el-dialog>

    <prev-info ref="refPrev"></prev-info>
  </div>
</template>
<script>
import { getContent } from "@/api/cmsuser";
import {
  topContent,
  cancleTopContent,
  uncheckContent,
  deleteContent,
  sbdata
} from "@/api/content";
import { mapGetters } from "vuex";
import contentHeader from "@/views/admin/content/components/content-header";

import previnfo from "@/views/admin/content/prev/previnfo";

export default {
  components: {
    "content-header": contentHeader,
    "prev-info": previnfo
  },
  props: {
    category: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      total: 10,
      params: {
        pagenum: 1,
        pagesize: 10,
        cid: undefined,
        lydw: undefined,
        status: 1,
        title: undefined,
        containChild: true,
        orderField: undefined,
        orderType: undefined
      },
      checkModel: {
        checkdialogVisible: false,
        status: "1",
        text: "",
        curItem: null
      },
      tableData: [],
      loading: false,
      reportloading: false,
      plContent: [],
      /////////
      rolebuts: "",
      userId: ""
    };
  },
  computed: {
    ...mapGetters(["categorys", "user", "webtype"])
  },
  methods: {
    _getFileUrl(wj) {
      let bjhost = window.location.origin;
      let path = "";
      if (wj != "") {
        if(wj.indexOf(".doc") >= 0 || wj.indexOf(".docx") >= 0){
          path = wj;
        }else{
          path = bjhost + "/cms/webfile/" + wj;
        }
      }
      return path;
    },
    async report(row) {
      let param = {
        id: undefined,
        cid: row.categoryId,
        title: row.title,
        desc: row.desc,
        lydw: row.lydw,
        level: row.olden.mmdj,
        gjlb: row.gjmc,
        nrwj: this._getFileUrl(row.nrwj),
        tpwj: this._getFileUrl(row.tpwj),
        spwj: this._getFileUrl(row.spwj),
        xwstr: row.olden.seatids,
        tagstr: row.tagids.join(","),
        draft: false,
        filetype: "",
        id: row.id
      };
      this.reportloading = true;
      await sbdata(param);
      this.reportloading = false;
      this.$message({
        message: "上报成功！",
        type: "success"
      });
    },
    sortChange(column, prop, order) {
      /////
      this.params.orderField = undefined;
      this.params.orderType = undefined;
      if (order) {
        this.params.orderType = order == "ascending" ? "asc" : "desc";
        this.params.orderField = prop;
      }
    },
    prevInfoPage(content) {
      this.$refs.refPrev.show(content);
    },
    goedit(content) {
      this.$router.push("add?id=" + content.id + "&cid=" + content.categoryId);
    },
    pagechange(ev) {
      this.params.pagenum = ev;
      this.initContent();
    },
    setCurCid(cid) {
      this.params.cid = cid;
    },
    handleSelectionChange(val) {
      this.plContent = val;
    },
    async topcon(item) {
      await topContent({ id: item.id });
      this.initContent();
    },
    async cancletop(item) {
      await cancleTopContent({ id: item.id });
      this.initContent();
    },
    ///撤销审核
    uncheck(item) {
      let ids = item.id;

      this.$confirm("您确认要撤销吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await uncheckContent({ ids: ids, type: 1, uncheck: true, reason: "" });
        this.initContent();
      });
    },
    async confirmCheck() {
      if (this.checkModel.curItem) {
        let ids = this.checkModel.curItem;
        if (this.checkModel.status == "1") {
          await uncheckContent({
            ids: ids,
            type: 1,
            uncheck: false,
            reason: ""
          });
          this.initContent();
          this.checkModel.checkdialogVisible = false;
        } else if (this.checkModel.status == "0") {
          await uncheckContent({
            ids: ids,
            type: 0,
            uncheck: false,
            reason: this.checkModel.text
          });
          this.initContent();
          this.checkModel.checkdialogVisible = false;
        }
      }
    },
    async check(item) {
      this.checkModel.curItem = item.id;
      this.checkModel.checkdialogVisible = true;
    },
    del(ids) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await deleteContent({ ids: ids });
        this.initContent();
      });
    },
    pldel() {
      let idarr = [];
      for (let c of this.plContent) {
        idarr.push(c.id);
      }
      let ids = idarr.join(",");
      this.del(ids);
    },
    plsh() {
      let idarr = [];
      for (let c of this.plContent) {
        idarr.push(c.id);
      }
      let ids = idarr.join(",");

      this.checkModel.curItem = ids;
      this.checkModel.checkdialogVisible = true;
    },
    async initContent() {
      this.loading = true;

      let contents = await getContent(this.params);
      for (let c of contents.data) {
        c.categoryName = this._getNameByCid(c.categoryId);
        c.status = this._getStatusName(c.status);
      }
      this.tableData = contents.data;
      this.total = contents.total;
      this.loading = false;

      this.$emit("refreshCategory", this.params);
      //   console.log(this.tableData);
    },
    _getStatusName(sts) {
      if (sts == "0") {
        return "草稿";
      } else if (sts == "1") {
        return "已发布";
      } else if (sts == "2") {
        return "待审核";
      } else if (sts == "3") {
        return "已发布，已上报";
      } else if (sts == "99") {
        return "已拒绝";
      }
    },
    _getNameByCid(cid) {
      let name = "";
      for (let c of this.categorys) {
        if (c.id == cid) {
          name = c.name;
          break;
        }
        if (c.children) {
          for (let ci of c.children) {
            if (ci.id == cid) {
              name = ci.name;
              break;
            }
          }
        }
      }
      return name;
    }
  },
  mounted() {
    this.rolebuts = this.user.role.buttonmenu;
    this.userId = this.user.cmsuserId;
    // console.log(this.user)
    this.initContent();
  }
};
</script>
<style lang="scss" scoped>
.pages {
  margin: 20px 0 0 0;
  text-align: center;
}
.mybut{
  padding:5px 7px;
}
</style>
