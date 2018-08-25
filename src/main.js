// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'
import store from './store/index.js'
import 'babel-polyfill'

// import VueAwesomeSwiper from 'vue-awesome-swiper'
//import 'flex.css'
// import VConsole from 'vconsole'
// let vConsole = new VConsole()

// require styles
import 'swiper/dist/css/swiper.css'

//import 'lib-flexible'
//自定义组件
import keyboard from "@/customComponents/keyboard/keyboard";
import numberInput from "@/customComponents/numberInput/numberInput";
Vue.component('keyboard', keyboard)
Vue.component('numberInput', numberInput)

import 'vue-ydui/dist/ydui.flexible.js';
import '@/directives';
// 定义了全局变量和方法包括 时间格式化
import common from './common.vue';
Vue.prototype.global=common;
//
import 'vue-ydui/dist/ydui.base.css';

// 提示框
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};



Vue.config.productionTip = false
Vue.use(YDUI)


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
