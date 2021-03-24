<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-12-29 09:31:05
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-12-29 09:33:54
-->
<template>
    <!-- loading -->
   <div class="loading_icon" v-show="loading"></div>
</template>
<script>
export default {
    data(){
        return{
            loading:false
        }
    }
}
</script>
<style lang="less" scoped>
 //loading
    .loading_icon{
       width: 24px;
       height: 24px;
       background-size: 100% 100%;
       background-repeat: no-repeat;
      -webkit-animation:load 1.5s linear infinite;
       animation: load 1.5s linear infinite;
       position: absolute;
       top: 389px;
       left: 55px;
    }
       /*Chorme,Safari必须加上*/
        @-webkit-keyframes load{
        to{-webkit-transform: rotate(0deg);}
        from{-webkit-transform: rotate(360deg);}
        }
        @keyframes load{
        0%{transform: rotate(0deg);}
        100%{transform: rotate(360deg);}
        }
</style>