<template>
    <div style="width:100%;height:100%;">
        {{txt}}
    </div>
</template>
<script>
export default {
    data(){
        return {
            txt: '登录中...'
        }
    },
    mounted(){
        let token = this.$route.query['token'];
        localStorage.setItem("token", token);

        this.$store.dispatch('user/ssologin', token).then((res) => {
            this.$router.push({ path: this.redirect || '/prev?pid=1' })
            // 
            this.txt = '登录成功！'
        }).catch((err) => {
            this.txt = '登录失败！'
        })
    }
}
</script>