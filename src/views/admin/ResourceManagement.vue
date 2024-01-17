<template>
    <div class="bg-gray-800 text-white p-4">
      <h1 class="text-2xl font-bold mb-4">Resources</h1>
  
      <!-- Resource list -->
      <div class="grid grid-cols-3 gap-4">
        <div v-for="resource in resources" :key="resource.id" class="bg-gray-700 p-4 rounded">
          <h2 class="text-xl font-bold">{{ resource.title }}</h2>
          <p>{{ resource.description }}</p>
          <button @click="deleteResource(resource.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4">Delete</button>
          <button @click="readResource(resource.id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">Read</button>
        </div>
      </div>
  
      <!-- Upload form -->
      <div class="bg-gray-700 p-4 rounded mt-8">
        <h2 class="text-xl font-bold mb-4">Upload a new resource</h2>
        <FormFIleUpload class="mt-4" label="Upload file" fileInputId="file" :multiple="true" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import FormFIleUpload from '@/components/formFields/FormFIleUpload.vue';
  
  // Dummy data for resources
  const resources = ref([
    { id: 1, title: 'Resource 1', description: 'This is resource 1' },
    { id: 2, title: 'Resource 2', description: 'This is resource 2' },
    { id: 3, title: 'Resource 3', description: 'This is resource 3' },
  ])
  
  // Function to delete a resource
  const deleteResource = (id) => {
    resources.value = resources.value.filter(resource => resource.id !== id)
  }
  
  // Function to read a resource
  const readResource = (id) => {
    // Your logic for reading the resource goes here
  }
  
  // Function to upload a resource
  const uploadResource = (event) => {
    // Your logic for uploading the resource goes here
  }
  </script>
  
  <style scoped>
    /* You can add additional styles if needed */
  </style>
  