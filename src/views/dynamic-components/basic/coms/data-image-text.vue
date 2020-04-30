<template>
<div class="yy-image-text" v-if="datalist && datalist.length > 0">
    <div class="lf-panel" :style="{width: imgwidth + '%'}" v-if="fone">
        <img :src="fone.tpwj" alt="" />
        <span class="title">{{ fone.title }}</span>
    </div>
    <div class="rg-list">
        <ul v-if="datas && datas.length > 0">
            <li v-for="item in datas" :key="item.id">
                <p class="titles">
                    <a class="link" :href="item.href" target="_blank"><span class="symbol"></span>{{ item.title }}</a>
                    <span class="clicks">{{ item.clicks }}</span>
                </p>
                <p class="infos">
                    <span class="time">{{ item.publishTime }}</span>
                    <span class="from">{{ item.lydwmc }}</span>
                </p>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
export default {
    props: {
        datalist: {
            type: Array,
            default: []
        },
        imgwidth: {
            type: Number,
            default: 30
        }
    },
    data(){
        return {
            fone: {}
        }
    },
    computed: {
        datas: function(){
            let res = []
            for(let i=1;i<this.datalist.length;i++){
                res.push(this.datalist[i])
            }
            this.fone = this.datalist[0]
            return res
        }
    }
}
</script>
<style lang="scss">
.yy-image-text{
    height:100%;
    display:flex;
    justify-content:space-between;
    .lf-panel{
        width:30%;height:100%;position:relative;
        img{
            width:100%;height:100%;
            position:absolute;left:0;top:0;
        }
        .title{
            position:absolute;width:100%;height:35px;
            background:rgba(0,0,0,0.33);
            color:#fff;padding:5px 10px;bottom:0;
            text-align:center;text-overflow:ellipsis;
            white-space:nowrap;overflow:hidden;
        }
    }
    .rg-list{
        flex:1;height:100%;
        overflow:auto;
        ul{
            list-style:none;
            margin:5px;padding:0;
            li{
                .titles{
                    display:flex;
                    justify-content:space-between;
                    .link{
                        flex:1;
                        text-align:left;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                        overflow:hidden;
                        &:hover{
                            text-decoration:underline;
                            color:#409EFF;
                        }
                        .symbol{
                            display:inline-block;
                            width:5px;height:5px;border-radius:5px;
                            background:#000;margin:0 5px 0 0;
                            vertical-align:middle;
                        }
                    }
                    .clicks{
                        width:40px;
                        text-align:right;
                    }
                }
                .infos{
                    display:flex;
                    justify-content:space-between;
                    .time{
                        flex:1;
                    }
                    .from{
                        flex:1;text-align:right;
                    }
                }
            }
        }
    }
}
</style>
