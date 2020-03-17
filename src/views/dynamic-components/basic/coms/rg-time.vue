<template>
    <div class="time-con">
        <span class="time">12:35</span>
        <p>
            <span class="xq">星期日</span><br/>
            <span class="date">2020-03-15</span>
        </p>
    </div>    
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.time-con{
    color:#333;
    display:flex;
    align-items: center;
    .time{
        font-size:34px;
        margin-right:5px;
    }
    p{
        .xq{
            font-size:14px;
        }
        .date{
            font-size:14px;
        }
    }
}
</style>
