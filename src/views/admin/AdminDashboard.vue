<script setup>
import { ref } from 'vue';
import AuthLayout from '@/components/layouts/AuthLayout.vue';
import UsersManagement from '@/views/admin/UsersManagement.vue';
import ResourceManagement from '@/views/admin/ResourceManagement.vue';
// Reactive state to track the current active menu
const activeMenu = ref('users'); // Possible values: 'create', 'update', 'delete'
const menuItems = [
  {
    item: "Departments",
    link: "/admin/departments"
  },
  {
    item: "Formateurs",
    link: "/admin/formateurs"
  },
  {
    item: "Resources",
    link: "/admin/resources"
  },
  {
    item: "Users",
    link: "/admin/users"
  }
];

const handleMenuClick = (menu) => {
  activeMenu.value = menu.item.toLowerCase();
}
</script>
<template>
  <AuthLayout :menuItems="menuItems" :homeLink="'/admin'" :handleMenuClick="handleMenuClick">
      <header>
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Admin Dashboard
        </h1>
      </header>

    <UsersManagement v-if="activeMenu === 'users'" />
    <ResourceManagement v-if="activeMenu === 'resources'" />
  </AuthLayout>
</template>