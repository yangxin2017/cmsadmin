<template>
  <div class="cms-container">
    <div class="sub-menu">
      <div class="menu-title">栏目列表</div>
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
              <span>
                {{ item.name }}
                <el-tag
                  v-if="item.count > 0"
                  :type="item.isspec ? 'danger' : 'info'"
                  size="mini"
                >{{item.count}}</el-tag>
              </span>
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
                <el-tag
                  v-if="itemi.count > 0"
                  :type="itemi.isspec ? 'danger' : 'info'"
                  size="mini"
                >{{itemi.count}}</el-tag>
              </div>
            </template>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
    <el-card class="box-card">
      <div class="table-content">
        <content-list
          :class="{hide: istable}"
          ref="refList"
          :category="curCategory"
          @refreshCategory="refreshCategory($event)"
        ></content-list>
        <view-data style="height:100%" 
          :class="{hide: !istable}" ref="refVD"></view-data>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getAllCategorys } from "@/api/cms";
import contentList from "@/views/admin/content/components/content-list";
import viewdata from "@/views/formtool/viewdata";

export default {
  components: {
    "content-list": contentList,
    "view-data": viewdata
  },
  data() {
    return {
      content: "",
      selCategoryCode: "",
      curCategory: null,
      cates: [],
      loading: true,
      pm: {
        title: undefined,
        lydw: undefined,
        status: undefined
      },
      istable: false
    };
  },
  mounted() {},
  methods: {
    chooseItemi(item) {
      this.selCategoryCode = item.code;
      this.curCategory = item;

      if (this.curCategory.fileds.indexOf("table_") < 0) {
        this.$refs.refList.setCurCid(item.id);
        ///////
        this.$refs.refList.initContent();
        this.istable = false;
      } else {
        this.istable = true;
        let strarr = this.curCategory.fileds.split("table_");
        setTimeout(() => {
          if (strarr.length > 1) {
            this.$refs.refVD.setFormId(strarr[1]);
          }
        }, 500);
      }
    },
    async refreshCategory(ev) {
      this.loading = true;
      if (
        ev.status == this.pm.status &&
        ev.title == this.pm.title &&
        ev.lydw == this.pm.lydw
      ) {
      } else {
        this.pm.status = ev.status;
        this.pm.title = ev.title;
        this.pm.lydw = ev.lydw;

        this.cates = await getAllCategorys(this.pm);
      }
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.hide{
  display: none;
}
.cms-container {
  padding: 15px;
  display: flex;
  height: 100%;
  .table-content {
    margin-top: 0px;
  }
  .box-card {
    flex: 1;
  }
  .menu-title {
    background: #869099;
    line-height: 50px;
    font-size: 16px;
    font-weight: bold;
    padding: 0 0 0 15px;
    color: #fff;
  }
  .sub-menu {
    background: #fff;
    box-shadow: 0 0 10px #ddd;
    width: 200px;
    margin: 0 15px 0 0;
    height: 100%;
    .el-menu-vertical {
    }
    .sel {
      background: #ecf5ff;
    }
  }
  .dot-circle {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #909399;
    font-size: 16px;
    border-radius: 5px;
    margin: 0 3px 0 0;
  }
}
</style>