<template>
  <aside class="hidden lg:block w-20 bg-gray-800 flex flex-col items-center py-4 shadow-lg">
    <nav class="flex-1">
      <ul>
        <li v-for="menu in props.menuItems" :key="menu.item" class="mb-2">
          <a href="#" class="flex flex-col items-center" @click="handleMenuClick(menu)">
            <span class="block w-10 h-10 bg-blue-500 rounded-lg mb-2"></span>
            <span class="text-xs text-white truncate w-full text-center">{{ menu.item }}</span>
          </a>
        </li>
      </ul>
    </nav>
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