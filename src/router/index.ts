import { createRouter, createWebHistory } from 'vue-router'
import LatestCurrencyView from '../views/LatestCurrencyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/latest-currency',
      name: 'home',
      component: LatestCurrencyView
    },
    {
      path: '/latest-currency/:currentPage',
      component: LatestCurrencyView
    },
    {
      path: '/changed-currency',
      name: 'changed currency',
      component: () => import('../views/ChangedCurrencyView.vue')
    },
    {
      path: '/changed-currency/:currentPage',
      component: () => import('../views/ChangedCurrencyView.vue')
    },
    {
      path: '/search-currency',
      name: 'currency search',
      component: () => import('../views/SearchCurrencyView.vue')
    },
    {
      path: '/currency/:id',
      name: 'specific currency view',
      component: () => import('../views/SpecificCurrencyView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/latest-currency'
    }
  ]
})

export default router
