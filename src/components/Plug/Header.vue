<!--
 * @Description: 页面头部
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-10-22 11:43:57
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-03-10 09:51:58
-->
<template>
    <div class="header" :style="{backgroundColor:headerC,paddingTop: top}">
        <div :style="{color: titleColor}" :class="path ? 'iconLeft_header_Log opcity icon':'iconLeft_header icon'" @click="goBack"></div>

        <div class="title" :style="{color: titleColor}">
            <!-- 头部插槽 -->
            <slot name="headerTitle">{{ $t('Header.headerTitle') }}</slot>
        </div>

        <div v-if="isRight" @click="goSetting" class="iconRight_header icon"></div>
    </div>
</template>

<script>
import { createCb } from "../../Util/hilink";
export default {
    /**
     * @description: 组件传值描述
     * @param {Boolean} rightIcon 是否有右侧图标
     * @param {String} toWhere 点击右侧图标的跳转路径
     * @param {String} iconRight 右侧图标的路径
     */
    props: {
        isRight: {
            type: Boolean,
            required: false,
            default: true,
        },
        toWhere: {
            type: String,
            required: false,
            default: "/setting", // 以后要默认设置成 设置页面的路径 selfB
        },
        backC: {
            type: String,
            required: false,
            default: window.isDark ? "rgba(0,0,0,1)":"rgba(255,255,255,1)",//  window.isDark ? "rgba(0,0,0,1)":"rgba(255,255,255,1)",
        },
        selfB: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    name: "Header",
    data() {
        return {
            headerC: this.backC,
            top: 0,
            titleColor: '',
            path: null
        };
    },

    components: {},

    computed: {
    },

    created() {
        this.headerColor();
        this.setHeaderHeight();
        this.title()
    },
    watch: {
        backC(n, o) {
            this.backC = n;
            this.headerC = n;
        },
        headerC(n, o) { },
    },



    methods: {
        title() {
            if (this.$route.path === '/logDetail') {
                this.titleColor = window.isDark ? 'rgba(255,255,255,0.86)' : 'rgba(255,255,255,0.9)';
                this.path = true
            } else {
                this.path = false;
            }
        },
        /**
         * @description: 头部背景色
         * @param {*}
         * @return {*}
         */
        headerColor() {
            if (this.backC != 'rgba(255,255,255,1)' && window.isDark) {
                this.headerC = this.backC;
            }
            if (this.backC == 'rgba(255,255,255,1)' && window.isDark) {
                this.headerC = 'rgba(0,0,0,0.8)';
            }
            if (this.selfB) {
                this.headerC = this.backC;
            }
        },

        /**
         * @description: 返回箭头事件，
         * @param {type}
         * @return {type}
         */
        goBack() {
            // 接口返回上一页面
            if (this.$route.path === '/') {
                window.hilink && window.hilink.finishDeviceActivity && window.hilink.finishDeviceActivity();
                return true;
            }
            this.$router.go(-1);
        },

        /**
         * @description: 如果有右侧图标时的点击事件，跳转页面
         * @param {type}
         * @return {type}
         */
        goSetting() {
            window.jumpToCallBack = (res) => {
                //console.log("跳转华为设置页", res);
            };
            if (this.$route.path === "/setting") {
                return true;
            }
            if (this.$route.path == "/") {
                window.hilink && window.hilink.jumpTo && window.hilink.jumpTo(
                    "com.huawei.smarthome.deviceSettingActivity",
                    "jumpToCallBack"
                );
                return true;
            }
            this.$router.push({ path: this.toWhere });
        },

        /**
         * @description: 获取手机状态栏高度并设置
         * @param {*}
         * @return {*}
         */
        setHeaderHeight() {
            window.getStatusBarHeightCallback = (res) => {
                res = JSON.parse(res);
                this.top = res.statusBarHeight + "px";
            };
            window.hilink && window.hilink.getStatusBarHeight && window.hilink.getStatusBarHeight("getStatusBarHeightCallback");
        },
    },
};
</script>
<style lang='less' scoped>
.header {
    width: 100%;
    // height: 80px;
    display: flex;
    align-items: center;
    padding: 0 16px 0 16px;
    box-sizing: border-box;
    //margin-top: 24px;
    // background: red!important;
    .title {
        flex: 1;
        font-size: 24px;
        color: rgba(0, 0, 0, 0.9);
        margin: 0 0 0 16px;
        height: 56px;
        display: flex;
        align-items: center;
    }
    .icon {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        display: inline-block;
        width: 24px;
        height: 24px;
        font-size: 0.666667rem;
        //background: red;
    }
    .iconRight_header {
        width: 12px;
        height: 24px;
    }
}

.theme-dark {
    .header {
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        padding: 0 16px 0 16px;
        .title {
            flex: 1;
            font-size: 24px;
            color: rgba(255, 255, 255, 0.86);
            margin: 0 0 0 16px;
        }
        .icon {
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            display: inline-block;
            width: 0.666667rem;
            height: 0.666667rem;
            font-size: 0.666667rem;
        }
    }
}
</style>