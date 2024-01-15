<template>
    <div class="flex h-screen bg-gray-900 text-white">
        <!-- Sidebar -->
        <Sidebar :homeLink="props.homeLink" :menuItems="props.menuItems" />

        <!-- Main container -->
        <div class="flex-1 flex flex-col">
            <!-- Navbar -->
            <Navbar />

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
    menuItems: Array
})
</script>

<style>
/* Global styles or additional styles can go here */
</style>