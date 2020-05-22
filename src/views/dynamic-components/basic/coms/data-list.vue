<template>
  <div class="yy-datalist">
    <ul v-if="datalist && datalist.length > 0">
      <li v-for="item in datalist" :key="item.id">
        <p class="titles">
          <a class="link" :href="item.href">
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
</template>
<script>
export default {
  props: {
    datalist: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.yy-datalist {
  ul {
    list-style: none;
    margin: 0 5px;
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
      .infos {
        display: flex;margin:4px;
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
</style>
