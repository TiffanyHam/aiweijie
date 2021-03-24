/*
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-12-23 10:06:01
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-12-29 09:35:00
 */
import Vue from 'vue'
import myLoading from './index.vue'
import i18n from '../../i18n/i18n';

const dialogBox = Vue.extend(myLoading)
let instance = null
myLoading.show = () => {
    if(!instance){
      instance = new dialogBox({i18n}).$mount()
      document.getElementById('app').appendChild(instance.$el);
    }
    instance.loading = true
  },
  myLoading.hide = () => {
      if(instance){
          instance.loading = false
      }
  }

export default myLoading
