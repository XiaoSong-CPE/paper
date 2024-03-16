import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: '主页 Home'
      }
    },
    {
      path: '/progress',
      name: 'progress',
      component: () => import('../views/ProgressView.vue'),
      meta: {
        title: '进度 Progress'
      }
    },
    {
      path: '/translation-pair',
      name: 'translationPairView',
      component: () => import('../views/TranslationPairView.vue'),
      meta: {
        title: '译表 Translation Pair'
      }
    },
    {
      path: '/draft',
      name: 'draft',
      component: () => import('../views/DraftView.vue'),
      meta: {
        title: '草稿 Draft'
      }
    }
  ]
})

export default router
