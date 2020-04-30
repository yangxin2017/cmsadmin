<template>
  <div class="yy-seach-panel">
    <div class="search-con">
      <ul class="cate-menu">
        <li
          @click="categoryId=item.id"
          v-for="item in menus"
          :key="item.id"
          :class="{'sel': categoryId == item.id}"
        >{{ item.name }}</li>
      </ul>
      <div class="inp-con">
        <el-input
          size="medium"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="searchContent"
          @keyup.native="enterSearch($event)"
        ></el-input>
      </div>
      <ul class="hot-words">
        <li v-for="item in hotwords" :key="item.id" @click="searchHotword(item)">{{ item.name }}</li>
      </ul>
    </div>
    <div class="search-list" v-loading="loading">
      <ul v-if="contents.length > 0">
        <li v-for="item in contents" :key="item.id">
          <p class="titles">
            <a :href="item.href" class="link">
              <span class="symbol"></span>
              {{ item.title }}
            </a>
            <span class="clicks">{{ item.clicks }}</span>
          </p>
          <p class="infos">
            <span class="time">{{ item.publishTime }}</span>
            <span class="from">{{ item.lydwmc }}</span>
          </p>
        </li>
      </ul>
      <p v-else>没有查询到数据。</p>
    </div>
    <div class="hd-pages">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalcount"
        @current-change="changePage($event)"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getHotWords, searchContents } from "@/api/cms";

export default {
  props: {
    appData: {
      type: Object,
      default: {}
    },
    keyword: {
      type: String,
      default: ""
    },
    showCount: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      searchContent: "",
      curpage: 1,
      totalcount: 10,
      menus: [],
      categoryId: -1,
      hotwords: [],
      hotwordId: -1,
      loading: false,
      contents: []
    };
  },
  mounted() {
    this.searchContent = this.$route.query[this.keyword];
    if (!this.searchContent) {
      this.searchContent = "";
    }

    if (this.appData.binddata && this.appData.binddata.pobjs) {
      this.menus = [{ id: -1, name: "全部", code: "", show: true }];
      for (let d of this.appData.binddata.pobjs) {
        this.menus.push(d);
      }
    }
    this.initInfo();
  },
  methods: {
    changePage(ev) {
      this.curpage = ev;
      this.initContent();
    },
    async initInfo() {
      this.hotwords = await getHotWords();
      this.initContent();
    },
    async initContent() {
      let lkmod = this.appData.binddata.linkmod[0];
      this.loading = true;
      let cid = this.categoryId == -1 ? undefined : this.categoryId;
      let dataobj = await searchContents({
        cid: cid,
        pagenum: this.curpage,
        pagesize: this.showCount,
        keyword: this.searchContent,
        linkmod: lkmod
      });
      this.contents = dataobj.data;
      this.totalcount = dataobj.total;
      this.loading = false;
    },
    enterSearch(ev) {
      if (ev.keyCode == 13) {
        this.curpage = 1;
        this.initContent();
      }
    },
    searchHotword(item) {
      this.searchContent = item.name;
      this.initContent();
    }
  }
};
</script>
<style lang="scss" scoped>
.yy-seach-panel {
  height: 100%;
  .search-con {
    .cate-menu {
      margin: 0;
      padding: 0;
      list-style: none;
      overflow: auto;
      li {
        display: inline-block;
        padding: 0 10px;
        border-bottom: solid 2px transparent;
        cursor: pointer;
        &.sel,
        &:hover {
          border-bottom: solid 2px #333;
        }
      }
    }
    .inp-con {
      margin: 10px;
    }
    .hot-words {
      margin: 0;
      padding: 0;
      list-style: none;
      overflow: auto;
      li {
        display: inline-block;
        padding: 0 10px;
        font-size: 12px;
        border-bottom: solid 2px transparent;
        cursor: pointer;
        &.sel,
        &:hover {
          color: #f90;
        }
      }
    }
  }

  .search-list {
    height: calc(100% - 138px);
    overflow: auto;
    ul {
      list-style: none;
      margin: 5px;
      padding: 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        flex: 0 1 33.33%;
        .titles {
          display: flex;
          justify-content: space-between;
          .link {
            flex: 1;
            text-align: left;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            &:hover {
              text-decoration: underline;
              color: #409eff;
            }
            .symbol {
              display: inline-block;
              width: 5px;
              height: 5px;
              border-radius: 5px;
              background: #000;
              margin: 0 5px 0 0;
              vertical-align: middle;
            }
          }
          .clicks {
            width: 40px;
            text-align: right;
          }
        }
        &.sel {
          .link {
            color: #f90;
          }
        }
        .infos {
          display: flex;
          justify-content: space-between;
          .time {
            flex: 1;
          }
          .from {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }
  .hd-pages {
    height: 35px;
    margin-top: 10px;
    line-height: 30px;
    text-align: center;
  }
}
</style>