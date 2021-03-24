<!--
 * @Description: 
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-11-12 20:07:40
 * @LastEditors: HeZhen
 * @LastEditTime: 2020-12-03 10:54:50
-->
<!--  -->
<template>
    <div class="rect">
        <div class="chart" ref="chart" style="width:100%;height:100%"></div>
    </div>
</template>

<script>
export default {
    name: "RectProgress",
    props: {
        realValue: {
            type: Number,
            default: 20,
            required: true,
        },
    },
    data() {
        return {};
    },

    components: {},

    computed: {},
    watch: {
        realValue(n, o) {
            this.realValue = n;
            this.getEchartData();
        },
    },
    created() {},

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
                myChart.setOption(option);
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
            var getmydmc = ["留在当地就业学生比例"]; //数据点名称
            var getmyd = [this.realValue * (100 / 45)]; //学生满意度
            var getmydzd = []; //学生满意度100%
            for (let i = 0; i < getmyd.length; i++) {
                getmydzd.push(1000);
            }
            let option = {
                grid: {
                    left: "0",
                    right: "0",
                    bottom: "3%",
                    top: "3%",
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "none",
                    },
                    formatter: function (params) {
                        return (
                            "学生满意度<br>" +
                            params[0].name +
                            ": " +
                            params[0].value +
                            "%"
                        );
                    },
                },
                xAxis: {
                    show: false,
                    type: "value",
                },
                yAxis: [
                    {
                        type: "category",
                        inverse: true,
                        axisLabel: {
                            formatter: function (value) {
                                var ret = ""; //拼接加\n返回的类目项
                                var maxLength = 5; //每项显示文字个数
                                var valLength = value.length; //X轴类目项的文字个数
                                var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                                if (rowN > 1) {
                                    //如果类目项的文字大于5,
                                    var temp = ""; //每次截取的字符串
                                    var start = 0; //开始截取的位置
                                    var end = maxLength; //结束截取的位置
                                    temp =
                                        value.substring(start, end) +
                                        "\n" +
                                        value.substring(end, valLength);
                                    ret += temp; //凭借最终的字符串
                                    return ret;
                                } else {
                                    return value;
                                }
                            },
                            textStyle: {
                                color: "#666666",
                                fontSize: "14",
                                lineHeight: 20,
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        data: getmydmc,
                    },
                    {
                        type: "category",
                        inverse: true,
                        axisTick: "none",
                        axisLine: "none",
                        show: true,
                        axisLabel: {
                            textStyle: {
                                color: "#333333",
                                fontSize: "14",
                            },
                            formatter: "{value}%",
                        },
                        data: getmyd,
                    },
                ],
                series: [
                    {
                        name: "值",
                        type: "bar",
                        zlevel: 1,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
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
                                            color: "#C5E3FF",
                                        },
                                        {
                                            offset: 1,
                                            color: "#007DFF",
                                        },
                                    ],
                                },
                            },
                        },
                        barWidth: 10,
                        data: getmyd,
                    },
                    {
                        name: "背景",
                        type: "bar",
                        barWidth: 10,
                        barGap: "-100%",
                        data: getmydzd,
                        itemStyle: {
                            normal: {
                                color: "rgba(0,0,0,0.1)",
                                barBorderRadius: 5,
                            },
                        },
                    },
                ],
            };
            return option;
        },
    },
};
</script>
<style lang='less' scoped>
.rect {
    width: 100%;
    height: 100%;
    .chart {
        width: 100%;
        div {
            canvas {
                position: relative !important;
            }
        }
    }
}
</style>