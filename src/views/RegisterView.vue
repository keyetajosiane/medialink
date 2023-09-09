<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import VueBasicAlert from 'vue-basic-alert'
import { initFlowbite } from 'flowbite'

const alert = ref(null)

const loading = ref(false)
const error = ref(null)
const firstname = ref('')
const lastname = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const repeatPassword = ref('')

onMounted(() => {
    initFlowbite()
})

const register = async () => {
    // email, username, password and repeatPassword are required
    if (!firstname.value || !lastname.value || !username.value || !email.value || !password.value || !repeatPassword.value) {
        alert.value.showAlert('error', 'Please fill all the required fields', "error!!")
        return
    }
    // validate password
    if (password.value !== repeatPassword.value) {
        alert.value.showAlert('error', 'Passwords do not match', "error!!")
        return
    }

    loading.value = true

    const user = {
        first_name: firstname.value,
        last_name: lastname.value,
        username: username.value,
        email: email.value,
        password: password.value,
        roles: 'ROLE_USER',
    }

    // register the user
    axios.post('user/user/create', user)
        .then((response) => {
            console.log(response)
            alert.value.showAlert('success', 'Registration successful', "success!!")
        })
        .catch((error) => {
            console.log(error)
            alert.value.showAlert('error', 'Registration failed', "error!!")
        })
        .finally(() => {
            loading.value = false
        })
}
</script>

<template>
    <vue-basic-alert ref="alert" :duration="1000" :closeIn="5000" />
    <div class="flex items-center justify-center min-h-screen  dark:bg-gray-800 dark:border-gray-700">
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

                <form @submit.prevent="register">
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label for="firstname" class="mb-2.5 block font-medium text-black dark:text-white">First Name</label>
                            <input type="text" id="firstname" placeholder="Enter your first name" v-model="firstname"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label for="lastname" class="mb-2.5 block font-medium text-black dark:text-white">Last Name</label>
                            <input type="text" id="lastname" placeholder="Enter your last name" v-model="lastname"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label for="username"
                                class="mb-2.5 block font-medium text-black dark:text-white">Username</label>
                            <input type="text" placeholder="Enter your username" v-model="username"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                id="username" required />
                        </div>

                        <div>
                            <label for="email" class="mb-2.5 block font-medium text-black dark:text-white">Email</label>
                            <input type="email" id="email" placeholder="Enter your email" v-model="email"
                                :class="[emailError ? 'border-red-500' : '', 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500']" />
                        </div>

                        <div>
                            <label for="password"
                                class="mb-2.5 block font-medium text-black dark:text-white">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" v-model="password"
                                :class="[passwordError ? 'border-red-500' : '', 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500']" />
                        </div>

                        <div>
                            <label class="mb-2.5 block font-medium text-black dark:text-white">Re-type Password</label>
                            <input type="password" placeholder="Enter your password" v-model="repeatPassword"
                                :class="[repeatPasswordError ? 'border-red-500' : '', 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500']" />
                        </div>

                        <div>

                            <button type="submit"
                                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                Sign Up
                            </button>
                        </div>

                        <div class="mt-6 text-center">
                            <p class="font-medium text-sm text-gray-900 dark:text-white">
                                Already have an account?
                                <RouterLink to="/login"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Sign in</RouterLink>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>