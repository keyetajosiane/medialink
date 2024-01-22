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
import { getDocument } from 'pdfjs-dist/legacy/build/pdf';


const resources = ref([]);

const generateThumbnail = async (resource) => {
  if (resource.url.endsWith('.pdf')) {
    try {
      const pdf = await getDocument(resource.url).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.height = 100; // Set the height as needed
      canvas.width = 100; // Set the width as needed

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      resource.thumbnail = canvas.toDataURL();
      console.log(resource);
    } catch (error) {
      console.error('Error generating thumbnail for PDF:', error);
      // Handle error appropriately
    }
  }
  // Add logic to handle other resource types if needed
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