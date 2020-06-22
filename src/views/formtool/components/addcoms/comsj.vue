<template>
  <div class="comsj-container">
    <h3>XXX表单设计</h3>
    <div class="coms">
      <com-container
        :sel="curcomid == item.id"
        v-for="item in coms"
        :key="item.id"
        :comitem="item"
        @chooseItem="chooseFormItem(item)"
        @deleteItem="deleteFormItem(item)"
      ></com-container>
    </div>
  </div>
</template>
<script>
import comcontainer from "@/views/formtool/components/addcoms/comcontainer";
import { uuid } from "@/utils/common";
import { getDesignById } from "@/api/form";
import { Base64 } from "js-base64";
export default {
  components: {
    "com-container": comcontainer
  },
  methods: {
    addCom(com) {
      let confs = JSON.parse(com.confs);
      let bs = { id: uuid(), com: com };
      let target = Object.assign(bs, confs);

      this.coms.push(target);
    },
    deleteFormItem(com) {
      this.coms = this.coms.filter(v => {
        return v.id != com.id;
      });
    },
    chooseFormItem(item) {
      this.curcom = item;
      this.curcomid = item.id;
      this.$emit("chooseItem", item);
    },
    async initInfo(id) {
      let design = await getDesignById({ id: id });
      if (design && design.confs) {
        let str = Base64.decode(design.confs);
        let json = JSON.parse(str);
        this.coms = json;
      }
    }
  },
  data() {
    return {
      coms: [],
      curcomid: -1,
      curcom: {}
    };
  },
  mounted() {
    let id = this.$route.query.id;
    this.initInfo(id);
  }
};
</script>
<style lang="scss" scoped>
.comsj-container {
  h3 {
    margin: 0 0 10px 0;
    text-align: center;
  }
  .coms {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>