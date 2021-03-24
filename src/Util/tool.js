/*
 * @Description: 工具文件
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-10-30 10:57:35
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-03-11 16:04:39
 */

// 日期操作插件
import moment from 'moment'

// 切换语言
export const getLanguage = () => {
    let language;
    let defualtLanguage = 'zh';
    let reg = /^zh-/i;
    if (navigator && navigator.language) {
        language = reg.test(navigator.language) ? defualtLanguage : 'en';
    } else {
        language = defualtLanguage;
    }
    return language;
};

// 日期格式化
export const format = (date, fmt) => {
    let ret;
    let o = {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'W+': date.getDay()
    };
    for (let k in o) {
        ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
            let str = o[k].toString();
            let len = ret[1].length;
            str = len === 1 ? str : str.padStart(len, '0');
            fmt = fmt.replace(ret[1], str);
        }
    }
    return fmt;
};

// 获取当前时间本周起始时间

export const getWeek = function (time = null) { // time 如果有值，要求是时间毫秒数 或者是 "29-06-1995" 此格式的时间串
    if (!time) {
        time = moment();
    } else {
        time = typeof time == 'string' ? moment(time, ["MM-DD-YYYY", "DD-MM", "DD-MM-YYYY", "YYYY-MM-DD"]) : time = moment(time);
    }

    let startDate = time.week(time.week()).startOf('week').format('YYYY-MM-DD')
    let endDate = time.week(time.week()).endOf('week').format('YYYY-MM-DD')
    return {
        startDate,
        endDate
    }
}

// 获取当前时间本月起始时间

export const getMonth = function (time = null) { // time 如果有值，要求是时间毫秒数 或者是 "29-06-1995" 此格式的时间串
    if (!time) {
        time = moment();
    } else {
        time = typeof time == 'string' ? moment(time, ["MM-DD-YYYY", "DD-MM", "DD-MM-YYYY", "YYYY-MM-DD"]) : time = moment(time);
    }

    let startDate = time.month(time.month()).startOf('month').format('YYYY-MM-DD')
    let endDate = time.month(time.month()).endOf('month').format('YYYY-MM-DD')
    return {
        startDate,
        endDate
    }
}

// 获取当前时间本年起始时间

export const getYear = function (time = null) { // time 如果有值，要求是时间毫秒数 或者是 "29-06-1995" 此格式的时间串
    if (!time) {
        time = moment();
    } else {
        time = typeof time == 'string' ? moment(time, ["MM-DD-YYYY", "DD-MM", "DD-MM-YYYY", "YYYY-MM-DD"]) : time = moment(time);
    }
    let startDate = time.year(time.year()).startOf('year').format('YYYY-MM-DD');
    let endDate = time.year(time.year()).endOf('year').format('YYYY-MM-DD');
    return {
        startDate,
        endDate
    }
}

// 获取某一天是周几

export const isday = function (time = null) { // time 如果有值，要求是时间毫秒数 或者是 "29-06-1995" 此格式的时间串
    if (!time) {
        time = moment();
    } else {
        time = typeof time == 'string' ? moment(time, ["MM-DD-YYYY", "DD-MM", "DD-MM-YYYY", "YYYY-MM-DD"]) : time = moment(time);
    }
    let day = time.day();
    return day;
}



/**
 * @description: 计算刷牙得分
 * @param {Number} t 刷牙时长
 * @param {Number} toal 应该刷牙时长
 * @return {*}
 */
export const getGoal = function (t, toal) { // time 如果有值，要求是时间毫秒数 或者是 "29-06-1995" 此格式的时间串
    let g = parseInt((t / toal) * 100);
    g = g > 100 ? 100 : g;
    g = g < 0 ? 0 : g;
    return g;
}

// 对 5601040207 数据的处理方法
export const scale = {
    /**
     * @description: 16进制转二进制
     * @param {*} 16进制
     * @return {*}
     */
    hextoBin: function (hex) {
        let str = parseInt(hex, 16).toString(2);
        while (str.length < 8) {
            str = '0' + str;
        }
        return str;
    },

    /**
     * @description: 二进制转16进制
     * @param {*} 二进制
     * @return {*}
     */
    bintoHex: function (bin) {
        let str = parseInt(bin, 2).toString(16);
        str = str.length == 1 ? ('0' + str) : str;
        return str;
    },

    /**
     * @description: 校验数据 并拼接16进制
     * @param {Number} s 要改变数据的下标
     * @param {String} s 要改变数据的新值
     * @param {String} s 要改变数据
     * @return {*}
     */
    checkData: function (s, newData, oldData) {
        let bin1 = null;
        let binArr = oldData.split('');
        binArr[4] = '0';
        binArr[0] = binArr[0] + binArr[1];
        binArr[s] = newData;
        binArr.splice(1, 1);
        bin1 = binArr.join('');
        let bin2 = 0b0;
        let checkCode = (parseInt(parseInt(bin1, 2), 10) + parseInt(parseInt(bin2, 2), 10)).toString(16);
        checkCode = checkCode.length == 1 ? ('0' + checkCode) : checkCode;
        bin1 = parseInt(parseInt(bin1, 2), 10).toString(16).length == 1 ? '0' + parseInt(parseInt(bin1, 2), 10).toString(16) : parseInt(parseInt(bin1, 2), 10).toString(16);
        return 'AA' + bin1 + '00' + checkCode;
    }
}

export const brushingHistory = {
    /**
     * @description: 计算得分颜色
     * @param {number} s 刷牙得分
     * @return {*}
     */
    getColor: (s) => {
        let colors = window.isDark
            ? ["#ba5500", "#007aac", "#4e7700"]
            : ["#ff7600", "#007dff", "#8cd600"];
        let color = "";
        if (s >= 80) {
            color = colors[2];
        } else if (s >= 60 && s < 79) {
            color = colors[1];
        } else {
            color = colors[0];
        }
        return color;
    },

    /**
     * @description: 计算得分
     * @param {Number} s 刷牙时长
     * @param {String} type 牙刷类型
     * @return {*}
     */
    getTotal: (s, type = "U") => {
        let toal = null;
        if (type === "U") {
            toal =
                parseInt((s / 45) * 100) < 100
                    ? parseInt((s / 45) * 100)
                    : 100;
        } else {
            toal =
                parseInt((s / 120) * 100) < 100
                    ? parseInt((s / 120) * 100)
                    : 100;
        }
        return toal;
    },

    /**
     * @description: 计算刷牙时间 输出格式为  1分20秒
     * @param {Number} s 秒
     * @return {*}
     */
    formatTime: (s, that = null) => {
        let integer = parseInt(s / 60);
        let remainder =
            parseInt(s % 60) === 0 ? "00" : `${parseInt(s % 60)}`;
        remainder.length === 1 ? `0${remainder}` : remainder;
        return `${integer} ${integer > 1 ? that.$t("Log.minutes") : that.$t("Log.minute")} ${remainder} ${that.$t(
            "Log.second"
        )}`;
    },
}