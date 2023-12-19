<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <nav class="bg-gray-800 p-4 shadow-md">
      <!-- Navigation content here -->
      <div class="container mx-auto flex items-center justify-between">
        <a href="/" class="text-white text-xl font-semibold">Mediatheque CIS</a>
        <div>
          <router-link to="/login" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</router-link>
          <router-link to="/register" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</router-link>
        </div>
      </div>
    </nav>
    <main class="container mx-auto p-4">
        <LoginForm/>
    </main>
  </div>
</template>

<script setup>
import LoginForm from '../forms/LoginForm.vue'
</script>

<style>
/* You can add additional global styles if needed */
</style>