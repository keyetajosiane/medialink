<template>
    <vue-basic-alert ref="alert" :duration="1000" :closeIn="8000" />
    <div class="bg-gray-700 p-4 rounded mt-8">
        <h2 class="text-xl font-bold mb-4">Upload a new resource</h2>
        <form @submit.prevent="uploadResource">
            <div class="mb-4">
                <FormInput label="Title" inputId="title" type="text" v-model="newResource.title" />
            </div>
            <div class="mb-4">
                <FormTextarea label="Description" textareaId="description" placeholder="Enter description"
                    v-model="newResource.description" />
            </div>
            <FormFIleUpload class="mt-4" label="Upload files" fileInputId="files" :multiple="false"
                v-model="newResource.files" maxSize=20 />
            <div class="flex flex-wrap justify-center gap-4">
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Submit</button>
                <FormIndicator v-if="loading" message="Updating password ..." class="text-white" />
            </div>
        </form>
    </div>
</template>

  
<script setup>
import { ref, reactive, onMounted } from 'vue'
import FormFIleUpload from '@/components/formFields/FormFIleUpload.vue';
import FormIndicator from '@/components/forms/FormIndicator.vue';
import FormInput from '@/components/formFields/FormInput.vue';
import FormTextarea from '@/components/formFields/FormTextarea.vue';
import VueBasicAlert from 'vue-basic-alert';
import { initFlowbite } from 'flowbite';
import axios from 'axios';

// Dummy data for new resource
const newResource = reactive({
  title: '',
  description: '',
  files: []
})
const loading = ref(false)
const alert = ref(null)

onMounted(() => {
  initFlowbite()
})

// Function to upload a resource
const uploadResource = () => {
  // title, description, files are required
  if (!newResource.title || !newResource.description || !newResource.files.length) {
    alert.value.showAlert('error', 'Please fill all the required fields', "error!!");
    return;
  }

  loading.value = true;

  // Initialize FormData
  let formData = new FormData();
  formData.append('title', newResource.title);
  formData.append('description', newResource.description);
  newResource.files.forEach((file) => {
    formData.append('files[]', file); // Make sure this matches the field Multer is configured to accept
  });

  // Make post request to upload the resource using FormData
  axios.post('ressources/insert', formData)
    .then((response) => {
      alert.value.showAlert('success', 'Resource uploaded successfully', "success!!");
      // Clear the form
      newResource.title = '';
      newResource.description = '';
      newResource.files = [];
    })
    .catch((error) => {
      console.error(error);
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      alert.value.showAlert('error', message, "error!!");
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
  