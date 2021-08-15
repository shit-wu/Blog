import Vue from "vue";
import VueRouter from "vue-router";
import { getLocalStorage } from "../store/localStorage";

const Home = () => import("views/home/Home");
const Write = () => import("views/write/Write");
const About = () => import("views/about/About");
const ArticleView = () =>
    import("../components/content/articleView/articleView");
const Login = () => import("views/login/login");

Vue.use(VueRouter);

const routes = [
    {
        path: "",
        redirect: "/home",
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            title: "登录",
        },
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        meta: {
            title: "看博客",
        },
    },
    {
        path: "/write",
        name: "write",
        component: Write,
        meta: {
            title: "写博客",
        },
    },
    {
        path: "/about",
        name: "about",
        component: About,
        meta: {
            title: "关于我",
        },
    },
    {
        path: "/article/:article_id",
        name: "article",
        component: ArticleView,
        meta: {
            title: "文章",
        },
    },
];

const router = new VueRouter({
    routes,
    mode: "history",
});

router.beforeEach((to, from, next) => {
    //从from跳转到to
    const token = getLocalStorage("token");
    // const token = null;
    if (token) {
        if (to.path === "/login") {
            next({ path: "/" });
        } else {
            next();
        }
    } else {
        if (to.path === "/login") {
            next();
        } else {
            next({
                path: "/login",
            });
        }
    }
});

export default router;
