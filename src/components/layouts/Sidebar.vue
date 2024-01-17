<template>
  <aside class="w-20 h-full bg-gray-800 flex flex-col items-center py-4 shadow-lg">
    <div class="text-white mb-6">
      <!-- Placeholder for home icon -->
      <router-link :to="homeLink">
        <span class="block w-10 h-10 bg-blue-500 rounded-lg mb-2"></span>
        <span class="text-xs">Home</span>
      </router-link>
    </div>
    <nav class="flex-1">
      <ul>
        <li v-for="menu in props.menuItems" :key="menu.item" class="mb-2">
          <!-- <router-link :to="menu.link" class="flex flex-col items-center">
            <span class="block w-10 h-10 bg-blue-500 rounded-lg mb-2"></span>
            <span class="text-xs text-white truncate w-full text-center">{{ menu.item }}</span>
          </router-link> -->
          <a href="#" class="flex flex-col items-center" @click="handleMenuClick(menu)">
            <span class="block w-10 h-10 bg-blue-500 rounded-lg mb-2"></span>
            <span class="text-xs text-white truncate w-full text-center">{{ menu.item }}</span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="mt-6">
      <!-- Placeholder for settings icon -->
      <span class="block w-10 h-10 bg-blue-500 rounded-lg mb-2"></span>
      <span class="text-xs">Settings</span>
    </div>
  </aside>
</template>

<script setup>
import { computed, ref, defineProps } from 'vue';

// define props
const props = defineProps({
  menuItems: {
    type: Array,
    required: true
  },
  homeLink: {
    type: String,
    default: '/'
  },
  handleMenuClick: Function
});
</script>

<style scoped>
/* Additional styles if needed */
</style>