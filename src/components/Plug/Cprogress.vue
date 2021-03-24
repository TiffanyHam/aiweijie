<!--
 * @Description: 圆形进度条
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-10-26 11:05:31
 * @LastEditors: HeZhen
 -->
<template>
    <div class="container flex">
        <div class="chart" ref="chart" style="width:100%;height:100%"></div>
    </div>
</template>

<script>
export default {
    props: {
        realValue: {
            type: Number,
            required: true,
            default: 75,
        },
        MAX: {
            type: Number,
            required: false,
            default: 90,
        },
    },
    name: "Cprogress",
    data() {
        return {};
    },

    components: {},
    watch: {
        realValue(n, o) {
            this.realValue = n;
            this.getEchartData();
        },
    },
    computed: {
        colors() {
            let colors = [
                { start: "#FF4545", end: "#FFD554" },
                { start: "#ADDBFF", end: "#7335FF" },
                { start: "#86E5F3", end: "#007DFF" },
            ];
            if (this.realValue > 50) {
                return { ...colors[2] };
            }
            if (this.realValue <= 23) {
                return { ...colors[0] };
            }
            return { ...colors[1] };
        },
    },

    created() { },

    mounted() {
        this.$nextTick(() => {
            this.getEchartData();
        });
    },
    methods: {
        /**
         * @description: 注册echarts
         * @param {type}
         * @return {type}
         */
        getEchartData() {
            let chart = this.$refs.chart;
            if (chart) {
                let myChart = this.$echarts.init(chart);
                let option = this.setOptions();
                myChart.setOption(option, true);
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
            }
        },

        /**
         * @description: 设置echarts 的option
         * @param {type}
         * @return {type}
         */
        setOptions() {
            let _ = this;
            let option = {
                backgroundColor: window.isDark ? "#000" : "#fff",
                title: [
                    {
                        //text: this.$t("RemainTime.doctorWord"),
                        bottom: "0",
                        x: "center",
                        borderWidth: 0,
                        padding: [7, 14],
                        textStyle: {
                            fontWeight: "normal",
                            fontSize: 14,
                            color: window.isDark
                                ? "rgba(255,255,255,0.86)"
                                : "rgba(0,0,0,0.9)",
                        },
                    },
                ],
                angleAxis: {
                    show: false,
                    max: (this.MAX * 360) / 270, //-45度到225度，二者偏移值是270度除360度
                    type: "value",
                    startAngle: 225, //极坐标初始角度
                    splitLine: {
                        show: false,
                    },
                },
                barMaxWidth: 16, //圆环宽度
                radiusAxis: {
                    show: false,
                    type: "category",
                },
                //圆环位置和大小
                polar: {
                    center: ["50%", "50%"],
                    radius: parseInt((window.screen.width) * (224 / 360)).toString(),
                },
                series: [
                    {
                        type: "bar",
                        data: [
                            {
                                //上层圆环，显示数据
                                value: this.realValue, // 圆环实际值
                                itemStyle: {
                                    color: {
                                        //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                                        type: "linear",
                                        x: 0,
                                        y: 0,
                                        x2: 1, //从左到右 0-1
                                        y2: 0,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: this.colors.start,
                                            },
                                            {
                                                offset: 1,
                                                color: this.colors.end,
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                        barGap: "-100%", //柱间距离,上下两层圆环重合
                        coordinateSystem: "polar",
                        roundCap: true, //顶端圆角
                        z: 2, //圆环层级，同zindex
                    },
                    {
                        //下层圆环，显示最大值
                        type: "bar",
                        data: [
                            {
                                value: this.MAX, // 圆环最大值
                                itemStyle: {
                                    color: "rgba(204,204,204,0.4)",
                                },
                            },
                        ],
                        barGap: "-100%",
                        coordinateSystem: "polar",
                        roundCap: true,
                        z: 1,
                    },
                    //仪表盘
                    {
                        name: "AQI",
                        type: "gauge",
                        startAngle: 225, //起始角度，同极坐标
                        endAngle: -45, //终止角度，同极坐标
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        splitLabel: {
                            show: false,
                        },
                        pointer: {
                            show: false,
                        },
                        title: {
                            offsetCenter: [-10, 20],
                            color: window.isDark
                                ? "rgba(255,255,255,0.86)"
                                : "rgba(0,0,0,0.9)",
                            fontSize: 45,
                            fontWeight: 500,
                            rich: {
                                a: {
                                    fontWeight: "normal",
                                    fontSize: 16,
                                    color: window.isDark
                                        ? "rgba(255,255,255,0.6)"
                                        : "rgba(0,0,0,0.6)",
                                    padding: [20, 0, 0, 10],
                                },
                            },
                        },
                        detail: {
                            formatter: function (e) {
                                return _.$t("RemainTime.day");
                            },
                            color: window.isDark
                                ? "rgba(255,255,255,0.9)"
                                : "rgba(0,0,0,0.9)",
                            fontSize: 18,
                            offsetCenter: [_.$i18n.locale === 'zh' ? 30 : 35, 5],
                            padding: [4, 12],
                        },
                        data: [
                            {
                                value: this.realValue,
                                name:
                                    this.realValue +
                                    "\n" +
                                    "{a|" +
                                    this.$t("RemainTime.rest") +
                                    "}",
                            },
                        ],
                    },
                ],
            };
            return option;
        },
    },
};
</script>
<style lang='less' scoped>
.container {
    width: 100%;
    height: 100%;
    //border: 1px solid red;
    position: relative;
}
.flex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.theme-dark {
    .container {
        background-color: #000;
        .chart {
            background-color: #000;
        }
    }
}
</style>