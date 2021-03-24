<!--
 * @Description: 蓝牙断开提示 
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-12-07 15:02:03
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-12-25 10:46:07
-->
<template>
    <div
        class="app-toast flex"
        :style="{backgroundColor: backgroundColor,color:color,top:top}"
        v-if="isShow"
        @click="getConnect">
        <div class="flex">
            <span class="warn"></span>
            <span class="text">{{text}}</span>
        </div>
        <span v-if="syncMessage" class="syncMessage">同步信息</span>
        <span v-else class="arrow_right"></span>
    </div>
</template>
<script>
export default {
    computed: {
        top(){
            let top = document.getElementsByClassName('header')[0] ? document.getElementsByClassName('header')[0].offsetHeight + 'px' : '9.5%';
            return top;
        }
    },
    mounted() {
        
    },
    methods: {
        getConnect() {
            window.hilink.openBluetoothAdapter();
        },
    },
};
</script>
<style lang='less' scoped>
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
