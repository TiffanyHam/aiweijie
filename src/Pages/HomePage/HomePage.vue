<template>
    <div class="index flexC">
        <!-- <Header :isRight='isRight'></Header> -->
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <div class="index_main">
                    <!-- pointer-events: none; -->
                    <div class="content" :class="battery == 1 ? 'marginTop':''">
                        <!-- banner图start -->
                        <div class="banner">
                            <div class="productU" v-if="isPosition == '0'"></div>
                            <div class="productI" v-else></div>
                        </div>
                        <div :class="$i18n.locale === 'zh' ? 'logo':'logo_en'"></div>
                        <!-- banner图end -->
                        <!-- 状态栏未连接-->
                        <div v-show="!markRed">
                            <div class="bettery flexR">
                                <!-- 未连接 -->
                                <div class="" v-show="unConnect">{{ $t('index.noConnect') }}</div>
                                <!-- 连接中 -->
                                <div class="" v-show="connect">{{ $t('index.connect') }}</div>
                                <div class="loading_icon" v-show="connect"></div>
                            </div>
                        </div>
                        <!-- 状态栏已连接 -->
                        <div v-show="markRed">
                            <div class="bettery flexR">
                                <div class="bettery_connected">{{ $t('index.connected') }}</div>
                                <div class="scoreText">
                                    <p class="scoreColor"><span v-if="getScore == ''">——</span><span class="scoreFont" v-else>{{ getScore }}</span><span class="scoreColor1">{{ $t('index.score')}}</span></p>
                                    <p class="scoreColor1">{{ $t('index.lastScore')}}</p>
                                </div>
                                <div v-if="recharge == 1">
                                    <!-- 充电中动画 -->
                                    <div v-if="isDarks == false" class="posiImg" :style="{backgroundImage: 'url(' +imgBooth[booth_index]+ ')'}"></div>
                                    <div v-else class="posiImg" :style="{backgroundImage: 'url(' +imgBooth_dark[booth_index]+ ')'}"></div>
                                </div>
                                <div class="battery1" v-else>
                                    <!-- 电池 -->
                                    <div class="cell1" v-if="battery == 0"></div>
                                    <div class="cell2" v-if="battery == 1"></div>
                                    <div class="cell3" v-if="battery == 2"></div>
                                    <div class="cell4" v-if="battery == 3"></div>
                                    <div class="cell5" v-if="battery == 4"></div>
                                    <div class="cell6" v-if="battery == 5"></div>
                                </div>
                            </div>
                        </div>

                        <div class="opacityVal" v-show="!markRed">
                            <!-- 九宫格设置start -->
                            <div class="option">
                                <div class="option_item flexR">
                                    <div class="itemPlay flexR left">
                                        <div>
                                            <span class="noConnect_color">{{ $t('index.brushModule') }}</span>
                                        </div>
                                        <div class="icon_width">
                                            <div :class="isDarks == false ? 'patternCommon pattern2':'patternCommon pattern2'"></div>
                                        </div>
                                    </div>
                                    <div class="itemPlay flexR">
                                        <div>
                                            <span class="noConnect_color">{{ $t('index.brushLen') }}</span>
                                        </div>
                                        <div class="icon_width">
                                            <div :class="isDarks == false ? 'patternCommon time2':'patternCommon time2'"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="option_item flexR">
                                    <div class="itemPlay flexR left">
                                        <div class="flexC">
                                            <div class="noConnect_color">
                                                <div class="flexR1">
                                                    <span>{{ $t('index.brushDay') }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="icon_width">
                                            <div :class="isDarks == false ? 'patternCommon tooth2':'patternCommon tooth2'"></div>
                                        </div>
                                    </div>
                                    <div class="itemPlay flexR">
                                        <div class="flexC">
                                            <span class="noConnect_color">{{ $t('index.music') }}</span>
                                        </div>
                                        <div class="forbid">
                                            <div class="musicOff" alt="no"> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bettery2 flexR">
                                <span class="bettery1">{{ $t('index.setting') }}</span>
                                <div class="set2"></div>
                            </div>
                            <!-- 九宫格设置end-->
                        </div>

                        <div v-show="markRed">
                            <!-- 九宫格设置start -->
                            <div class="option">
                                <div class="option_item flexR">
                                    <!-- 刷头选配根据开关控制--start -->
                                    <div @click="select" class="itemPlay flexR left" v-if="layType == 0">
                                        <div>
                                            <span class="connect_color">{{ $t('index.brushModule') }}</span><br />
                                            <div class="fontsize12">
                                                <span v-if="isPosition == '1'">{{ $t('index.miniBrush')}}</span>
                                                <span v-if="isPosition == '0'">{{ $t('index.uBrush')}}</span>
                                            </div>

                                        </div>
                                        <div class="icon_width">
                                            <div class="pattern patternCommon"></div>
                                        </div>
                                    </div>

                                    <div class="itemPlay flexR left" v-else>
                                        <div>
                                            <span class="noConnect_color">{{ $t('index.brushModule') }}</span>

                                        </div>
                                        <div class="icon_width">
                                            <div class="pattern2 patternCommon"></div>
                                        </div>
                                    </div>
                                    <!-- 刷头选配--end -->

                                    <div @click="voice" class="itemPlay flexR">
                                        <div>
                                            <span>{{ $t('index.brushLen') }}</span>
                                            <div class="fontsize12">
                                                <span v-if="openStatue == '00'">{{ $t('BrushTeethModel.model.level1')}}</span>
                                                <span v-if="openStatue == '01'">{{ $t('BrushTeethModel.model.level2')}}</span>
                                            </div>
                                        </div>
                                        <div class="icon_width">
                                            <div class="time patternCommon"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="option_item flexR">
                                    <div @click="calendar" class="itemPlay flexR left">
                                        <div class="flexC">
                                            <div class="flexR1">
                                                <span>{{ $t('index.brushDay') }}</span>
                                                <!-- <div class="log_right"></div> -->
                                            </div>
                                            <div class="fontsize12">
                                                <span>{{ realValue}}<span>{{ $t('index.day')}}</span></span>
                                            </div>
                                        </div>
                                        <div class="icon_width">
                                            <div class="tooth patternCommon"></div>
                                        </div>
                                    </div>
                                    <div class="itemPlay flexR">
                                        <div class="flexC">
                                            <span>{{ $t('index.music') }}</span>
                                            <div class="fontsize12" v-if="isOpen == 1"><template class="connect_color">{{ $t('index.open') }}</template></div>
                                        </div>
                                        <div @click="getChange">
                                            <!-- 音乐开关切换 -->
                                            <div v-if="isOpen == '0'" class="musicOff" alt="off"></div>
                                            <div v-if="isOpen == '1'" class="musicOn" alt="on"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div @click="set" class="setting flexR">
                                <span class="better1">{{ $t('index.setting') }}</span>
                                <div class="set2"></div>
                            </div>
                            <!-- 九宫格设置end-->
                        </div>
                        <!-- 刷牙记录start-->
                        <div class="write">
                            <span class="itemPlay logTab flexR">
                                <span>{{ $t('index.brushLog') }}</span>
                                <div @click="logRight" class="fontStyle flexR" :class="!markRed ?'forbid':''">
                                    <span>{{ $t('index.more') }}</span>
                                    <div class="log_right"></div>
                                </div>
                            </span>
                            <div class="log flexC">
                                <div class="log_main flexC">
                                    <div class="flexC contain">
                                        <div class="log_text">
                                            <div class="log_grade">
                                                <div class="scroll">
                                                    <div v-for="(item, index) in logArr" :key="index" class="log_item flex" @click="brushDetail(item.bin)" :class="!markRed ?'forbid':''">
                                                        <span class="grade" :style="{'backgroundColor':item.color}">{{ item.grade }}</span>
                                                        <div :class=" index < logArr.length - 1  ? 'detail detail_bor flex' : 'detail flex'">
                                                            <div class="detail_left flexC">
                                                                <div class="left_top flex">
                                                                    <span>{{ $t('Log.brushLen') }}</span>
                                                                </div>
                                                                <span class="left_bottom">{{ item.ranking }}</span>
                                                            </div>
                                                            <div class="len">{{item.formatLen}}</div>
                                                            <div class="log_right"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 刷牙记录end-->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 刷牙模式切换弹窗 -->
        <div class="brushDialog">
            <div class="mask animate__animated animate__fadeIn" key="1" @click="showDialog = false" v-if="showDialog" @touchmove.prevent>
            </div>
            <div class="dialog" v-show="showDialog" key="2">
                <div class="dialogTitle">
                    <slot name="title">{{$t('index.brushModule')}}</slot>
                </div>
                <div class="dialogContent">
                    <!-- 内容 -->
                    <div class="itemList">
                        <div class="toothbrushU flexContent">
                            <div class="toothbrushU1"></div>
                        </div>
                        <div class="toothbrushI flexContent">
                            <div class="toothbrushI1"></div>
                        </div>
                    </div>
                    <div class="itemList brushType">
                        <div class="flexContent toothbrushCommon">{{$t('index.uBrush')}}</div>
                        <div class="flexContent toothbrushCommon">{{$t('index.miniBrush')}}</div>
                    </div>
                    <div class="itemList">
                        <div class="clickU flexContent" v-for="(item,index) in modules" :key="index">
                            <div class="rounding">
                                <Round :status="item.check" @changeStatus="getRoundStatus(index,arguments)"></Round>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog_footer fb">
                    <div class="cancle flexContent" @click="cancleBtn">{{$t('Dialog.cancle')}}</div>
                </div>
            </div>
        </div>
        <!-- 充电提示 -->
        <msg :dialogTip="dialogTip" :syncMessage="false"></msg>
    </div>
</template>

<script>
import BScroll from "better-scroll";
import g from "../../Util/global";
import { scale, brushingHistory } from "../../Util/tool";
import { mapActions } from 'vuex'
import reportData from "../../Util/reportData";

export default {
    name: "HomePage",
    inject: ['isDarks', 'reload'],
    data() {
        return {
            isRight: true,
            dialogTip: false,
            connect: false,
            unConnect: true,
            deviceId: '',
            showDialog: false, //刷头切换弹窗
            getNewData: '',
            //电池图片显示
            battery: 0, //1,2,3,4,5,6
            //电池状态切换---是否充电中
            recharge: 0, //
            // 电源开关
            layType: 0,
            //音乐开关，文字切换
            isOpen: 0,
            Popup_show: false,
            //蓝牙未连接 ture已连接
            markRed: this.$store.state.BleStatus.bleConnected,//this.$store.state.BleStatus.bleConnected
            //刷头位置 -- 0/1
            isPosition: 0,
            // 刷牙时banner图的变化
            imgBooth: [
                require("../../Images/light/cell1.png"),
                require("../../Images/light/cell8.png"),
                require("../../Images/light/cell3.png"),
                require("../../Images/light/cell4.png"),
                require("../../Images/light/cell5.png"),
                require("../../Images/light/cell6.png"),
            ],
            imgBooth_dark: [
                require("../../Images/dark/cell1.png"),
                require("../../Images/dark/cell8.png"),
                require("../../Images/dark/cell3.png"),
                require("../../Images/dark/cell4.png"),
                require("../../Images/dark/cell5.png"),
                require("../../Images/dark/cell6.png"),
            ],
            //充电动画
            booth_index: 0,
            // 刷头选配数组
            modules: [
                {
                    check: false,
                    index: 0,
                },
                {
                    check: false,
                    index: 1,
                }
            ],
            //历史记录展示
            logArr: [],
            isClick: false,  //判断是否可点击
            openStatue: '00',  //刷牙模式
            timer: null,
            timer1: null,
            timer2: null,
            timer3: null,
            timers: null,
            // 实际天数
            realValue: '',
            //得分
            getScore: '',
        };
    },
    created() {
        //this.getCloudHistory()
        //g.setQueue('55')
    },
    beforeDestroy() {
        clearInterval(this.timers);
        this.timers = null;
    },
    destroyed() {
    },
    mounted() {
        var that = this;
        if (this.markRed) {
            this.clearTimer()
            this.$dialog.hide()   //连接失败弹窗
            this.parseData(this.binData)  //初始化数据
            if (this.recharge == 1) {
                this.chargePro() //充电动画
            }
        } else {
            this.unConnect = true
            this.timer = setTimeout(() => {
                this.unConnect = false
                this.connect = true
                this.$dialog.hide()
            }, 500);
            this.timer1 = setTimeout(() => {
                this.connect = false //loading
                this.$dialog.show()
                this.unConnect = true
            }, 30 * 1000);

        }


        this.$nextTick(() => {
            let bs = new BScroll(this.$refs.wrapper, {
                click: true,
                scrollbar: false,
            });
        });

    },
    //引用日历组件中的判断
    computed: {
        colors() {
            let colors = ["#fa2a2d", "#ffbf00", "#007dff"];
            let res = [];
            this.logArr.forEach((item, index) => {
                if (item.F >= 80) {
                    res[index] = colors[2];
                } else if (item.F >= 60 && item.F < 80) {
                    res[index] = colors[1];
                } else {
                    res[index] = colors[0];
                }
            });
            return res;
        },
        connected() {
            return this.$store.state.BleStatus.bleConnected
        },
        binData() {
            return this.$store.state.BleStatus.binData
        },
        logData() {
            return this.$store.state.BleStatus.logData;
        },
    },
    watch: {
        Popup_show(n, o) {
            this.Popup_show = n;
        },
        connected(n, o) {
            this.markRed = n
            if (this.markRed) {
                this.clearTimer()
                this.$dialog.hide()   //连接失败弹窗
            } else {
                this.unConnect = true
                this.timer2 = setTimeout(() => {
                    this.unConnect = false
                    this.connect = true
                }, 500);
                this.timer3 = setTimeout(() => {
                    this.connect = false //loading
                    this.$dialog.show()   //连接失败弹窗
                    this.unConnect = true
                }, 30 * 1000);

            }
        },
        binData(n, o) {
            if (n.length === 10 && (n.includes('AB') || n.includes('56'))) {
                this.parseData(n)
            }
            if (n.length > 2) {  //无数据按钮不可点击
                this.isClick = true
            } else {
                this.isClick = false
            }
        },
        logData: {
            immediate: true,
            handler: function (n, o) {
                this.setCloudData(n)
            }

        },
        recharge(n, o) {
            if (n === '1') {
                this.booth_index = 0;
                this.chargePro()
            } else {
                clearInterval(this.timers);
                this.booth_index = 0;
                this.timers = null;
            }
        }
    },
    methods: {
        ...mapActions({
            call_update_logData: 'BleStatus/call_update_logData',
            call_update_cloudHistory: 'BleStatus/call_update_cloudHistory'
        }),

        clearTimer() {
            clearTimeout(this.timer);
            clearTimeout(this.timer1);
            clearTimeout(this.timer2);
            clearTimeout(this.timer3);
        },
        // 电池充电状态动画
        chargePro() {
            let self = this;
            this.timers = setInterval(() => {
                self.booth_index++;
                if (self.booth_index == 6) {
                    self.booth_index = 0;
                }
            }, 1000);
        },
        /**
         * @description: 开关音乐--事件
         * @param {*} val
         */
        getChange() {
            if (this.isClick === true) {
                var setData;
                if (this.isOpen == 0) {
                    this.isOpen = 1; //开音乐
                    setData = scale.checkData(6, '1', this.getNewData)
                } else {
                    this.isOpen = 0
                    setData = scale.checkData(6, '0', this.getNewData)
                }
                g.setQueue(setData)
            }
        },
        //刷牙选配点击事件
        select() {
            this.showDialog = true
        },
        /**
         * @description: 刷牙选配切换
         * @param {type}
         * @return {type}
         */
        cancleBtn() {
            this.showDialog = false
        },

        getRoundStatus() {
            let arg = arguments;
            var setData;
            if (!arg[1][0]) {
                return true;
            }
            this.modules.forEach((item, index) => {
                if (index == arg[0]) {
                    item.check = true
                    this.isPosition = 1
                    setData = scale.checkData(5, '1', this.getNewData)
                } else {
                    item.check = false
                    this.isPosition = 0
                    setData = scale.checkData(5, '0', this.getNewData)
                }
                this.showDialog = false;
            });
            g.setQueue(setData)
        },
        closeDialog() {
            this.showDialog = false
        },
        //刷牙模式--跳转
        voice() {
            this.$router.push("brushModel");
        },
        //天数--跳转
        calendar() {
            this.$router.push("RemainTime");
        },
        // 设置---跳转
        set() {
            this.$router.push("Setting");
        },
        // 更多--跳转
        logRight(ele) {
            this.$router.push({ path: "/Log" });
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
           * @description: //数据解析
           * @param {*} data
           */
        parseData(data) {  // 56 04 00 4B 4F
            if (data) {
                this.getCloudHistory()
                this.isClick = true;
                this.battery = parseInt(data.substr(2, 2), 16);  //bite1  parseInt(data.substr(2, 2), 16) 
                this.battery == 1 ? (this.dialogTip = true) : (this.dialogTip = false)
                let newData = data.substr(4, 2) //bite2
                newData = scale.hextoBin(newData); //00 00 01 00
                this.getNewData = newData
                this.layType = newData.substr(7, 1); // 电源开关---用不上
                this.isOpen = newData.substr(6, 1); // 音乐开关
                let toothStatue = newData.substr(5, 1); // 刷头选配
                this.isPosition = toothStatue  //0 儿童
                if (this.isPosition == 0) {
                    this.modules[0].check = true;
                    this.modules[1].check = false;
                } else {
                    this.modules[0].check = false;
                    this.modules[1].check = true;
                }
                //this.$forceUpdate();
                this.recharge = newData.substr(4, 1); // 充电输入
                //console.log('充电输入', this.recharge);
                this.openStatue = newData.substr(0, 2); // 刷牙模式
            }
        },

        /**
         * @description: 数据上报
         * @param {*}
         */
        setCloudData(data) {
            let that = this;
            if (!data) {
                return true;
            }
            if (data.substr(2, 2) != '00' && (data.length === 93 * 2 * 2 || data.length === 93 * 2) && data.substr(0, 2) === '58') {
                let resCallback = (res) => {
                    if (res.errcode === 200) {
                        let newlogData = null;
                        that.call_update_logData(newlogData)
                        // 清除设备历史记录
                        let setMachine = scale.checkData(4, '1', scale.hextoBin(that.binData.substr(4, 2)))
                        g.setQueue(setMachine);
                        this.getCloudHistory()
                    }
                }
                var formatdata = reportData.formatDataFromMachine(this.logData)
                reportData.getDevId()
                reportData.report(reportData.devId, formatdata, resCallback)
            }
        },

        /**
         * @description: 计算对应天数
         * @param {*}
         * @return {*}
         */
        countDays(arr, typeHeader = '0') {
            let times = 0;
            if (arr.length <= 0 || !arr || arr === []) {
                this.realValue = 90;
                return true;
            }
            arr.forEach((item) => {
                item[0] === typeHeader ? times++ : '';
            })
            this.realValue = Math.floor((90 - (times / 2))) >= 0 ? Math.floor((90 - (times / 2))) : 0;
        },

        /**
         * @description: 历史记录
         * @param {*}
         */
        getCloudHistory() {
            let resCallback = (res) => {
                if (res.length > 0) {
                    res.length === 1 ? this.formatData([res[0]]) : this.formatData([res[0], res[1]]);
                }
                this.countDays(res, this.isPosition.toString())
                this.call_update_cloudHistory(res)
            }
            reportData.getHistoryLog(resCallback)
        },

        /**
         * @description:  处理历史数据，转换成对象
         * @param {*} data
         * @return {*}
         */
        formatData(data) {
            if (data.length <= 0) {
                return true;
            }
            this.logArr = [];
            let i = data.length;
            data.forEach((item, index) => {
                let brushingTime = parseInt(item.substr(1), 2);
                let headerType = item[0] === '0' ? "U" : "I";
                // 刷牙得分
                let grade = brushingHistory.getTotal(brushingTime, headerType);
                // 刷牙时长 1分20秒
                let formatLen = brushingHistory.formatTime(brushingTime, this);
                // console.log('刷牙时长',formatLen)
                // 得分颜色
                let color = brushingHistory.getColor(grade);
                // console.log('得分颜色',color)
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
                })
                this.getScore = this.logArr[0].grade
            })
        },
    }
};
</script>

<style lang="less" scoped>
@import url("../../static/Style/common.less");
.brushDialog {
    .mask {
        background-color: rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
    }
    .dialog {
        border-radius: 15px;
        width: 328px;
        padding: 0px 24px;
        z-index: 999;
        position: absolute;
        left: 50%;
        bottom: 16px;
        margin-left: -164px;
        background-color: #fff;
        .flexContent {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .dialogTitle {
            font-size: 20px;
            color: @black90;
            height: 56px;
            line-height: 56px;
            //  margin: 0 0 15px 0;
        }
        .dialogContent {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.9);
            .brushType {
                padding: 8px 0;
            }
            .itemList {
                display: flex;
                direction: ltr;
                .clickU {
                    width: 164px;
                    height: 34.5px;
                }
                .rounding {
                    width: 16px;
                    height: 16px;
                }
                .toothbrushCommon {
                    width: 164px;
                }
                .toothbrushU {
                    width: 164px;
                    // height: 123.75px;
                    .toothbrushU1 {
                        width: 84.5px;
                        height: 56.25px;
                        background-image: url("../../Images/light/toothbrushU.png");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                }
                .toothbrushI {
                    width: 164px;
                    //height: 123.75px;
                    .toothbrushI1 {
                        width: 24px;
                        height: 96.75px;
                        background-image: url("../../Images/light/toothbrushI.png");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                }
            }
        }
        .fb {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .dialog_footer {
            width: 100%;
            color: @black30;
            font-size: 16px;
            justify-content: center;
            height: 56px;
            .cancle {
                width: 100px;
                height: 34px;
                border-radius: 2.5px;
                text-align: center;
                color: @007DFF;
            }
        }
    }
}

// 暗黑模式 刷头切换弹窗
.theme-dark {
    .dialog {
        background-color: #262626;
        .dialogContent,
        .dialogTitle {
            color: rgba(255, 255, 255, 0.86);
        }
        .dialog_footer {
            .cancle {
                color: @3F97E9;
            }
        }
        .toothbrushU,
        .toothbrushI {
            opacity: 0.86;
        }
    }
}

//主页样式
.index {
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
    position: relative;
    //margin: 80px 0 0 0;
    padding: 80px 0 0 0;
    //loading
    .loading_icon {
        width: 40px;
        height: 40px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        -webkit-animation: load 1.5s linear infinite;
        animation: load 1.5s linear infinite;
    }
    /*Chorme,Safari必须加上*/
    @-webkit-keyframes load {
        to {
            -webkit-transform: rotate(0deg);
        }
        from {
            -webkit-transform: rotate(360deg);
        }
    }
    @keyframes load {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .wrapper {
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
    }
    .index_main {
        width: 100%;
        padding: 0 16px;
        flex: 1;
        overflow: hidden;
        .marginTop {
            margin-top: 48px;
        }
        .marginNo {
            margin-top: 0px;
        }
        .content {
            //  height: 820px;
            .productU,
            .productI {
                width: 252px;
                height: 252px;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                margin: auto;
            }
            // img {
            //     display: inline-block;
            //     width: 100%;
            // }

            .forbid {
                pointer-events: none;
            }
            .scoreText {
                text-align: center;
                font-size: 12px;
                margin: 6px 10px 0 0;
                //  color:rgba(0,0,0,.9);
                .scoreColor1 {
                    color: rgba(0, 0, 0, 0.6);
                }
                p {
                    margin-bottom: 8px;
                    // letter-spacing: .1em;
                    .scoreFont {
                        font-size: 24px;
                    }

                    span {
                        margin-right: 2px;
                    }
                }
            }
            .log_right {
                width: 6px;
                height: 10px;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                margin: 0 0 1px 4px;
                opacity: 0.38;
            }
            .logo,
            .logo_en {
                width: 70px;
                height: 18px;
                background-size: 100% 100%;
                margin: auto;
                margin-bottom: 10px;
            }
            .bettery {
                background-color: #fff;
                padding: 0 24px;
                border-radius: 8px;
                height: 88px;
                font-size: 18px;
                margin: 0 0 8px 0;
                color: @black90;
                .bettery_connected {
                    margin: 5px 0 0 0;
                }
                // .bettery1 {
                //     color: @black20;
                // }
                .cell1,
                .cell2,
                .cell3,
                .cell4,
                .cell5,
                .cell6,
                .cell7,
                .cell8 {
                    width: 24px;
                    height: 24px;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
            }
            .bettery2 {
                background-color: #fff;
                padding: 0 24px;
                border-radius: 8px;
                height: 64px;
                font-size: 18px;
                margin: 0 0 8px 0;
                color: @black90;
            }
            // .bettery1 {
            //     color: @black20;
            // }

            .set2 {
                width: 24px;
                height: 24px;
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
            .startingup,
            .startingup2 {
                width: 64px;
                height: 64px;
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
            .musicOff,
            .musicOn,
            .musicNo {
                width: 24px;
                height: 24px;
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
            .opacityVal {
                opacity: 0.38;
                //pointer-events: none;
            }
            .option {
                .option_item {
                    margin: 0 0 8px 0;
                    .left {
                        margin-right: 8px;
                    }
                    .patternCommon {
                        width: 24px;
                        height: 24px;
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                }
            }
            .setting {
                background-color: #fff;
                padding: 0 24px;
                border-radius: 8px;
                height: 64px;
                font-size: 16px;
                margin: 0 0 8px 0;
                color: @black90;
            }
            .write {
                background-color: #fff;
                width: 100%;
                height: 230px;
                border-radius: 8px;
                flex: 1;
                margin-bottom: 8px;
                .logTab {
                    height: 48px;
                }
                .flex {
                    display: flex;
                    flex-direction: row;
                }
                .flexC {
                    display: flex;
                    flex-direction: column;
                }
                .fontStyle {
                    font-size: 16px;
                    color: rgba(0, 0, 0, 0.6);
                }
                .log {
                    background-color: #fff;
                    border-radius: 8px;
                    .log_main {
                        flex: 1;
                        padding: 0 24px;
                        justify-content: space-between;
                        // margin-bottom: 2000px;
                        .contain {
                            flex: 1;
                            // .log_date {
                            //     width: 100%;
                            //     background-color: #fff;
                            // }
                            .log_text {
                                background-color: #fff;
                                flex: 1;
                                .newest {
                                    margin-bottom: 23px;
                                }
                                .log_grade {
                                    height: 128px;
                                    overflow: hidden;
                                    .scroll {
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
                                                flex: 1;
                                                height: 100%;
                                                position: relative;
                                                //justify-content: space-between;
                                                //align-items: center;
                                                .detail_left {
                                                    height: 64px;
                                                    display: flex;
                                                    flex-direction: column;
                                                    justify-content: center;
                                                    flex: 1;
                                                    .left_top {
                                                        font-size: 16px;
                                                        color: @black90;
                                                        width: 116px;
                                                        justify-content: space-between;
                                                        margin-bottom: 4px;
                                                    }
                                                    .left_bottom {
                                                        margin-top: 4px;
                                                        font-size: 14px;
                                                        color: @black60;
                                                    }
                                                }
                                                .len {
                                                    line-height: 64px;
                                                    margin: 0 8px 0 0;
                                                    font-size: 14px;
                                                    color: @black60;
                                                }
                                                .log_right {
                                                    position: absolute;
                                                    top: 50%;
                                                    right: 0;
                                                    transform: translate(0,-50%);
                                                    width: 6px;
                                                    height: 10px;
                                                    margin: -1px 0 0 0;
                                                    //background-image: url("../../Images/light/log_right.png");
                                                    background-size: 100% 100%;
                                                    background-repeat: no-repeat;
                                                }
                                            }
                                            .detail_bor {
                                                padding-bottom: 11px;
                                                border-bottom: 0.00694rem solid
                                                    rgba(0, 0, 0, 0.2);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        .footer_tip {
                            color: rgba(0, 0, 0, 0.6);
                            font-size: 12px;
                            width: 100%;
                            text-align: center;
                            margin-top: 35px;
                        }
                    }
                }
            }
        }
        .footer_tip {
            color: rgba(0, 0, 0, 0.6);
            font-size: 12px;
            width: 100%;
            text-align: center;
            margin-top: 35px;
        }
    }
}
.active {
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.3.8);
}
.itemPlay {
    flex: 1;
    height: 64px;
    background-color: #fff;
    padding: 0 24px;
    border-radius: 8px;
    font-size: 16px;
    color: @black90;
    // .noConnect_color {
    //     color: @black20;
    // }
    // .connect_color {
    //     color: @black90;
    // }
    .fontsize12 {
        margin-top: 8px;
        font-size: 0.33rem;
        color: #007dff;
    }
    .icon_width {
        width: 24px;
    }
}
//充电图片位置
.posiImg {
    width: 24px;
    height: 24px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.flexR {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.flexR1 {
    display: flex;
    align-items: center;
    flex-direction: row;
}
.flexC {
    display: flex;
    flex-direction: column;
}
.flexD {
    display: flex;
    flex-direction: line;
}
.flex {
    display: flex;
    flex-direction: row;
}
.flexC {
    display: flex;
    flex-direction: column;
}
// 暗黑模式
.theme-dark {
    .dialogContent {
        background-color: #262626;
    }
    .index {
        background-color: #000;
        .index_main {
            .content {
                .scoreColor span {
                    color: @white86;
                }
                .scoreText {
                    color: @white60;
                    .scoreColor1 {
                        color: @white60;
                    }
                }
                .productU,
                .productI {
                    opacity: 0.86;
                }
                .banner .logo {
                    background-color: #262626;
                }
                .bettery {
                    background-color: #262626;
                    color: rgba(255, 255, 255, 0.86);
                }
                .bettery2 {
                    background-color: #262626;
                }
                .bettery1 {
                    color: @white86;
                }
                .setting {
                    background-color: #262626;
                    color: rgba(255, 255, 255, 0.86);
                }
                .write {
                    background-color: #262626;
                    .fontStyle {
                        color: rgba(255, 255, 255, 0.66);
                    }
                    .log {
                        background-color: #000;
                        .log_main {
                            background-color: #262626;
                            .contain {
                                flex: 1;
                                // .log_date {
                                //     background-color: #262626;
                                // }
                                .log_text {
                                    background-color: #262626;
                                    .log_grade {
                                        .scroll {
                                            .log_item {
                                                .grade {
                                                    color: rgba(
                                                        255,
                                                        255,
                                                        255,
                                                        1
                                                    );
                                                }
                                                .detail {
                                                    .detail_left {
                                                        .left_top {
                                                            color: @white86;
                                                        }
                                                        .left_bottom {
                                                            color: @white60;
                                                        }
                                                    }
                                                    .len {
                                                        color: @white60;
                                                    }
                                                }
                                                .detail_bor {
                                                    border-bottom: 0.00694rem
                                                        solid
                                                        rgba(255, 255, 255, 0.2);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            .footer_tip {
                                color: rgba(255, 255, 255, 0.2);
                            }
                        }
                    }
                }
            }
        }
    }
    .bettery {
        color: rgba(255, 255, 255, 0.86);
    }
    .itemPlay {
        background-color: #262626;
        color: rgba(255, 255, 255, 0.86);
        // .noConnect_color {
        //     color: @white38;
        // }
        // .connect_color {
        //     color: @white86;
        // }
        .fontsize12 {
            color: #3f97e9;
        }
    }
}
</style>