/*
 * @Description: 
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-11-18 15:55:50
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-02-24 09:39:02
 */

/**
 * @description:  蓝牙设备操控,请求 55 类型的数据
 * @param {*}
 * @return {*}
 */
function writeData(data) {
    if (data === '57' || data === '59') {
        window.type58 = true;
        window.type55 = false;
    } else {
        window.type58 = false;
        window.type55 = true;
    }
    window.writeBLECharacteristicValueCallBack = (res) => {
        let resVal = JSON.parse(res);
        console.log('resVal: ', resVal);
    };
    window.hilink.writeBLECharacteristicValue(
        window.devId,
        g.serviceId,
        g.writeCharacteristicId,
        data,
        "writeBLECharacteristicValueCallBack"
    );
}

/**
 * @description: 
 * @param {*}
 * @return {*}
 */
function overallSituation(r) {
    if (r) {
        r.beforeEach((to, from, next) => {
            if (to.path === '/') {
                window.hilink && window.hilink.setTitleVisible && window.hilink.setTitleVisible(true);
                let isDark = window.hilink && window.hilink.getDarkMode && window.hilink.getDarkMode() === 2;
                isDark ? window.hilink && window.hilink.modifyTitleBar && window.hilink.modifyTitleBar(true, '0', '') : window.hilink && window.hilink.modifyTitleBar && window.hilink.modifyTitleBar(false, '0', '');
            } else {
                window.hilink && window.hilink.setTitleVisible && window.hilink.setTitleVisible(false);
            }
            if (to.path === '/guide_adult' && from.path === '/logDetail') {
                next('/');
                return true;
            } else if (to.path === '/guide_adult' && from.path === '/' && g.overWrite) {
                window.hilink.finishDeviceActivity()
                return true;
            } else {
                next();
                return true;
            }
        });
    }
}

/**
 * @description: 监听视频播放事件 
 * @param {*}
 * @return {*}
 */
function onVideoPlay() {
    let doc = document.querySelector("#_src") || null;
    doc && doc.addEventListener(
        "timeupdate",
        addEventListenerArg,
        false
    );
}

/**
 * @description: 监听视频播放事件 
 * @param {*}
 * @return {*}
 */
function removeVideoPlay() {
    let doc = document.querySelector("#_src") || null;
    doc && doc.removeEventListener(
        "timeupdate",
        addEventListenerArg,
        false
    );
}

function addEventListenerArg() {
    let v = document.querySelector("#_src") || null;
    if (v && parseInt(v.currentTime, 10) % 2 === 0) {
        g.setQueue('55')
    }
}
const g = {
    overWrite: false,
    serviceId: "0000ffb0-0000-1000-8000-00805f9b34fb",
    writeCharacteristicId: "0000ffb1-0000-1000-8000-00805f9b34fb",
    readCharacteristicId: "0000ffb2-0000-1000-8000-00805f9b34fb",
    overallSituation: overallSituation,
    setQueue: writeData,
    onVideoPlay: onVideoPlay,
    removeVideoPlay: removeVideoPlay
}
export default g