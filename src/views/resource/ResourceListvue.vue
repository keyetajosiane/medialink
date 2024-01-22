<template>
  <div class="container mx-auto p-6">
    <!-- Resource list -->
    <h1 class="text-2xl font-bold mb-4">Available Resources</h1>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="resource in resources" :key="resource.ressources_id" class="bg-gray-700 p-4 rounded">
        <h2 class="text-xl font-bold">{{ resource.title }}</h2>
        <img :src="resource.thumbnail" alt="Thumbnail" class="w-full h-auto mb-3 rounded">
        <p>{{ resource.description }}</p>
        <button @click="deleteResource(resource.id)"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4">Delete</button>
        <button @click="readResource(resource.id)"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">Read</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';


const resources = ref([]);

// Specify the workerSrc property
GlobalWorkerOptions.workerSrc = '/js/pdf.worker.mjs';

const generateThumbnail = async (resource) => {
  const pdf = await getDocument(resource.url).promise;
  const page = await pdf.getPage(1); // Get the first page

  // Create a canvas for the page
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Set the scale and viewport
  const scale = 1;
  const viewport = page.getViewport({ scale });

  // Set the canvas height and width
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  // Render the page onto the canvas
  await page.render({ canvasContext: context, viewport }).promise;

  // Convert the canvas to a data URL
  const thumbnail = canvas.toDataURL();
  // Add the thumbnail to the resource
  resource.thumbnail = thumbnail;
};

const fetchResources = async () => {
  try {
    const response = await axios.get('ressources/ressource/get'); // Replace with your actual API endpoint
    resources.value = response.data;
    // Generate thumbnails for each resource
    for (const resource of resources.value) {
      await generateThumbnail(resource);
    }
  } catch (error) {
    console.error('There was an error fetching the resources:', error);
    // Handle error appropriately
  }
};

const deleteResource = async (id) => {
  // Implement resource deletion logic
  console.log('Delete resource with ID:', id);
};

const readResource = (id) => {
  // Implement resource read logic
  console.log('Read resource with ID:', id);
};

onMounted(fetchResources);
</script>