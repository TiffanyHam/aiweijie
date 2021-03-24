/*
 * @Description: vuex
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-12-08 15:51:18
 * @LastEditors: HeZhen
 * @LastEditTime: 2020-12-08 17:08:32
 */
import vuex from 'vuex';
import Vue from 'vue';
import BleStatus from "./BleStatus";
//1.安装
Vue.use(vuex)
var store = new vuex.Store({    //仓库对象
    //2.配置
    modules: {
        BleStatus,
    }
})

export default store;