import { createRouter, createWebHashHistory } from 'vue-router'
import axiosInstance from '@/services/axiosInstance'

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

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      // Tenta fazer uma requisição para verificar se o usuário está autenticado
      await axiosInstance.get('/verify-auth');
      next();
    } catch (error) {
      // Se houver erro, redireciona para o login
      next({ name: 'login' });
    }
  } else {
    next();
  }
})

export default router