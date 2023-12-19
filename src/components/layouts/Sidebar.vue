<template>
  <aside class="w-20 h-full bg-gray-800 flex flex-col items-center py-4 shadow-lg">
    <div class="text-white mb-6">
      <!-- Placeholder for home icon -->
      <span class="block w-10 h-10 bg-blue-500 rounded-lg mb-2"></span>
      <span class="text-xs">Home</span>
    </div>
    <nav class="flex-1">
      <ul>
        <li v-for="channel in channels" :key="channel" class="mb-2">
          <a href="#" class="flex flex-col items-center">
            <span class="block w-10 h-10 bg-blue-500 rounded-lg mb-2"></span>
            <span class="text-xs text-white truncate w-full text-center">{{ channel }}</span>
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
import { ref } from 'vue';

const channels = ref(['Channel 1', 'Channel 2', 'Channel 3']); // Replace with your own data
</script>

<style scoped>
/* Additional styles if needed */
</style>