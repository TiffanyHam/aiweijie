/*
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-12-23 10:06:01
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-12-25 16:45:26
 */
import Vue from 'vue'
import dialog from './index.vue'
import i18n from '../../i18n/i18n';


const MessageBox = Vue.extend(dialog)
let instance = null
dialog.show = () => {
    if (!instance) {
        instance = new MessageBox({ i18n }).$mount()
        document.getElementById('app').appendChild(instance.$el);
    }
    instance.show = true
},
    dialog.hide = () => {
        if (instance) {
            instance.show = false
        }
    }

export default dialog