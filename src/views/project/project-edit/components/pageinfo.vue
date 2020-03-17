<template>
<div class="page-info">
    <div class="panel-add">
        <el-button size="small" type="primary" round @click="addBlock">添加板块</el-button>
    </div>

    <el-collapse>
        <el-collapse-item title="基础组件" name="1">
            <div class="com-list">
                <div v-for="item in components" :key="item.id" class="com-mod" draggable="true" @dragstart="dragStart($event, item)">
                    <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                        <el-image fit="fill" style="height:40px;" :src="item.src"></el-image>
                    </el-tooltip>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback" name="2">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
    </el-collapse>
    
    <div class="panel-add skins">
        <div v-for="item in skins" :class="{sel: curSkin == item.value}" class="skin" @click="changeSkin(item.value)" :key="item.value">
            <img :src="item.src" alt="" />
            <span>{{ item.name }}</span>
        </div>
    </div>

</div>    
</template>
<script>
export default {
    data(){
        return {
            components: [
                {
                    id: 1,
                    title: '头部组件',
                    src: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg',
                    component: 'head-n1',
                    params: [
                        { name: 'src', type: 'image', title: 'Logo图片', value: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1035415831,1465727770&fm=26&gp=0.jpg' },
                        { name: 'title', type: 'text', title: '网站标题', value: '测试系统名称' },
                        { name: 'showtime', type: 'checkbox', title: '显示时间', value: true },
                        { name: 'showsetting', type: 'checkbox', title: '显示设置按钮', value: true },
                        { name: 'showuser', type: 'checkbox', title: '显示用户信息', value: true }
                    ]
                },
                {
                    id: 2,
                    title: '数据面板',
                    src: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2573142242,3008102846&fm=26&gp=0.jpg',
                    component: 'data-panel',
                    params: [
                        { name: 'title', type: 'text', title: '面板标题', value: '数据面板标题' },
                        { name: 'showmore', type: 'checkbox', title: '是否显示更多按钮', value: true, children: 
                            [
                                { id: '01', name: 'blank', type: 'checkbox', title: '是否弹出新窗口', value: false, showvalue: true },
                                { id: '02', name: 'morehref', type: 'text', title: '更多的连接', value: '#', showvalue: true },
                            ] 
                        },
                        { name: 'showtype', type: 'select', title: '显示类型', value: 'list', predata: 
                            [ 
                                { name: '纯文本', value: 'list'},
                                { name: '轮播图', value: 'image'},
                                { name: '图文结合', value: 'img-text'},
                            ],
                            children: [
                                { name: 'imgwidth', type: 'number', title: '图片宽度', value: 30, showvalue: 'img-text' }
                            ]
                        },
                        { name: 'showcount', type: 'number', title: '显示数量', value: 5 },
                    ]
                }
            ],
            curSkin: 'default-skin',
            skins: [
                { name: '默认', value: 'default-skin', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2879430259,1145403574&fm=26&gp=0.jpg' },
                { name: '皮肤一', value: 'skin-1', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2879430259,1145403574&fm=26&gp=0.jpg' },
                { name: '皮肤二', value: 'skin-2', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2879430259,1145403574&fm=26&gp=0.jpg' },
                { name: '皮肤三', value: 'skin-3', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2879430259,1145403574&fm=26&gp=0.jpg' },
                { name: '皮肤四', value: 'skin-4', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2879430259,1145403574&fm=26&gp=0.jpg' }
            ]
        }
    },
    methods: {
        addBlock(){
            this.$emit("eventAddBlock", [])
        },
        dragStart(event, item) {
            event.dataTransfer.setData('data', JSON.stringify(item))
        },
        /////
        changeSkin(name){
            this.curSkin = name
            document.getElementsByTagName('body')[0].id = name
        }
    }
}
</script>
<style lang="scss" scoped>
.page-info{
    .title{
        padding-top:0px;
        margin-top:0;
    }
    .panel-add{
        text-align:center;
        background:#fbfbfb;
        border-top:solid 1px #eee;
        border-bottom:solid 1px #eee;
        padding:10px 0;
    }
    .com-list{
        display:flex;
        flex-wrap:wrap;
        justify-content: space-between;
        .com-mod{
            width:31%;height:40px;
            margin-bottom:3px;
            .el-card__body{
                height:40px;
            }
        }
    }
    .skins{
        display:flex;
        flex-wrap:wrap;
        .skin{
            width:31%;margin-bottom:10px;
            height:50px;overflow:hidden;cursor:pointer;
            position:relative;border:solid 2px #eee;
            img{
                position:absolute;width:100%;height:100%;left:0;top:0;
            }
            span{
                position:absolute;bottom:0;left:0;
                background:rgba(0,0,0,0.33);
                padding:4px 10px;color:#fff;
                font-size:12px;width:100%;
            }
            &.sel{
                border:solid 2px #f60;
            }
        }
    }
}
</style>
