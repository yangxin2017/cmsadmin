<template>
  <div>
    <el-dialog title="预览文件" :visible.sync="dialogVisible" width="70%" top="5vh">
      <pre-file-com :type="type" :url="url"></pre-file-com>
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
      type: "image",
      url: ""
    };
  },
  methods: {
    show(url, tp = "image") {
      this.type = tp;
      this.dialogVisible = true;
      this.url = url;
    }
  }
};
</script>
<style lang="scss" scoped>

</style>