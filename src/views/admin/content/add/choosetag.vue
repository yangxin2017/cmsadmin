<template>
  <div class="choose-tags">
    <div class="ch-tags">
      <el-tag
        closable
        :key="tag.id"
        v-for="tag in choosetags"
        :disable-transitions="false"
        @close="deleteTag(tag)"
      >{{tag.name}}</el-tag>
    </div>
    <div class="all-tags">
      <div class="l1tag">
        <a
          :class="{sel: curid == item.id}"
          v-for="(item,index) in tags"
          :key="index"
          @click="chooseTag(item)"
        >{{item.name}}</a>
      </div>
      <div class="listtags">
        <div class="l2tags">
          <a v-for="item in l2tags" :key="item.id">{{item.name}}</a>
        </div>
        <div class="l3tags">
          <span :class="{sel: choosetagstr.indexOf(item.id + ',') >= 0}" @click="choosel3Tag(item)" v-for="item in l3tags" :key="item.id">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tags: {
      type: Array,
      default: []
    }
  },
  methods: {
    chooseTag(item) {
      this.l2tags = [];
      this.l3tags = [];
      this.curid = item.id;
      if (item.children.length > 0) {
        for (let c of item.children) {
          if (c.children && c.children.length > 0) {
            this.l2tags.push(c);
            for (let ci of c.children) {
              this.l3tags.push(ci);
            }
          } else {
            this.l3tags.push(c);
          }
        }
      } else {
        this.l3tags.push(item);
      }
    },
    choosel3Tag(item) {
      if (this.choosetagstr.indexOf(item.id + ",") < 0) {
        this.choosetagstr += item.id + ",";
        this.choosetags.push(item);
      }
    },
    deleteTag(item) {
      if (this.choosetagstr.indexOf(item.id + ",") >= 0) {
        this.choosetagstr = this.choosetagstr.replace(item.id + ",", "");
        this.choosetags = this.choosetags.filter(v => {
          return v.id != item.id;
        });
      }
    }
  },
  mounted() {},
  data() {
    return {
      curid: 49,
      l2tags: [],
      l3tags: [],
      choosetags: [],
      choosetagstr: ""
    };
  }
};
</script>
<style lang="scss" scoped>
.choose-tags {
  padding: 5px;
  width: 100%;
  .ch-tags {
    border: solid 1px #eee;
    width: 100%;
    overflow: auto;
    padding: 5px 0px 3px 10px;
    white-space: nowrap;
    .el-tag {
      display: inline-block;
      margin: 0 10px 0 0;
    }
  }
  .all-tags {
    border: solid 1px #eee;
    width: 100%;
    max-height: 300px;
    overflow: auto;
    margin: 10px 0 0 0;
    display: flex;
    justify-content: space-between;
    .l1tag {
      width: 120px;
      overflow: auto;
      a {
        padding: 0 5px;
        line-height: 35px;
        height: 35px;
        border-bottom: solid 1px #eee;
        font-size: 12px;
        border-right: solid 1px #eee;
        color: #333;
        display: block;
        &:hover {
          background: #eee;
        }
        &.sel {
          background: #409eff;
          color: #fff;
        }
      }
    }
    .listtags {
      flex: 1;
      .l2tags {
        height: 40px;
        background: #fff;
        border-bottom: solid 1px #ddd;
        a {
          display: inline-block;
          font-size: 14px;
          color: #333;
          height: 40px;
          line-height: 40px;
          padding: 0 10px;
          border-right: solid 1px #ddd;
          cursor: pointer;
          &:hover {
            background: #ddd;
          }
          &.sel {
            background: #409eff;
            color: #fff;
          }
        }
      }
      .l3tags {
        padding: 10px;
        span {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 40px;
          background: #eee;
          font-size: 12px;
          color: #333;
          cursor: pointer;
          margin: 0 5px 5px 0;
          &:hover {
            background: #ecf5ff;
            color: #409eff;
          }
          &.sel {
            background: #409eff;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>