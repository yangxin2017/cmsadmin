<template>
  <div class="component-info">
    <div v-if="binddata">
      <el-divider content-position="left">绑定数据源</el-divider>
      <cominfo-datasource
        :categorys="categorys"
        :binddata="binddata"
        @addCateEvent="addCateEvent"
        @eventChangeDataSource="changeDataSource"
      ></cominfo-datasource>
    </div>

    <el-divider content-position="left">输入信息</el-divider>
    <div class="com-line" v-for="(item, index) in params" :key="index + ts">
      <form-upload
        @eventValueChange="setImage($event, item)"
        v-if="item.type == 'image'"
        :title="item.title"
      ></form-upload>
      <form-text
        :defValue="item.value"
        @eventValueChange="setText($event, item)"
        v-if="item.type == 'text'"
        :title="item.title"
      ></form-text>
      <form-checkbox
        style="display:none;"
        :defValue="item.value"
        @eventValueChange="setCheckBox($event, item)"
        v-if="item.type == 'checkbox'"
        :title="item.title"
      ></form-checkbox>

      <!-- 如何设置显示类别 binddata -->

      <form-select
        @eventValueChange="setSelectForChildren($event, item, curDataTab)"
        :defValue="curDataTab.type"
        v-if="curDataTab && item.type == 'select'"
        :predatas="item.predata"
        :title="item.title"
      ></form-select>

      <form-number
        @eventValueChange="setText($event, item)"
        :defValue="item.value"
        v-if="item.type == 'number'"
        :title="item.title"
      ></form-number>

      <form-select
        style="display:none;"
        @eventValueChange="setSelect($event, item)"
        defField="label"
        :defValue="item.value"
        v-if="item.type == 'text-param'"
        :predatas="curMenu.params"
        :title="item.title"
      ></form-select>

      <form-chks
        @valueChanged="setChks($event, item)"
        :defValue="item.value"
        v-if="item.type == 'chks'"
        :chooseValues="item.chooses"
        :binddata="binddata"
        :title="item.title"
      ></form-chks>

      <div
        v-if="item.children"
        style="padding:5px 5px 5px 25px;background:#fbfbfb;border-left:solid 1px #409EFF;"
      >
        <div v-for="inItem in item.children" :key="inItem.id">
          <form-text
            style="display:none;"
            :defValue="inItem.value"
            @eventValueChange="setText($event, inItem)"
            v-if="inItem.type == 'text' && inItem.showvalue == item.value"
            :title="inItem.title"
          ></form-text>
          <form-checkbox
            style="display:none;"
            :defValue="inItem.value"
            @eventValueChange="setCheckBox($event, inItem)"
            v-if="inItem.type == 'checkbox' && inItem.showvalue == item.value"
            :title="inItem.title"
          ></form-checkbox>
          <form-number
            @eventValueChange="setText($event, inItem)"
            :defValue="inItem.value"
            v-if="inItem.type == 'number' && inItem.showvalue == item.value"
            :title="inItem.title"
          ></form-number>
        </div>
      </div>
    </div>

    <div v-if="binddata" style="display:none">
      <el-divider content-position="left">页面跳转设置</el-divider>
      <cominfo-page ref="cpInfo" :menus="menus" :binddata="binddata"></cominfo-page>
      <!-- @eventChangePage="changeDataSource()" -->
    </div>
  </div>
</template>
<script>
import formupload from "@/views/project/project-edit/components/baseform/form-upload";
import formtext from "@/views/project/project-edit/components/baseform/form-text";
import formcheckbox from "@/views/project/project-edit/components/baseform/form-checkbox";
import formselect from "@/views/project/project-edit/components/baseform/form-select";
import formnumber from "@/views/project/project-edit/components/baseform/form-number";
import formchks from "@/views/project/project-edit/components/baseform/form-chks";

import cominfodatasource from "./components/com-info-datasource";
import cominfopage from "./components/com-info-page";

export default {
  components: {
    "form-upload": formupload,
    "form-text": formtext,
    "form-checkbox": formcheckbox,
    "form-select": formselect,
    "form-number": formnumber,
    "cominfo-datasource": cominfodatasource,
    "cominfo-page": cominfopage,
    "form-chks": formchks
  },
  props: {
    menus: {
      type: Array,
      default: []
    },
    categorys: {
      type: Array,
      default: []
    },
    curMenu: {
      type: Object,
      default: {}
    },
    curTab: {
      type: Object,
      default: null
    }
  },
  mounted() {},
  data() {
    return {
      params: [],
      binddata: null,
      ts: new Date().getTime(),
      curTmpDataTab: null
    };
  },
  computed: {
    curDataTab() {
      return this.curTab ? this.curTab : this.curTmpDataTab;
    }
  },
  methods: {
    addCateEvent() {
      this.$emit("addCateEvent");
    },
    reset() {
      this.params = [];
      this.binddata = null;
    },
    /////////////
    tabItem(datas, binddata, curdatatab) {
      this.params = datas;
      this.binddata = binddata;
      this.ts = new Date().getTime();
      this.curTmpDataTab = curdatatab;
      ////////////////////////////////
      setTimeout(() => {
        this.$refs.cpInfo.chooseDefault();
      }, 300);
    },
    /** event */
    setChks(showfileds, param) {
      param.value = showfileds;
      this.$emit("eventValueChanged", [param]);
    },
    setText(text, param) {
      param.value = text[0];
      this.$emit("eventValueChanged", [param]);
    },
    setImage(src, param) {
      param.value = src[0];
      this.$emit("eventValueChanged", [param]);
    },
    setCheckBox(checked, param) {
      param.value = checked[0];
      this.$emit("eventValueChanged", [param]);
    },
    setSelectForChildren(selValue, item, param) {
      item.value = selValue[0];
      param.type = selValue[0];
      //param.value = selValue[0]
      // this.$emit("eventValueChanged", []);
    },
    setSelect(selValue, param) {
      // this.curMenu.type = param.value
      // console.log(this.curMenu, param)
      param.type = selValue[0];
      //this.$emit('eventValueChanged', [param])
    },
    changeDataSource() {
      console.log("change datasource");
      this.$emit("eventValueChanged", []);
    }
  }
};
</script>
<style lang="scss" scoped>
.component-info {
  .title {
    padding-top: 0px;
    margin-top: 0;
  }
  .com-line {
    & > div {
      margin: 0 0 10px 0;
    }
  }
}
</style>
