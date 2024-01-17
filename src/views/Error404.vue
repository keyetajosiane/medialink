<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
    <h1 class="text-5xl font-bold mb-4">404</h1>
    <p class="text-xl mb-8">Oops! The resource you're looking for isn't here.</p>
    <p>You will be redirected back to the previous page shortly.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.back();
  }, 5000); // Redirect after 5 seconds
});
</script>

<style scoped>
/* Scoped styles if necessary */
</style>