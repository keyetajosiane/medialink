<script setup>
import { ref } from 'vue';
import UserCreationForm from '@/components/user/UserCreationForm.vue';
import UsersList from '@/components/user/UsersList.vue';

// Reactive state to track the current active menu
const activeMenu = ref('update'); // Possible values: 'create', 'update', 'delete'
</script>

<template>
  <section class="p-8">
    <div class="flex flex-wrap mb-4">
      <!-- Submenu buttons with Discord styling -->
      <button
        class="flex-1 px-4 py-2 m-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        :class="{ 'bg-pink-800': activeMenu === 'update' }" @click="activeMenu = 'update'">
        View Users
      </button>

      <button
        class="flex-1 px-4 py-2 m-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        :class="{ 'bg-blue-800': activeMenu === 'create' }" @click="activeMenu = 'create'">
        Create User
      </button>
    </div>

    <!-- Conditional rendering -->
    <main>
      <UsersList v-if="activeMenu === 'update'" />
      <UserCreationForm v-if="activeMenu === 'create'" />
    </main>
  </section>
</template>
