<template>
<div class="yy-timeline">
    <section class="timeline">
        <ol v-if="datalist && datalist.length > 0">
            <li v-for="item in datalist" :key="item.id">
                <div>
                    <time>{{ item.time }}</time>
                    {{ item.title }}
                </div>
            </li>
            <li></li>
        </ol>
    
        <div class="arrows">
            <span class="btn btn-left">
                <i class="el-icon-arrow-left"></i>
            </span>
            <span class="btn btn-right">
                <i class="el-icon-arrow-right"></i>
            </span>
        </div>
    </section>
</div>    
</template>
<script>
export default {
    props: {
        datalist: {
            type: Array,
            default: []
        }
    }
}
</script>
<style lang="scss" scoped>
.yy-timeline{

    /* .section SECTION
    –––––––––––––––––––––––––––––––––––––––––––––––––– */

    .section {
    background: #F45B69;
    padding: 50px 0;
    }

    .section .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    }

    .section h1 {
    font-size: 2.5rem;
    }

    .section h2 {
    font-size: 1.3rem;
    }


    /* TIMELINE
    –––––––––––––––––––––––––––––––––––––––––––––––––– */

    .timeline {
    white-space: nowrap;
    }

    .timeline ol {
    font-size: 0;
    padding: 135px 0;
    transition: all 1s;
    }

    .timeline ol li {
        &:first-child{
            width:60px;
        }
    position: relative;
    display: inline-block;
    list-style-type: none;
    width: 160px;
    height: 3px;
    background: #ccc;
    }

    .timeline ol li:last-child {
    width: 320px;
    }

    .timeline ol li:not(:first-child) {
    margin-left: 14px;
    }

    .timeline ol li:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    left: calc(100% + 1px);
    bottom: 0;
    width: 12px;
    height: 12px;
    transform: translateY(-50%);
    border-radius: 50%;
    background: #F45B69;
    }

    .timeline ol li div {
    position: absolute;
    left: calc(100% + 7px);
    width: 280px;
    padding: 15px;
    font-size: 1rem;
    white-space: normal;
    color: black;
    background: #ccc;
    }

    .timeline ol li div::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    }

    .timeline ol li:nth-child(odd) div {
    top: -16px;
    transform: translateY(-100%);
    }

    .timeline ol li:nth-child(odd) div::before {
    top: 100%;
    border-width: 8px 8px 0 0;
    border-color: #ccc transparent transparent transparent;
    }

    .timeline ol li:nth-child(even) div {
    top: calc(100% + 16px);
    }

    .timeline ol li:nth-child(even) div::before {
    top: -8px;
    border-width: 8px 0 0 8px;
    border-color: transparent transparent transparent #ccc;
    }

    .timeline time {
    display: block;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 8px;
    }


    /* TIMELINE ARROWS
    –––––––––––––––––––––––––––––––––––––––––––––––––– */

    .timeline{
        position:relative;
        .arrows{
            position:fixed;left:0;top:50%;margin:0 0 -25px 0;height:50px;width:100%;
        }
        .btn{
            position:absolute;top:-15px;left:0;text-align:center;line-height:47px;
            width:40px;height:40px;border-radius:40px;border:solid 2px #ccc;
            background:#fff;display:none;
            i{font-size:30px;}
            &.btn-right{
                right:0px;left:auto;
            }
        }
    }
    &:hover{
        .timeline .btn{display:block;}
    }


    /* GENERAL MEDIA QUERIES
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
    @media screen and (max-width: 599px) {
    .timeline ol,
    .timeline ol li {
        width: auto; 
    }
    
    .timeline ol {
        padding: 0;
        transform: none !important;
    }
    
    .timeline ol li {
        display: block;
        height: auto;
        background: transparent;
    }
    
    .timeline ol li:first-child {
        margin-top: 25px;
    }
    
    .timeline ol li:not(:first-child) {
        margin-left: auto;
    }
    
    .timeline ol li div {
        width: 94%;
        height: auto !important;
        margin: 0 auto 25px;
    }
    
    .timeline ol li div {
        position: static;
    }
    
    .timeline ol li:nth-child(odd) div {
        transform: none;
    }
    
    .timeline ol li:nth-child(odd) div::before,
    .timeline ol li:nth-child(even) div::before {
        left: 50%;
        top: 100%;
        transform: translateX(-50%);
        border: none;
        border-left: 1px solid white;
        height: 25px;
    }
    
    .timeline ol li:last-child,
    .timeline ol li:nth-last-child(2) div::before,
    .timeline ol li:not(:last-child)::after,
    .timeline .arrows {
        display: none;
    }
    }
}
</style>
