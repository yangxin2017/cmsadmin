<script>
import Vue from "vue";
// 1.引入组件
// 2.注册组件
var headn1 = () => import("@/views/dynamic-components/basic/header-n1");
var datapanel = () => import("@/views/dynamic-components/basic/data-panel");
var datamulpanel = () => import("@/views/dynamic-components/basic/data-mul-panel");

export default {
  props: {
    html: {
      type: String,
      required: true
    },
    binddata: {
      type: Object,
      default: function() {
        return { };
      }
    }
  },

  render(h) {
    if (!this.html) {
      return false;
    }
    const com = Vue.extend({
      components: {
        "head-n1": headn1,
        "data-panel": datapanel,
        'data-mul-panel': datamulpanel
      },
      template: this.html,
      props: ['appData']
    });

    return h(com, {
      props: {appData: this.binddata}
    });
  }
};
</script>
