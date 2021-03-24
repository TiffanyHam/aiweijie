<!--
 * @Description: 刷头剩余页面
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-10-23 14:40:40
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-02-22 10:56:13
-->
<!--  -->
<template>
    <div class="remainTime flexC">
        <!-- 头部start -->
        <div style="height:'80px'">
            <Header :isRight="header_rightIcon" :selfB='selfB' :backC='backC'>
                <span slot="headerTitle">{{$t('RemainTime.header')}}</span>
            </Header>
        </div>
        <!-- 头部end -->
        <div class="main flexC">
            <!-- <div class="predict">预计可使用18天</div> -->
            <div v-if="show_realValue" class="progress flexC">
                <Cprogress :realValue="realValue"></Cprogress>
            </div>
            <div v-if="show_realValue" class="doctorWord">
                {{$t("RemainTime.doctorWord")}}
            </div>
            <!-- 刷头start -->
            <!-- <div class="dialogContent_out flexR">
                <div class="dialogContent">
                    
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
                    <div class="itemList brushType">
                        <div class="clickU flexContent" v-for="(item,index) in modules" :key="index">
                            <div class="rounding">
                                <Round :status="item.check" @changeStatus="getRoundStatus(index,arguments)"></Round>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- 刷头start -->
            <div class="footer flexC">
                <button @click="resetime" class='btn'>{{$t('RemainTime.reset')}}</button>
            </div>
        </div>
        <Dialog :visiable="dialogVisiable" @sendData='getDialogData'></Dialog>
    </div>
</template>

<script>
import g from "../../Util/global";
import { scale } from "../../Util/tool";
import reportData from "../../Util/reportData";
import Dialog from './ResetDialog.vue'
export default {
    name: "RemainTime",
    data() {
        return {
            dialogVisiable: false,
            // 头部右侧图标
            header_rightIcon: false,
            selfB: true,
            backC: window.isDark ? '#000' : '#fff',
            // 实际天数
            realValue: 1,
            // 模式选择
            brushHeader: "0",
            show_realValue: false
        };
    },

    components: {
        Dialog
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
        dialogVisiable(n, o) { },
        bleConnected(n, o) { },
        binData(n, o) {
            this.binData = n;
            this.judgeBoothHeader()
        },
    },
    created() {
        this.judgeBoothHeader()
        this.getCloudData(this.brushHeader)
    },
    mounted() {
    },

    methods: {
        /**
         * @description: 初始化判断当前刷头模式
         * @param {*}
         * @return {*}
         */
        judgeBoothHeader(headerMode = null) {
            this.brushHeader = scale.hextoBin(this.binData.substr(4, 2)).substr(5, 1);
        },

        /**
         * @description: 重置时间按钮
         * @param {type}
         * @return {type}
         */
        resetime() {
            this.dialogVisiable = true;
        },

        /**
         * @description: 请求云端数据
         * @param {*}
         * @return {*}
         */
        getCloudData(mode) {
            let resCallback = (res) => {
                this.countDays(res, mode)
            }
            reportData.getHistoryLog(resCallback)
        },

        /**
         * @description: 计算对应天数
         * @param {*}
         * @return {*}
         */
        countDays(arr, typeHeader = '0') {
            let times = 0;
            arr.forEach((item) => {
                item[0] === typeHeader ? times++ : '';
            })
            let rest = (90 - (times / 2)) < 0 ? 0 : (90 - (times / 2));
            this.realValue = Math.floor(rest);
            this.show_realValue = true;
        },

        /**
         * @description: 弹窗派发事件
         * @param {*}
         * @return {*}
         */
        getDialogData(val) {
            this.dialogVisiable = val.componentsVisiable;
            if (val.value) {
                reportData.resize(new Date().getTime() + 1000)
                this.realValue = 90;
                setTimeout(() => {
                    this.getCloudData(this.brushHeader)
                }, 1000);
            }
        }
    },
};
</script>



<style lang='less' scoped>
.remainTime {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #fff;
    position: relative;
    .main {
        width: 100%;
        background-color: #fff;
        flex: 1;
        .progress {
            margin: 24px 0 0 0;
            width: 100%;
            height: 240px;
            //height: 194px;
            //border: 1px solid red;
            box-sizing: border-box;
        }
        .doctorWord {
            // border: 1px solid red;
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.9);
            margin-top: 32px;
        }
        .footer {
            width: 100%;
            text-align: center;
            background-color: #fff;
            justify-content: space-between;
            align-items: center;
            position: absolute;
            bottom: 24px;
            .btn {
                height: 36px;
                width: 50%;
                text-align: center;
                border-radius: 18px;
                border: 0;
                background-color: rgba(0, 0, 0, 0.05);
                outline: none;
                font-size: 16px;
                color: #007dff;
            }
        }
    }
}
button :focus {
    outline: 0;
}
.flexR {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.flexC {
    display: flex;
    flex-direction: column;
}
.flexContent {
    display: flex;
    align-items: center;
    justify-content: center;
}

.theme-dark {
    .remainTime {
        background-color: #000;
        .main {
            background-color: #000;
            .progress {
                //height: 220px;
            }
            .doctorWord {
                color: rgba(255, 255, 255, 0.86);
            }
            .footer {
                background-color: #000;
                .btn {
                    background-color: rgba(255, 255, 255, 0.1);
                    color: #3f97e9;
                }
            }
        }
    }
}
</style>