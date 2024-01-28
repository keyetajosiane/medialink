<template>
    <div class="flex flex-col h-screen overflow-hidden bg-gray-900 text-white">
        <!-- Navbar -->
        <Navbar />
        
        <!-- Main container -->
        <div class="flex-1 flex overflow-hidden mt-16" style="height: calc(100vh - 64px);">
            <!-- Sidebar -->
            <Sidebar :homeLink="props.homeLink" :menuItems="props.menuItems" :handleMenuClick="props.handleMenuClick" />

            <!-- Main content area -->
            <main class="flex-1 overflow-y-auto p-4">
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import { defineProps } from 'vue';

const props = defineProps({
    homeLink: String,
    menuItems: Array,
    handleMenuClick: Function
})
</script>

<style>
/* Global styles or additional styles can go here */
</style>