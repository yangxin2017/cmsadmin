<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card class="box-card sub-menu">
          <h3>栏目列表</h3>
          <el-menu class="el-menu-vertical" :default-active="selCategoryCode" v-loading="loading">
            <el-submenu
              v-for="item in cates"
              :key="item.id"
              :index="item.code"
              :class="{sel: selCategoryCode==item.code}"
            >
              <template slot="title">
                <div @click="chooseItemi(item)">
                  <i class="el-icon-folder"></i>
                  <span>{{ item.name }}</span>
                </div>
              </template>
              <el-submenu
                :class="{sel: selCategoryCode==itemi.code}"
                v-for="itemi in item.children"
                :key="itemi.id"
                :index="itemi.code"
              >
                <template slot="title">
                  <div @click="chooseItemi(itemi)">
                    <span class="dot-circle"></span>
                    {{ itemi.name }}
                  </div>
                </template>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-card>
      </el-col>
      <el-col :span="19" v-if="!selCategoryCode">
        <el-card class="box-card">
          <label>请选择左侧栏目，配置信息！</label>
        </el-card>
      </el-col>
      <el-col :span="19" v-if="selCategoryCode">
        <el-card class="box-card">
          <h3>席位列表</h3>
          <seat-table-list
            ref="stlList"
            @editCurConfEvent="editCurConf($event)"
            @addCurConfEvent="addConf()"
          ></seat-table-list>
        </el-card>
        <el-card class="box-card" style="margin-top:20px;">
          <h3>席位编辑</h3>
          <div class="item-con">
            <label>配置名称：</label>
            <el-input v-model="curSeatName" placeholder="请输入内容" style="flex:1"></el-input>
          </div>
          <div class="item-con" style="align-items:start">
            <label style="position:relative;top:9px;">配置名称：</label>
            <div style="flex:1">
              <el-input size="small" :clearable="true" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
              <el-tree
                ref="psxwtree"
                class="mytree"
                :data="xws"
                show-checkbox
                node-key="xh"
                :filter-node-method="filterNode"
                :default-checked-keys="chkxwkey"
                :props="props2"
              ></el-tree>
            </div>
          </div>
          <div class="item-con">
            <label></label>
            <div>
              <span class="err" v-if="!nameInput">请输入标题！</span>
              <el-button v-loading="sloading" type="primary" @click="saveConf()">保存</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getAllCategorys } from "@/api/cms";
import { getAllBM, addSeatConf } from "@/api/content";

import seattablelist from "@/views/admin/seat/components/tablelist";

export default {
  components: {
    "seat-table-list": seattablelist
  },
  watch: {
    filterText(val) {
      this.$refs.psxwtree.filter(val);
    }
  },
  data() {
    return {
      selCategoryCode: "",
      loading: true,
      cates: [],

      /////
      filterText: "",
      props2: {
        children: "children",
        label: "mc"
      },
      xws: [],
      chkxwkey: [],
      /////////////
      curSeatConf: null,
      curSeatName: "",
      curCategoryId: "",
      sloading: false,

      nameInput: true
    };
  },
  computed: {
    ...mapGetters(["categorys", "user", "webtype"])
  },
  mounted() {
    this.initInfo();
  },
  methods: {
    editCurConf(ev) {
      this.curSeatConf = ev;
      this.curSeatName = ev.name;
      this.chkxwkey = ev.seatids ? ev.seatids.split(",") : [];
      this.$refs.psxwtree.setCheckedNodes(this.chkxwkey);
    },
    addConf() {
      this.curSeatConf = null;
      this.chkxwkey = [];
      this.curSeatName = "";
      this.$refs.psxwtree.setCheckedNodes(this.chkxwkey);
    },
    chooseItemi(item) {
      this.selCategoryCode = item.code;
      this.curCategoryId = item.id;
      setTimeout(() => {
        this.$refs.stlList.setLists(this.curCategoryId);
      }, 500);
    },
    async initInfo() {
      this.xws = await getAllBM({ webtype: this.webtype });
      this.refreshCategory();
    },
    async refreshCategory(ev) {
      this.loading = true;
      this.cates = await getAllCategorys({});
      this.loading = false;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.mc.indexOf(value) !== -1;
    },
    async saveConf() {
      let selxw = this.$refs.psxwtree.getCheckedNodes();
      let t1 = [];
      for (let xw of selxw) {
        t1.push(xw.xh);
      }
      let seatids = t1.join(",");
      let id = this.curSeatConf ? this.curSeatConf.id : undefined;
      let cid = this.curCategoryId;
      let name = this.curSeatName;

      this.nameInput = true;
      if (name == "") {
        this.nameInput = false;
      } else {
        this.sloading = true;
        await addSeatConf({ id: id, cid: cid, seatids: seatids, name: name });
        this.sloading = false;
        this.$refs.stlList.refresh();
        this.addConf();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  h3 {
    margin: 0 0 10px 0;
  }
  .sub-menu {
    background: #fff;
    box-shadow: 0 0 10px #ddd;
    margin: 0 15px 0 0;
    height: 100%;
    .el-menu-vertical {
    }
    .sel {
      background: #ecf5ff;
    }
  }
  .item-con {
    display: flex;
    margin: 8px 0;
    justify-content: space-between;
    align-items: center;
    label {
      width: 100px;
      font-size: 14px;
      font-weight: normal;
    }
    span {
      color: #f00;
      font-size: 12px;
    }
  }
}
</style>