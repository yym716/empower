<template>
  <el-container class="home-body">
    <el-header>
      <app-header></app-header>
    </el-header>

    <el-main>
      <transition name="fade-page" mode="out-in">
        <router-view v-if="!$route.meta.noCache"></router-view>

        <router-view v-if="$route.meta.noCache"></router-view>
      </transition>
    </el-main>

  </el-container>
</template>

<script>
import Header from "../header/index";

export default {
  data() {
    return {
      socket: "",
      lineName: "", //线体名
    };
  },
  components: {
    "app-header": Header,
  },
  created() {},

  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style lang="less" scoped>
.home-body {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>

<style>
.el-header {
  height: 80px !important;
  background: url("../../assets/banner.png") no-repeat;
  background-size: 100% 100%;
}

.el-main {
  background-color: rgb(30, 38, 43);
  width: 100%;
  height: 100%;
  padding: 0;
}

.el-footer {
  height: 60px !important;
  background-color: rgb(45, 55, 61);
}

/* 动画函数 */
.fade-page-enter-active,
.fade-page-leave-active {
  transition: all 0.5s;
}
.fade-page-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-page-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>