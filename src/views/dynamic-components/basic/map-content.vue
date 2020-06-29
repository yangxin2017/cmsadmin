<template>
  <div class="yy-map-content">
    <div class="p-head">
      <span class="p-title">
        <span class="pre"></span>
        {{ title }}
      </span>
      <ul class="p-menu" v-if="curMenu">
        <li
          v-for="item in menus"
          :key="item.id"
          :class="{'sel': curMenu.id == item.id}"
          @click="changeTab(item)"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="content-wrap" ref="lmap">
      <div class="yy-map" v-if="curMenu">
        <div class="mapimg2 guo" v-if="showcountry">
          <span
            @click="changeType(item)"
            v-for="item in country"
            :class="[{'sel': curType == item.value}, item.value]"
            :key="item.value"
          >{{item.text}}</span>
        </div>
        <div class="mapimg hai" v-if="!showcountry">
          <span
            @click="changeType(item)"
            v-for="item in ocean"
            :class="[{'sel': curType == item.value}, item.value]"
            :key="item.value"
          >{{item.text}}</span>
        </div>
      </div>
      <div class="yy-map-con" ref="rmap">
        <div class="title">
          <span class="tl-txt jb-black-txt zz-zt">{{ rgText }}</span>
        </div>
        <ul class="news-data" v-loading="loading">
          <li v-for="item in contents" :key="item.id">
            <i class="el-icon-caret-right"></i>
            <div class="txts">
              <a class="names" :href="item.href">{{ item.title }}</a>
              <span class="binfo">
                <span>{{ item.publishTime }}</span>
                <span>{{ item.lydwmc }}</span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getCoutryAndOcean, getContent } from "@/api/cms";

export default {
  props: {
    showcount: {
      type: Number,
      default: 5
    },
    title: {
      type: String,
      default: "标题名称"
    },
    appData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      curMenu: null,
      curType: null,
      rgText: "",
      menus: [],
      country: [],
      ocean: [],
      showcountry: true,

      contents: [],
      pagenum: 1,
      lkmod: null,
      loading: false
    };
  },
  mounted() {
    // let total_width = this.$refs['lmap'].clientWidth - 30;
    
    this.initBaseInfo();
  },
  computed: {
    ...mapGetters(["danwei"])
  },
  methods: {
    async initBaseInfo() {
      let dataobj = await getCoutryAndOcean();
      this.country = dataobj.country;
      this.ocean = dataobj.ocean;
      //
      if (this.appData.binddata) {
        this.menus = this.appData.binddata.objs;
        this.lkmod = this.appData.binddata.linkmod[0];
        if (this.menus && this.menus.length > 0) {
          this.changeTab(this.menus[0]);
        }
      }

    },
    changeTab(item) {
      /////
      let val = this.ocean[0];
      if(this.danwei == "nanbu"){
        val = this.ocean.filter(v=>{return v.value == 'nanhai'})[0];
      }
      /////
      this.curMenu = item;
      this.showcountry = item.type.indexOf("gjlb") >= 0;
      this.curType = this.showcountry
        ? this.country[0].value
        : val.value;
      this.rgText = this.showcountry
        ? this.country[0].text
        : val.text;
      ////
      this.setContent();
    },
    changeType(item) {
      this.curType = item.value;
      this.rgText = item.text;
      this.setContent();
    },
    async setContent() {
      this.loading = true;
      let dataobj = await getContent({
        cid: this.curMenu.id,
        pagenum: this.pagenum,
        pagesize: this.showcount,
        gjmc: this.curType,
        linkmod: this.lkmod
      });
      this.loading = false;
      this.contents = dataobj.data
    }
  }
};
</script>
<style lang="scss" scoped>
.yy-map-content {
  height: 100%;

  .content-wrap {
    padding: 15px;
    height: calc(100% - 35px);
    display: flex;
    justify-content: space-between;
    .mapimg,
    .mapimg2 {
      .sel {
        color: #f90;
      }
    }
  }

  .p-head {
    display: flex;
    justify-content: space-between;
    height: 35px;
    align-items: center;
    .p-title {
      vertical-align: middle;
      padding-right: 20px;
      white-space: nowrap;
      .pre {
        display: inline-block;
        width: 5px;
        background: #000;
        height: 20px;
        vertical-align: middle;
      }
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

  .yy-map {
    width:60%;
    text-align: center;
  }

  .yy-map-con {
    width:40%;
    .news-data {
      list-style: none;
      margin: 10px 0 0 0;
      padding: 0;
      li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
        i {
          width: 20px;
        }
        .txts {
          width: calc(100% - 20px);
          .names {
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            display: block;
            margin: 0 0 5px 0;
            &:hover {
              text-decoration: underline;
            }
          }
          .binfo {
            display: flex;
            justify-content: space-between;
            span {
              font-size: 12px;
              margin-right: 4px;
            }
          }
        }
      }
    }
  }
}
</style>