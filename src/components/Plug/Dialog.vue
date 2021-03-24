<!--
 * @Description: 弹窗 ?????????
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-10-22 11:43:57
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-02-04 16:07:22
-->
<template>
    <div class="dialog_main">
        <!-- 遮罩层start -->
        <div class="maskFace">
            <!-- 遮罩层end -->

            <!-- 弹窗内容start -->
            <div class="dialog posiImg flex" :style="{ bottom: bottom }">
                <div class="content flex">
                    <div class="dialog_title">
                        <slot name="title"></slot>
                    </div>

                    <div class="svgMain flex">
                        <div class="options flex">
                            <svg v-if="countDown==='svg'" class="svg" width="64px" height="64px" viewBox="0 0 64 64">
                                <circle class="progress" cx="32" cy="32" r="30" stroke-width="3" stroke="#007dff" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-dasharray="188.8px" stroke-dashoffset="0px" />
                                <text class="text" x="32" y="-32" fill="#007DFF">
                                    <tspan font-size="20px">{{time}}</tspan>&nbsp;
                                    <tspan class="tspan" font-size="12px">{{this.$t('Dialog.seconds')}}</tspan>
                                </text>
                            </svg>
                            <div v-else-if="countDown==='img'" class="nopower posiImg animate__animated animate__shakeY animate__fast animate__infinite"></div>
                            <div v-else class="succession">
                                <slot name='often'> </slot>
                            </div>
                        </div>

                        <div class="tipText">
                            <div v-if="isZh === 'zh'">
                                <div>
                                    <slot name="tipText"></slot>
                                </div>
                                <div>
                                    <slot name="subtipText"></slot>
                                </div>
                            </div>
                            <div v-else>
                                <div>
                                    <slot name="tipText"></slot>
                                    <slot name="subtipText"></slot>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="knows" class="dialog_footer fb">
                        <div @click="cancle" class="btn btnLeft posiImg">{{this.$t('brushing.cancle')}}</div>
                        <div @click="sure" class="btn btnRight posiImg">{{this.$t('brushing.sure')}}</div>
                    </div>
                    <div v-else class="dialog_footer fb fb_o">
                        <div @click="ok" class="btn btnLeft posiImg">{{this.$t('brushing.self')}}</div>
                    </div>
                </div>

            </div>
            <!-- 弹窗内容end -->
        </div>
    </div>
</template>

<script>
import 'animate.css'
export default {
    /**
     * @description: 组件传值描述
     * @param {Boolean}  visiable 弹窗控制器
     * @param {String}  countDown 10秒倒计时
     * @param {Boolean}  knows 弹窗自定义确定按钮
     */
    props: {
        visiable: {
            type: Boolean,
            required: false,
            default: false,
        },
        knows: {
            type: Boolean,
            required: false,
            default: false,
        },
        countDown: {
            type: String,
            required: false,
            default: 'svg',
        },
        bottom: {
            type: String,
            required: false,
            default: "10px",
        },
    },
    name: "Dialog",
    data() {
        return {
            // 组件控制器
            videoDialog: this.visiable,
            // 存储结束按钮是否被点击, 
            finishOver: false,
            // 存储继续按钮是否被点击, 
            goOn: false,
            time: 10,
            setl: null,
            isZh: this.$i18n.locale,
        };
    },

    components: {},

    computed: {},
    watch: {
        visiable(n, o) {
            this.visiable = n
            this.videoDialog = n;
        },
        videoDialog(n, o) {
            this.videoDialog = n;
        },
        knows(n, o) {
            this.knows = n;
        },
        countDown(n, o) {
            this.countDown = n;
        },
        time(n, o) {
            this.time = n
        }
    },
    created() {
    },

    mounted() {
        this.$nextTick(() => {
            let _ = this;
            _.addkeyframe(30 * 2 * Math.PI)
            if (_.countDown === 'svg') {
                let svg = document.querySelector('.svg');
                _.setl = setInterval(() => {
                    _.time--;
                    if (_.time <= 0) {
                        _.time = 0;
                        _.finishOver = true;
                        _.goOn = false;
                        clearInterval(_.setl);
                        _.videoDialog = false;
                        _.sendData();
                    }
                }, 1000);
            }
        })
    },
    beforeDestroy() {
        clearInterval(this.setl);
        this.setl = null;
    },
    methods: {
        /**
         * @description: 点击确定按钮
         * @param {type}
         * @return {type}
         */
        sure() {
            this.finishOver = true;
            this.videoDialog = false;
            this.goOn = false;
            this.sendData();
        },

        /**
         * @description: 点击取消按钮
         * @param {type}
         * @return {type}
         */
        cancle() {
            this.videoDialog = false;
            this.finishOver = false;
            this.goOn = true;
            this.sendData();
        },

        /**
         * @description: 点击好的按钮
         * @param {*}
         * @return {*}
         */
        ok() {
            this.videoDialog = false;
            let data = null;
            // 弹窗内容为提示时，组件返回数据
            data = {
                ok: true,
                maskStatus: this.videoDialog,
            };
            this.$emit("sendData", data);
        },

        /**
         * @description: 当前组件的派发传值
         * @param {type}
         * @return {type}
         */
        sendData() {
            let data = null;
            // 弹窗内容为提示时，组件返回数据
            data = {
                finishOver: this.finishOver,
                goOn: this.goOn,
                maskStatus: this.videoDialog,
            };
            this.$emit("sendData", data);
        },

        /**
         * @description:  js 添加动画
         * @param {Number} pro 目标值
         * @return 
         */
        addkeyframe(pro) {
            // js创建@keyframes，
            const runkeyframes = ` @keyframes draw{
                                    0%{
                                        stroke-dashoffset: 0px;
                                    }
                                    100%{
                                        stroke-dashoffset: ${parseInt(pro)}px;
                                    }
                                }`
            // 创建style标签
            const style = document.createElement('style');
            // 设置style属性
            style.type = 'text/css';
            // 将 keyframes样式写入style内
            style.innerHTML = runkeyframes;
            // 将style样式存放到head标签
            document.getElementsByTagName('head')[0].appendChild(style);
        }
    },
};
</script>

<style lang="less" scoped>
.dialog_main {
    z-index: 9;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    .maskFace {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 99;
        .dialog {
            width: 328px;
            height: 90%;
            //background-color: red;
            background-image: url("../../Images/light/btn_BackGround.png");
            border-radius: 8px;
            z-index: 999;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            flex-direction: column;
            justify-content: flex-end;
            padding: 0 20px 10px 20px;
            .content {
                //background-color: #007dff;
                width: 100%;
                height: 61%;
                z-index: 9999;
                flex-direction: column;
                justify-content: space-between;
                position: relative;
                .dialog_title {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    font-size: 0.444444rem;
                    height: 16px;
                    color: rgba(0, 0, 0, 0.9);
                }
                .svgMain {
                    width: 100%;
                    flex-direction: column;
                    position: absolute;
                    top: 40%;
                    transform: translate(0,-50%);
                   // bottom: 28px;
                    //top: 16px;
                    .options {
                        width: 100%;
                        position: relative;
                        height: 100%;
                        justify-content: center;
                        .nopower {
                            background-image: url("../../Images/light/bettery.png");
                            width: 45px;
                            height: 39px;
                            animation-name: shakeY;
                        }
                        svg {
                            transform: rotate(-90deg);
                            .text {
                                transform: rotate(90deg);
                                text-anchor: middle;
                                /* 文本水平居中 */
                                dominant-baseline: middle;
                                .tspan {
                                    margin: 0 0 0 8px;
                                }
                            }
                        }
                        .progress {
                            animation: draw 10s linear 1;
                        }
                        .succession {
                            width: 100%;
                            flex: 1;
                            font-size: 14px;
                            line-height: 20px;
                        }
                    }
                    .tipText {
                        font-size: 0.333333rem;
                        line-height: 18px;
                        color: rgba(0, 0, 0, 0.9);
                        text-align: center;
                        div {
                            text-align: center;
                        }
                    }
                }

                .dialog_footer {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    color: #007dff;
                    margin: 5px 0 0 0;
                    font-size: 16px;
                    justify-content: space-between;
                    align-items: center;
                    .btn {
                        width: 96px;
                        height: 28px;
                        text-align: center;
                        line-height: 28px;
                        background-image: url("../../Images/light/btn_no.png");
                    }
                    .btn_on {
                        background-image: url("../../Images/light/btn_on.png");
                    }
                }
                .fb_o {
                    justify-content: center;
                }
            }
        }
        .fb {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }
}
.posiImg {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.flex {
    display: flex;
    align-items: center;
}

@keyframes shakeY {
    0%,
    100% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: rotate(0deg);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
        -webkit-transform: translate3d(0, 0px, 0);
        transform: rotate(-3deg);
    }
    20%,
    40%,
    60%,
    80% {
        -webkit-transform: translate3d(0, 0px, 0);
        transform: rotate(3deg);
    }
}

.theme-dark {
    .dialog_main {
        .maskFace {
            background-color: rgba(0, 0, 0, 0.2);
            .dialog {
                background-image: url("../../Images/light/btn_BackGround.png");
                padding: 0 24px 10px 24px;
                .dialog_title {
                    color: rgba(0, 0, 0, 0.9);
                }
                .svgMain {
                    .options {
                        .nopower {
                            background-image: url("../../Images/light/bettery.png");
                        }
                    }
                    .tipText {
                        color: rgba(0, 0, 0, 0.9);
                    }
                }

                .dialog_footer {
                    color: #007dff;
                    .btn {
                        background-image: url("../../Images/light/btn_no.png");
                    }
                    .btn_on {
                        background-image: url("../../Images/light/btn_on.png");
                    }
                }
            }
        }
    }
}
</style>
