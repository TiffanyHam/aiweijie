<!--
 * @Author: TangZhiWei//设备未连接，请重新连接
 * @Date: 2020-10-26 11:43:57
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-02-03 17:48:04
 * @Description: In User Settings Edit
 * @FilePath: \Olybo\src\components\Plug\Ununited.vue
-->
<template>
<div >
  <div @click="Reconnection" v-show="markRed" class="head flexR">
      <div class=" flexR">
        <div class="warn"></div>
        <span class="ununited">{{ $t('Reconnection.index') }}</span>
      </div>
      <div class="fontStyle flexR">
        <div class="bluetoothReturn"></div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Reconnection',
 data() {
    return {
    markRed: true,
  }
 }, 
 methods: {
   Reconnection(){}
 }
}
</script>

<style lang="less" scoped>
@import url('../../static/Style/common.less');
.head {
    width: 100%;
    height: 35px;
    top: 80px !important; 
    position: absolute;
    padding: 0px 16px 0px 16px;
    z-index: 200;
    background-color: rgba(255, 244, 244, 1);
    .ununited {
      font-size: 16px;
      color: rgba(251, 42, 45, 0.9);
    }
    .warn {
      width: 22px;
      height: 22px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin-right: 17px;
    }
    .bluetoothReturn {
      width: 6px;
      height: 10px;
      background-image: url('../../Images/light/log_right.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin-left: 10px;
    }
}
.fontStyle {
          font-size: 16px;
        }
.flexR {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
// 暗黑模式
.theme-dark {
  .head {
      background-color: #372222;
    }
    .bluetoothReturn {
      background-image: url('../../Images/dark/log_right2.png');
    }
}
</style>