import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//导入组件
import Home from "../components/layout/index.vue"

//缺陷分类逻辑
import DefectClass from "../pages/defectClass/index.vue";


const routes = [{
        path: "/",
        redirect: "/home/class"
    },
    {
        path: "/home",
        redirect: "/home/class"
    },

    {
        path: "/home",
        component: Home,
        meta: "首页",
        children: [{
            path: "class",
            name: "class",
            component: DefectClass,
            meta: "缺陷分类逻辑"
        }]
    }
];

const router = new VueRouter({
    routes
});


//暴露router
export default router;