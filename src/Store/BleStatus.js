/*
 * @Description: 
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-12-08 17:07:23
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-01-26 10:14:12
 */
export default {
    namespaced: true,//开启命名空间
    state: {
        bleConnected: false, // 监听设备蓝牙连接结果
        bleModeStatus: false, //  当前蓝牙模块状态
        binData: null, // 蓝牙数据
        logData: '', // 设备历史记录
        cloudHistory: [],
        isIOS:false
    },
    mutations: {
        UPDATED_BLECONNECTED(state,payload) {
            state.bleConnected = payload;
        },
        UPDATED_BLEMODESTATUS(state,payload) {
            state.bleModeStatus = payload;
        },
        UPDATED_BLEDATA(state,payload) {
            state.binData = payload;
        },
        UPDATED_LOGDATA(state,payload) {
            state.logData = payload;
        },
        UPDATED_CLOUDHISTORY(state,payload) {
            state.cloudHistory = payload;
        },
        UPDATED_ISIOS(state,payload) {
            state.isIOS = payload;
        },
    },
    actions: {
        call_update_bleConnected(content,payload){
            content.commit('UPDATED_BLECONNECTED',payload)
        },
        call_update_bleModeStatus(content,payload){
            content.commit('UPDATED_BLEMODESTATUS',payload)
        },
        call_update_binData(content,payload){
            content.commit('UPDATED_BLEDATA',payload)
        },
        call_update_logData(content,payload){
            content.commit('UPDATED_LOGDATA',payload)
        },
        call_update_cloudHistory(content,payload){
            content.commit('UPDATED_CLOUDHISTORY',payload)
        },
        call_update_isIOS(content,payload){
            content.commit('UPDATED_ISIOS',payload)
        }
    },
    getters: {},
}