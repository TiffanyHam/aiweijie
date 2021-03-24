<!--
 * @Description: 实时引导小视频
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-12-07 15:02:03
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-02-23 10:55:54
-->
<template>
    <div :style="{left: bindX,top: bindY}" class="VideoPopu" ref="pop" v-if="visible" @click="bigView" @touchstart="movestart($event)" @touchend="movend($event)" @touchmove="move($event)">
        <!-- <span @click.stop="closeVideo" class="close"></span> -->
        <video id="_src" muted :src="src" class="videodialog" style="object-fit: fill" x5-video-player-type="h5" preload x5-video-orientation="landscape_left"></video>
    </div>
</template>
<script>
import g from "../../Util/global";
import { scale, brushingHistory } from "../../Util/tool";
export default {
    name: "VideoPopu",
    data() {
        return {
            visible: false,
            src: '',
            videoCurrent: 0,
            videoType: '-1',
            brushinglen: '',
            setInterval: null,
            bindX: '190px',
            bindY: '140px',
            offset: {
                x: 0,
                y: 0,
            },
            diff: {
                x: 0,
                y: 0,
            },
            inquire: true,
            save: true
        };
    },
    computed: {
        binData() {
            return this.$store.state.BleStatus.binData;
        },
        header() {
            return scale.hextoBin(this.binData.substr(4, 2))[5]
        }
    },
    watch: {
        binData(n, o) {
            if (scale.hextoBin(n.substr(4, 2))[7] === '0' && this.save) {
                this.standardBrushingTime()
            }
        },
        videoType(n, o) {
            if (n != -1) this.init()
        }
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        this.videoType = '-1';
        this.visible = false;
    },

    methods: {
        /**
         * @description:  初始化
         * @param {*}
         * @return {*}
         */
        init() {
            let _ = this;
            setTimeout(() => {
                let videoSrcs = [['https://www.kinyooo.com/media/2DChinese.mp4', 'https://www.kinyooo.com/media/3DChinese.mp4'], ['https://www.kinyooo.com/media/2DEnglish.mp4', 'https://www.kinyooo.com/media/3DEnglish.mp4']];
                let pre = this.$i18n.locale === 'zh' ? 0 : 1;
                _.$nextTick(() => {
                    let v = document.getElementById('_src');
                    v.currentTime = parseInt(_.binData.substr(6, 2), 16);
                    let next = scale.hextoBin(_.binData.substr(4, 2))[5] === '0' ? 1 : 0;
                    _.src = videoSrcs[pre][next];
                    setTimeout(() => {
                        v.play();
                        g.onVideoPlay()
                    });
                })
            });
        },
        /**
         * @description:  返回大视频
         * @param {*}
         * @return {*}
         */
        bigView() {
            g.removeVideoPlay()
            this.visible = false;
            this.save = false;
            this.videoType = '-1';
            window.hilink.setRequestedOrientation(true);
            this.$router.push({ path: '/guide_adult', query: { from: true } });
        },

        /**
         * @description: 监听视频播放结束事件
         * @param {*}
         * @return {*}
         */
        onVideoPlayEnded() {
            let _ = this;
            let v = document.querySelector("#_src");
            v.addEventListener(
                "ended",
                () => {
                    g.removeVideoPlay()
                    window.hilink.setRequestedOrientation(false);
                    this.videoType = '-1';
                    this.save = false;
                    this.visible = false;
                    _.$router.push({ path: "/logDetail", query: { bin: scale.hextoBin(_.binData.substr(6, 2)), newest: scale.hextoBin(this.binData.substr(4, 2))[5] } });
                    //this.$destroy()
                },
                false
            );
        },



        /**
         * @description: 判断刷牙时长是否符合规范
         * @param {*}
         * @return {*}
         */
        standardBrushingTime() {
            //this.removeVideoPlay()
            g.removeVideoPlay()
            let len = parseInt(this.binData.substr(6, 2), 16);
            if (this.videoType === '1' && len < 30) {
                this.videoType = '-1';
                this.save = false;
                this.visible = false;
                return true;
            }
            if (this.videoType === '0' && len < 10) {
                this.videoType = '-1';
                this.save = false;
                this.visible = false;
                return true;
            }
            this.videoType = '-1';
            this.visible = false;
            this.save = false;
            this.$router.push({ path: "/logDetail", query: { bin: scale.hextoBin(this.binData.substr(6, 2)), newest: scale.hextoBin(this.binData.substr(4, 2))[5] } });
            //this.$destroy()
        },


        /**
         * @description: 鼠标按下事件
         * @param {Object} e 鼠标事件源
         * @return {*}
         */
        movestart(e) {
            // 记录 ref=img 元素的起始位置
            this.offset.x = this.$refs.pop.offsetLeft;
            this.offset.y = this.$refs.pop.offsetTop;
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
            } else if (
                x >
                document.body.clientWidth - this.$refs.pop.clientHeight
            ) {
                x = document.body.clientWidth - this.$refs.pop.clientHeight;
            }
            if (y < 0) {
                y = 0;
            } else if (
                y >
                document.body.clientHeight - this.$refs.pop.clientHeight
            ) {
                y = document.body.clientHeight - this.$refs.pop.clientHeight;
            }
            this.bindX = x + "px";
            this.bindY = y + "px";
        },

        /**
         * @description: 鼠标抬起事件
         * @param {Object} e 鼠标事件源
         * @return {*}
         */
        movend(e) {
        },

        /**
         * @description: 监听视频播放事件，监听第二位参数
         * @param {*}
         * @return {*}
         */
        addEventListenerArg() {
            let v = document.querySelector("#_src") || null;
            if (v && parseInt(v.currentTime, 10) % 2 === 0) {
                g.setQueue('55')
            }
        },
    },
};
</script>
<style lang='less' scoped>
.VideoPopu {
    z-index: 99999;
    position: absolute;
    width: 190px;
    height: 90px;
    transform: rotate(90deg);
    .videodialog {
        width: 100%;
        height: 100%;
    }
    // .close {
    //     display: inline-block;
    //     width: 24px;
    //     height: 24px;
    //     background-image: url("../../Images/test/close.png");
    //     background-repeat: no-repeat;
    //     background-size: 100% 100%;
    //     position: absolute;
    //     top: -12px;
    //     left: -12px;
    // }
}
</style>
