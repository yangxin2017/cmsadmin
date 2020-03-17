<template>
    <div class="yy-datalist">
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
</template>
<script>
export default {
    props: {
        count: {
            type: Number,
            default: 5
        }
    },
    data(){
        return {
            datalist: [
                { id: 1, title: '默认默认链接默认链接默认链接链接', href: '#', clicks: 99, time: '2020-03-16 12:30', source: '来源：观察者网' },
                { id: 2, title: '默认默认链接默认链接', href: '#', clicks: 22, time: '2020-03-16 12:30', source: '来源：观察者网' },
                { id: 3, title: '默认链接默认链接链接', href: '#', clicks: 33, time: '2020-03-16 12:30', source: '来源：观察者网' },
                { id: 4, title: '默认默认链接默链接链接', href: '#', clicks: 44, time: '2020-03-16 12:30', source: '来源：观察者网' },
                { id: 5, title: '默认链接默认链接链接', href: '#', clicks: 55, time: '2020-03-16 12:30', source: '来源：观察者网' },
                { id: 6, title: '默认默认链接默认链接默认链接', href: '#', clicks: 99, time: '2020-03-16 12:30', source: '来源：观察者网' },
                { id: 7, title: '默认默认链认链接链接', href: '#', clicks: 66, time: '2020-03-16 12:30', source: '来源：观察者网' },
                { id: 8, title: '默认默认链接链接链接', href: '#', clicks: 77, time: '2020-03-16 12:30', source: '来源：观察者网' },
                { id: 9, title: '默认默接', href: '#', clicks: 88, time: '2020-03-16 12:30', source: '来源：观察者网' },
                { id: 10, title: '默认默', href: '#', clicks: 11, time: '2020-03-16 12:30', source: '来源：观察者网' }
            ]
        }
    },
    computed: {
        datas: function(){
            let res = []
            for(let i=0;i<this.count;i++){
                res.push(this.datalist[i])
            }
            return res
        }
    }
}
</script>
<style lang="scss" scoped>
.yy-datalist{
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
</style>
