<!--
 * @Description: 设置页面
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-10-23 14:40:40
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-03-11 11:33:44
-->
<template>
    <div class="setting flexC">
        <!-- 头部start -->
        <Header :selfB='selfB' :isRight="header_rightIcon" :backC='backC'>
            <span slot="headerTitle">{{$t('setting.header')}}</span>
        </Header>
        <!-- 头部end -->
        <!-- 内容设置start -->
        <div :class="bleConnected ? 'setting_main flexC': 'setting_main flexC disabled'">
            <div :class="openMachine ? 'splash flex disabled' : 'splash flex'">
                <div class="splash_left">
                    <div class="setting_title">
                        <span>{{$t('setting.options.set1.title')}}</span>
                    </div>
                    <div class="setting_subheader">
                        <span>{{$t('setting.options.set1.subTitle')}}</span>
                    </div>
                </div>
                <div class="splash_right">
                    <VSwitch :isOn="isOn" @afterChange="getChange"></VSwitch>
                </div>
            </div>

            <!-- <div class="firmware flex">
                <div class="firmware_left">
                    <div class="firmware_title">
                        <span>{{$t('setting.options.set2.title')}}</span>
                    </div>
                </div>
                <div class="version">{{$t('setting.options.set2.on')}}</div>
            </div> -->

            <div class="other_setting">
                <div class="other_title">{{$t('setting.other')}}</div>
                <div @click="gotoBrushMethod(item.code)" v-for="(item,index) in settingGuide" :key="index" :class=" index < settingGuide.length-1 ? 'common com_border flex':'common flex'">
                    <div class="common_left">
                        <div class="setting_title">
                            <span>{{item.title}}</span>
                        </div>
                    </div>
                    <div class="common_right version1"></div>
                </div>
            </div>
        </div>
        <!-- 内容设置end -->
    </div>
</template>

<script>
import g from "../../Util/global";
import { scale } from "../../Util/tool";
export default {
    name: "Setting",
    data() {
        return {
            selfB: true,
            backC: window.isDark ? '#000' : '#fff',
            header_rightIcon: false,
            settingGuide: [
                { title: this.$t("setting.otherOptions.methodsU"), code: "U" },
                { title: this.$t("setting.otherOptions.methodsI"), code: "I" }, //  代表使用方法
                { title: this.$t("setting.otherOptions.title2"), code: "problem" }, //  代表常见问题
            ],
            // 防飞溅
            isOn: true,
            // 是否开机
            openMachine: false
        };
    },

    computed: {
        bleConnected() {
            return this.$store.state.BleStatus.bleConnected;
        },
        binData() {
            return this.$store.state.BleStatus.binData;
        },
        logData() {
            return this.$store.state.BleStatus.logData;
        },
    },
    watch: {
        bleConnected(n, o) { },
        binData(n, o) {
            this.initData(this.binData);
        },
        logData() {

        },
    },

    mounted() {
        if (this.bleConnected) {
            this.initData(this.binData);
        }
    },

    methods: {
        /**
         * @description: 初始化页面 data: 56 04 02 2f 35
         * @param {*}
         * @return {*}
         */
        initData(data) {
            let modedata = data.substr(4, 2); // 16进制
            modedata = scale.hextoBin(modedata); // 转二进制
            this.openMachine = modedata[7] === '0' ? false : true;
            let openStatue = modedata.substr(3, 1); // 防飞溅
            parseInt(openStatue) == 0
                ? (this.isOn = false)
                : (this.isOn = true);
            this.$forceUpdate();
        },

        /**
         * @description:  VSwitch 组件派发事件
         * @param {Object} val 组件派发数据
         * @return {type}
         */
        getChange(val) {
            this.isOn = val;
            let isOnData = "";
            if (val) {
                isOnData = "1";
            } else {
                isOnData = "0";
            }
            let srcData = scale.hextoBin(this.binData.substr(4, 2));
            let setData = scale.checkData(3, isOnData, srcData);
            g.setQueue(setData);
        },

        /**
         * @description: 设置页面点击跳转刷牙方法
         * @param {Number} code 0 或 1
         * @return {*}
         */
        gotoBrushMethod(code) {
            if (code.length === 1) {
                this.$router.push({ name: 'BrushMethods', params: { type: code } });
            } else {
                this.$router.push({ path: '/comProblem' });
            }
            //this.$router.push({ path: '/guide_adult' });
        },
    },
};
</script>

<style lang='less' scoped>
.setting {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .setting_main {
        padding: 0 16px;
        flex: 1;
        .splash {
            justify-content: space-between;
            align-items: center;
            height: 80px;
            background-color: #fff;
            border-bottom: 0.00694rem solid rgba(0, 0, 0, 0.2);
            .splash_left {
                height: 80px;
                padding-right: 16px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                .setting_title {
                    color: rgba(0, 0, 0, 0.9);
                    font-size: 16px;
                    margin: 0 0 2px 0;
                    line-height: 24px;
                }
                .setting_subheader {
                    color: rgba(0, 0, 0, 0.6);
                    font-size: 14px;
                    width: 100%;
                    //margin: 6px 0 0 0;
                    line-height: 18px;
                    white-space: normal;
                    word-break: break-all;
                    word-wrap: break-word;
                }
            }
        }

        .firmware {
            justify-content: space-between;
            align-items: center;
            height: 48px;
            background-color: #fff;
            border-bottom: 0.00694rem solid rgba(0, 0, 0, 0.2);
            .firmware_left {
                .firmware_title {
                    color: rgba(0, 0, 0, 0.9);
                    font-size: 16px;
                    line-height: 16px;
                }
            }
            .version {
                color: rgba(0, 0, 0, 0.6);
                font-size: 14px;
                line-height: 14px;
            }
        }

        .other_setting {
            flex: 1;
            background-color: #fff;
            .other_title {
                color: rgba(0, 0, 0, 0.6);
                font-size: 14px;
                height: 48px;
                line-height: 48px;
            }
            .common {
                justify-content: space-between;
                align-items: center;
                height: 48px;
                background-color: #fff;
                .common_left {
                    .setting_title {
                        color: rgba(0, 0, 0, 0.9);
                        font-size: 16px;
                    }
                }
                .version1 {
                    display: inline-block;
                    opacity: 0.38;
                    width: 12px;
                    height: 24px;
                    background: url("../../Images/light/setting_right.png")
                        no-repeat center;
                    background-size: auto 16px;
                }
            }
            .com_border {
                border-bottom: 0.00694rem solid rgba(0, 0, 0, 0.2);
            }
        }
    }
}
.disabled {
    pointer-events: none;
}
button :focus {
    outline: 0;
}
.flexC {
    display: flex;
    flex-direction: column;
}
.flex {
    display: flex;
    flex-direction: row;
}

.theme-dark {
    .setting {
        background-color: #000;
        .setting_main {
            .splash {
                background-color: #000;
                border-bottom: 0.00694rem solid rgba(255, 255, 255, 0.2);
                .splash_left {
                    .setting_title {
                        color: rgba(255, 255, 255, 0.86);
                    }
                    .setting_subheader {
                        color: rgba(255, 255, 255, 0.6);
                    }
                }
            }
            .firmware {
                background-color: #000;
                border-bottom: 0.00694rem solid rgba(255, 255, 255, 0.2);
                .firmware_left {
                    .firmware_title {
                        color: rgba(255, 255, 255, 0.86);
                    }
                }
                .version {
                    color: rgba(255, 255, 255, 0.6);
                }
            }
            .other_setting {
                background-color: #000;
                .other_title {
                    color: rgba(255, 255, 255, 0.6);
                }
                .common {
                    background-color: #000;
                    .common_left {
                        .setting_title {
                            color: rgba(255, 255, 255, 0.86);
                        }
                    }
                    .version1 {
                        background: url("../../Images/dark/date_right.png")
                            no-repeat center;
                        background-size: auto 16px;
                    }
                }
                .com_border {
                    border-bottom: 0.00694rem solid rgba(255, 255, 255, 0.2);
                }
            }
        }
    }
}
</style>