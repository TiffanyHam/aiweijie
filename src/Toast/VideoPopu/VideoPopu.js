/*
 * @Description: this.$toast(true,'设备未连接，请重新连接。',true)
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-12-08 14:58:52
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-01-22 11:15:42
 */
import Vue from 'vue'
import VideoComplate from './VideoPopu.vue'
import router from '../../Router/router'
import store from '../../Store/index'
import i18n from '../../i18n/i18n'
const VideoPopuConstructor = Vue.extend(VideoComplate)// vue.extend 延伸子类
let instance = null;
const initInstance = () => {
    instance = new VideoPopuConstructor({ router, store, i18n}).$mount();
}
const video = {};
video.show = (options) => {
    options = options || {};
    if (!instance) {
        initInstance()
    }
    for (let key in options) {
        if (Object.hasOwnProperty.call(options, key)) {
            instance[key] = options[key];
        }
    }
    instance.visible = true;
    document.querySelector('#app').appendChild(instance.$el);
}
video.hide = () => {
    instance.visible = false;
}
export default video
