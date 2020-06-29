<template>
  <div style="width:100%;height:100%;">{{txt}}</div>
</template>
<script>
export default {
  data() {
    return {
      txt: "登录中..."
    };
  },
  mounted() {
    let token = this.$route.query["token"];
    let qbbs = this.$route.query["qbbs"];
    localStorage.setItem("token", token);
    localStorage.setItem("qbbs", qbbs);

    const loading = this.$loading({
      lock: true,
      text: "登录中.....",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });

    this.$store
      .dispatch("user/ssologin", { token, qbbs })
      .then(res => {
        this.$router.push({ path: this.redirect || "/prev?pid=1" });
        //
        this.txt = "登录成功！";
        loading.close();
      })
      .catch(err => {
        this.txt = "登录失败！";
        loading.close();
      });
  }
};
</script>