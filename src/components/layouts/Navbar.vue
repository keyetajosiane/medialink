<template>
    <nav class="flex items-center justify-between bg-gray-800 p-4 shadow-lg">
        <div class="flex items-center">
            <!-- Your app's logo -->
            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="Logo" class="h-8 w-8 mr-2" />
            <span class="text-xl font-bold text-white">Mediatheque CIS</span>
        </div>
        <div class="relative">
            <!-- User avatar -->
            <img class="h-10 w-10 rounded-full cursor-pointer" :src="avatar" alt="User Avatar"
                @click="toggleMenu" />
            <!-- Dropdown menu -->
            <div class="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md overflow-hidden shadow-xl z-10"
                v-if="showMenu">
                <div class="px-4 py-2">
                    <p class="font-bold">bad1987</p> <!-- Replace 'Username' with actual username -->
                    <p class="text-sm">admin@example.com</p> <!-- Replace 'user@example.com' with actual user email -->
                </div>
                <div class="border-t border-gray-700"></div>
                <a href="#" class="block px-4 py-2 text-sm hover:bg-blue-500" @click="updateProfilePicture">Update Profile
                    Picture</a>
                <a href="#" class="block px-4 py-2 text-sm hover:bg-blue-500" @click="openSettings">Settings</a>
                <a href="#" class="block px-4 py-2 text-sm hover:bg-blue-500" @click="toggleDarkMode">Toggle Dark Mode</a>
                <a href="#" class="block px-4 py-2 text-sm hover:bg-blue-500" @click="logout">Logout</a>
                <!-- Add more menu items here -->
            </div>
        </div>
    </nav>
</template>

<script setup>
import avatar from '../../assets/images/avatar.jpg';
import { ref } from 'vue';

// Show or hide the dropdown menu
const showMenu = ref(false);

// Toggle the dropdown menu
const toggleMenu = () => {
    showMenu.value = !showMenu.value;
};

// Update profile picture function
const updateProfilePicture = () => {
    // Your logic for updating the profile picture goes here
};

// Open settings function
const openSettings = () => {
    // Your logic for opening the settings goes here
};

// Toggle dark mode function
const toggleDarkMode = () => {
    // Your logic for toggling dark mode goes here
};

// Logout function
const logout = () => {
    // Your logout logic goes here
};
</script>
  
<style scoped>/* You can add additional styles if needed */</style>
  