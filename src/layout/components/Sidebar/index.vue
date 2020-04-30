<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
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
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["sidebar", "categorys"]),
    routes() {
      for (let d of this.$router.options.routes) {
        if (d.path == "/content") {
          d.children = [
          ];
          for (let c of this.categorys) {
            let child = [];
            if (c.children && c.children.length > 0) {
              for (let ci of c.children) {
                child.push({
                  path: ci.code,
                  name: ci.name,
                  meta: { title: ci.name, icon: "table" }
                });
              }
            }
            d.children.push({
              path: "list/" + c.code,
              name: c.name,
              meta: { title: c.name, icon: "table" },
              children: child
            });
          }
        }
      }
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
  }
};
</script>
