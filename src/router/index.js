import Vue from 'vue'
import Router from 'vue-router'
const index = () => import('@/pages/index/index')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/',
      redirect:'/index'
    },
  ]
})
