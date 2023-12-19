<template>
    <div class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold text-gray-700">Create User Account</h2>
      <div class="flex flex-wrap gap-4">
        <template v-for="role in roles" :key="role.id">
          <div
            class="rounded-lg shadow-md px-4 py-3 cursor-pointer hover:bg-gray-100"
            @click="emitSelectedRole(role)"
          >
            <span class="text-2xl text-gray-500">{{ role.icon }}</span>
            <span class="ml-2 text-lg font-semibold text-gray-700">{{ role.title }}</span>
          </div>
        </template>
      </div>
    </div>
  </template>
  
  <script setup>
  const { ref } = require("vue");
  
  const roles = [
    { id: 1, icon: "‍", title: "Apprenant" },
    { id: 2, icon: "‍", title: "Formateur" },
    { id: 3, icon: "‍", title: "Administrateur" },
  ];
  
  const selectedRole = ref(null);
  
  const emitSelectedRole = (role) => {
    selectedRole.value = role;
    // Emit your selected role event here
  };
  
  </script>
  
  <style>
    /* Using Tailwind config for screen sizes, spacing, etc. */
    @apply lg:text-lg md:text-base sm:text-sm;
  </style>  