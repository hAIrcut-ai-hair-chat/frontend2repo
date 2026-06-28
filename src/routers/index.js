import { createRouter, createWebHistory } from 'vue-router'

import FeedView from '@/views/FeedView.vue'

const routes = [
  {
    path: '/',
    name: 'Feed',
    component: FeedView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router