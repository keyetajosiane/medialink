<script setup>
import { ref } from 'vue';
import AuthLayout from '@/components/layouts/AuthLayout.vue';
import UserCreationForm from '@/components/user/UserCreationForm.vue';
import UsersList from '../../components/user/UsersList.vue';

// Reactive state to track the current active menu
const activeMenu = ref('update'); // Possible values: 'create', 'update', 'delete'
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
  }
];
</script>
<template>
  <AuthLayout :menuItems="menuItems" :homeLink="'/admin'">
    <section class="p-8">
      <header>
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Admin Dashboard
        </h1>
      </header>

      <div class="flex space-x-4 mb-6 flex-wrap">
        <!-- Submenu buttons -->
        <button
          class="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
          :class="{ 'bg-blue-700': activeMenu === 'update' }"
          @click="activeMenu = 'update'"
        >
          View Users
        </button>
        <button
          class="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
          :class="{ 'bg-blue-700': activeMenu === 'create' }"
          @click="activeMenu = 'create'"
        >
          Create User
        </button>
      </div>

      <!-- Conditional rendering of forms based on the activeMenu -->
      <main>
        <UsersList v-if="activeMenu === 'update'" />
        <UserCreationForm v-if="activeMenu === 'create'" />
      </main>
    </section>
  </AuthLayout>
</template>