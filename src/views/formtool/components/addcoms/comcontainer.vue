<template>
  <div
    class="com-container"
    :class="{sel: sel && !prev, nobor: prev}"
    @click="chooseFormItem()"
    v-if="comitem"
    :style="{width: comitem.width + '%'}"
  >
    <i class="el-icon-delete-solid del" @click="delComItem()" v-if="!prev"></i>
    <bf-input v-if="comitem.com.ctype == 'input'" :comitem="comitem"></bf-input>
    <bf-textarea v-if="comitem.com.ctype == 'textarea'" :comitem="comitem"></bf-textarea>
    <bf-radio v-if="comitem.com.ctype == 'radio'" :comitem="comitem"></bf-radio>
    <bf-checkbox v-if="comitem.com.ctype == 'checkbox'" :comitem="comitem"></bf-checkbox>
    <bf-select v-if="comitem.com.ctype == 'select'" :comitem="comitem"></bf-select>
    <bf-datetime v-if="comitem.com.ctype == 'datetime'" :comitem="comitem"></bf-datetime>
    <bf-number v-if="comitem.com.ctype == 'number'" :comitem="comitem"></bf-number>
  </div>
</template>
<script>
import bfinput from "@/views/formtool/components/basecoms/bf-input";
import bftextarea from "@/views/formtool/components/basecoms/bf-textarea";
import bfradio from "@/views/formtool/components/basecoms/bf-radio";
import bfcheckbox from "@/views/formtool/components/basecoms/bf-checkbox";
import bfselect from "@/views/formtool/components/basecoms/bf-select";
import bfdatetime from "@/views/formtool/components/basecoms/bf-datetime";
import bfnumber from "@/views/formtool/components/basecoms/bf-number";

export default {
  components: {
    "bf-input": bfinput,
    "bf-textarea": bftextarea,
    "bf-radio": bfradio,
    "bf-checkbox": bfcheckbox,
    "bf-select": bfselect,
    "bf-datetime": bfdatetime,
    "bf-number": bfnumber
  },
  props: {
    comitem: {
      type: Object,
      default: null
    },
    sel: {
      type: Boolean,
      default: false
    },
    prev: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    chooseFormItem() {
      this.$emit("chooseItem", this.comitem);
    },
    delComItem() {
      this.$emit("deleteItem", this.comitem);
    }
  }
};
</script>
<style lang="scss" scoped>
.com-container {
  position: relative;
  min-height: 40px;
  width: 30%;
  border: solid 1px #eee;
  padding: 5px 10px;
  margin: 0 15px 20px 0;
  display: flex;
  align-items: center;

  &.nobor {
    border: solid 1px transparent;
  }

  &.sel {
    border: solid 1px #f90;
  }

  .del {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 18px;
    color: #f56c6c;
    cursor: pointer;
    z-index: 99;
  }
}
</style>