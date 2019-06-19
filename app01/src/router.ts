import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export const constantRoutes=[
  {
    path: '/login',
    name: 'Login',
    component:  () => import('@/views/login/index.vue')
  }
]

export default new Router({
  routes: [
    //进入到页面，里面倒顶部
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes  
  ]
})
