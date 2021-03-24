<!--
 * @Description: 
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-11-11 10:03:15
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-02-04 14:39:20
-->
<template>
    <div class="brushMethods flexC">
        <!-- 头部start -->
        <Header :isRight="header_rightIcon">
            <span v-if="mode=='0'" slot="headerTitle">{{ $t('brushMethods.headerTitle2') }}</span>
            <span v-else slot="headerTitle">{{ $t('brushMethods.headerTitle')}}</span>
        </Header>
        <!-- 头部end -->
        <div class="mar"></div>
        <div class="methods_main" ref="scroll">
            <div class="wrapper">
                <div v-for="(item,index) in text_cur" :key="index" class="methods_item">
                    <div class="title">{{item.tip}}</div>
                    <div class="subtitle">{{item.subtip}}</div>
                    <div class="img">
                        <span class="back_img" :style="{backgroundImage: 'url(' +require('../../Images/light/'+item.img)+ ')'}"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BS from "better-scroll";
import g from "../../Util/global";
import { scale } from "../../Util/tool";
export default {
    name: "BrushMethods",
    data() {
        return {
            header_rightIcon: false,
            mode: null,
            text_I: [
                {
                    tip: this.$t("brushMethods.tip"),
                    subtip: this.$t("brushMethods.subtip"),
                    img: "I_1.png",
                },
                {
                    tip: this.$t("brushMethods.tip2"),
                    subtip: this.$t("brushMethods.subtip2"),
                    img: "I_2.png",
                },
                {
                    tip: this.$t("brushMethods.tip3"),
                    subtip: this.$t("brushMethods.subtip3"),
                    img: this.$i18n.locale === "zh" ? "I_3.png" : "I_3en.png",
                },
                {
                    tip: "",
                    subtip: this.$t("brushMethods.subtip4"),
                    img: this.$i18n.locale === "zh" ? "I_4.png" : "I_4en.png",
                },
                {
                    tip: this.$t("brushMethods.tip5"),
                    subtip: this.$t("brushMethods.subtip5"),
                    img: "I_5.png",
                },
            ],
            text_U: [
                {
                    tip: this.$t("brushMethods.tip6"),
                    subtip: this.$t("brushMethods.subtip6"),
                    img: "U_1.png",
                },
                {
                    tip: this.$t("brushMethods.tip7"),
                    subtip: this.$t("brushMethods.subtip7"),
                    img: "U_2.png",
                },
                {
                    tip: this.$t("brushMethods.tip8"),
                    subtip: this.$t("brushMethods.subtip8"),
                    img: this.$i18n.locale === 'zh' ? "U_3.png":"U_3_en.png",
                },
                {
                    tip: this.$t("brushMethods.tip9"),
                    subtip: this.$t("brushMethods.subtip9"),
                    img: "U_4.png",
                },
            ],
            text_cur: null,
            scroll: null,
        };
    },
    created() { },

    mounted() {
        this.$nextTick(() => {
            this.scroll = new BS(this.$refs.scroll, {
                probeType: 3,
                click: true,
                scrollY: true,
            });
        });
        this.initPages()
    },
    computed: {
        bleConnected() {
            return this.$store.state.BleStatus.bleConnected;
        },
        binData() {
            return this.$store.state.BleStatus.binData;
        },
    },
    watch: {
        bleConnected(n, o) {
            this.initPages()
        },
        binData(n, o) {
        },
    },

    methods: {
        /**
         * @description: 初始化页面
         * @param {*}
         * @return {*}
         */
        initPages() {
            this.mode = this.$route.params.type === 'U' ? '0' : '1';
            this.text_cur = this.mode === "0" ? this.text_U : this.text_I;
        },
    },
};
</script>
<style lang='less' scoped>
.brushMethods {
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 0 8px;
    .mar {
        height: 16px;
    }
    .methods_main {
        flex: 1;
        padding: 0 16px 0;
        overflow: hidden;
        .wrapper {
            padding: 0 0 24px 0;
            .methods_item {
                margin-bottom: 24px;
                .title {
                    color: rgba(0, 0, 0, 0.9);
                    font-size: 19px;
                    margin-bottom: 16px;
                }
                .subtitle {
                    color: rgba(0, 0, 0, 0.6);
                    font-size: 13px;
                    line-height: 18px;
                }
                .img {
                    height: 215px;
                    width: 312px;
                    margin: 16px 0;
                    .back_img {
                        display: inline-block;
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        height: 100%;
                        width: 100%;
                    }
                }
            }
        }
    }
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
    .brushMethods {
        background-color: #000;
        .methods_main {
            background-color: #000;
            .wrapper {
                .methods_item {
                    .title {
                        color: rgba(255, 255, 255, 0.86);
                    }
                    .subtitle {
                        color: rgba(255, 255, 255, 0.6);
                    }
                }
            }
        }
    }
}
</style>