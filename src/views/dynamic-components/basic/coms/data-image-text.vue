<template>
<div class="yy-image-text">
    <div class="lf-panel" :style="{width: imgwidth + '%'}">
        <img :src="fone.src" alt="" />
        <span class="title">{{ fone.title }}</span>
    </div>
    <div class="rg-list">
        <ul>
            <li v-for="item in datas" :key="item.id">
                <p class="titles">
                    <a class="link" :href="item.href" target="_blank"><span class="symbol"></span>{{ item.title }}</a>
                    <span class="clicks">{{ item.clicks }}</span>
                </p>
                <p class="infos">
                    <span class="time">{{ item.time }}</span>
                    <span class="from">{{ item.source }}</span>
                </p>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
export default {
    props: {
        count: {
            type: Number,
            default: 3
        },
        imgwidth: {
            type: Number,
            default: 30
        }
    },
    data(){
        return {
            datalist: [
                { id: 1, clicks: 99, time: '2020-03-16 12:30', source: '来源：观察者网', title: '1标题标题标题标题标题标题标题标题1', src: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1926836966,2010107208&fm=26&gp=0.jpg' },
                { id: 2, clicks: 99, time: '2020-03-16 12:30', source: '来源：观察者网', title: '标题标题标标题', src: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3983180779,3687921405&fm=26&gp=0.jpg' },
                { id: 3, clicks: 99, time: '2020-03-16 12:30', source: '来源：观察者网', title: '标题标题标题标题', src: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3067578540,523644780&fm=26&gp=0.jpg' },
                { id: 4, clicks: 99, time: '2020-03-16 12:30', source: '来源：观察者网', title: '标题标题标题标题', src: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3872143789,3688106214&fm=26&gp=0.jpg' },
                { id: 5, clicks: 99, time: '2020-03-16 12:30', source: '来源：观察者网', title: '标题标题', src: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3093759163,2088249490&fm=26&gp=0.jpg' },
            ],
            fone: {}
        }
    },
    computed: {
        datas: function(){
            let res = []
            for(let i=1;i<this.count;i++){
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
