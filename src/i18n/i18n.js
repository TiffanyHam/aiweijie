/*
 * @Description: 多语言支持
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-10-30 10:09:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-23 15:09:59
 */
import Vue from 'vue'
import i18n from 'vue-i18n'
Vue.use(i18n)

import zh from './config/zh.js'
import en from './config/en.js'

const vueI18n = new i18n({
    locale: 'zh',
    messages: {
        zh,
        en
    },
    silentFallbackWarn: true
})

export default vueI18n;