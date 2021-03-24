<!--
 * @Description: 刷牙模式
 * @version: 
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-02-03 16:53:25

-->
<template>
    <div class="brushTeethModel">
        <!-- 头部start -->
        <Header :isRight="headerIcon" :backC='backC' :selfB='selfB'>
            <template slot="headerTitle">{{$t('BrushTeethModel.header')}}</template>
        </Header>
        <!-- 头部end -->

        <!-- 模式start -->
        <div class="modules">
            <div :class=" isLock ? 'modules_inner flex module_noclick' : 'modules_inner flex'" v-for="(item,index) in modules" :key="index">
                <span class="module_name">{{item.name}}</span>
                <span class="module_round">
                    <Round :status="item.check" @changeStatus="getRoundStatus(index,arguments)"></Round>
                </span>
            </div>
            <div class="flex modules_inner noBorder">
                <div class="flex_c">
                    <span class="module_name">{{$t('BrushTeethModel.lockBtn')}}</span>
                    <span class="module_name lockTip">{{$t('BrushTeethModel.lockTip')}}</span>
                </div>
                <span class="VSwitch">
                    <VSwitch :isOn="isLock" @afterChange='afterChange'></VSwitch>
                </span>
            </div>
        </div>
        <!-- 模式end -->
    </div>
</template>

<script>
import g from "../../Util/global";
import { scale } from "../../Util/tool";
import animate from "animate.css";
export default {
    props: {},
    name: "BrushTeethModel",
    data() {
        return {
            boothData: null,
            // 头部组件参数
            selfB: true,
            backC: window.isDark ? '#000' : 'fff',
            headerIcon: false,
            // 模式数组
            modules: [
                {
                    name: this.$t("BrushTeethModel.model.level1"),
                    check: false,
                    gear: 0,
                },
                {
                    name: this.$t("BrushTeethModel.model.level2"),
                    check: false,
                    gear: 2,
                },
            ],
            // 档位锁定
            isLock: false,
            flash: false,
        };
    },
    watch: {
        modules: {
            deep: true,
            handler: (n, o) => { },
        },
        bleConnected(n, o) { },
        binData(n, o) {
            this.machineContorling = true;
            if (n.substr(0, 6) != o.substr(0, 6)) {
                this.initData(this.binData)
            }
        }
    },
    computed: {
        bleConnected() {
            return this.$store.state.BleStatus.bleConnected;
        },
        binData() {
            return this.$store.state.BleStatus.binData;
        }
    },
    created() {
    },
    mounted() {
        this.initData(this.binData)
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
            let openStatue = modedata.substr(0, 2); // 刷牙模式
            if (parseInt(openStatue) === 0) {
                this.modules[0].check = true;
                this.modules[1].check = false;
            } else {
                this.modules[0].check = false;
                this.modules[1].check = true;
            }
            this.isLock = modedata.substr(2, 1) === "0" ? false : true;
        },

        /**
         * @description: Round组件的派发动作
         * @param {type}
         * @return {type}
         */
        getRoundStatus() {
            g.removeVideoPlay()
            let arg = arguments;
            if (!arg[1][0]) {
                return true;
            }
            this.modules.forEach((item, index) => {
                index == arg[0] ? (item.check = true) : (item.check = false);
                if (index == arg[0]) {
                    let newBinCode = item.gear == 0 ? "00" : "01";
                    let srcData = scale.hextoBin(this.binData.substr(4, 2));
                    let data = scale.checkData(0, newBinCode, srcData);
                    g.setQueue(data);
                }
            });
            setTimeout(() => {
                g.onVideoPlay()
            }, 1500);
        },

        /**
         * @description: 点击锁定按钮
         * @param {*}
         * @return {*}
         */
        afterChange(val) {
            g.removeVideoPlay()
            this.t = new Date().getTime()
            let _ = this;
            this.isLock = val;
            let lock = "1"; // 1 表示锁定
            lock = this.isLock ? "1" : "0";
            let srcData = scale.hextoBin(this.binData.substr(4, 2)); // byte2 01010110 01111110
            let data = scale.checkData(2, lock, srcData);
            g.setQueue(data)
            setTimeout(() => {
                g.onVideoPlay()
            }, 1500);
        },
    },
};
</script>


<style lang='less' scoped>
.brushTeethModel {
    height: 100%;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    position: relative;
    .modules {
        padding: 0 16px;
        .modules_inner {
            position: relative;
            background-color: #fff;
            height: 48px;
            width: 100%;
            //margin: 0 0 8px 0;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.9);
            border-bottom: 0.00694rem solid rgba(0, 0, 0, 0.2);
            .VSwitch {
                position: absolute;
                right: 0px;
            }
            .module_round {
                display: inline-block;
                width: 24px;
                height: 24px;
            }
            .module_name {
                line-height: 20px;
            }
            .lockTip {
                display: inline-block;
                width: 100%;
                padding: 0 40px 0 0;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.6);
                margin: 6px 0 0 0;
            }
        }
        .noBorder {
            height: 64px;
            border: 0;
        }
    }
    .module_noclick {
        pointer-events: none;
    }
}

.flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.flex_c {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.theme-dark {
    .brushTeethModel {
        background-color: #000;
        .modules {
            .modules_inner {
                background-color: #000;
                color: rgba(255, 255, 255, 0.86);
                border-bottom: 0.00694rem solid rgba(255, 255, 255, 0.2);
                .lockTip {
                    color: rgba(255, 255, 255, 0.6);
                }
            }
            .noBorder {
                border: 0;
            }
        }
    }
}
</style>