<template>
  <vue-basic-alert ref="alert" :duration="1000" :closeIn="8000" />
  <div class="bg-gray-800 text-white p-4">
    <h1 class="text-2xl font-bold mb-4">Resources</h1>

    <!-- Resource list -->
    <ResourceListvueVue />

    <!-- Upload resource form -->
    <ResourceUploadView />
  </div>
</template>
  
<script setup>
import { ref, reactive, onMounted } from 'vue'
import ResourceUploadView from '@/views/resource/ResourceUploadView.vue';
import ResourceListvueVue from '@/views/resource/ResourceListvue.vue';

</script>
  
<style scoped>/* You can add additional styles if needed */</style>
  