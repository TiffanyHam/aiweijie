/*
 * @Description: this.$toast(true,'设备未连接，请重新连接。',true)
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-12-08 14:58:52
 * @LastEditors: HeZhen
 * @LastEditTime: 2020-12-11 10:57:39
 */
import Vue from 'vue'
import toastComponent from './BleNoConnect.vue'
// 组件构造器，构造出一个 vue组件实例
const Toast = {};
Toast.install = (Vue, options) => {
    let opt = {
    }
    for (let key in options) {
        opt[key] = options[key];
    }
    Vue.prototype.$toast = (deleteNode, text, syncMessage=false) => {
        // 还没消失dom不执行
        if (deleteNode) {
            let app_toast_len = document.getElementsByClassName('app-toast').length;
            while (app_toast_len > 0) {
                document.getElementsByClassName('app-toast')[app_toast_len - 1].parentNode.removeChild(document.getElementsByClassName('app-toast')[app_toast_len - 1]);
                app_toast_len--;
            }
            return true;
        } else {
            let ToastConstructor = Vue.extend(toastComponent);
            let toastDom = new ToastConstructor({
                el: document.createElement('div'),
                data() {
                    return {
                        isShow: true, // 是否显示
                        text: text ? text : '设备未连接，请重新连接。', // 文本内容
                        syncMessage: syncMessage ? syncMessage : false,
                        backgroundColor: '',
                        color: '',
                    }
                },
            })
            // 获取头部高度
            // 添加节点
            if (toastDom.syncMessage) {
                toastDom.backgroundColor = 'rgba(252, 237, 208, 1)';
                toastDom.color = 'rgb(132,105,6)';
            } else {
                toastDom.backgroundColor = '#fff4f4';
                toastDom.color = 'rgba(251, 42, 45, 0.9)';
            }
            document.body.appendChild(toastDom.$el);
        }
    }
}

export default Toast
