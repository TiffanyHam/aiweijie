<!--
 * @Description: 弹窗
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-10-22 11:43:57
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-01-21 11:30:12
-->
<template>
    <div v-if="visiableCom" class="dialog_main" @click="visiableDialog">
        <!-- 遮罩层start -->
        <div class="maskFace flexC">
            <!-- 遮罩层end -->

            <!-- 弹窗内容start -->
            <div class="dialog" :style="{ bottom: bottom }">
                <div class="dialog_title">
                    <slot name="title">{{$t('RemainTime.resetDay')}}</slot>
                </div>
                <div class=" tipText">
                    <div>
                        <slot name="tipText">{{$t('RemainTime.btnTip')}}</slot>
                    </div>
                </div>
                <div class="dialog_footer fb">
                    <span class="btn btn_left" @click.stop="cancle">
                        <slot name="cancle">{{$t('Dialog.cancle')}}</slot>
                    </span>
                    <span class="line"></span>
                    <span class="btn" @click.stop="sure">
                        <slot name="sure btn_right">{{$t('Dialog.sure')}}</slot>
                    </span>
                </div>
            </div>
            <!-- 弹窗内容end -->
        </div>
    </div>
</template>

<script>
export default {
    /**
     * @description: 组件传值描述
     * @param {Boolean}  dialog_show 弹窗控制器
     * @param {Boolean}  svg 10秒倒计时
     * @param {Boolean}  noptions 中间内容是否是选择项
     * @param {Boolean}  selfBtn 弹窗自定义确定按钮
     */
    props: {
        visiable: {
            type: Boolean,
            required: true,
            default: false,
        },
        bottom: {
            type: String,
            required: false,
            default: "36px",
        },
    },
    name: "ResetDialog",
    data() {
        return {
            // 组件控制器
            visiableCom: this.visiable,
            // 存储确认按钮是否被点击, 如果确认按钮存在的话
        };
    },

    components: {},
    computed: {},
    watch: {
        visiable(n, o) {
            this.visiableCom = n;
        }
    },
    created() { },

    mounted() {
    },

    methods: {
        /**
         * @description: 点击遮罩层
         * @param {type}
         * @return {type}
         */
        visiableDialog() {
            this.visiableCom = false;
            this.sendData(false, false)
        },
        /**
         * @description: 点击确定按钮
         * @param {type}
         * @return {type}
         */
        sure() {
            this.visiableCom = false;
            this.sendData(true)
        },

        /**
         * @description: 点击取消按钮
         * @param {type}
         * @return {type}
         */
        cancle() {
            this.visiableCom = false;
            this.sendData(false)
        },

        /**
         * @description: 当前组件的派发传值
         * @param {type}
         * @return {type}
         */
        sendData(value, send = true) {
            let data = null;
            if (!send) {
                data = {
                    componentsVisiable: false,
                };
                this.$emit("sendData", data);
                return true;
            }
            // 弹窗内容为提示时，组件返回数据
            data = {
                value,
                componentsVisiable: false,
            };
            this.$emit("sendData", data);
        }
    }

};
</script>

<style lang="less" scoped>
@import url("../../static/Style/common.less");
.dialog_main {
    z-index: 999999;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    .maskFace {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 9;
        padding: 0 16px;
        .dialog {
            border-radius: 16px;
            width: 100%;
            padding: 0 24px;
            z-index: 999;
            margin: 0 0 16px 0;
            background-color: #fff;
            .dialog_title {
                font-size: 20px;
                color: @black90;
                height: 56px;
                line-height: 56px;
            }
            .tipText {
                width: 100%;
                font-size: 16px;
                line-height: 24px;
                color: rgba(0, 0, 0, 0.9);
                margin: 0 0 8px 0;
            }
            .dialog_footer {
                width: 100%;
                height: 56px;
                line-height: 56px;
                color: #007dff;
                font-size: 16px;
                justify-content: center;
                align-items: center;
                //border: 1px solid red;
                .line {
                    height: 50%;
                    border: 0.0069rem solid rgba(0, 0, 0, 0.2);
                    margin: 0 50px;
                }
                .btn {
                    display: inline-block;
                    width: 50%;
                }
                .btn_left {
                    //border: 1px solid red;
                    text-align: right;
                }
                .btn_right {
                    //border: 1px solid red;
                    text-align: left;
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
.flex {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.flexC {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
}
@keyframes draw {
    0% {
        stroke-dashoffset: 0px;
    }
    100% {
        stroke-dashoffset: 235.5px;
    }
}

.theme-dark {
    .dialog_main {
        .maskFace {
            background-color: rgba(0, 0, 0, 0.2);
            .dialog {
                background-color: #262626;
                .dialog_title {
                    color: rgba(255, 255, 255, 0.9);
                }
                .tipText {
                    color: rgba(255, 255, 255, 0.86);
                }
                .dialog_footer {
                    color: #3f97e9;
                    .line {
                        border: 0.0069rem solid rgba(255, 255, 255, 0.2);
                    }
                }
            }
        }
    }
}
</style>
