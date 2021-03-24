<!--
 * @Description: 
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-11-16 15:42:04   
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-02-23 10:55:25
-->

<template>
    <div class="brushing_other flexC">
        <div @click="back" :style="{ top: phoneStatusHeight }" class="headerBack posiImg"></div>
        <!-- 音乐图标 -->
        <span @touchstart="movestart($event)" @touchend="movend($event)" @touchmove="move($event)" @click="clickMusic(true)" :style="{ left: bindX, top: bindY }" :class="openMusic ? 'img bg' : 'img bg img_close'" ref="img"></span>
        <!-- 刷牙引导 -->
        <div class="banner">
            <video id="_v" :src="src" :muted="muted" class="video" style="object-fit: fill" preload></video>
        </div>
        <!-- 0:设备无电 1:连续刷牙 2: 刷牙时间大于10s小于45s 3: 刷牙时间小于10s  :visiable="visiable > -1" -->
        <Dialog v-if="visiable > -1" :knows="visiable > -1 ? dialogText[visiable].knows : dialogText[0].knows" :countDown="
        visiable > -1 ? dialogText[visiable].countDown : dialogText[0].countDown
      " @sendData="sendData">
            <template v-if="visiable > -1" slot="title">{{
        dialogText[visiable].title
      }}</template>
            <template v-if="visiable > -1" slot="often">{{
        dialogText[visiable].often
      }}</template>
            <template v-if="visiable > -1" slot="tipText">{{
        dialogText[visiable].tipText
      }}</template>
            <template v-if="visiable > -1" slot="subtipText">{{
        dialogText[visiable].subtipText
      }}</template>
        </Dialog>
        <!-- <div class="aaa">{{binData}}</div> -->
    </div>
</template>

<script>
import g from "../../Util/global";
import { scale } from "../../Util/tool";
import reportData from "../../Util/reportData";

export default {
    name: "Brushing_other",
    inject: ["reload"],
    data() {
        return {
            // 定时器
            setInterval: "",
            src: "",
            muted: true,
            brushHeader: null,
            // 刷牙时长
            brushinglen: "",
            // 手机头部状态栏高度
            phoneStatusHeight: 0,
            // music 图标的属性设置
            bindX: 200,
            bindY: 80,
            offset: {
                x: 0,
                y: 0,
            },
            diff: {
                x: 0,
                y: 0,
            },
            // 音乐开关
            openMusic: false,

            // 弹窗提示语
            dialogText: [
                {
                    // 无电 0
                    title: "",
                    often: "",
                    tipText: this.$t("brushing.tipText"),
                    subtipText: "",
                    countDown: "img",
                    knows: false,
                },
                {
                    // 频繁刷牙 1
                    title: this.$t("brushing.title"),
                    often: this.$t("brushing.tipText2"),
                    tipText: "",
                    subtipText: "",
                    countDown: "text",
                    knows: true,
                },
                {
                    // U型刷牙不足10s 2
                    title: this.$t("brushing.title2"),
                    often: "",
                    tipText: this.$t("brushing.tipText4"),
                    subtipText: this.$t("brushing.subtipText"),
                    countDown: "svg",
                    knows: true,
                },
                {
                    // U型刷牙大于10s 小于45s 3
                    title: this.$t("brushing.title2"),
                    often: "",
                    tipText: this.$t("brushing.tipText3"),
                    subtipText: this.$t("brushing.subtipText"),
                    countDown: "svg",
                    knows: true,
                },
                {
                    // I型刷牙不足30s 4
                    title: this.$t("brushing.title2"),
                    often: "",
                    tipText: this.$t("brushing.tipTextI30"),
                    subtipText: this.$t("brushing.subtipText"),
                    countDown: "svg",
                    knows: true,
                },
                {
                    // I型刷牙大于30s 小于120s 5
                    title: this.$t("brushing.title2"),
                    often: "",
                    tipText: this.$t("brushing.tipTextI120"),
                    subtipText: this.$t("brushing.subtipText"),
                    countDown: "svg",
                    knows: true,
                },
            ],
            // 判断弹窗出现的类型
            visiable: -1,
            // 20% 电量
            parcent20: false,
            userDefined: true, // 自定义结束刷牙
            inquire: true,
            // 用于判断同一次刷牙
            t: 0,
            startTime: 0

        };
    },
    computed: {
        //蓝牙连接 propperty
        bleConnected() {
            return this.$store.state.BleStatus.bleConnected;
        },
        binData() {
            return this.$store.state.BleStatus.binData;
        },
    },
    watch: {
        dialogText: {
            deep: true,
            handler: (n, o) => { },
        },
        visiable(n, o) {
            if (n > 0) {
                this.setVideoPlay(false, null)
                this.removeVideoPlay()
            }
            if (n === -1) {
                this.userDefined = true;
            }
        },
        bleConnected(n, o) {
            if (n) {
                this.getPhoneStatusHeight();
            }
        },
        binData(n, o) { // 5601000102
            if (this.userDefined) {
                this.standardBrushingTime()
            }
        },
        openMusic(n, o) {
            this.muted = !n;
        },
    },
    created() {

    },
    mounted() {
        if (this.bleConnected) {
            this.initPages();
        }
        let node = document.querySelector('.VideoPopu') || null;
        if (node) {
            node.parentNode.removeChild(node)
        }
    },
    beforeDestroy() {
        if (scale.hextoBin(this.binData.substr(4, 2))[7] === '1') {
            this.back()
        }
        window.hilink && window.hilink.setRequestedOrientation && window.hilink.setRequestedOrientation(false);
    },
    destroyed() {
        this.recordOutTime()
    },
    methods: {
        /**
         * @description: 初始化页面
         * @param {*}
         * @return {*}
         */
        initPages() {
            this.judgeBoothHeader();
            this.getPhoneStatusHeight();
            this.phoneScreenDirection(true);
            this.clickMusic(false);
            this.setVideoPlay(true, parseInt(this.binData.substr(6, 2), 16));
            this.machineNopower()
            let isSame = this.isSameBrushing()
            if (!isSame) {
                setTimeout(() => {
                    this.oftenBrushing()
                }, 1000);
            }
            this.onVideoPlay()
        },

        /**
         * @description: 音乐图标
         * @param {Boolean} init 表示初始化 false 还是点击事件
         * @return {*}
         */
        clickMusic(init) {
            let _ = this;
            let v = document.querySelector("#_v");
            let srcCode = scale.hextoBin(this.binData.substr(4, 2));
            if (init) {
                _.removeVideoPlay()
                _.openMusic = !_.openMusic;
                let musicKey = _.openMusic ? "1" : "0";
                srcCode = scale.hextoBin(_.binData.substr(4, 2));
                let setCode = scale.checkData(6, musicKey, srcCode);
                g.setQueue(setCode);
                setTimeout(() => {
                    _.onVideoPlay()
                }, 1500);
                return true;
            }
            _.openMusic = srcCode[6] === "0" ? false : true;
            _.muted = !_.openMusic;
        },

        /**
         * @description: Dialog 弹窗下发事件
         * @param {Object} val 下发的值
         * @return {*}
         */
        sendData(val) {
            if (val.goOn && val.goOn === true) {
                this._goOn()
            }
            if (val.finishOver && val.finishOver === true) {
                this.visiable === 3 || this.visiable === 5 ? this._finishOver(true) : this._finishOver()
            }
            this.visiable = -1;
        },

        /**
         * @description: 返回箭头
         * @param {*}
         * @return {*}
         */
        back() {
            if (this.visiable > -1) {
                return true;
            }
            this.removeVideoPlay()
            let data = { videoType: this.brushHeader, save: true, src: this.src }
            this.$video.show(data)
            window.hilink && window.hilink.setRequestedOrientation && window.hilink.setRequestedOrientation(false);
            this.$router.push({ path: '/' })
        },

        /**
         * @description:  手机头部状态栏高度
         * @param {*}
         * @return {*}
         */
        getPhoneStatusHeight() {
            window.getStatusBarHeightCallback = (res) => {
                res = JSON.parse(res);
                this.phoneStatusHeight = res.statusBarHeight + 10 + "px";
            };
            window.hilink && window.hilink.getStatusBarHeight && window.hilink.getStatusBarHeight("getStatusBarHeightCallback");
        },


        /**
         * @description: 鼠标按下事件
         * @param {Object} e 鼠标事件源
         * @return {*}
         */
        movestart(e) {
            // 记录 ref=img 元素的起始位置
            this.offset.x = this.$refs.img.offsetLeft;
            this.offset.y = this.$refs.img.offsetTop;
            this.diff.x = e.changedTouches[0].clientX;
            this.diff.y = e.changedTouches[0].clientY;
        },

        /**
         * @description: 鼠标移动事件
         * @param {Object} e 鼠标事件源
         * @return {*}
         */
        move(e) {
            let x = this.offset.x + e.changedTouches[0].clientX - this.diff.x; // 计算新的元素left值
            let y = this.offset.y + e.changedTouches[0].clientY - this.diff.y;
            if (x < 0) {
                x = 0;
            } else if (x > document.body.clientWidth - this.$refs.img.clientHeight) {
                x = document.body.clientWidth - this.$refs.img.clientHeight;
            }
            if (y < 0) {
                y = 0;
            } else if (y > document.body.clientHeight - this.$refs.img.clientHeight) {
                y = document.body.clientHeight - this.$refs.img.clientHeight;
            }
            this.bindX = x + "px";
            this.bindY = y + "px";
        },

        /**
         * @description: 鼠标抬起事件
         * @param {Object} e 鼠标事件源
         * @return {*}
         */
        movend(e) { },

        /**
         * @description: 判断刷头 决定视频类型
         * @param {*}
         * @return {*}
         */
        judgeBoothHeader() {
            let videoSrcs = [['https://www.kinyooo.com/media/2DChinese.mp4', 'https://www.kinyooo.com/media/3DChinese.mp4'], ['https://www.kinyooo.com/media/2DEnglish.mp4', 'https://www.kinyooo.com/media/3DEnglish.mp4']]
            this.brushHeader = scale.hextoBin(this.binData.substr(4, 2))[5];
            let pre = 0, next = 0;
            pre = this.$i18n.locale === 'zh' ? 0 : 1;
            next = this.brushHeader === '0' ? 1 : 0;
            this.src = videoSrcs[pre][next];//videoSrcs[pre][next]
        },

        /**
         * @description: 判断刷牙是否是频繁刷牙
         * @param {Number} time 
         * @return {*}
         */
        oftenBrushing() {
            //this.isSameMac()
            this.removeVideoPlay()
            if (this.$route.query.from) {
                this.onVideoPlay()
                return true;
            }
            let nowDate = new Date().getTime();
            let oftenBrushing = JSON.parse(localStorage.getItem(`${window.devId}`)) || [];
            if (oftenBrushing.length > 0 && oftenBrushing.length === 2) {
                this.visiable = nowDate - oftenBrushing[1] < 10 * 60 * 1000 ? 1 : -1;
                if (this.visiable === 1) {
                    this.userDefined = false;
                    this.setVideoPlay(false, null)
                    let src = scale.hextoBin(this.binData.substr(4, 2));
                    let setCode = scale.checkData(7, '0', src);
                    g.setQueue(setCode)
                } else {
                    this.onVideoPlay()
                }
            } else {
                this.onVideoPlay()
            }
        },

        isSameMac() {
            let mac = JSON.parse(localStorage.getItem('mac')) || '';
            let oftenBrushing = [];
            if (mac != window.devId) {
                localStorage.setItem('oftenBrushing', JSON.stringify(oftenBrushing))
            }
        },

        /**
         * @description: 设备无电弹窗 parseInt(this.binData.substr(2, 2), 16) <= 1 ? 0 : -1
         * @param {*}
         * @return {*}
         */
        machineNopower() {
            this.visiable = parseInt(this.binData.substr(2, 2), 16) <= 1 ? 0 : -1;
        },

        /**
         * @description: 频繁刷牙,无效刷牙10s 30s弹窗 点击结束刷牙按钮处理函数
         * @param {*}
         * @return {*}
         */
        _finishOver(bool = false) {
            this.phoneScreenDirection(false)
            this.removeVideoPlay()
            if (bool) {
                let oftenBrushing = JSON.parse(localStorage.getItem(`${window.devId}`)) || [];
                if (oftenBrushing.length < 2) {
                    oftenBrushing.push(new Date().getTime());
                } else {
                    [oftenBrushing[0], oftenBrushing[1]] = [oftenBrushing[1], new Date().getTime()];
                }
                localStorage.setItem(`${window.devId}`, JSON.stringify(oftenBrushing))
                this.$router.push({ path: "/logDetail", query: { bin: scale.hextoBin(this.binData.substr(6, 2)), newest: this.brushHeader } });
            } else {
                this.$router.push({ path: '/' })
            }

        },

        /**
         * @description:  点击继续刷牙按钮处理函数
         * @param {*}
         * @return {*}
         */
        _goOn() {
            let srcCode = scale.hextoBin(this.binData.substr(4, 2))
            let setCode = scale.checkData(7, '1', srcCode)
            g.setQueue(setCode)
            this.setVideoPlay(true, 0)
            setTimeout(() => {
                this.onVideoPlay()
            }, 1000);
        },

        /**
        * @description: 判断刷牙时长是否符合规范
        * @param {*}
        * @return {*}
        */
        standardBrushingTime() {
            if (scale.hextoBin(this.binData.substr(4, 2))[7] === '1' || this.userDefined === false) {
                return true;
            }
            let time = parseInt(this.binData.substr(6, 2), 16)
            if (time < 10 && this.brushHeader === '0') {
                this.visiable = 2;
                return true;
            }
            if (time < 45 && this.brushHeader === '0') {
                this.visiable = 3;
                return true;
            }
            if (time < 30 && this.brushHeader === '1') {
                this.visiable = 4;
                return true;
            }
            if (time < 120 && this.brushHeader === '1') {
                this.visiable = 5;
                return true;
            }
            this.phoneScreenDirection(false)
            let oftenBrushing = JSON.parse(localStorage.getItem(`${window.devId}`)) || [];
            if (oftenBrushing.length < 2) {
                oftenBrushing.push(new Date().getTime());
            } else {
                [oftenBrushing[0], oftenBrushing[1]] = [oftenBrushing[1], new Date().getTime()];
            }
            localStorage.setItem(`${window.devId}`, JSON.stringify(oftenBrushing))
            this.$router.push({ path: "/logDetail", query: { bin: scale.hextoBin(this.binData.substr(6, 2)), newest: this.brushHeader } });
        },

        /**
         * @description: 视频 控制播放
         * @param {*}
         * @return {*}
         */
        setVideoPlay(play, time = null) {
            let v = document.querySelector("#_v");
            if (play) {
                v.currentTime = time ? time : 0;
                setTimeout(() => {
                    v.play();
                }, 5);
                return true;
            } else {
                v.pause();
            }

        },


        /**
         * @description: 监听视频播放事件 
         * @param {*}
         * @return {*}
         */
        onVideoPlay() {
            let _ = this;
            let v = document.querySelector("#_v");
            _.inquire = true;
            v.addEventListener(
                "timeupdate",
                _.addEventListenerArg,
                false
            );
        },

        /**
         * @description: 监听视频播放事件 
         * @param {*}
         * @return {*}
         */
        removeVideoPlay() {
            let _ = this;
            let v = document.querySelector("#_v");
            _.inquire = false;
            v.removeEventListener(
                "timeupdate",
                _.addEventListenerArg,
                false
            );
        },

        /**
         * @description: 监听视频播放事件，监听第二位参数
         * @param {*}
         * @return {*}
         */
        addEventListenerArg() {
            let v = document.querySelector("#_v");
            if (!this.inquire) {
                return true;
            }
            if (v && parseInt(v.currentTime) % 2 === 0) {
                g.setQueue('55')
            }
        },

        /**
         * @description: 手机屏幕方向
         * @param {Boolean} dir  fasle 竖 true 横
         * @return {*}
         */
        phoneScreenDirection(dir) {
            window.hilink && window.hilink.setRequestedOrientation && window.hilink.setRequestedOrientation(dir);
        },

        /**
         * @description: 记录牙刷退出页面时间 [a,b]
         * @param {*}
         * @return {*}
         */
        recordOutTime() {
            let recordOutTime = [];
            [].push.apply(recordOutTime, [new Date().getTime(), (parseInt(this.binData.substr(6, 2), 16) * 1000)])
            localStorage.setItem('outTime', JSON.stringify(recordOutTime))
        },

        /**
         * @description: 判断两次进入页面是否为同一次刷牙
         * @param {*}
         * @return {*}
         */
        isSameBrushing() {
            let outTime = JSON.parse(localStorage.getItem('outTime')) || [];
            let isSame = Math.abs(new Date().getTime() - outTime[0] - (parseInt(this.binData.substr(6, 2), 16) * 1000 - outTime[1]));
            if (isSame < 3000) {
                return true;
            }
            return false;
        }
    },
};
</script>




<style lang='less' scoped>
.brushing_other {
    .aaa {
        position: absolute;
        top: 220px;
        left: 220px;
        z-index: 999999999;
    }
    width: 100%;
    height: 100%;
    background-color: #96b6e6;
    position: relative;
    .headerBack {
        background-image: url("../../Images/light/videoBack.png");
        width: 24px;
        height: 24px;
        position: fixed;
        left: 24px;
        z-index: 99;
    }
    .img {
        position: absolute;
        display: inline-block;
        width: 38px;
        height: 38px;
        left: 301px;
        top: 80px;
        border-radius: 50%;
        z-index: 99;
        background-color: #fff;
        background-image: url("../../Images/light/music_on.png");
    }
    .img_close {
        background-image: url("../../Images/light/music_close.png");
    }
    .banner {
        height: 100%;
        width: 100%;
        .video {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9;
        }
    }
    .footer {
        width: 100%;
        height: 115px;
        background-color: #fff;
        overflow: hidden;
        position: relative;
        color: rgba(0, 0, 0, 0.9);
        .low_bettery {
            position: absolute;
            bottom: 37px;
            left: 50%;
            transform: translate(-50%, 0);
            display: inline-block;
            width: 100%;
            height: 27px;
            font-size: 16px;
            z-index: 99;
            padding: 0 0 41px 0;
            span {
                display: inline-block;
                width: 100%;
                text-align: center;
                line-height: 24px;
            }
        }
    }
    .low_backC {
        color: rgb(251, 42, 45, 0.9);
        background-color: #fff4f4;
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
.posiImg {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
}
.position_center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.font24 {
    font-size: 24px;
}
.font16 {
    font-size: 16px;
}
.font12 {
    font-size: 12px;
}

.theme-dark {
    .brushing_other {
        background-color: #96b6e6;
        .header {
            .header_inner {
                color: rgba(0, 0, 0, 0.9);
            }
        }
        .subheader {
            color: rgba(0, 0, 0, 0.9);
        }
        .img {
            background-color: #484848;
        }
        .banner {
            .centerImg {
                .circle {
                    .time {
                        color: rgba(255, 255, 255, 0.9);
                    }
                }
            }
        }
        .footer {
            background-color: #000000;
            color: rgba(255, 255, 255, 0.86);
        }
        .low_backC {
            color: #e64548;
            background-color: #372222;
        }
    }
}
</style>