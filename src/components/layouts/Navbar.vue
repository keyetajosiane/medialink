<template>
    <nav class="fixed top-0 left-0 right-0 h-16 flex items-center justify-between bg-gray-800 p-4 shadow-lg z-10">
        <div class="flex flex-col lg:flex-row items-center justify-center">
            <!-- Your app's logo -->
            <img :src="logo" alt="Logo" class="h-auto w-20 lg:w-[100px] mr-2 lg:mr-0" />
            <span class="text-xl font-bold text-white">Mediatheque CIS</span>
        </div>

        <!-- Hamburger Menu for small screens -->
        <button @click="toggleMobileMenu" class="text-white lg:hidden">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
        <div class="relative hidden lg:block">
            <!-- User avatar -->
            <img class="h-10 w-10 rounded-full cursor-pointer" :src="avatar" alt="User Avatar"
                @click="toggleDropdownMenu" />
            <!-- Dropdown menu -->
            <div class="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md overflow-hidden shadow-xl z-10"
                v-if="showMenu">
                <div class="px-4 py-2">
                    <p class="font-bold">{{ user ? user.user_name : 'guess' }}</p>
                    <p class="text-sm">{{ user ? user.email : 'guess@example.com' }}</p>
                </div>
                <div class="border-t border-gray-700"></div>
                <a href="#" class="block px-4 py-2 text-sm hover:bg-blue-500" @click="updateProfilePicture">Update Profile
                    Picture</a>
                <a href="#" class="block px-4 py-2 text-sm hover:bg-blue-500" @click="openSettings">Settings</a>
                <a href="#" class="block px-4 py-2 text-sm hover:bg-blue-500" @click="logout">Logout</a>
                <!-- Add more menu items here -->
            </div>
        </div>

    </nav>
</template>

<script setup>
import avatar from '@/assets/images/avatar.jpg';
import { useUserStore } from '@/stores/user';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import logo from '@/assets/images/logo/cis-logo.jpeg';

// Show or hide the dropdown menu
const userStore = useUserStore();
const user = ref(userStore.userInfo);

const showMenu = ref(false);
const showMobileMenu = ref(false);

// Toggle the dropdown menu
const toggleDropdownMenu = () => {
    showMenu.value = !showMenu.value;
};

// Toggle the mobile navigation menu
const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value;
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
    userStore.logout();
};
// Function to close the dropdown when clicking outside
const closeDropdown = (event) => {
    if (!event.target.closest('.relative')) {
        showMenu.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
});
</script>
  
<style scoped>
/* You can add additional styles if needed */
</style>
  