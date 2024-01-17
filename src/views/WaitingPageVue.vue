<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-800 text-white">
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-500"></div>
      <p class="mt-4 text-lg">Initializing, please wait...</p>
    </div>
  </div>
</template>

<script setup>
// No JavaScript needed here for now, but you can add setup code if necessary.
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>