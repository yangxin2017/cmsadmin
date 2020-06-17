<template>
  <div class="yy-header-container">
    <div class="logo">
      <!-- <a :href="path">
        <img :src="src" alt />
      </a>-->
      <div class="search-con">
        <el-input
          size="small"
          :autofocus="true"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="searchContent"
          style="width:247px"
          @keyup.native="enterSearch($event)"
          @blur="showsearchcontent=false"
        ></el-input>
      </div>
    </div>
    <div class="title">
      <span class="jb-black-txt" style="cursor:pointer" @click="goMain()">{{title}}</span>
    </div>
    <div class="buttons">
      <rg-time v-if="showtime == true"></rg-time>

      <span class="username" v-if="showuser == true">{{ username }}</span>
      <i v-if="showuser == true" class="el-icon-user-solid"></i>

      <i @click="goedit()" v-if="showsetting == true" class="el-icon-s-grid"></i>

      <i @click="goback()" v-if="showsetting == true && userrole" class="el-icon-setting"></i>

      <i class="el-icon-switch-button" @click="quit()"></i>
    </div>
  </div>
</template>
<script>
import rgtime from "./coms/rg-time";
import { getBasePath } from "@/utils/common";

export default {
  props: {
    src: {
      type: String,
      default: ""
    },
    title: {
      type: String
    },
    showtime: {
      type: Boolean,
      default: false
    },
    showsetting: {
      type: Boolean,
      default: true
    },
    showsearch: {
      type: Boolean,
      default: false
    },
    showuser: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      path: "",
      searchContent: "",
      showsearchcontent: false,
      username: "Admin",
      userrole: null
    };
  },
  components: {
    "rg-time": rgtime
  },
  mounted() {
    this.username = this.$store.getters.name;
    this.userrole = this.$store.getters.user.role;

    let basepath = getBasePath();
    if (
      this.appData &&
      this.appData.binddata &&
      this.appData.binddata.linkmod
    ) {
      let lk = this.appData.binddata.linkmod[0];
      this.path = basepath + "&path=" + lk.value;
    }
  },
  methods: {
    goMain(){
      this.$router.push('/prev')
    },
    enterSearch(ev) {
      if (ev.keyCode == 13) {
        let basepath = getBasePath();
        let path =
          basepath +
          "&path=search" +
          "&keyword" +
          "=" +
          this.searchContent;
        window.open(path, "_blank");

        // if (this.appData.binddata && this.appData.binddata.linkmod) {
        //   let lk = this.appData.binddata.linkmod[1];
        //   let params = lk.params;
        //   let field = params[0] ? params[0].field : "";

        //   let path =
        //     basepath +
        //     "&path=" +
        //     lk.value +
        //     "&" +
        //     field +
        //     "=" +
        //     this.searchContent;
        //   if (!this.searchContent) {
        //     this.$message.error("请输入搜索内容");
        //   } else {
        //     window.open(path, "_blank");
        //   }
        // }
      }
    },
    async quit(){
      await this.$store.dispatch('user/logout')
      this.$router.push(`login?redirect=${this.$route.fullPath}`)
    },
    goedit(){
      this.$router.push(`edit?id=1`)
    },
    goback(){
      this.$router.push(`/content`)
    }
  }
};
</script>
<style lang="scss" scoped>
.yy-header-container {
  display: flex;
  height: 100%;
  .logo {
    width: 300px;
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
      position: relative;
      top: 2px;
      left: 4px;
    }
  }
}
</style>
<style lang="scss">
</style>

