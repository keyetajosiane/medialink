<template>
  <div v-if="loading" class="container mx-auto p-6">
    <FormIndicator v-if="loading" message="Loading resources ..." class="text-white" />
  </div>
  <div class="container mx-auto p-6" v-else>
    <!-- Resource list -->
    <h1 class="text-2xl font-bold mb-4">Available Resources</h1>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="resource in resources" :key="resource.ressources_id" class="bg-gray-700 p-4 rounded flex flex-col items-center">
        <h2 class="text-xl font-bold text-center">{{ resource.title }}</h2>
        <!-- Medium thumbnail image -->
        <div class="w-48 h-72 mb-3 overflow-hidden rounded"> <!-- Width 200px and Height 300px -->
          <img :src="resource.thumbnail" alt="Thumbnail" class="object-cover w-full h-full">
        </div>
        <p class="text-center mb-4">{{ resource.description }}</p>
        <div class="flex justify-center gap-4 w-full mt-auto">
          <button @click="deleteResource(resource.ressources_id)"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" v-if="canDeleteResource(resource)">Delete</button>
          <button @click="readResource(resource)"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" v-if="resource.isPdf">Read</button>
            <a :href="resource.url" download class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" v-if="!resource.isPdf">Download</a>
        </div>
        <!-- delete resource indicator -->
        <div v-if="deleteLoading" class="mt-4">
          <FormIndicator message="Deleting resource ..." class="text-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue';
import axios from 'axios';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { useUserStore } from '@/stores/user';
import FormIndicator from '@/components/forms/FormIndicator.vue';
import wordIcon from '@/assets/images/word.png';
import excelIcon from '@/assets/images/xls.png';


const resources = ref([]);
const userStore = useUserStore();
const user = ref(userStore.userInfo);
const loading = ref(false);
const deleteLoading = ref(false);

const emit = defineEmits(['readResource']);

// Specify the workerSrc property
GlobalWorkerOptions.workerSrc = '/js/pdf.worker.mjs';

const generateThumbnail = async (resource) => {
  const isPdf = resource.url.endsWith('.pdf');
  resource.type = resource.url.endsWith('.doc') ? 'word' : resource.url.endsWith('.docx') ? 'word' : resource.url.endsWith('.xls') ? 'excel' : resource.url.endsWith('.xlsx') ? 'excel' : 'unknown';
  resource.isPdf = isPdf;
  if(!isPdf) {
    resource.thumbnail = resource.type === 'word' ? wordIcon : resource.type === 'excel' ? excelIcon : null;
    return;
  }
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
    loading.value = true;
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
  finally {
    loading.value = false;
  }
};

const canDeleteResource = (resource) => {
  return resource.user_id === user.value.id || user.value.is_admin;
};

const deleteResource = async (id) => {
  if(!id || !canDeleteResource(id)) {
    console.log("invalid resource id or user not authorized to delete resource");
    return;
  }
  try {
    deleteLoading.value = true;
    await axios.delete(`ressources/ressource/${id}`);
    // Remove the deleted resource from the resources array
    resources.value = resources.value.filter((resource) => resource.ressources_id !== id);
  }
  catch (error) {
    console.error('There was an error deleting the resource:', error);
  }
  finally {
    deleteLoading.value = false;
  }
};

const readResource = (resource) => {
  const eventData = {
    source: resource.url,
    title: resource.title,
    resource_owner_id: resource.user_id
  }
  emit('readResource', eventData);
};

onMounted(fetchResources);
</script>