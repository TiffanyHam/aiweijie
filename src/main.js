/*
 * @Description: 
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-10-22 10:39:09
<<<<<<< HEAD
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-03-11 16:31:40
=======
 * @LastEditors: HeZhen
<<<<<<< HEAD
 * @LastEditTime: 2021-01-26 14:30:09
=======
 * @LastEditTime: 2021-01-25 16:39:14
>>>>>>> 063ab45e448ffac62e7657db75b598c0df00c6a1
>>>>>>> 69e8b11a20a724a9289a729d957a7393850f1271
 */
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// 组件自动注册
import AutoRegister from '@/components/AutoRegisterPlug.js';
Vue.use(AutoRegister);

// 自适应依赖
import 'lib-flexible';

// 引入初始化css
import './static/Style/reset.css';

// 基础样式
import '@/static/Style/icon.less';

// 路由
import router from './Router/router';


// echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

// animate 动画
import animated from 'animate.css' // npm install animate.css --save安装，在引入
Vue.use(animated)

// 多语言
import I18n from './i18n/i18n'

// 全局消息提示
import BleNoConnect from './Toast/BleNoConnect/toastIndex';
Vue.use(BleNoConnect);

// 蓝牙未连接弹窗
import dialog from "./components/dialog/index"
 Vue.prototype.$dialog = dialog


// 视频弹窗
import video from './Toast/VideoPopu/VideoPopu';
Vue.prototype.$video = video;

// 路由守卫
import g from './Util/global'
g.overallSituation(router)

// vuex 
import store from './Store/index'


new Vue({
    render: h => h(App),
    router,
    i18n: I18n,
    store
}).$mount('#app')
