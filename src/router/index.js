import Vue from "vue";
import VueRouter from "vue-router";
import HalamanRepo from "@/views/halamanRepo"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Summary",
        component: HalamanRepo,
    },
    // {
    //     path: "/Detail/:index",
    //     name: "Detail",
    //     component: Detail,
    // }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;