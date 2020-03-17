<template>
    <div class="yy-header-container">
        <div class="logo">
            <img :src="src" alt="" />
        </div>
        <div class="title">
            {{title}}
        </div>
        <div class="buttons">
            <rg-time v-if="showtime == true"></rg-time>
            <i v-if="showsetting == true" class="el-icon-setting"></i>
            <i v-if="showuser == true" class="el-icon-user"></i>
            <span class="username" v-if="showuser == true">Admin</span>
        </div>
    </div>
</template>
<script>

import rgtime from './coms/rg-time'

export default {
    props: {
        src: {
            type: String,
        },
        title: {
            type: String
        },
        showtime: {
            type: Boolean
        },
        showsetting: {
            type: Boolean
        },
        showuser: {
            type: Boolean
        }
    },
    components: {
        'rg-time': rgtime
    }
}
</script>
<style lang="scss" scoped>
.yy-header-container{
    display:flex;height:100%;
    .logo{
        width: 100px;
        height: 100%;
        display:flex;
        align-items:center;
        margin:0 0 0 15px;
        img{
            height:100%;
            max-height:60px;
        }
    }
    .title{
        flex: 1;
        height:100%;
        display:flex;
        align-items:center;
        justify-content: center;
    }
    .buttons{
        width: 300px;
        height:100%;
        display:flex;
        align-items:center;
        justify-content:flex-end;
        margin-right:15px;
        i{
            font-size:24px;
            margin-left:10px;
            cursor:pointer;
        }
        .username{
            margin-left:5px;font-size:16px;font-weight:bold;
        }
    }
}
</style>
<style lang="scss">

</style>

