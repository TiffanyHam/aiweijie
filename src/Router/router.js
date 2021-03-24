/*
 * @Description: 路由
 * @version:
 * @Author: HeZhen
 * @Date: 2020-10-15 14:18:58
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-01-11 18:33:44
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
    {
        path: '/remainTime',
        name: 'RemainTime',
        component: () => import('@pages/RemainTime/RemainTime.vue'),
    },
    {
        path: '/brushModel',
        name: 'BrushTeethModel',
        component: () => import('@pages/BrushTeethModel/BrushTeethModel.vue'),
    },
    {
        path: '/setting',
        name: 'Setting',
        component: () => import('@pages/Setting/Setting.vue'),
    },
    {
        path: '/log',
        name: 'Log',
        component: () => import('@pages/Log/Log.vue'),
    },
    {
        path: '/logDetail',
        name: 'LogDetail',
        component: () => import('@pages/LogDetail/LogDetail.vue'),
    },
    {
        path: '/',
        name: 'HomePage',
        component: () => import('@pages/HomePage/HomePage'),
    },
    {
        path: '/brushMethods',
        name: 'BrushMethods',
        component: () => import('@pages/BrushMethods/BrushMethods.vue'),
    },
    {
        path: '/comProblem',
        name: 'CommonProblem',
        component: () => import('@pages/CommonProblem/CommonProblem.vue'),
    },
    {
        path: '/guide_adult',
        name: 'Brushing_other',
        component: () => import('@pages/Brushing/Brushing_other.vue'),
    },
]

const router = new Router({ routes })

export default router
