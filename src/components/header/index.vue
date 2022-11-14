<template>
  <div class="header-body">
    <div class="header-logo"></div>
    
    <h1 class="header-title"></h1>

    <div class="header-menu">
      <el-menu
        :default-active="$route.name"
        class="public-menu"
        mode="horizontal"
        text-color="#AFBEC7"
        active-text-color="#fff"
        router
      >

        <el-menu-item index="class" :route="{ path: '/home/class' }">
          <i class="el-icon-document"></i>
          <span slot="title">缺陷分类逻辑</span>
        </el-menu-item>

      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$router.push({
    //     path: "/home/info/product",
    //   });
    // });
  },
  methods: {
    // selectMenu(index, indexPath) {
    //   console.log(index, indexPath);
    //   if (index === "info") {
    //     // console.log(1);
    //     let path = localStorage.getItem("infoAside");
    //     console.log(this.$router);
    //     this.$router.replace(path);
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
.header-body {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  .header-logo {
    width: 166px;
    height: 42px;
    background-size: 100% 100%;
  }
  .header-title {
    margin-top: 8px;
    font-size: 30px;
    font-weight: 800;
    margin-left: 10px;
    color: #fff;
  }
  .header-menu {
    margin-top: auto;
    margin-left: auto;
  }
  .iconfont{
    font-size: 18px;
  }
}
</style>