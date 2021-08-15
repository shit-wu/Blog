import Vue from "vue";
import vuex from "vuex";

Vue.use(vuex);

const store = new vuex.Store({
    // 共同维护的一个状态
    state: {
        htmlString: "",
        total: 0,
    },
    // 获取数据并渲染
    getter: {},
    // 数据的异步操作
    actions: {},
    // 处理数据的唯一途径，state的改变或者赋值只能这里进行
    mutations: {
        setHtmlString(state, htmlString) {
            state.htmlString = htmlString;
        },
        setTotal(state, sum) {
            state.total = sum;
        },
    },
});

// 导出
export default store;
