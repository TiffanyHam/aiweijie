<!--
 * @Date: 2020-08-24 16:54:12
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-01-14 18:58:44
 * @FilePath: \sweeper_branch1\src\components\common\VSwitch.vue
-->
<template>
    <div class="switchBtn">
        <span class="switch" :class="switchClass" @click="changeSwitch">
            <span class="toggle"></span>
        </span>
    </div>
</template>

<script>
export default {
    name: 'VSwitch',
    props: {
        isOn: Boolean
    },
    data() {
        return {
            isSwitchOn: true
        };
    },
    computed: {
        switchClass() {
            return this.isSwitchOn ? 'on' : 'off';
        }
    },
    watch: {
        isOn: {
            handler: function (val) {
                this.isSwitchOn = val;
            },
            immediate: true
        }
    },
    methods: {
        //切换开关
        changeSwitch() {
            this.isSwitchOn = !this.isSwitchOn
            this.$emit("afterChange", this.isSwitchOn);
        }
    }
};
</script>

<style lang="less" scoped>
@import url('../../static/Style/variable.less');
.switch {
    position: relative;
    left: 0;
    padding: 0 @2dp;
    top: 0;
    width: @36dp;
    border-radius: @10dp;
    display: block;
    background: #007dff;
    height: @20dp;
    .toggle {
        float: right;
        position: relative;
        width: @16dp;
        height: @16dp;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 50%;
        background: #fff;
        z-index: 8;
        box-sizing: border-box;
    }
}
.switch.on {
    background: #007dff;
}
.switch.off {
    background-color: rgba(0, 0, 0, 0.1);
}
.switch.on > .toggle {
    float: right;
}
.switch.off > .toggle {
    float: left;
}
.theme-dark {
    .switchBtn {
        .switch.on {
            background: #006cde;
        }
        .switch.off {
            background: rgba(255, 255, 255, 0.4);
        }
    }
}
</style>
