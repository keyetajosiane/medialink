<script setup>
import { ref } from 'vue';
import AuthLayout from '@/components/layouts/AuthLayout.vue';
import UserCreationForm from '@/components/user/UserCreationForm.vue';

// Reactive state to track the current active menu
const activeMenu = ref('create'); // Possible values: 'create', 'update', 'delete'
</script>
<template>
  <AuthLayout>
    <section class="p-8">
      <header>
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Admin Dashboard
        </h1>
      </header>

      <div class="flex space-x-4 mb-6">
        <!-- Submenu buttons -->
        <button
          class="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
          :class="{ 'bg-blue-700': activeMenu === 'create' }"
          @click="activeMenu = 'create'"
        >
          Create User
        </button>
        <button
          class="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
          :class="{ 'bg-blue-700': activeMenu === 'update' }"
          @click="activeMenu = 'update'"
        >
          Update User
        </button>
        <button
          class="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
          :class="{ 'bg-blue-700': activeMenu === 'delete' }"
          @click="activeMenu = 'delete'"
        >
          Delete User
        </button>
      </div>

      <!-- Conditional rendering of forms based on the activeMenu -->
      <main>
        <UserCreationForm v-if="activeMenu === 'create'" />
        <!-- <UserUpdateForm v-if="activeMenu === 'update'" />
        <UserDeleteForm v-if="activeMenu === 'delete'" /> -->
      </main>
    </section>
  </AuthLayout>
</template>