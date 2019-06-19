import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

const createRouter=()=> new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: 'dashboard',
      children: [
        {
          path: '/dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
