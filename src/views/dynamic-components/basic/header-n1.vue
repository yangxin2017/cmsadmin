<template>
  <div class="yy-header-container">
    <div class="logo">
      <a :href="path">
        <img :src="src" alt />
      </a>
    </div>
    <div class="title">{{title}}</div>
    <div class="buttons">
      <rg-time v-if="showtime == true"></rg-time>
      <i v-if="showsetting == true" class="el-icon-setting"></i>
      <i v-if="showuser == true" class="el-icon-user"></i>
      <i v-if="showsearch == true" class="el-icon-search" @click="showsearchcontent=true"></i>
      <el-input
        v-if="showsearchcontent == true"
        size="small"
        :autofocus="true"
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        v-model="searchContent"
        style="width:200px"
        @keyup.native="enterSearch($event)"
        @blur="showsearchcontent=false"
      ></el-input>

      <span class="username" v-if="showuser == true">Admin</span>
    </div>
  </div>
</template>
<script>
import rgtime from "./coms/rg-time";
import { getBasePath } from "@/utils/common";

export default {
  props: {
    src: {
      type: String
    },
    title: {
      type: String
    },
    showtime: {
      type: Boolean
    },
    showsetting: {
      type: Boolean
    },
    showsearch: {
      type: Boolean
    },
    showuser: {
      type: Boolean
    },
    appData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      path: "",
      searchContent: "",
      showsearchcontent: false
    };
  },
  components: {
    "rg-time": rgtime
  },
  mounted() {
    let basepath = getBasePath();
    if (this.appData.binddata && this.appData.binddata.linkmod) {
      let lk = this.appData.binddata.linkmod[0];
      this.path = basepath + "&path=" + lk.value;
    }
  },
  methods: {
    enterSearch(ev) {
      if (ev.keyCode == 13) {
        let basepath = getBasePath();
        if (this.appData.binddata && this.appData.binddata.linkmod) {
          let lk = this.appData.binddata.linkmod[1];
          let params = lk.params;
          let field = params[0] ? params[0].field : "";

          let path =
            basepath +
            "&path=" +
            lk.value +
            "&" +
            field +
            "=" +
            this.searchContent;
          if (!this.searchContent) {
            this.$message.error("请输入搜索内容");
          } else {
            window.open(path, "_blank");
          }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.yy-header-container {
  display: flex;
  height: 100%;
  .logo {
    width: 100px;
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 0 0 15px;
    img {
      height: 100%;
      max-height: 60px;
    }
  }
  .title {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .buttons {
    width: 300px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 15px;
    i {
      font-size: 24px;
      margin-left: 10px;
      cursor: pointer;
    }
    .username {
      margin-left: 5px;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
<style lang="scss">
</style>

