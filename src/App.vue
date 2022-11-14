<template>
  <div id="app" ref="app">
    <router-view></router-view>
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "app",
  components: {},
  beforeMount() {
    //判断有没有动画的盒子在，在的话移除掉
    let loading = document.getElementsByClassName("loadings")[0];
    if (loading) {
      setTimeout(() => {
        document.body.removeChild(loading);
        document.getElementById("app").style.display = "block";
      }, 1500);
    }
  },
  data() {
    return {
      isFullscreen: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      // console.dir(this.$refs.newButton);

      // setTimeout(() => {
      //   // this.screenfull();
      //   // this.$refs.newButton.click();

      //   var e = document.createEvent("MouseEvents");
      //   e.initEvent("click", true, true);
      //   this.$refs.newButton.dispatchEvent(e);
      // }, 3000);
    });
  },
  methods: {
    screenfull() {
      console.log(screenfull);
      if (!screenfull.isEnabled) {
        this.$message({
          message: "Your browser does not work",
          type: "warning",
        });
        return false;
      }
      screenfull.toggle(this.$refs.app);
      this.isFullscreen = true;
    },
  },
};
</script>
<style lang="less">
body {
  background: white; //这里是把动画影响的背景颜色改回来
}
#app {
  width: 100%;
  height: 100%;
  display: block;
}
</style>