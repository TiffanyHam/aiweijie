<!--
 * @Description: 圆圈组件
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-10-22 11:43:57
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-01-22 09:35:37
-->
<template>
    <div @click="changeOption" :class="check ? 'radio radioLeftOn': 'radio radioLeft'">
    </div>
</template>

<script>
export default {
    /**
     * @description: 组件传值描述
     * @param {Boolean} status 组件初始化状态， true: 选中
     */
    props: {
        status: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    name: "Round",
    data() {
        return {
            // 组件是否被选中
            check: this.status,
        };
    },

    components: {},

    watch: {
        status(n, o) {
            this.check = n;
        },
        check(n, o) {
        },
    },

    created() {
    },

    mounted() {
    },

    methods: {
        /**
         * @description: 点击事件
         * @param {type}
         * @return {type}
         */
        changeOption() {
            if (this.check) {
                this.$emit("changeStatus", null);
                return true;
            }
            this.check = !this.check;
            let data = {
                type: Boolean,
                value: this.check,
            };
            this.$emit("changeStatus", data);
        },
    },
};
</script>
<style lang='less' scoped>
.radio {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 24px 24px;
}
</style>