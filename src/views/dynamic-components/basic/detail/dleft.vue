<template>
  <div class="yy-detail-left" v-if="binddata && binddata.pobjs">
    <div class="hd">
      <select @change="changeLelM1($event)" :value="curCategoryPId">
        <option v-for="m in lelM1" :key="m.id" :value="m.id">{{m.name}}</option>
      </select>
    </div>
    <div class="hd-menu">
      <ul>
        <li
          :class="{'sel': curCategoryId == item.id }"
          v-for="item in lelM2"
          :key="item.id"
          @click="changeLelM2(item)"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="hd-content-list" v-loading="loading">
      <ul>
        <li v-for="item in datalists" :key="item.id" :class="{'sel': curCid == item.id}">
          <p class="titles">
            <a @click="selectList(item)" class="link">
              <i class="el-icon-caret-right"></i>
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
import { getContent, getContentById } from "@/api/cms";

export default {
  props: {
    binddata: {
      type: Object,
      default: {}
    },
    contentId: {
      type: String,
      default: ""
    },
    showcount: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      lelM1: [],
      lelM2: [],
      curCategoryPId: -1,
      curCategoryId: -1,
      loading: false,
      datalists: [],
      pageindex: 1,
      totalcount: 1,
      curCid: -1,
      lkmod: null
    };
  },
  mounted() {
    this.curCid = this.$route.query[this.contentId];
    if (this.binddata && this.binddata.pobjs) {
      this.lkmod = this.binddata.linkmod[0];
      for (let o of this.binddata.pobjs) {
        this.lelM1.push(o);
      }
      this.lelM2.push({ id: -1, name: "全部", code: "", show: true });
      if (this.lelM1.length > 0) {
        for (let m of this.lelM1[0].children) {
          if (m.select) {
            this.lelM2.push(m);
          }
        }
        this.curCategoryPId = this.lelM1[0].id;
      }

      this.setCurContent();

      this.initContent();
    }
  },
  methods: {
    async setCurContent() {
      let curContent = await getContentById({ id: this.curCid, linkmod: this.lkmod });
      if (curContent) {
        this.curCategoryId = curContent.categoryId;
        ///获取父级ID
        for (let m1 of this.lelM1) {
          for (let m2 of m1.children) {
            if (m2.id == this.curCategoryId) {
              this.curCategoryPId = m1.id;
            }
          }
        }
        ///
        this.lelM2 = [{ id: -1, name: "全部", code: "", show: true }];
        for (let l1 of this.lelM1) {
          if (l1.id == this.curCategoryPId) {
            for (let m of l1.children) {
              if (m.select) {
                this.lelM2.push(m);
              }
            }
          }
        }
      }
      this.$emit("eventSelectList", curContent);
    },
    changeLelM1(ev) {
      let cid = ev.target.value;
      this.curCategoryPId = cid;
      this.curCategoryId = -1;
      this.lelM2 = [{ id: -1, name: "全部", code: "", show: true }];
      for (let l1 of this.lelM1) {
        if (l1.id == cid) {
          for (let m of l1.children) {
            if (m.select) {
              this.lelM2.push(m);
            }
          }
        }
      }
      this.initContent();
    },
    changeLelM2(item) {
      this.curCategoryId = item.id;
      //////////////////////////////
      this.initContent();
    },
    async initContent() {
      this.loading = true;
      let cid = this.curCategoryId;
      if (cid == -1) {
        cid = this.curCategoryPId;
      }
      if (cid != -1) {
        let contents = await getContent({
          cid: cid,
          pagenum: this.pageindex,
          pagesize: this.showcount,
          linkmod: null,
          containChild: true
        });
        this.datalists = contents.data;
        this.totalcount = contents.total;
      }
      this.loading = false;
    },
    changePage(ev) {
      this.pageindex = ev;
      this.initContent();
    },
    selectList(item) {
      this.curCid = item.id;
      this.$emit("eventSelectList", item);
    }
  }
};
</script>
<style lang="scss" scoped>
.yy-detail-left {
  height: 100%;
  .hd {
    height: 30px;
    line-height: 30px;
  }
  .hd-menu {
    height: 30px;
    line-height: 30px;
    border: solid 1px #ccc;
    ul {
      width: 100%;
      padding: 0;
      margin: 0;
      list-style: none;
      white-space: nowrap;
      overflow: auto;
      li {
        border-bottom: solid 2px transparent;
        cursor: pointer;
        &.sel {
          border-bottom: solid 2px #000;
        }
        display: inline-block;
        margin-right: 8px;
      }
    }
  }
  .hd-content-list {
    height: calc(100% - 113px);
    overflow: auto;
    ul {
      list-style: none;
      margin: 5px;
      padding: 0;
      li {
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
    line-height: 30px;
    text-align: center;
  }
}
</style>