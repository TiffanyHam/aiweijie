/*
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-12-23 10:06:01
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-01-29 09:23:21
 */
import Vue from 'vue'
import MyMsg from './index.vue'
import i18n from '../../i18n/i18n';

const dialogBox = Vue.extend(MyMsg)
let instance = null
MyMsg.show = () => {
    if (!instance) {
        instance = new dialogBox({ i18n }).$mount()
        document.getElementById('app').appendChild(instance.$el);
    }
    instance.dialogTip = true
},
    MyMsg.hide = () => {
        if (instance) {
            instance.dialogTip = false
        }
    }

export default MyMsg
