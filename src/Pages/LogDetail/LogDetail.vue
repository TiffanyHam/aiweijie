

<template>
    <div class="brushDetail flexC">
        <div class="up" :style="{backgroundImage: bin.color}">
            <!-- 头部start -->
            <div class="upHeader">
                <Header :isRight="headerIcon" :selfB='selfB' :backC='backC'>
                    <template slot="headerTitle">{{$t('LogDetail.header')}}</template>
                </Header>
            </div>
            <!-- 头部end -->
            <!-- :style="{'backgroundColor':bin.color}" -->
            <div class="brushDetail_main flexC">
                <div class="brush_grade flex">
                    <div class="score">{{bin.grade}}</div>
                    <div class="unit">{{$t('Log.score')}}</div>
                </div>
                <div class="brush_grade_title flex">
                    <div class="title_tip">{{texts[tipIndex].tip}}</div>
                    <!-- // 感叹号图标 -->
                    <div @click="gotobrushMethods" v-if="texts[tipIndex].icon" class="title_icon exclamation"></div>
                </div>
            </div>
            <div class="time_brush">
                <div class="duration">
                    <span>{{$t('LogDetail.brushLen')}}</span>
                    <span>{{bin.formatLen}}</span>
                </div>
            </div>
        </div>

        <!-- 得分参考 -->
        <div class="reference flexC">
            <div class="cen8"></div>
            <div class="scoped">{{$t('LogDetail.range')}}</div>
            <div class="scoped_point">
                <div class="point_item flex">
                    <div class="scoretip flex">{{$t('LogDetail.level.low.title')}}</div>
                    <div class="scoretip flex">{{$t('LogDetail.level.mid.title')}}</div>
                    <div class="scoretip flex">{{$t('LogDetail.level.hig.title')}}</div>
                    <!-- <div class="color l"></div>
                    <div class="max scoretip">{{$t('LogDetail.level.low.price')}}</div> -->
                </div>
                <div class="point_item flex">
                    <!-- <div class="scoretip">{{$t('LogDetail.level.mid.title')}}</div> -->
                    <div class="color l"></div>
                    <div class="color c"></div>
                    <div class="color r"></div>
                    <!-- <div class="max scoretip">{{$t('LogDetail.level.mid.price')}}</div> -->
                </div>
                <div class="point_item flex">
                    <!-- <div class="scoretip">{{$t('LogDetail.level.hig.title')}}</div>
                    <div class="color r"></div> -->
                    <div class="max scoretip">{{$t('LogDetail.level.low.price')}}</div>
                    <div class="max scoretip">{{$t('LogDetail.level.mid.price')}}</div>
                    <div class="max scoretip">{{$t('LogDetail.level.hig.price')}}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapActions } from 'vuex'
import g from "../../Util/global";
import { scale, brushingHistory } from "../../Util/tool";
import reportData from '../../Util/reportData'
export default {
    name: "LogDetail",
    data() {
        return {
            headerIcon: false,
            selfB: true,
            backC: '',
            colors: window.isDark ? ["#ba5500", "#007aac", "#4e7700"] : ["#ff7600", "#007dff", "#8cd600"],
            texts: [
                { tip: this.$t("LogDetail.tip1"), icon: true },
                { tip: this.$t("LogDetail.tip2"), icon: true },
                { tip: this.$t("LogDetail.tip3"), icon: false },
            ],
            tipIndex: 0,
            // 跳转带过来的数据
            bin: {},
            brushHeader: '0',
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
        bleConnected(n, o) {
        },
        binData(n, o) {
            //this.getParameterFromRouter();
        },
        logData(n, o) { },
    },
    created() {
        this.getParameterFromRouter();

    },
    mounted() {
        setTimeout(() => {
            g.setQueue('57')
        }, 700);
    },
    beforeDestroy() {
        //g.setQueue('57')
    },
    methods: {

        ...mapActions({
            call_update_logData: 'BleStatus/call_update_logData'
        }),

        /**
         * @description: 路由获取参数
         * @param {*}
         * @return {*}
         */
        getParameterFromRouter() {
            // ["#ba5500", "#007aac", "#4e7700"] : ["#ff7600", "#007dff", "#8cd600"],
            var rgb = window.isDark ? [[186, 85, 0], [0, 122, 172], [78, 119, 0]] : [[255, 118, 0], [0, 125, 255], [140, 214, 0]];
            if (this.$route.query.bin) {
                let code = this.$route.query.bin;
                this.bin = {};
                let header = code[0] === '0' ? 'U' : 'I';
                if (this.$route.query.newest) {
                    header = this.$route.query.newest === '0' ? 'U' : 'I';
                }
                this.brushHeader = header;
                this.bin.grade = brushingHistory.getTotal(parseInt(code.substr(1), 2), header)
                //this.bin.color = brushingHistory.getColor(brushingHistory.getTotal(parseInt(code.substr(1), 2), header));
                if (this.bin.grade < 60) {
                    this.tipIndex = 0;
                    this.bin.color = `radial-gradient(50% 50%, rgba(${rgb[0][0]}, ${rgb[0][1]}, ${rgb[0][2]}, .55) 35%, rgba(${rgb[0][0]}, ${rgb[0][1]}, ${rgb[0][2]}, .6) 55%, rgba(${rgb[0][0]}, ${rgb[0][1]}, ${rgb[0][2]}, .65) 80%, rgba(${rgb[0][0]}, ${rgb[0][1]}, ${rgb[0][2]},1) 200%)`;
                } else if (60 <= this.bin.grade && this.bin.grade < 80) {
                    this.tipIndex = 1;
                    this.bin.color = `radial-gradient(50% 50%, rgba(${rgb[1][0]}, ${rgb[1][1]}, ${rgb[1][2]}, .55) 35%, rgba(${rgb[1][0]}, ${rgb[1][1]}, ${rgb[1][2]}, .6) 55%, rgba(${rgb[1][0]}, ${rgb[1][1]}, ${rgb[1][2]}, .65) 80%, rgba(${rgb[1][0]}, ${rgb[1][1]}, ${rgb[1][2]},1) 200%)`;
                } else {
                    this.tipIndex = 2;
                    this.bin.color = `radial-gradient(50% 50%, rgba(${rgb[2][0]}, ${rgb[2][1]}, ${rgb[2][2]}, .55) 35%, rgba(${rgb[2][0]}, ${rgb[2][1]}, ${rgb[2][2]}, .6) 55%, rgba(${rgb[2][0]}, ${rgb[2][1]}, ${rgb[2][2]}, .65) 80%, rgba(${rgb[2][0]}, ${rgb[2][1]}, ${rgb[2][2]},1) 200%)`;
                }
                this.bin.formatLen = brushingHistory.formatTime(parseInt(code.substr(1), 2), this)
                this.bin.binCode = code;
                localStorage.setItem('LogDetail', JSON.stringify(this.bin))
            } else {
                this.bin = JSON.parse(localStorage.getItem('LogDetail'))
            }
        },

        /**
         * @description: 感叹号图标点击跳转
         * @param {*}
         * @return {*}
         */
        gotobrushMethods() {
            this.$router.push({
                name: "BrushMethods",
                params: { type: this.brushHeader },
            });
        },
    },
};
</script>
<style lang='less' scoped>
.brushDetail {
    width: 100%;
    height: 100%;
    .up {
        width: 100%;
        height: 327px;
        position: relative;
        .upHeader {
            width: 100%;
        }
        .brushDetail_main {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -46%);
            font-size: 16px;
            .brush_grade {
                justify-content: center;
                align-items: baseline;
                .score {
                    color: rgba(255, 254, 255, 1);
                    font-size: 72px;
                }
                .unit {
                    color: rgba(255, 255, 255, 1);
                    margin-left: 8px;
                    font-size: 12px;
                }
            }
            .brush_grade_title {
                justify-content: center;
                align-items: center;
                margin-top: 0px;
                .title_tip {
                    font-size: 12px;
                    color: rgba(255, 255, 255, 1);
                }
                div {
                    height: 24px;
                    line-height: 24px;
                }
                .title_icon {
                    margin-left: 8px;
                    width: 12px;
                    height: 12px;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
            }
        }
        .time_brush {
            position: absolute;
            width: 100%;
            bottom: 8px;
            text-align: center;
            color: rgba(255, 255, 255, 0.9);
            font-size: 12px;
            .duration {
                //margin-bottom: 11px;
            }
            .brush_date {
                span {
                    .detail_time {
                        margin-left: 20px;
                    }
                }
            }
        }
    }

    .reference {
        .cen8 {
            height: 8px;
            background: rgba(0, 0, 0, 0.05);
            margin: 0 0 20px;
        }
        flex: 1;
        background-color: #fff;
        padding: 0px 0px 0;
        font-size: 12px;
        .scoped {
            padding: 0px 16px 0;
            color: rgba(0, 0, 0, 0.6);
            font-size: 14px;
            margin: 0 0 16px 0;
            height: 20px;
            line-height: 20px;
        }
        .scoped_point {
            padding: 0px 16px 0;
            flex: 1;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            .point_item {
                flex: 1;
                justify-content: space-between;
                .scoretip {
                    width: 100%;
                    text-align: center;
                    justify-content: center;
                    align-items: center;
                    font-size: 11px;
                    color: rgba(0, 0, 0, 0.6);
                    margin-bottom: 8px;
                }
                .color {
                    width: 100%;
                    height: 4px;
                }
                .l {
                    background-color: #ff7600; //  "#ff7600", "#8cd600", "#007dff"
                    border-radius: 2px 0 0 2px;
                }
                .c {
                    background-color: #007dff;
                }
                .r {
                    background-color: #8cd600;
                    border-radius: 0 2px 2px 0;
                }
                .max {
                    color: rgba(0, 0, 0, 0.6);
                    margin-top: 8px;
                    font-size: 11px;
                }
            }
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
    .brushDetail {
        .up {
            .brushDetail_main {
                .brush_grade {
                    .score {
                        color: rgba(255, 254, 255, 1);
                    }
                    .unit {
                        color: rgba(255, 255, 255, 1);
                    }
                }
                .brush_grade_title {
                    .title_tip {
                        color: rgba(255, 255, 255, 1);
                    }
                }
                .time_brush {
                    color: rgba(255, 255, 255, 0.9);
                }
            }
        }

        .reference {
            background-color: #000;
            .cen8 {
                background: rgba(255, 255, 255, 0.05);
            }
            .scoped {
                color: rgba(255, 255, 255, 0.6);
            }
            .scoped_point {
                .point_item {
                    .scoretip {
                        color: rgba(255, 255, 255, 0.6);
                    }
                    .l {
                        background-color: #ba5500; // "#ba5500", "#4e7700", "#007aac"
                    }
                    .c {
                        background-color: #007aac;
                    }
                    .r {
                        background-color: #4e7700;
                    }
                    .max {
                        color: rgba(255, 255, 255, 0.6);
                    }
                }
            }
        }
    }
}
</style>