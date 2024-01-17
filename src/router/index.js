import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import LoginView from '../views/LoginView.vue'
import { useUserStore } from '@/stores/user';

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
    },
    {
      path: '/resources',
      name: 'resources',
      component: ResourcesView
    },
    {
      path: '/guess',
      name: 'guess',
      component: () => import('@/components/layouts/GuestLayout.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminDashboard.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: () => import('@/components/user/UserCreationForm.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error404',
      component: () => import('@/views/Error404.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  await userStore.refreshUserInfo();
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'guess', query: { redirect: to.fullPath } });
  } else if (to.meta.requiresAdmin && !userStore.isAdmin) {
    next({ name: 'home' }); // Redirect non-admin users to the home page or another appropriate page
  } else {
    next();
  }
});

export default router
