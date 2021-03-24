
<!--
 * @Description: 日历
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-10-23 14:40:40
 * @LastEditors: HeZhen
 * @LastEditTime: 2020-12-02 09:47:24
-->

<template>
    <div class="date">
        <div class="cal_header flex font9">
            <span class="arrows left" @click="change(-1)"></span>
            <span>{{curDate.year() + $t('Log.year') + (curDate.month() + 1) + $t('Log.month')}}</span>
            <span @click="change(1)" class="arrows right"></span>
        </div>
        <div class="cal_main">
            <div class="day font6">
                <span class="pastTime">{{$t('Log.day.Sun')}}</span>
                <span>{{$t('Log.day.Mon')}}</span>
                <span>{{$t('Log.day.Tus')}}</span>
                <span>{{$t('Log.day.Wed')}}</span>
                <span>{{$t('Log.day.Thu')}}</span>
                <span>{{$t('Log.day.Fri')}}</span>
                <span>{{$t('Log.day.Sat')}}</span>
            </div>
            <div class="calendar">
                <div class="date">
                    <div v-for="(item,index) in daysArr" :key="index" class="days_box flex font6">
                        <span
                            :class="it.today ? 'checked' : it.time"
                            v-for="(it,i) in item"
                            :key="i"
                            @click="checkDay(index,i,it)"
                        >{{it.day}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import moment from "moment";
import { getMonth, isday } from "../../Util/tool";
export default {
    props: {},
    name: "Date",
    data() {
        return {
            daysArr: [], // 日期天数数组
            curDate: moment(), // 当前日历月份时间
            // 选中的日期下标
            index: {
                out: 0,
                inner: 0,
            },
        };
    },

    components: {},

    computed: {},

    created() {},
    watch: {
        daysArr: {
            deep: true,
            handler: function (n, o) {
                this.daysArr = n;
            },
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.init();
        });
    },

    methods: {
        /**
         * @description: 初始化日历
         * @param {*}
         * @return {*}
         */
        init() {
            // 当前时间
            let curTime = this.curDate;
            // 当前时间月份的起始日期
            let curMon = getMonth(curTime.valueOf());
            // 当前时间月份有多少天
            let curMonDays = curTime.daysInMonth();
            let preMonDays = moment(this.curDate)
                .add(-1, "month")
                .daysInMonth();
            let nextMonDays = moment(this.curDate)
                .add(1, "month")
                .daysInMonth();
            // 当前时间月份有天数转换成数组
            let curArr = this.numtoarr(curMonDays);
            let preArr = this.numtoarr(preMonDays);
            let nextArr = this.numtoarr(nextMonDays);
            // 当前时间月份起始日期分别是星期几
            let monFirstDay = isday(curMon.startDate);
            let monLastDay = isday(curMon.endDate);
            // 当前时间月份日期排版
            this.daysArr = [
                ...preArr.splice(preArr.length - monFirstDay),
                ...curArr,
                ...nextArr.splice(0, 6 - monLastDay),
            ];
            // 当天日期在this.daysArr的下标
            let splitlen =
                curArr.indexOf(moment().date()) +
                preArr.splice(preArr.length - monFirstDay).length;
            // 前后月份在日历当前的天数
            let pre = preArr.splice(preArr.length - monFirstDay).length;
            let next = nextArr.splice(0, 6 - monLastDay).length;
            // 格式化当前时间月份日期排版
            this.daysArr = this.formatArr(
                this.daysArr,
                splitlen,
                this.curDate,
                pre,
                next
            );
        },

        /**
         * @description: 将31转换成 1·31的数组
         * @param {Number} num 月份天数
         * @return {*}
         */
        numtoarr(num) {
            let res = [];
            for (let i = 1; i <= num; i++) {
                res.push(i);
            }
            return res;
        },

        /**
         * @description: 格式化日期数组 二维数组
         * @param {Array} arr 一维日期数组
         * @param {Number} len 当天日期在this.daysArr的下标 
         * @param {Object} m 日历当前日期
         * @return {Array} 二维日期数组
         */
        formatArr(arr, len, m, pre, next) {
            let index = 0;
            let res = [];
            let limit = arr.length / 7;
            for (let i = 0; i < limit; i++) {
                res[i] = [];
                for(let j = 0; j < 7; j++){
                    res[i][j] = {};
                    res[i][j].day = arr[index];
                    if(i == 0 && j < pre){
                        res[i][j].moment = moment(m).add(-1,'month').set('date',arr[index]);
                    }else if(i == limit-1 && j >= 7-next){
                        res[i][j].moment = moment(m).add(1,'month').set('date',arr[index]);
                    }else{
                        res[i][j].moment = moment(m).set('date',arr[index]);
                    }
                    (res[i][j].moment.isBefore(moment())) ? res[i][j].time = "pastTime" :'';
                    (res[i][j].moment.isAfter(moment())) ? res[i][j].time = "future" :'';
                    if( res[i][j].moment.isSame(moment(),'date')){
                        res[i][j].time = "curTime";
                        res[i][j].today = true;
                    }else{
                        res[i][j].today = false;
                    }
                    index++;
                }
            }
            return res
        },

        /**
         * @description: 改变日历月份事件
         * @param {Number} i 1 或 -1 表示月份加一减一
         * @return {*}
         */
        change(i) {
            this.curDate = this.curDate.add(i, "month");
            this.init();
        },

        /**
         * @description: 选中当前日历的某一天
         * @param {Number} i 日历二维数组的第一层下标
         * @param {Number} j 日历二维数组的第二层下标
         * @return {*}
         */
        checkDay(i, j, it) {
            // 日历当前时间
            this.daysArr[this.index.out][this.index.inner].today = false;
            this.index = {
                out: i,
                inner: j,
            };
            this.daysArr[i][j].today = true;
            this.$forceUpdate();
            // 将选中的几号 月份 年份 转换成日期下发
            this.$emit("sendDate", it.moment);
        },
    },
};
</script>
<style lang='less' scoped>
@import url("../../static/Style/common.less");
.date {
    width: 100%;
    height: 100%;
    .cal_header {
        justify-content: center;
        align-items: center;
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.15);
        height: 54px;
        margin: 0 0 9px 0;
        span {
            margin: 0 18px;
            display: inline-block;
            font-size: 16px;
        }
        .arrows {
            display: inline-block;
            width: 8px;
            height: 14px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .left {
            background-image: url("../../Images/light/cal_left.png");
        }
        .right {
            background-image: url("../../Images/light/cal_right.png");
        }
    }
    .cal_main {
        padding: 0 24px 5px;
        .day {
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
                width: 24px;
                height: 24px;
                text-align: center;
            }
        }
        .calendar {
            position: relative;
            .date {
                width: 100%;
                height: 100%;
                .days_box {
                    width: 100%;
                    justify-content: space-between;
                    align-items: center;
                    span {
                        display: inline-block;
                        width: 24px;
                        height: 24px;
                        text-align: center;
                        margin: 5px 0;
                        border-radius: 50%;
                        line-height: 24px;
                    }
                    .pastTime {
                        background-color: rgba(0, 0, 0, 0.1);
                    }
                    .curTime {
                        border: 1px solid #007dff;
                    }
                    .checked {
                        background-color: #007dff;
                    }
                    .future {
                        color: rgba(0, 0, 0, 0.25);
                        pointer-events: none;
                    }
                }
            }
        }
    }
}
.flex {
    display: flex;
    flex-direction: row;
}
.font6 {
    color: rgba(0, 0, 0, 0.6);
    font-size: 12px;
}
.font9 {
    color: rgba(0, 0, 0, 0.9);
    font-size: 16px;
}

.theme-dark {
    .date {
        .cal_header {
            border-bottom: 0.5px solid rgba(0, 0, 0, 1);
            .left {
                background-image: url("../../Images/dark/date_left.png");
            }
            .right {
                background-image: url("../../Images/dark/date_right.png");
            }
        }
        .cal_main {
            .calendar {
                .date {
                    .days_box {
                        color: rgba(255, 255, 255, 0.66);
                        .pastTime {
                            background-color: rgba(0, 0, 0, 0.1);
                        }
                        .curTime {
                            border: 1px solid #007dff;
                        }
                        .checked {
                            background-color: #007dff;
                        }
                        .future {
                            color: rgba(255, 255, 255, 0.1);
                        }
                    }
                }
            }
        }
    }
    .font6 {
        color: rgba(255, 255, 255, 0.86);
    }
    .font9 {
        color: rgba(255, 255, 255, 0.86);
    }
}
</style>