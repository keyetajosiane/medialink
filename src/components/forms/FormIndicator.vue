<template>
    <div class="flex items-center space-x-2 transition-opacity">
      <span class="loader"></span>
      <span class="text-sm">{{ message }}</span>
    </div>
  </template>

<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
    message: String
});
</script>

<style>
.loader {
    border: 4px solid #f3f3f3;
    /* Light grey */
    border-top: 4px solid #3498db;
    /* Blue */
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}</style>