/*
 * @Description: 上报数据
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-12-24 15:54:54
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-03-02 10:56:05
 *          {
                status: "online",
                services: [
                    {
                        ts: "20201222T112003Z",
                        sid: "brushingHistory",
                        data: {
                            binCode: "00101101",
                        },
                    },
                    {
                        ts: "20201223T112003Z",
                        sid: "brushingHistory",
                        data: {
                            binCode: "00101111",
                        },
                    },
                    {
                        ts: "20201223T112003Z",
                        sid: "brushingHistory",
                        data: {
                            binCode: "SSSSSSSS",
                        },
                    },
                ],
            };
 */
import { scale } from '../Util/tool'

// 操作云端历史数据对象
const reportData = {};

// 云端唯一 id
reportData.devId = '';

// 获取华为云端唯一id
reportData.getDevId = () => {
    // 获取设备信息
    window.getDevInfoAllCallback = (res) => {
        res = JSON.parse(res);
        console.log('获取华为云端唯一id',res);
        reportData.devId = res.devId;
    }
    window.hilink && window.hilink.getDevInfoAll && window.hilink.getDevInfoAll("0", "", "getDevInfoAllCallback");
}

// 格式化数据
reportData.formatDataFromMachine = (str) => {
    let byteLen = parseInt(str.substr(2, 2), 16)
    let ab = new ArrayBuffer(byteLen)
    let dv = new DataView(ab)
    for (let i = 0; i < byteLen; i++) {
        i < 90 ? dv.setUint8(i, parseInt(str.substr(i * 2 + 4, 2), 16)) : dv.setUint8(i, parseInt(str.substr(i * 2 + 10, 2), 16));
    }
    let services = [], item = {}, reportTime = new Date().getTime() - (1000 * byteLen);
    for (let i = 0; i < byteLen; i++) {
        item.ts = reportData.formatTime(reportTime);
        item.sid = 'brushingHistory';
        item.data = {
            binCode: scale.hextoBin(dv.getUint8(i).toString(16))
        };
        services.push(item);
        item = {};
        reportTime += (1000)
    }
    let res = {
        status: "online",
        services: [...services]
    };
    return res;
}

// 格式化上报时间
reportData.formatTime = (time = null) => { // time 要求时间毫秒数
    time = time ? time : new Date().getTime();
    let date = new Date(time);
    let formatTime = '';
    let M = date.getMonth() + 1;
    M = M.toString().length === 1 ? `0${M}` : `${M}`;
    let D = date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString();
    let H = date.getHours().toString().length === 1 ? '0' + date.getHours().toString() : date.getHours().toString();
    let m = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
    let S = date.getSeconds().toString().length === 1 ? '0' + date.getSeconds().toString() : date.getSeconds().toString();
    formatTime += `${date.getFullYear()}${M}${D}T${H}${m}${S}Z`;
    return formatTime;
}

// 上报数据到华为云端
reportData.report = (onlyId, Data = null, func = null) => {
    let json_body = JSON.stringify(Data);
    window.reportDeviceProfileImpermanencyCallback = (res) => {
        if (window.ios) {
            let data = getIOSDevid(res);
            if (data.errCode == 0) {
                let resData = { errcode: 200 };
                if (func) {
                    func(resData)
                }
            }
        } else {
            res = JSON.parse(res);
            if (func) {
                func(res)
            }
        }

    }
    window.hilink && window.hilink.reportDeviceProfileImpermanency && window.hilink.reportDeviceProfileImpermanency(
        onlyId,
        json_body,
        "reportDeviceProfileImpermanencyCallback"
    );
}

/**
 * @description: 解析ios devID
 * @param {*}
 * @return {*}
 */
function getIOSDevid(res) {
    let data = undefined;
    let dataStr = res;
    dataStr = dataStr.replace(/"{/g, '{');
    dataStr = dataStr.replace(/}"/g, '}');
    dataStr = dataStr.replace(/\\|\n|\r|\t|\f|\t/g, '');
    data = JSON.parse(dataStr);
    return data;
}

// 获取历史记录
reportData.getHistoryLog = (func = null) => {
    //获取历史记录回调
    let data = null;
    let nowDate = new Date();
    let endTime = reportData.formatTime();
    let startTime = reportData.formatTime(nowDate.setMonth(nowDate.getMonth() - 7));
    window.getDevHistoryCallBack = (res) => {
        res = JSON.parse(res);
        data = reportData.filterData(res.list);
        if (func) {
            func(data)
        }
    };
    window.hilink && window.hilink.getDevHistory && window.hilink.getDevHistory(
        reportData.devId, // 华为分配的id  
        "0",
        "1000",
        startTime,
        endTime,
        "brushingHistory",
        "binCode",
        "getDevHistoryCallBack"
    );
}

// 获取历史记录
reportData.filterData = (data) => {
    //获取历史记录回调
    let formatData = [];
    try {
        data.forEach((item, index) => {
            if (item.data.binCode === 'SSSSSSSS') {
                throw new Error('stop')
            }
            formatData.push(item.data.binCode)
        })
    } catch (e) {
        console.log('');
    }
    return formatData;
}


// 特殊数据 用于分割重置后的刷牙历史数据
reportData.resize = (time) => {
    let specialData = {
        status: "online",
        services: [
            {
                ts: reportData.formatTime(time),
                sid: "brushingHistory",
                data: {
                    binCode: "SSSSSSSS",
                },
            },
        ]
    };
    reportData.report(reportData.devId, specialData)
}


reportData.getDevId()
export default reportData