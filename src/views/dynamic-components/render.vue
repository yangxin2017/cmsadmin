<script>
import Vue from "vue";
// 1.引入组件
// 2.注册组件
var headn1 = () => import("@/views/dynamic-components/basic/header-n1");
var datapanel = () => import("@/views/dynamic-components/basic/data-panel");
var datamulpanel = () =>
  import("@/views/dynamic-components/basic/data-mul-panel");
var detailpanel = () => import("@/views/dynamic-components/basic/detail-panel");
var searchpanel = () => import("@/views/dynamic-components/basic/search-panel");
var mapcontent = () => import("@/views/dynamic-components/basic/map-content");
var datazqb = () => import("@/views/dynamic-components/basic/data-zqb");
var datasyslink = () => import("@/views/dynamic-components/basic/data-syslink");
var datarank = () => import("@/views/dynamic-components/basic/data-rank");
var datacontact = () => import("@/views/dynamic-components/basic/data-contact");
var datatable = () => import("@/views/dynamic-components/basic/data-table");

export default {
  props: {
    html: {
      type: String,
      required: true
    },
    binddata: {
      type: Object,
      default: function() {
        return {};
      }
    },
  },
  methods: {
    changeEvent(ev){
      this.$emit("eventChangeTab", ev)
    }
  },

  render(h) {
    if (!this.html) {
      return false;
    }
    let _self = this;
    const com = Vue.extend({
      components: {
        "head-n1": headn1,
        "data-panel": datapanel,
        "data-mul-panel": datamulpanel,
        "data-detail-panel": detailpanel,
        "search-panel": searchpanel,
        "data-map-content": mapcontent,
        "data-zqb": datazqb,
        "data-syslink": datasyslink,
        "data-rank": datarank,
        "data-contact": datacontact,
        "data-table": datatable
      },
      template: this.html,
      props: ["appData"],
      methods: {
        eventInfo(ev){
          _self.changeEvent(ev)
        }
      }
    });

    return h(com, {
      props: { appData: this.binddata }
    });
  }
};
</script>
