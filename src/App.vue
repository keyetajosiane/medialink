<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import WaitingPageVue from '@/views/WaitingPageVue.vue';
import { watch, ref } from 'vue';

const userStore = useUserStore()

let isLoading = ref(true)

watch(() => userStore.loading, (newVal, oldVal) => {
  isLoading.value = newVal
}, { immediate: true })

// load permissions
userStore.loadPermissions()
</script>

<template>
  <WaitingPageVue v-if="isLoading" />
  <RouterView v-else />
</template>

<style>
body {
  max-height: 100vh;
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #2f3136;
}

::-webkit-scrollbar-thumb {
  background-color: #7289da;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #677bc4;
}
</style>