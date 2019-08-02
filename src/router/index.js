// 定义router对象  导出给main.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'

Vue.use(VueRouter)

const router = new VueRouter({
  // 路由规则配置
  // name的作用给当前路由规则取名  $router.push('/login')  或者 $router.push({name:'login'})
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ]
    }
  ]
})

export default router
