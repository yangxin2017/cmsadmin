<template>
  <div class="yy-detail-right" v-if="content">
    <h2>{{ content.title }}</h2>
    <div class="tags" v-if="content.tags && content.tags.length > 0">
      <a class="ts" v-for="(item,inx) in content.tags" :key="inx">{{item}}</a>
    </div>
    <div class="rg-info">
      <span class="source">来源单位：{{ content.lydwmc }}</span>
      <span class="time">{{ content.publishTime }}</span>
    </div>
    <div class="rg-file">
      <!-- <div v-if="ispdf==1 && loadTask" style="height:100%;overflow:auto;">
        <pdf v-for="i in numPages" :key="i" :src="loadTask" :page="i"></pdf>
      </div>-->
      <iframe
        v-if="nrwj"
        :src="nrwj"
        width="100%"
        height="100%"
        marginwidth="0"
        marginheight="0"
        frameborder="0"
        v-loading="loadingfile"
      ></iframe>
      <video v-if="spwj" controls="controls" :src="spwj"></video>
    </div>
    <div class="extra" :class="{'show': showextra}">
      <p class="e-info">{{ content.desc }}</p>
      <div class="img e-info" v-if="tpwj">
        <img :src="tpwj" alt />
      </div>
      <i v-if="!showextra" class="el-icon-d-arrow-left" @click="showextra=!showextra"></i>
      <i v-if="showextra" class="el-icon-d-arrow-right" @click="showextra=!showextra"></i>
    </div>
  </div>
</template>
<script>
import pdf from "vue-pdf";

export default {
  components: {
    pdf
  },
  props: {
    content: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showextra: false,
      loadTask: null,
      numPages: undefined,
      loadingfile: false,

      // nrwj: '',
      // tpwj: '',
      // spwj: ''
    };
  },
  mounted() {
    if (this.content) {
      if (this.content.nrwj) {
        this.content.nrwj = "/cms/webfile/" + this.content.nrwj;
      }
      if (this.content.tpwj) {
        this.content.tpwj = "/cms/webfile/" + this.content.tpwj;
      }
      if (this.content.spwj) {
        this.content.spwj = "/cms/webfile/" + this.content.spwj;
      }
    }
  },
  computed: {
    nrwj(){
      if (this.content.nrwj) {
        return "/cms/webfile/" + this.content.nrwj;
      }
    },
    tpwj(){
      if (this.content.tpwj) {
        return "/cms/webfile/" + this.content.tpwj;
      }
    },
    spwj(){
      if (this.content.spwj) {
        return "/cms/webfile/" + this.content.spwj;
      }
    }
    // ispdf() {
    //   let ispdf = 1;
    //   if (this.content.nrwj) {
    //     if (this.content.nrwj.indexOf(".pdf") >= 0) {
    //       ispdf = 1;
    //       this.loadingfile = true;
    //       this.loadTask = pdf.createLoadingTask(this.content.nrwj);
    //       this.loadTask.then(res => {
    //         this.numPages = res.numPages;
    //         this.loadingfile = false;
    //       }).catch(err=>{
    //         this.loadingfile = false;
    //       });
    //     } else if (this.content.nrwj.indexOf(".doc") >= 0) {
    //       ispdf = 2;
    //       this.loadTask = null;
    //     } else {
    //       ispdf = -1;
    //       this.loadTask = null;
    //     }
    //   } else {
    //     ispdf = -1;
    //     this.loadTask = null;
    //   }
    //   return ispdf;
    // }
  }
};
</script>
<style lang="scss" scoped>
.yy-detail-right {
  padding: 0 20px;
  position: relative;
  height: 100%;
  h2 {
    text-align: center;
  }
  .tags {
    margin: 5px 0;
    text-align: center;
    a {
      display: inline-block;
      margin: 0 5px 0 0;
      padding: 3px 5px;
    }
  }
  .rg-info {
    display: flex;
    justify-content: space-between;
  }
  .rg-file {
    height: calc(100% - 100px);
    video {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
  .extra {
    position: absolute;
    top: -20px;
    right: 0;
    width: 30px;
    padding: 10px;
    height: 100%;
    overflow: auto;
    transition: width 0.33s;
    .img {
      width: 100%;
      img {
        width: 100%;
      }
    }
    i {
      font-size: 20px;
      cursor: pointer;
      position: absolute;
      left: 4px;
      top: 50%;
    }
    .e-info {
      display: none;
    }
    &.show {
      width: 300px;
      .e-info {
        display: block;
      }
    }
  }
}
</style>