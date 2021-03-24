<!--
 * @Description: 
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-11-09 18:57:10
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-03-11 10:19:18
 -->
<template>
    <div class="logDiv">
        <!-- 头部start -->
        <div class="logDiv_header">
            <Header :isRight='isRight' :selfB='selfB' :backC='backC'>
                <template slot="headerTitle">{{$t('Log.header')}}</template>
            </Header>
        </div>
        <!-- 头部end -->
        <div class="logItem">
            <div class="conent" :style="{height:conentHeight}">
                <div class="wapper" :style="{height:wapperHeight}">
                    <div v-for="(item,index) in logArr" :key="index" class="log_item flex" @click="brushDetail(item.bin)">
                        <span class="grade" :style="{'backgroundColor':item.color}">{{item.grade}}</span>
                        <div :class=" index < logArr.length-1 ? 'detail detail_bor flex' : 'detail flex' ">
                            <div class="detail_left flexC">
                                <div class="left_top flex">
                                    <span>{{$t('Log.brushLen')}}</span>
                                </div>
                                <span class="left_bottom">{{item.ranking}}</span>
                            </div>
                            <span class="len">{{item.formatLen}}</span>
                            <div class="detail_right"></div>
                        </div>
                    </div>
                    <!-- <div class="Logtip">{{$t('Log.tip')}}</div> -->
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="Logtip">{{$t('Log.tip')}}</div>
        </div>
    </div>
</template>

<script>
import g from "../../Util/global";
import { scale, brushingHistory } from "../../Util/tool";
import reportData from "../../Util/reportData";
import BScroll from 'better-scroll';
export default {
    name: "Log",
    data() {
        return {
            isRight: false,
            backC: window.isDark ? '#000' : '#fff',
            selfB: true,
            scroll: null,
            logArr: [],
            conentHeight: '',
            wapperHeight: '',
        };
    },

    components: {},

    computed: {
        bleConnected() {
            return this.$store.state.BleStatus.bleConnected;
        },
        binData() {
            return this.$store.state.BleStatus.binData;
        },
        cloudHistory() {
            return this.$store.state.BleStatus.cloudHistory;
        },
        colors() {
            let colors = window.isDark
                ? ["#ba5500", "#007aac", "#4e7700"] : ["#ff7600", "#007dff", "#8cd600"];
            return colors;
        },
    },
    watch: {
        bleConnected(n, o) {
        },
        binData(n, o) {
            this.binData = n;
        },
    },
    created() {


    },

    mounted() {
        this.$nextTick(() => {
            this.conentHeight = document.querySelector('.logItem').clientHeight + 'px';
            this.wapperHeight = this.cloudHistory.length * 62 + 'px';
            setTimeout(() => {
                this._initScroll()
                this.formatData(this.cloudHistory)
            });
        })

    },

    methods: {

        /**
         * @description:  处理历史数据，转换成对象
         * @param {*} data
         * @return {*}
         */
        formatData(data) {
            let i = data.length;
            data.forEach((item, index) => {
                let brushingTime = parseInt(item.substr(1), 2);
                let headerType = item[0] === '0' ? "U" : "I";
                // 刷牙得分
                let grade = brushingHistory.getTotal(brushingTime, headerType);
                // 刷牙时长 1分20秒
                let formatLen = brushingHistory.formatTime(brushingTime, this);
                // 得分颜色
                let color = brushingHistory.getColor(grade);
                // 刷牙顺序 第 n 次
                let ranking = `${this.$t("index.Log.the")} ${i - index} ${this.$t("index.Log.times")}`;
                // 刷牙原始数据
                let bin = item;
                this.logArr.push({
                    grade,
                    formatLen,
                    color,
                    ranking,
                    bin
                });
            })
            this.scroll.refresh()
        },

        /**
         * @description:  刷牙记录点击事件
         * @param {Object} ele 刷牙记录数据
         * @return {*}
         */
        brushDetail(bin) {
            this.$router.push({ path: "/logDetail", query: { bin } });
        },

        /**
         * @description: 请求云端数据
         * @param {*}
         * @return {*}
         */
        getCloudData(mode) {
            let resCallback = (res) => {
                this.formatData(res)
            }
            reportData.getHistoryLog(resCallback)
        },

        _initScroll() {
            this.scroll = new BScroll(document.querySelector('.conent'), {
                probeType: 3,
                click: true,
                scrollY: true,
            })
        },
    },
};
</script>


<style lang='less' scoped>
.logDiv {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding-bottom: 16px;
    .logDiv_header {
        height: 80px;
    }
    .logItem {
        flex: 1;
        overflow: hidden;
        .conent {
            overflow: hidden;
            padding: 0 16px;
            .wapper {
                padding: 0 0 48px 0;
                position: relative;
                .log_item {
                    height: 64px;
                    align-items: center;
                    .grade {
                        width: 40px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                        border-radius: 50%;
                        margin-right: 19px;
                        font-size: 16px;
                        color: #fff;
                    }
                    .detail {
                        position: relative;
                        flex: 1;
                        height: 64px;
                        .detail_left {
                            flex: 1;
                            height: 64px;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            .left_top {
                                font-size: 16px;
                                color: rgba(0, 0, 0, 0.9);
                                width: 116px;
                                justify-content: space-between;
                                margin: 0 0 4px 0;
                            }
                            .left_bottom {
                                font-size: 14px;
                                color: rgba(0, 0, 0, 0.6);
                                margin: 4px 0 0 0;
                            }
                        }
                        .len {
                            line-height: 64px;
                            font-size: 14px;
                            color: rgba(0, 0, 0, 0.6);
                            margin: 0 8px 0 0;
                        }
                        .detail_right {
                            position: absolute;
                            top: 50%;
                            right: 0;
                            margin: -2px 0 0 0;
                            transform: translate(0,-50%);
                            width: 6px;
                            height: 10px;
                            background-image: url("../../Images/light/log_right.png");
                            background-size: 100% 100%;
                            background-repeat: no-repeat;
                            opacity: 0.38;
                            margin: -1px 0 0 0;
                        }
                    }
                    .detail_bor {
                        padding-bottom: 11px;
                        border-bottom: 0.00694rem solid rgba(0, 0, 0, 0.2);
                    }
                }
            }
        }
    }
    .footer {
        .Logtip {
            width: 100%;
            height: 22px;
            line-height: 22px;
            text-align: center;
            font-size: 12px;
            color: rgba(0, 0, 0, 1);
            opacity: 0.38;
        }
    }
}
.flex {
    display: flex;
    flex-direction: row;
}
.flexC {
    display: flex;
    flex-direction: column;
}

.theme-dark {
    .logDiv {
        background-color: #000;
        // .logDiv_header {
        // }
        .logItem {
            .conent {
                .wapper {
                    .log_item {
                        .grade {
                            color: #fff;
                        }
                        .detail {
                            .detail_left {
                                .left_top {
                                    color: rgba(255, 255, 255, 0.86);
                                }
                                .left_bottom {
                                    color: rgba(255, 255, 255, 0.6);
                                }
                            }
                            .len {
                                color: rgba(255, 255, 255, 0.6);
                            }
                            .detail_right {
                                background-image: url("../../Images/dark/log_right.png");
                            }
                        }
                        .detail_bor {
                            border-bottom: 0.00694rem solid
                                rgba(255, 255, 255, 0.2);
                        }
                    }
                    // .Logtip {
                    //     color: rgba(255, 255, 255, 0.66);
                    // }
                }
            }
        }
        .footer {
            .Logtip {
                color: rgba(255, 255, 255, 0.66);
            }
        }
    }
}
</style>
