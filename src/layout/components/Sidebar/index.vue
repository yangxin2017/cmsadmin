<template>
  <div class="menus-container">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <div class="menu-bar">
      <ul>
        <li
          @click="gourl('/content', 'content')"
          :class="{sel: curmenu=='content'}"
          v-if="menustr.indexOf('contentManage') >= 0"
        >
          <i class="el-icon-document-copy"></i>
          <br />
          <span>内容管理</span>
        </li>
        <li
          @click="gourl('/tag', 'tag')"
          :class="{sel: curmenu=='tag'}"
          v-if="menustr.indexOf('tagManage') >= 0"
        >
          <i class="el-icon-collection-tag"></i>
          <br />
          <span>标签管理</span>
        </li>
        <li
          @click="gourl('/category', 'category')"
          :class="{sel: curmenu=='category'}"
          v-if="menustr.indexOf('categoryManage') >= 0"
        >
          <i class="el-icon-menu"></i>
          <br />
          <span>栏目管理</span>
        </li>
        <li
          @click="gourl('/project', 'project')"
          :class="{sel: curmenu=='project'}"
          v-if="webtype == 'gw' && menustr.indexOf('projectManage') >= 0"
        >
          <i class="el-icon-s-operation"></i>
          <br />
          <span>页面管理</span>
        </li>
        <li
          @click="gourl('/seat', 'seat')"
          :class="{sel: curmenu=='seat'}"
          v-if="webtype == 'main' && menustr.indexOf('seatManage') >= 0"
        >
          <i class="el-icon-s-operation"></i>
          <br />
          <span>席位配置</span>
        </li>
        <li
          @click="gourl('/user', 'user')"
          :class="{sel: curmenu=='user'}"
          v-if="menustr.indexOf('userManage') >= 0"
        >
          <i class="el-icon-s-custom"></i>
          <br />
          <span>用户管理</span>
        </li>
        <li
          @click="gourl('/user/rolelist', 'role')"
          :class="{sel: curmenu=='role'}"
          v-if="menustr.indexOf('roleManage') >= 0"
        >
          <i class="el-icon-s-check"></i>
          <br />
          <span>角色管理</span>
        </li>
        <li
          @click="gourl('/dept', 'dept')"
          :class="{sel: curmenu=='dept'}"
          v-if="menustr.indexOf('deptManage') >= 0 && webtype == 'main'"
        >
          <i class="el-icon-s-management"></i>
          <br />
          <span>部门管理</span>
        </li>
        <li
          @click="gourl('/formtool', 'formtool')"
          :class="{sel: curmenu=='formtool'}"
          v-if="webtype == 'gw'"
        >
          <i class="el-icon-document"></i>
          <br />
          <span>数据表格</span>
        </li>
        <!-- <li
          @click="gourl('/log', 'log')"
          :class="{sel: curmenu=='log'}"
          v-if="menustr.indexOf('logManage') >= 0"
        >
          <i class="el-icon-s-order"></i>
          <br />
          <span>日志查看</span>
        </li>-->
        <li
          @click="gourl('/message', 'message')"
          :class="{sel: curmenu=='message'}"
          v-if="menustr.indexOf('mesManage') >= 0"
        >
          <i class="el-icon-s-order"></i>
          <br />
          <span>我的消息</span>
        </li>
      </ul>
    </div>
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      curmenu: "content",
      menustr: ""
    };
  },
  mounted() {
    this.menustr = this.user.role.rolemenu;
  },
  computed: {
    ...mapGetters(["sidebar", "categorys", "user", "webtype"]),
    routes() {
      // for (let d of this.$router.options.routes) {
      //   if (d.path == "/content") {
      //     d.children = [
      //     ];
      //     for (let c of this.categorys) {
      //       let child = [];
      //       if (c.children && c.children.length > 0) {
      //         for (let ci of c.children) {
      //           child.push({
      //             path: ci.code,
      //             name: ci.name,
      //             meta: { title: ci.name, icon: "table" }
      //           });
      //         }
      //       }
      //       d.children.push({
      //         path: "list/" + c.code,
      //         name: c.name,
      //         meta: { title: c.name, icon: "table" },
      //         children: child
      //       });
      //     }
      //   }
      // }
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    gourl(url, cm) {
      this.$router.push(url);
      this.curmenu = cm;
    }
  }
};
</script>
<style lang="scss" scoped>
.menus-container {
  display: flex;
  justify-content: space-between;
  .menu-bar {
    background: rgb(84, 92, 100);
    width: 100%;
    text-align: center;
    ul {
      margin: 0;
      padding: 10px 0 0 0;
      list-style: none;
      li {
        width: 100%;
        height: 66px;
        margin-top: 10px;
        padding-top: 11px;
        cursor: pointer;
        line-height: 15px;
        i {
          font-size: 22px;
          color: #fff;
        }
        span {
          font-size: 12px;
          color: #fff;
        }
        &:hover,
        &.sel {
          background: #409eff;
        }
      }
    }
  }
}
</style>
