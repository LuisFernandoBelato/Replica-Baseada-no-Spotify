import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView    from '@/views/LoginView.vue'
import LibraryView  from '@/views/LibraryView.vue'
import UsersView    from '@/views/UsersView.vue'
import PlaylistsView from '@/views/PlaylistsView.vue'
import SongsView    from '@/views/SongsView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
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
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
  },
  {
    path: '/playlists',
    name: 'playlists',
    component: PlaylistsView,
  },
  {
    path: '/songs',
    name: 'songs',
    component: SongsView,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

