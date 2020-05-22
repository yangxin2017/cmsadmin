<template>
  <div class="yy-contact">
    <div class="tact">
      <span class="dept">{{dw1}}</span>
      <br />
      <span class="phone">{{dh1}}</span>
    </div>
    <div class="line"></div>
    <div class="tact">
      <span class="dept">{{dw2}}</span>
      <br />
      <span class="phone">{{dh2}}</span>
    </div>
    <div class="line"></div>
    <div class="tact">
      <span class="dept">{{dw3}}</span>
      <br />
      <span class="phone">{{dh3}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "面板标题"
    },
    appData: {
      type: Object,
      default: {}
    },
    dw1: {
      type: String,
      default: "单位名称"
    },
    dh1: {
      type: String,
      default: "010-87702584"
    },
    dw2: {
      type: String,
      default: "单位名称"
    },
    dh2: {
      type: String,
      default: "010-87702584"
    },
    dw3: {
      type: String,
      default: "单位名称"
    },
    dh3: {
      type: String,
      default: "010-87702584"
    }
  }
};
</script>
<style lang="scss" scoped>
.yy-contact {
  display: flex;
  justify-content: space-between;
  align-items: center;height: 100%;
  .tact {
    line-height: 25px;
    font-size: 14px;
    text-align: center;
    flex: 1;
    .dept {
      color: #333;
    }
    .phone {
      color: #f90;
    }
  }
  .line {
    width: 1px;
    background: #f90;
    height: 35px;
  }
}
</style>