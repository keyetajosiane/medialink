<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import WaitingPageVue from '@/views/WaitingPageVue.vue';
import { watch, ref } from 'vue';

const userStore = useUserStore()

let isLoading = ref(true)

watch(() => userStore.loading, (newVal, oldVal) => {
  // if (newVal) {
  //   isLoading.value = false
  // }
  isLoading.value = newVal
}, { immediate: true })
</script>

<template>
  <WaitingPageVue v-if="isLoading" />
  <RouterView v-else />
</template>
