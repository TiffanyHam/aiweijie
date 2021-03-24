<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2021-01-10 10:11:13
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-02-03 17:48:58
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-12-23 10:05:44
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-12-24 14:23:01
-->
<template>
    <div class="app-toast flex" v-show="dialogTip">
         <!-- :style="{top:top}" -->
        <div class="flex">
            <span class="warn"></span>
            <span class="text">{{$t('Reconnection.index')}}</span>
        </div>
        <span v-if="syncMessage" class="syncMessage">同步信息</span>
        <span v-else></span>
    </div>
</template>
<script>
export default {
  name: 'msg',
  props: {
    dialogTip: {
      type: Boolean,
      required: true,
      default: false,
    },
    syncMessage:{
      type: Boolean,
      required: true,
      default: false,
    }
  },
  data() {
   return {
      
    }
  },
//   computed: {
//         top(){
//             let top = document.getElementsByClassName('header')[0] ? document.getElementsByClassName('header')[0].offsetHeight + 'px' : '9.5%';
//            // console.log('标题栏高度11：',top)
//             return top;
//         }
//     },
}
</script>
<style lang="less" scoped>
@import url("../../static/Style/common.less");
.app-toast {
    position: fixed;
    background: #fff4f4;
    line-height: 48px;
    width: 100%;
    height: 48px;
    color: #FB2A2D;

    font-size: 16px;
    top:80px;
    padding: 0 16px;
    .warn {
        display: inline-block;
        width: 24px;
        height: 24px;
        background-image: url("../../Images/light/hint.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-right: 16px;
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
.theme-dark {
    .app-toast{
        background: #372222;
        color: #e64548;
    }

}
</style>