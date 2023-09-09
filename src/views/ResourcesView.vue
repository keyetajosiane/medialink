<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import VueBasicAlert from 'vue-basic-alert'
import { initFlowbite } from 'flowbite'

const alert = ref(null)
const loading = ref(false)
const title = ref('')
const description = ref('')
const file = ref(null)
const user_id = ref(1)
const resources = ref([])

onMounted(() => {
    initFlowbite()

    // get all the resources
    axios.get('ressources/ressource/get')
        .then((response) => {
            resources.value = response.data
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
})

const handleFileChange = (e) => {
    file.value = e.target.files[0]
}

const handleSubmit = () => {
    // title and description are required
    if (!title.value || !description.value) {
        alert.value.showAlert('error', 'Please fill all the required fields', "error!!")
        return
    }
    // a file is required
    if (!file.value) {
        alert.value.showAlert('error', 'Please select a file', "error!!")
        return
    }
    loading.value = true

    const formData = new FormData()
    formData.append('title', title.value)
    formData.append('description', description.value)
    formData.append('files', file.value)
    formData.append('user_id', user_id.value)

    // send the data to the server
    axios.post('ressources/insert', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((response) => {
            console.log(response)
            alert.value.showAlert('success', 'File uploaded successfully', "success!!")
        })
        .catch((error) => {
            console.log(error)
            alert.value.showAlert('error', 'File upload failed', "error!!")
        })
        .finally(() => {
            loading.value = false
        })

}
</script>

<template>
    <vue-basic-alert ref="alert" :duration="1000" :closeIn="5000" />
    <main class="flex flex-col items-center">
        <!-- first part: upload a resource -->
        <div class="flex items-center justify-center min-h-screen w-full  dark:bg-gray-800 dark:border-gray-700">
            <div class="rounded-sm bg-white shadow-default  dark:bg-gray-800 dark:border-gray-700 w-2/4">
                <div class="w-full p-4 sm:p-12.5 xl:p-17.5">

                    <h2
                        class="mb-9 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white sm:text-title-xl2">
                        Sign Up to CIS Mediatheque
                    </h2>

                    <div v-if="loading"
                        class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    </div>

                    <form @submit.prevent="handleSubmit">
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <!-- the resource title -->
                            <div>
                                <label for="title" class="mb-2.5 block font-medium text-black dark:text-white">Title</label>
                                <input type="text" id="title" placeholder="Enter your title" v-model="title"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <!-- the resource description -->
                            <div>
                                <label for="description"
                                    class="mb-2.5 block font-medium text-black dark:text-white">Description</label>
                                <input type="text" id="description" placeholder="Enter your description"
                                    v-model="description"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <!-- the resource file -->
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    for="file_input">Upload file</label>
                                <input
                                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="file_input" type="file" @change="handleFileChange" />
                            </div>

                            <div>

                                <button type="submit"
                                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                    Upload
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- second part: display the resource -->
        <div class="flex items-center justify-center min-h-screen w-full  dark:bg-gray-800 dark:border-gray-700">
            <div v-for="resource in resources" :key="resource.id" class="p-4 m-2 bg-white dark:bg-gray-700 rounded shadow">
                <h2 class="text-xl font-bold">{{ resource.title }}</h2>
                <p>{{ resource.description }}</p>
                <img :src="resource.url" :alt="resource.title" class="w-full rounded-md">
            </div>
        </div>
    </main>
</template>