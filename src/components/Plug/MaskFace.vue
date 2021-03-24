<!--
 * @Description: 遮罩层
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-10-23 11:25:29
 * @LastEditors: HeZhen
 * @LastEditTime: 2020-11-27 16:43:02
-->
<!--  -->
<template>
    <div v-if="maskshow" @click="ishidden" class="maskFace animate__animated animate__fadeIn">
        
    </div>
</template>

<script>
export default {
    props:{
       show: {
           type: Boolean,
           required: true,
           default: false
       } 
    },
    name: "MaskFace",
    data() {
        return {
            maskshow: this.show
        };
    },

    components: {},

    computed: {},
    watch:{
       show(n,o){
           this.maskshow = n;
       },
       maskshow(n,o){}
    },
    created() {},

    mounted() {},

    methods: {
        ishidden(){
            this.maskshow = false;
            this.$emit('hiddenFace',{type: 'Boolean',value: this.maskshow})
        }
    },
};
</script>
<style lang='less' scoped>
.maskFace{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 9;
}
</style>