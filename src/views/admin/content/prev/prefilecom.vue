<template>
  <div class="cons">
    <img v-if="type == 'image'" class="mimg" :src="src" alt />
    <iframe
      v-if="type == 'file' && src"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      scrolling="no"
      :src="src"
      style="width:100%;height:100%"
    ></iframe>
    <video v-if="type == 'video'" muted loop autoplay controls :src="src" ></video>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "image"
    },
    url: {
      type: String,
      default: ""
    }
  },
  computed: {
    src() {
      if (this.type == "file") {
        return "/cms/webfile/" + this.url;
      } else {
        return "/cms/webfile/" + this.url;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.cons {
  height: 700px;
  video{
      object-fit: fill;
      width:100%;height:100%;
  }
  img{
      max-width: 100%;
      max-height: 100%;
  }
}
</style>