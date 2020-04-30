<template>
  <div class="yy-detail-right" v-if="content">
    <h2>{{ content.title }}</h2>
    <div class="rg-info">
      <span class="source">来源单位：{{ content.lydwmc }}</span>
      <span class="time">{{ content.publishTime }}</span>
    </div>
    <div class="rg-file">
      <div v-if="ispdf==1 && loadTask" style="height:100%;overflow:auto;">
        <pdf v-for="i in numPages" :key="i" :src="loadTask" :page="i"></pdf>
      </div>
      <iframe
        v-if="ispdf==2 && content.nrwj"
        :src="content.nrwj"
        width="100%"
        height="100%"
        marginwidth="0"
        marginheight="0"
        frameborder="0"
      ></iframe>
      <video v-if="content.spwj" controls="controls" :src="content.spwj"></video>
    </div>
    <div class="extra" :class="{'show': showextra}">
      <p class="e-info">{{ content.desc }}</p>
      <div class="img e-info" v-if="content.tpwj">
        <img :src="content.tpwj" alt />
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
      numPages: undefined
    };
  },
  computed: {
    ispdf() {
      let ispdf = 1;
      if (this.content.nrwj) {
        if (this.content.nrwj.indexOf(".pdf") >= 0) {
          ispdf = 1;
          this.loadTask = pdf.createLoadingTask(this.content.nrwj);
          this.loadTask.then(res => {
            this.numPages = res.numPages;
          });
        } else if (this.content.nrwj.indexOf(".doc") >= 0) {
          ispdf = 2;
          this.loadTask = null;
        } else {
          ispdf = -1;
          this.loadTask = null;
        }
      } else {
        ispdf = -1;
        this.loadTask = null;
      }
      return ispdf;
    }
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
  .rg-info {
    display: flex;
    justify-content: space-between;
  }
  .rg-file{
    height:calc(100% - 100px);
    video{
      width:100%;height:100%;
      object-fit:fill;
    }
  }
  .extra {
    position: absolute;
    top: -20px;
    right: 0;
    width: 30px;
    background: #ccc;
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