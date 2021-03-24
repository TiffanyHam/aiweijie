<template>
    <div id="app" :class="{'theme-dark': isDark}">
        <!-- <img src="./assets/logo.png" /> -->
        <transition :name="transitionName">
            <!-- <keep-alive> -->
            <router-view v-if="isRouterAlive" class="animate"></router-view>
            <!-- </keep-alive> -->
        </transition>
    </div>
</template>
<script>
import { getLanguage } from "./Util/tool";
import mixin from "@/mixins/bleConnect"; // 引入mixin文件
import g from './Util/global'
export default {
    mixins: [mixin],
    name: "App",
    provide(){
        return {
            reload: this.reload,
            isDarks: this.isDark
        }
    },
    data() {
        return {
            transitionName: "", //跳转方向!!!!
            isDark: false,
            isRouterAlive: true
        };
    },
    created() {
        this.$router.beforeEach((to, from, next) => {
            const routeDeep = [];

            for (let i = 0; i < this.$router.options.routes.length; i++) {
                routeDeep.push(this.$router.options.routes[i].name);
            }
            const toDep = routeDeep.indexOf(to.name);
            const fromDep = routeDeep.indexOf(from.name);
            //toDep的值大于fromDep的值往右移动
            this.transitionName = toDep > fromDep ? "back" : "to";
            next();
        });
        // 设置语言
        this.$i18n.locale = getLanguage();
        // 获取手机模式  
        this.getSystemInfo()       
    },
    mounted() { 
    },
    
    methods: {
        /*
         * 获取手机系统信息
        */
      getSystemInfo() {
            window.hilink && window.hilink.getSystemInfoSync && window.hilink.getSystemInfoSync('getSystemInfoSyncCallBack')
            window.getSystemInfoSyncCallBack = info => {
                let data = JSON.parse(info);
                if(data.platform == "iOS") {
                    //console.log("iOS设备")
                    window.ios = true;
                } else {
                    //console.log("andorid设备")
                    window.ios = false;
                    this.isDark = window.hilink && window.hilink.getDarkMode && window.hilink.getDarkMode() === 2;
                    window.isDark = this.isDark;
                }
            }
        },
        reload(){
            this.isRouterAlive = false;
            this.$nextTick(()=>{
                this.isRouterAlive = true;
            })
        }
    },
};
</script>

<style lang='less' scoped>

/* 过渡 */
body {
    background-color: #f7f7f7;
}
.a {
    width: 100%;
    height: 100%;
}

.animate {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
}

// .to-enter-active {
//     animation-name: left-in;
//     animation-duration: 0.3s;
// }

// .to-leave-active {
//     animation-name: right-out;
//     animation-duration: 0.3s;
// }

// .back-enter-active {
//     animation-name: right-in;
//     animation-duration: 0.3s;
// }

// .back-leave-active {
//     animation-name: left-out;
//     animation-duration: 0.3s;
// }

@keyframes left-in {
    0% {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}

@keyframes left-out {
    0% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }

    100% {
        opacity: 0.3;
        transform: translate3d(-100%, 0, 0);
    }
}

@keyframes right-in {
    0% {
        opacity: 0.3;
        transform: translate3d(100%, 0, 0);
    }

    100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}

@keyframes right-out {
    0% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }

    100% {
        opacity: 0.3;
        transform: translate3d(100%, 0, 0);
    }
}
</style>
