<template>
  <div class="comset-container" v-if="comitem">
    <h3 class="title">组件属性设置</h3>

    <div class="set-con">
      <span class="lbl">名称：</span>
      <el-input style="flex:1;" size="small" v-model="comitem.name"></el-input>
    </div>

    <div class="set-con">
      <span class="lbl">宽度：</span>
      <el-input-number style="flex:1;" size="small" v-model="comitem.width" :min="1" :max="100"></el-input-number>
    </div>

    <div class="set-con" style="align-items:start" v-if="comitem.predatas">
      <span class="lbl">数据源：</span>
      <div style="flex:1;">
        <div class="in-con" v-for="item in comitem.predatas" :key="item.id">
          <el-input size="small" style="flex:1;" v-model="item.name"></el-input>&nbsp;&nbsp;
          <el-input size="small" style="flex:1;" v-model="item.val"></el-input>
          <i class="el-icon-delete-solid del" @click="delData(item)"></i>
        </div>
        <el-button type="primary" size="mini" @click="addDatas()">添加</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { uuid } from "@/utils/common";
export default {
  data() {
    return {
      comitem: null
    };
  },
  methods: {
    setCurItem(item) {
      this.comitem = item;
    },
    addDatas() {
      let obj = {
        id: uuid(),
        name: "名称",
        val: "1"
      };
      this.comitem.predatas.push(obj);
    },
    delData(item) {
      this.comitem.predatas = this.comitem.predatas.filter(v => {
        return v.id != item.id;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.comset-container {
  .title {
    margin: 0 0 10px 0;
  }
  .set-con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 9px;
    .lbl {
      width: 80px;
    }
    .in-con {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      .del {
        font-size: 18px;
        color: #f56c6c;
        cursor: pointer;
        width: 30px;
      }
    }
  }
}
</style>