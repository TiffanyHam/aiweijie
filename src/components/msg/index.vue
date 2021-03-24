<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-12-23 10:05:44
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-02-03 17:47:17
-->
<template>
    <div class="app-toast flex" v-show="dialogTip" @click="getConnect" :style="{top:top}">
        <div class="flex">
            <span class="warn"></span>
            <span class="text">{{$t('Reconnection.index')}}</span>
        </div>
        <span v-if="syncMessage" class="syncMessage">同步信息</span>
        <span v-else class="arrow_right"></span>
    </div>
</template>
<script>
export default {
    name: 'Popup',
    data() {
        return {
            dialogTip: false,
            syncMessage: false
        }
    },
    computed: {
        top() {
            let top = document.getElementsByClassName('header')[0] ? document.getElementsByClassName('header')[0].offsetHeight + 'px' : '9.5%';
            // console.log('标题栏高度11：',top)
            return top;
        }
    },
    methods: {
        getConnect() {
            window.hilink && window.hilink.openBluetoothAdapter && window.hilink.openBluetoothAdapter();
        }
    },
}
</script>
<style lang="less" scoped>
@import url("../../static/Style/common.less");
.app-toast {
    position: fixed;
    background: #fff4f4;
    line-height: 35px;
    width: 100%;
    height: 35px;
    color: rgb(251, 42, 45, 0.9);
    font-size: 18px;
    padding: 0 16px;
    .warn {
        display: inline-block;
        width: 22px;
        height: 22px;
        background-image: url("../../Images/light/hint.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-right: 15px;
    }
    .arrow_right {
        display: inline-block;
        width: 6px;
        height: 10px;
        background-image: url("../../Images/dark/log_right2.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .syncMessage {
        display: inline-block;
        color: #007dff;
        font-size: 14px;
    }
}
.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>