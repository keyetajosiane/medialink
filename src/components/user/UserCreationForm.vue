<template>
    <vue-basic-alert ref="alert" :duration="1000" :closeIn="8000" />
    <div class="min-h-screen bg-gray-700 flex justify-center items-center">
        <form @submit.prevent="handleSubmit" class="bg-gray-800 p-8 rounded-lg space-y-4 w-full">
            <h1 class="text-2xl font-bold text-white leading-tight text-center">Account Creation</h1>
            <!-- Base Account Info -->
            <BaseAccountInfo @update:baseAccountInfo="handleBaseAccountInfo" />
            <!-- Conditionally rendered components based on selected role -->
            <div class="flex flex-wrap justify-center gap-20 items-center">
                <div class="max-w-md">
                    <FormateurInfo v-if="userAccountInfo.role === 'formateur'" @update:baseAccountInfo="handleBaseAccountInfo"  />
                    <ApprenantInfo v-if="userAccountInfo.role === 'apprenant'" @update:baseAccountInfo="handleBaseAccountInfo"  />
                    <AdministratifInfo v-if="userAccountInfo.role === 'membre administratif'" @update:baseAccountInfo="handleBaseAccountInfo"  />
                </div>
                <!-- Submit Button -->
                <div class="max-w-md">
                    <FormButton class="mt-4 w-full" type="submit">
                        Create Account
                    </FormButton>
                    <FormIndicator v-if="loading" message="creating account ..." class="mt-4 text-white" />
                </div>
            </div>

        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BaseAccountInfo from './BaseAccountInfo.vue';
import FormateurInfo from './FormateurInfo.vue';
import ApprenantInfo from './ApprenantInfo.vue';
import AdministratifInfo from './AdministratifInfo.vue';
import FormButton from '../formFields/FormButton.vue';
import FormIndicator from '../forms/FormIndicator.vue';
import VueBasicAlert from 'vue-basic-alert';
import { initFlowbite } from 'flowbite';
import axios from 'axios';

const loading = ref(false);
const alert = ref(null);
const userAccountInfo = ref({});

onMounted(() => {
    initFlowbite();
});

const handleBaseAccountInfo = (data) => {
    Object.keys(data).forEach((key) => {
        userAccountInfo.value[key] = data[key].value;
    })
    // console.log(userAccountInfo.value);
};

const handleSubmit = () => {
    // Implement submission logic here
    // Simulate account creation
    loading.value = true;
    axios.post('apprenant/apprenant/insert', userAccountInfo.value)
        .then(response => {
            console.log(response.data);
            loading.value = false;
            alert.value.showAlert('success', 'Account created successfully', "success!!");
        })
        .catch(error => {
            console.log(error);
            if(error.response && error.response.data){
                alert.value.showAlert('error', error.response.data.message, "error!!");
            }
            else{
                alert.value.showAlert('error', 'Failed to create account', "error!!");
            }
            loading.value = false;
        })
        .finally(() => {
            loading.value = false;
        })
};
</script>

<style scoped></style>