<template>
  <div class="cms-container">
    <el-card class="box-card">
      <content-header></content-header>

      <div class="table-content">
        <content-list></content-list>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import contentHeader from "@/views/admin/content/components/content-header";
import contentList from "@/views/admin/content/components/content-list";

export default {
  components: {
    "content-header": contentHeader,
    "content-list": contentList
  },
  data() {
    return {
      content: ""
    };
  },
  computed: {
    ...mapGetters(["categorys"])
  },
  mounted() {
    this.content = "Content";
    let params = this.$route.params;
    let pcode = params.pcode;
    let code = params.code;
    //////////////
    if (pcode && code) {
        console.log(pcode, code)
      if(this.validCate(pcode, code)){
          console.log('ok')
      }else{
          // this.$router.push({path: '/404'})
      }
    }
  },
  methods: {
    validCate(pcode, code) {
      let isvalid = false;
      for (let c of this.categorys) {
        if (c.code == pcode) {
          for (let ci of c.children) {
            if (ci.code == code) {
              isvalid = true;
            }
          }
        }
      }
      return isvalid;
    }
  }
};
</script>
<style lang="scss" scoped>
.cms-container {
  padding: 15px;
  .table-content {
    margin-top: 20px;
  }
}
</style>