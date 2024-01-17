<template>
    <div class="flex flex-col items-center p-6 shadow-discord bg-discord-dark">
        <!-- Upload resource form -->
        <form @submit.prevent="uploadResource">
            <div>
                <label for="title" class="mb-2.5 block font-medium text-white">Title</label>
                <input type="text" id="title" v-model="title" placeholder="Enter your title"
                    class="bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
            </div>
            <div>
                <label for="file_input" class="mb-2.5 block font-medium text-white">Upload file</label>
                <input type="file" id="file_input" @change="handleFileChange"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
            </div>
            <div>
                <button type="submit"
                    class="text-white bg-red-700 rounded-lg px-5 py-2.5 mb-2 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700">Upload</button>
            </div>
        </form>
        <!-- Resources list -->
        <div v-for="resource in resources" :key="resource.id" class="p-4 m-2 bg-white rounded shadow">
            <h2 class="text-xl font-bold text-white">{{ resource.title }}</h2>
            <p class="text-white">{{ resource.description }}</p>
            <img :src="resource.url" :alt="resource.title" class="w-full rounded-md">
            <button @click="deleteResource(resource.id)"
                class="text-white bg-red-700 rounded-lg px-5 py-2.5 mb-2 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700">Delete</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const title = ref('')
const file = ref(null)
const resources = ref([])

const handleFileChange = (e) => {
    file.value = e.target.files[0]
}

const uploadResource = () => {
    // Implement upload logic
}

const deleteResource = (id) => {
    // Implement delete logic
}

onMounted(() => {
    // Load resources
})
</script>
