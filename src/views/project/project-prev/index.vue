<template>
    <div class="pro-container">
        <div class="page-con">
            <grid-layout
                :layout.sync="layout"
                :col-num="12"
                :row-height="5"
                :is-draggable="false"
                :is-resizable="false"
                :is-mirrored="false"
                :vertical-compact="true"
                :margin="[10, 10]"
                :use-css-transforms="false">
                <grid-item v-for="item in layout"
                        :x="item.x"
                        :y="item.y"
                        :w="item.w"
                        :h="item.h"
                        :i="item.i"
                        :key="item.i">
                    <div class="pro-card">
                        <comrender :html="item.template" :binddata="item.data" />
                    </div>
                </grid-item>
            </grid-layout>
        </div>
    </div>    
</template>
<script>


import VueGridLayout from "vue-grid-layout";
import comrender from '@/views/dynamic-components/render'
import { getLayout } from '@/api/cms'

export default {
    components: {
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem,
        comrender: comrender
    },
    data(){
        return {
            layout: []
        }
    },
    methods: {
    },
    mounted() {
        getLayout(1).then(res => {
            this.layout = res.data
        })
    }
}
</script>
<style lang="scss" scoped>
.pro-container{
    height:100%;
}
.page-con {
    width:100%;
    height:100%;
    position:relative;
    overflow:hidden;
    .vue-grid-layout{
        margin: -10px;
        position: absolute;
        width:calc(100% + 20px);
    }
  .pro-card {
    height: 100%;
    position: relative;
    &.sel{
        border:solid 1px #f60;
    }
    .btns {
      position: absolute;
      right: 0px;
      top: 0px;
      background: #000;
      padding: 3px 5px;
      i {
        margin: 0 0 0 10px;
        color: #fff;
        cursor: pointer;
        &:hover {
          color: #f60;
        }
      }
    }
  }
}
</style>
