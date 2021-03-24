<!--
 * @Description: 蓝牙未连接弹窗 
 * @version: 
 * @Author: TangZhiWei
 * @Date: 2020-10-22 11:43:57
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-12-16 17:15:49
-->
<template>
  <div v-show="dialog" class="dialog_main">
   <div class="maskface animate__animated animate__fadeIn" v-show="dialog" @click="confirmBtn"></div>
    <!-- 弹窗内容start -->
    <div class="dialog" :style="{ bottom: bottom }">
      <div class="dialog_title">
        <slot name="title"></slot>
      </div>
      <div class="tipText">
        <slot>{{$t('Hint.tipText')}}</slot>
        <br/>
        <slot>{{$t('Hint.tipText1')}} </slot>
         <br/>
        <slot>{{$t('Hint.tipText2')}}</slot>
         <br/>
        <slot>{{$t('Hint.tipText3')}}</slot>
        <br/>
        <slot>{{$t('Hint.tipText4')}}</slot>
      </div>

      <div class="dialog_footer fb">
        <span class="sure" @click="confirmBtn">
          <div class="qd flexR">
          <span name="sure">确认</span>
          </div>
        </span>
      </div>
      
    </div>
    <!-- 弹窗内容end -->
  </div>
</template>

<script>
export default {
  /**
   * @description: 组件传值描述
   * @param {Boolean}  dialog_show 弹窗控制器
   */
  props: {
    dialog: {
      type: Boolean,
      required: true,
      default: false,
    },
    bottom: {
      type: String,
      required: false,
      default: '12px',
    },
   confirmBtn:{
       type:Function
   } 
  },
  name: 'Hint',
  data() {
    return {
      
    }
  },

  components: {},

  computed: {},
  created() {},

  mounted() {}
}
</script>

<style lang="less" scoped>
@import url('../../static/Style/common.less');
.dialog_main {
  z-index: 999999;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 29px;
  .dialog {
    border-radius: 15px;
    width: 328px;
    padding: 16px 24px;
    z-index: 999;
    position: absolute;
    left: 50%;
    margin-left: -164px;
    background-color: #fff ;

    .dialog_title {
      font-size: 18px;
      color: @black90;
      margin: 0 0 15px 0;
    }
    .options {
      width: 100%;
        .item_title {
          font-size: 16px;
          color: @black90;
        }
        .item_round {
          width: 16px;
          height: 16px;
        }
      .bottomBorderNone {
        border-bottom: none;
      }
    }
    .tipText {
      font-size: 16px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.9);
      text-align: left;
      letter-spacing: 1px;
    }
    .dialog_footer {
      width: 100%;
      margin: 27px 0 0 0;
      color: @black30;
      font-size: 16px;
      justify-content: center;
      .qd {
        width: 100px;
        height: 34px;
        border: 0.5px solid rgba(0, 0, 0, 0.1);
        border-radius: 2.5px;
        text-align: center;
      }
    }
  }
  .fb {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .flexR {
  display: flex;
  align-items: center;
  justify-content: center;
}
.maskface {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 9;
    }
}
// 暗黑模式
.theme-dark {
  .dialog {
    background-color:#262626;
    .tipText {
    color: rgba(255, 255, 255, 0.66);
    
  }
  .dialog_footer{
    color: #3f97e9;
    .qd {
    border: 0.5px solid rgba(255, 255, 255, 0.2);
}
  }
  
  }
  
}
</style>
