import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from '@/views/HomePage'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: HomePage
  },
  {
    path: '/playlist',
    component: () => import('@/views/PlayList'),
    props: (route) => ({
      id: route.query.id
    })
  },
  {
    path: '/playlists',
    component: () => import('@/views/RecommendPlayLists')
  },
  {
    path: '/search',
    component: () => import('@/views/SearchResult'),
    props: (route) => ({
      keywords: route.query.keywords
    })
  },
  {
    path: '/mv',
    component: () => import('@/views/MVPage'),
    props: route => ({
      id: route.query.id
    })
  },
  {
    path: '/video',
    component: () => import('@/views/PlayVideo')
  },
  {
    path: '/mvs',
    component: () => import('@/views/MVs')
  },
  {
    path: '/album',
    component: () => import('@/views/Album'),
    props: route => ({
      id: route.query.id
    })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 面包屑导航实现
router.beforeEach((to, from, next) => {
  const store = router.app.$options.store
  const idx = store.state.route_path.indexOf(to.fullPath)

  if (idx !== -1) {
    store.commit('setRoutePath', store.state.route_path.slice(0, idx))
  } else {
    store.commit('recordRoutePath', to.fullPath);
  }

  next();
})

export default router