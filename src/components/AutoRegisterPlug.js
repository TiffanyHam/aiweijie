/*
 * @Description: 组件自动注册，避免频繁引入
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-10-22 11:29:24
 * @LastEditors: HeZhen
 * @LastEditTime: 2020-10-22 14:14:38
 */

const requireComponents = require.context('./Plug', true, /\.vue$/);

// 字符串首字母大写
function firstCharToUpper(str){
    return str.substr(0,1).toUpperCase() + str.substr(1);
}

let install = Vue =>{
    requireComponents.keys().forEach(fileName => {
        // 组件实例
        let com = requireComponents(fileName);
        // 组件名字首字母大写
        let comName = firstCharToUpper(fileName.match(/\/(\w*)\.vue/)[1]);
        // 注册组件
        Vue.component(comName, com.default || com);
    });
}

// 确保是正常环境
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install
}





