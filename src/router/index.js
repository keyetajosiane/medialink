import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },{
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/resources',
      name: 'resources',
      component: ResourcesView
    },
    {
      path: '/guess',
      name: 'guess',
      component: () => import('../components/layouts/GuestLayout.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../components/layouts/AuthLayout.vue')
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: () => import('../components/user/UserCreationForm.vue')
    }
  ]
})

export default router
