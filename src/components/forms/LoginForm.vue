<template>
    <vue-basic-alert ref="alert" :duration="1000" :closeIn="8000" />
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <form @submit.prevent="handleLogin"
            class="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <div class="flex flex-col items-center mb-6">
                <img :src="logo" alt="Your Logo"
                    class="w-50 h-auto mr-4 rounded-md"> <!-- Adjusted with Tailwind classes -->
                <h2 class="text-3xl font-bold text-center">Login</h2>
            </div>
            <FormInput label="Username" inputId="username" type="text" v-model="loginForm.username" />
            <FormInput label="Password" inputId="password" type="password" class="mt-4" v-model="loginForm.password" />
            <FormCheckbox label="Remember me" checkboxId="rememberMe" class="mt-4" v-model="loginForm.rememberMe" />
            <FormButton type="submit" class="mt-6 w-full bg-blue-500 hover:bg-blue-600" :disabled="loading">
                Login
            </FormButton>
            <FormIndicator v-if="loading" message="Logging in..." class="mt-4" />
        </form>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import FormInput from '../formFields/FormInput.vue';
import FormCheckbox from '../formFields/FormCheckbox.vue';
import FormButton from '../formFields/FormButton.vue';
import FormIndicator from './FormIndicator.vue';
import axios from 'axios';
import { initFlowbite } from 'flowbite';
import VueBasicAlert from 'vue-basic-alert';
import { useUserStore } from '@/stores/user';
import { useRouter, useRoute } from 'vue-router';
import logo from '@/assets/images/logo/cis-logo.jpeg';

const loginForm = ref({
    username: '',
    password: '',
    rememberMe: false
});
const alert = ref(null)
const loading = ref(false);

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const redirectPath = route.query.redirect || '/';

onMounted(() => {
    initFlowbite()
    if (userStore.isLoggedIn) {
        // Redirect to home page or dashboard
        router.push(redirectPath);
    }
})

const handleLogin = async () => {
    // username and password are required
    if (!loginForm.value.username || !loginForm.value.password) {
        alert.value.showAlert('error', 'Username and password are required', "error!!")
        return
    }
    // login the user
    loading.value = true
    const user = { username: loginForm.value.username, password: loginForm.value.password }
    axios.post('user/user/login', user)
        .then((response) => {
            console.log(response)
            alert.value.showAlert('success', 'Login successful', "success!!")
            // save the token in local storage
            localStorage.setItem('token', response.data.token)
            userStore.setUserInfo(response.data.user)
            router.push(redirectPath)
        })
        .catch((error) => {
            console.log(error);
            alert.value.showAlert('error', error.response.data.message, "error!!")
        })
        .finally(() => {
            loading.value = false
        })
};
</script>
  
<style>
/* Additional styles if needed */
</style>