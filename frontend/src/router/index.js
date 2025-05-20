import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import LibraryView from '@/views/LibraryView.vue'
import UsersView from '@/views/UsersView.vue'
import PlaylistsView from '@/views/PlaylistsView.vue'
import SongsView from '@/views/SongsView.vue'
import PlaylistDetailComponent from '@/components/PlaylistDetail.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: { noLayout: true }
  },
  {
    path: '/library',
    name: 'library',
    component: LibraryView,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
    meta: { requiresAuth: true }
  },
  {
    path: '/playlists',
    name: 'playlists',
    component: PlaylistsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/songs',
    name: 'songs',
    component: SongsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/playlist/:id',
    name: 'playlist-detail',
    component: PlaylistDetailComponent,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Proteção de rotas
router.beforeEach((to, from, next) => {
  const loggedUser = localStorage.getItem('loggedUser')
  let isAuthenticated = false

  try {
    const parsedUser = JSON.parse(loggedUser)

    // Verifica se o objeto é válido e não está vazio
    if (parsedUser && Object.keys(parsedUser).length > 0) {
      isAuthenticated = true
    }
  } catch (e) {
    isAuthenticated = false
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router