import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'; //按需引入element组件
import "./css/elementBase.less"; //修改的element样式
import "./css/base.css"; //初始化界面样式css
import "font-awesome/css/font-awesome.min.css"; //引入字体图标库
import axios from "./axios/request";
import store from "./store/index";
import IntroJs from 'intro.js'
import './css/introjs.css'; // 引入功能引导卡修改后的样式
import './assets/iconfont/iconfont.css'; //引入阿里矢量图css样式

//引入表格样式名修改js
import * as tableUtils from './utils/table';
Vue.prototype.$tableUtils = tableUtils;

Vue.use(IntroJs);

Vue.prototype.$axios = axios;

//引入封装好的router
import router from './router/index';

//转换日期时间插件
import Moment from 'moment';
import 'moment/locale/zh-cn';
Vue.prototype.moment = Moment;

//引入echarts依赖
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

//引入表格插件
import 'xe-utils';
import VXETable from "vxe-table";
import 'vxe-table/lib/style.css'
import './css/vxeTable.less'
Vue.use(VXETable);
Vue.prototype.$XModal = VXETable.modal;
Vue.prototype.$XPrint = VXETable.print;
Vue.prototype.$XSaveFile = VXETable.saveFile;
Vue.prototype.$XReadFile = VXETable.readFile;

import "lib-flexible" //自适应插件转换rem

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')