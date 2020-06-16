<template>
  <div>
    <el-dialog title="预览信息" :visible.sync="dialogVisible" width="70%">
      <div class="prev-container" v-if="content">
        <h3>{{content.title}}</h3>
        <div class="tags" v-if="content.tags.length > 0">
          <el-tag size="mini" v-for="(item,index) in content.tags" :key="index">{{item}}</el-tag>
        </div>
        <div class="infos">
          <span>来源单位：{{content.lydwmc}}</span>
          <span>发布时间：{{content.publishTime}}</span>
        </div>
        <div class="infos" style="background:#eee;padding:10px 5px;">
          <div>摘要：{{content.desc}}</div>
          <div>
            <pre-file-com v-if="content.tpwj" type="image" :url="content.tpwj"></pre-file-com>
          </div>
        </div>
        <div class="details">
          <pre-file-com v-if="content.nrwj" type="file" :url="content.nrwj"></pre-file-com>
          <pre-file-com v-if="content.spwj" type="video" :url="content.spwj"></pre-file-com>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import prefilecom from "@/views/admin/content/prev/prefilecom";
export default {
  components: {
    "pre-file-com": prefilecom
  },
  data() {
    return {
      dialogVisible: false,
      content: null
    };
  },
  methods: {
    show(content) {
      this.dialogVisible = true;
      this.content = content;
      console.log(content);
    }
  },
  mounted() {
    console.log();
  }
};
</script>
<style lang="scss" scoped>
.prev-container {
  h3 {
    margin: 0 0 10px 0;
    text-align: center;
  }
  .infos {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    span {
      font-size: 12px;
    }
    div {
      flex: 1;
      margin: 0 10px 0 0;
      max-height: 100px;
    }
  }
  .tags {
    text-align: center;
    .el-tag {
      margin: 0 5px;
    }
  }
}
</style>