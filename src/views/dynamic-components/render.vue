<script>
import Vue from 'vue'
// 1.引入组件
// 2.注册组件
var headn1 = () => import('@/views/dynamic-components/basic/header-n1')
var datapanel = () => import('@/views/dynamic-components/basic/data-panel')

export default {
  props: {
    html: {
      type: String,
      required: true
    }
  },

  render(h) {
    if(!this.html){
      return false
    }
    const com = Vue.extend({
      components: {
        'head-n1': headn1,
        'data-panel': datapanel
      },
      template: this.html
    })
    return h(com, {
    })
  }
}
</script>
