/*
 * @Description: window.hilink 对象下的函数调用文件 
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-11-05 17:23:48
 * @LastEditors: HeZhen
 * @LastEditTime: 2020-12-28 18:53:33
 */
import g from '../Util/global'


/**
 * @description: hilink 下的接口调用函数
 * @param {String} eventName 接口函数名
 * @param {Array} optiopns 参数
 * @return {type}  
 */
export const callHilinkFn = function (eventName, options = []) {
    window.hilink && window.hilink[eventName] && window.hilink[eventName].apply(window.hilink, options);
};

/**
 * @description: 数据解析
 * @param {String} resData 后端返回数据 
 * @return {type} 
 */
export const praseResponseData = function (resData) {
    // 解析返回的数据
    try {
        return JSON.parse(resData);
    } catch (error) {
        var dataStr = resData.replace(/:"{/g, ':{');
        dataStr = dataStr.replace(/}",/g, '},');
        dataStr = dataStr.replace(/\\/g, '');
        return JSON.parse(dataStr);
    }
};

/**
 * @description: hilink 接口函数的回调函数注册 在 window 下
 * @param {Object} t 一般是 this
 * @param {Array} cbArr 回调函数名数组
 * @return {type} 
 */
export const createCb = function (t, cbArr = []) {
    // 创建回调函数到window对象下，其他页面引入调用方式如下，页面中menthods需存在数组中对应的函数
    // createCb(this, ['resultCallback']);
    let i = 0,
        len = cbArr.length;
    for (; i < len; i++) {
        let cb = cbArr[i];
        window[cb] = function (res) {
            t[cb] && t[cb](praseResponseData(res));
        };
    }
};















